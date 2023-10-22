import { useEffect, useState } from 'react';
import './App.css';
import { Note } from './types';
import { getAllNotes, createNote } from './services/noteService';

function App() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      content: 'testing',
    },
  ]);

  useEffect(() => {
    getAllNotes().then((response) => {
      setNotes(response);
    });
  });

  const [newNote, setNewNote] = useState('');

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    createNote({ content: newNote }).then((res) => {
      setNotes(notes.concat(res));
    });

    setNewNote('');
  };

  return (
    <>
      <h1>Welcome Krishna</h1>
      <form onSubmit={noteCreation}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
