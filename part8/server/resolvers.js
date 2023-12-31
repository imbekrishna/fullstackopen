const { GraphQLError } = require('graphql');
const { PubSub } = require('graphql-subscriptions');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Person = require('./models/person');
const User = require('./models/user');

const pubSub = new PubSub();

const resolvers = {
  Query: {
    personCount: async () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      if (!args.phone) {
        return Person.find({}).populate('friendOf');
      }

      return Person.find({ phone: { $exists: args.phone === 'YES' } }).populate('friendOf');
    },
    findPerson: async (root, args) => Person.findOne({ name: args.name }),
    me: (root, args, context) => context.currentUser,
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    }
  },
  Mutation: {
    addPerson: async (root, args, context) => {
      const person = new Person({ ...args });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      try {
        await person.save();
        currentUser.friends = currentUser.friends.concat(person);
        await currentUser.save();
      } catch (error) {
        throw new GraphQLError('Saving person failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        });
      }

      pubSub.publish('PERSON_ADDED', { personAdded: person });

      return person;
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name });
      person.phone = args.phone;

      try {
        await person.save();
      } catch (error) {
        throw new GraphQLError('Saving number failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        });
      }

      return person;
    },
    createUser: async (root, args) => {
      const passwordHash = await bcrypt.hash(args.password, 10);
      const user = new User({ username: args.username, passwordHash });

      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      try {
        const passwordValid = await bcrypt.compare(
          args.password,
          user.passwordHash
        );

        if (passwordValid) {
          const userForToken = {
            username: user.username,
            id: user._id,
          };

          return {
            value: jwt.sign(userForToken, process.env.JWT_SECRET, {
              expiresIn: 60 * 60,
            }),
          };
        }

        throw Error('wrong credentials');
      } catch (error) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
    },

    addAsFriend: async (root, args, { currentUser }) => {
      const isFriend = (person) =>
        currentUser.friends
          .map((f) => f._id.toString())
          .includes(person._id.toString());

      if (!currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      const person = await Person.findOne({ name: args.name });
      if (!isFriend(person)) {
        currentUser.friends = currentUser.friends.concat(person);
      }

      await currentUser.save();
      return currentUser;
    },
  },
  Subscription: {
    personAdded: {
      subscribe: () => pubSub.asyncIterator('PERSON_ADDED'),
    },
  },
};

module.exports = resolvers;
