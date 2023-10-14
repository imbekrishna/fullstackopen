import { useEffect, useState } from 'react';
import './App.css';
import Note from './components/Note';
import noteService from './services/notes';
import loginService from './services/login';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import NoteForm from './components/NoteForm';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [erroMessage, setErroMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const addNote = (noteObject) => {
    noteService.create(noteObject).then((note) => {
      setNotes([...notes, note]);
    });
  };

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user));

      noteService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setErroMessage('Wrong credentials');
      setTimeout(() => {
        setErroMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteAppUser');
    setUser(null);
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((note) => {
        setNotes(notes.map((n) => (n.id !== id ? n : note)));
      })
      .catch(() => {
        setErroMessage(
          `The note '${note.content}' was already removed from server.`
        );
        setTimeout(() => {
          setErroMessage(null);
        }, 5000);
        setNotes(notes.filter((note) => note.id !== id));
      });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const noteForm = () => {
    return (
      <Togglable buttonLabel="New Note">
        <NoteForm createNote={addNote} />
      </Togglable>
    );
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm loginUser={handleLogin} />
      </Togglable>
    );
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={erroMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged in | <a onClick={handleLogout}>logout</a>
          </p>
        </div>
      )}
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      {user !== null && noteForm()}
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
    </div>
  );
};

export default App;
