import { useState } from "react";

const Display = ({ counter }) => {
  return <div>{counter}</div>;
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }
  return <div>button press history: {props.allClicks.join(" ")}</div>;
};

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0,
  });

  const [allClicks, setAllClicks] = useState([]);

  const handleLeftClick = () => {
    setAllClicks(allClicks.concat("L"));
    const updatedLeft = clicks.left + 1;
    setClicks({
      ...clicks,
      left: updatedLeft,
    });
  };
  const handleRightClick = () => {
    setAllClicks(allClicks.concat("R"));
    const updatedRight = clicks.right + 1;
    setClicks({
      ...clicks,
      right: updatedRight,
    });
  };

  return (
    <div>
      <Display counter={clicks.left} />
      <Button text="left" handleClick={handleLeftClick} />
      <Display counter={clicks.right} />
      <Button text="right" handleClick={handleRightClick} />
      <p>{allClicks.join(" ")}</p>
      <History allClicks={allClicks} />
    </div>
  );
};

export default App;
