export type NoteVariant =
  | "work"
  | "journal"
  | "meeting"
  | "learning"
  | "personal"
  | "default";

export type NoteCategory =
  | "Work"
  | "Journal"
  | "Meeting"
  | "Learning"
  | "Personal";

export interface Note {
  id: number;
  title: string;
  description: string;
  date: string;
  category: NoteCategory;
  pinned: boolean;
  variant: NoteVariant;
}

export interface NotesResponse {
  success: boolean;
  notes: Note[];
}

export interface NoteResponse {
  success: boolean;
  note: Note;
}

export interface NotesScreenProps {}

export interface NoteCardProps {
  note: Note;
  onPress?: (note: Note) => void;
  onEdit?: (note: Note) => void;
  onDelete?: (id: string) => void;
}

export interface FilterItem {
  id: number;
  label: string;
}