"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("./App.css");
const noteService_1 = require("./services/noteService");
function App() {
    const [notes, setNotes] = (0, react_1.useState)([
        {
            id: 1,
            content: 'testing',
        },
    ]);
    (0, react_1.useEffect)(() => {
        (0, noteService_1.getAllNotes)().then((response) => {
            setNotes(response);
        });
    });
    const [newNote, setNewNote] = (0, react_1.useState)('');
    const noteCreation = (event) => {
        event.preventDefault();
        (0, noteService_1.createNote)({ content: newNote }).then((res) => {
            setNotes(notes.concat(res));
        });
        setNewNote('');
    };
    return (<>
      <h1>Welcome Krishna</h1>
      <form onSubmit={noteCreation}>
        <input value={newNote} onChange={(event) => setNewNote(event.target.value)}/>
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map((note) => (<li key={note.id}>{note.content}</li>))}
      </ul>
    </>);
}
exports.default = App;
