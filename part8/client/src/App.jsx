import './App.css';

import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import LoginForm from './components/LoginForm';
import PhoneForm from './components/PhoneForm';

import { useApolloClient, useQuery, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ALL_PERSONS, PERSON_ADDED } from './queries';

import jwt_decode from 'jwt-decode';

import updateCache from './helper/updateCache';

function App() {
  const [errorMessages, setErrorMessages] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('phone-number-users-token');
    if (token) {
      const decoded = jwt_decode(token);
      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem('phone-number-users-token');
      } else {
        setToken(token);
      }
    }
  }, []);

  const result = useQuery(ALL_PERSONS);
  const client = useApolloClient();

  useSubscription(PERSON_ADDED, {
    onData: ({ data }) => {
      const addedPerson = data.data.personAdded;
      notify(`${addedPerson.name} added`);

      updateCache(client.cache, { query: ALL_PERSONS }, addedPerson);
    },
  });

  const notify = (message) => {
    setErrorMessages(message);
    setTimeout(() => {
      setErrorMessages(null);
    }, 10000);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('phone-number-users-token');
    client.resetStore();
  };

  if (!token) {
    return (
      <div>
        <Notification errorMessage={errorMessages} />
        <h2>Login</h2>
        <LoginForm setError={notify} setToken={setToken} />
      </div>
    );
  }

  if (result.loading) {
    return <>loading ...</>;
  }

  return (
    <>
      <Notification errorMessage={errorMessages} />
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </>
  );
}

export default App;
