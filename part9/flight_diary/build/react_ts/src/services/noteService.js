"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNote = exports.getAllNotes = void 0;
const axios_1 = __importDefault(require("axios"));
const baseUrl = 'http://localhost:3001/api/notes';
const getAllNotes = () => {
    return axios_1.default.get(baseUrl).then((response) => response.data);
};
exports.getAllNotes = getAllNotes;
const createNote = (object) => {
    return axios_1.default.post(baseUrl, object).then((response) => response.data);
};
exports.createNote = createNote;
