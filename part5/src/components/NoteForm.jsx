import { useState } from 'react';

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState();

  const addNote = (event) => {
    event.preventDefault();
    createNote({
      content: newNote,
      important: true,
    });

    setNewNote('');
  };

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  return (
    <div className="formDiv">
      <h2>Create a new Note</h2>
      <form onSubmit={addNote}>
        <label htmlFor="note">Note</label>
        <input
          id="note"
          name="note"
          type="text"
          value={newNote}
          placeholder="A new note..."
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default NoteForm;
