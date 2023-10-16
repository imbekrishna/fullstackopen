import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/noteReducer';

const NewNote = () => {
  const dispatch = useDispatch();

  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = '';
    dispatch(createNote(content));
  };

  return (
    <form className='noteForm' onSubmit={addNote}>
      <input type="text" name="note" placeholder='A new note...' />
      <button type="submit">add</button>
    </form>
  );
};

export default NewNote;
