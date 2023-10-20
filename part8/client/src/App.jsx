import './App.css';

import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import LoginForm from './components/LoginForm';
import PhoneForm from './components/PhoneForm';

import { useApolloClient, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ALL_PERSONS } from './queries';

function App() {
  const [errorMessages, setErrorMessages] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('phone-number-users-token');
    setToken(token);
  }, []);

  const result = useQuery(ALL_PERSONS);
  const client = useApolloClient();

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
