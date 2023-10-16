import './App.css';
import NewNote from './components/NewNote';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter';

const App = () => {
  return (
    <div>
      <Notes />
      <hr />
      <NewNote />
      <VisibilityFilter />
    </div>
  );
};
export default App;
