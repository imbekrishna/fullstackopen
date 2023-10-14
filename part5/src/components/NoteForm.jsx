import { useState } from 'react';

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('a new note...');

  const addNote = (event) => {
    event.preventDefault();
    createNote({
      content: newNote,
      important: true,
    });

    setNewNote('');
  };

  return (
    <div>
      <h2>Create a new Note</h2>
      <form onSubmit={addNote}>
        <label htmlFor="note">Note</label>
        <input
          id="note"
          name="note"
          type="text"
          value={newNote}
          onChange={({ target }) => setNewNote(target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default NoteForm;
