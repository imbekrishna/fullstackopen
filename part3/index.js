require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Note = require("./models/note");

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

const requestLogger = (request, response, next) => {
    console.log("Method:", request.method);
    console.log("Path:  ", request.path);
    console.log("Body:  ", request.body);
    console.log("---");
    next();
};

app.use(requestLogger);

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true,
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false,
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true,
    },
];

app.get("/", (request, response) => {
    response.send("<h1>Hello world!</h1>");
});

app.get("/api/notes", (request, response) => {
    Note.find({}).then((notes) => {
        response.json(notes);
    });
});

app.get("/api/notes/:id", (request, response) => {
    const id = request.params.id;

    Note.findById(id).then((note) => {
        response.json(note);
    });
});

app.post("/api/notes", (request, response) => {
    const body = request.body;

    if (!body.content) {
        return response.status(400).json({
            error: "content missing",
        });
    }

    const note = Note({
        content: body.content,
        important: body.important || false,
    });

    note.save().then((savedNote) => {
        response.json(note);
    });
});

app.put("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id);
    const exists = notes.find((n) => n.id === id);

    const note = request.body;

    if (exists) {
        notes = notes.map((n) => (n.id !== id ? n : note));
        return response.status(201).json(note);
    } else {
        return response
            .status(404)
            .json({ error: "Request resource not found" });
    }
});

app.delete("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter((note) => note.id !== id);

    response.status(204).end();
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

function generateId() {
    const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
    return maxId + 1;
}
