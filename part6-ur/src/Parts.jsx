import { useContext } from 'react';
import { useCounterDispatch, useCounterValue } from './contextHelpers';

export const Display = () => {
  const counter = useCounterValue();
  return <h1>Counter is {counter}</h1>;
};

export const Button = ({ type, label }) => {
  const dispatch = useCounterDispatch();
  return <button onClick={() => dispatch({ type })}>{label}</button>;
};
