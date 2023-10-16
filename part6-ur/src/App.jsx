import './App.css';
import { useReducer } from 'react';
import { Display, Button } from './Parts';

function App() {
  return (
    <div>
      <Display/>
      <div>
        <Button type="DEC" label="-" />
        <Button type="ZERO" label="0" />
        <Button type="INC" label="+" />
      </div>
    </div>
  );
}

export default App;
