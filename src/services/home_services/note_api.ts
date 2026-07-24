import { apiRequest } from "../api";
import {
  Note,
  NoteResponse,
  NotesResponse,
} from "../../screens/home/notes_page/notes_types";

// GET ALL NOTES
export const fetchNotes = () =>
  apiRequest<NotesResponse>("/notes/get_allnotes");

// GET SINGLE NOTE
export const fetchNoteById = (id: string) =>
  apiRequest<NoteResponse>(`/notes/get_note/${id}`);

// CREATE NOTE
export const createNote = (payload: Partial<Note>) =>
  apiRequest<NoteResponse>("/notes/create_note", {
    method: "POST",
    body: JSON.stringify(payload),
  });

// UPDATE NOTE


export const updateNote = (
  id: number,
  payload: Partial<Note>
) => {
  return apiRequest(`/notes/update_note/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};

// DELETE NOTE
export const deleteNote = (id: number) =>
  apiRequest<void>(`/notes/delete_note/${id}`, {
    method: "PUT",
  });