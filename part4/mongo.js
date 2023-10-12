const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://be-krishna:${password}@cluster0.2kz3u.mongodb.net/fullstack-test?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

const note1 = new Note({
  content: 'HTML is easy',
  important: true,
});

const note2 = new Note({
  content: 'So is css',
  important: false,
});

// Note.find({}).then((result) => {
//   result.forEach((note) => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// });

note1.save().then((response) => {
  console.log(response);
  mongoose.connection.close();
});
note2.save().then((response) => {
  console.log(response);
  mongoose.connection.close();
});
