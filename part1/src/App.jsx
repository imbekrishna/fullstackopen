import "./App.css";

const Hello = ({name, age}) => {
  const bornYear = () => {
    const yearNow = new Date().getFullYear();
    return yearNow - age;
  };
  return (
    <div>
      <p>
        Hello {name}, you are {age} years old!
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
};

const Footer = () => {
  return (
    <div>
      Greeting app created by <a href="#">Krishna</a>
    </div>
  );
};

const App = () => {
  const name = "Krishna";
  const age = 24;

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="George" age={26 + 10} />
      <Hello name={name} age={age} />
      <Footer />
    </div>
  );
};

export default App;
