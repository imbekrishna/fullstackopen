import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/noteReducer';
import noteService from '../services/notes';

const NewNote = () => {
  const dispatch = useDispatch();

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = '';
    const newNote = await noteService.createNew(content);
    dispatch(createNote(newNote));
  };

  return (
    <form className="noteForm" onSubmit={addNote}>
      <input type="text" name="note" placeholder="A new note..." />
      <button type="submit">add</button>
    </form>
  );
};

export default NewNote;
