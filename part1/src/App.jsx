import "./App.css";

const Hello = ({ name }) => {
  return (
    <div>
      <p>Hello {name}!</p>
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
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="George" />
      <Footer />
    </div>
  );
};

export default App;
