import './App.css';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

import { useQuery } from '@apollo/client';
import { ALL_PERSONS } from './queries';
import { useState } from 'react';
import PhoneForm from './components/PhoneForm';

function App() {
  const [errorMessages, setErrorMessages] = useState(null);
  const result = useQuery(ALL_PERSONS);

  const notify = (message) => {
    setErrorMessages(message);
    setTimeout(() => {
      setErrorMessages(null);
    }, 10000);
  };

  if (result.loading) {
    return <>loading ...</>;
  }
  return (
    <>
      <Notification errorMessage={errorMessages} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </>
  );
}

export default App;
