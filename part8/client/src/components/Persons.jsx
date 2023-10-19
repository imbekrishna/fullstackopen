import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { FIND_PERSONS } from '../queries';

const Person = ({ person, onClose }) => {
  return (
    <div>
      <h2>{person.name}</h2>
      <div>
        {person.address.street} {person.address.city}
      </div>
      <div>{person.phone}</div>
      <button onClick={onClose}>close</button>
    </div>
  );
};

const Persons = ({ persons }) => {
  const [nameToSearch, setNameToSearch] = useState(null);
  const result = useQuery(FIND_PERSONS, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  });

  if (nameToSearch && result.data) {
    return (
      <div>
        <Person
          person={result.data.findPerson}
          onClose={() => setNameToSearch(null)}
        />
      </div>
    );
  }
  return (
    <div>
      <h2>Persons</h2>
      {persons.map((p) => (
        <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => setNameToSearch(p.name)}>show address</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
