import React, { useEffect, useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Popup from "../../popup/popup";
import {
  createNote,
  updateNote,
} from "../../../services/home_services/note_api";
import {
  Note,
  NoteCategory,
  NoteVariant,
} from "../../../screens/home/notes_page/notes_types";
import { styles } from "./notes_popup_styles";

interface NotesPopupProps {
  visible: boolean;
  onClose: () => void;
  onNoteSaved: () => void;
  editingNote?: Note | null;
}

const CATEGORIES: NoteCategory[] = [
  "Work",
  "Journal",
  "Meeting",
  "Learning",
  "Personal",
];

const getVariantFromCategory = (category: NoteCategory): NoteVariant =>
  category.toLowerCase() as NoteVariant;

const getToday = () =>
  new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function NotesPopup({
  visible,
  onClose,
  onNoteSaved,
  editingNote,
}: NotesPopupProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<NoteCategory>("Journal");
  const [pinned, setPinned] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("Journal");
    setPinned(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Note title is required");
      return;
    }

    setLoading(true);

    try {
      const noteData: Partial<Note> = {
        title: title.trim(),
        description: description.trim(),
        category,
        pinned,
        variant: getVariantFromCategory(category),
        date: editingNote?.date || getToday(),
      };

      if (editingNote) {
        if (!editingNote.id || editingNote.id <= 0) {
          Alert.alert("Error", "Invalid Note ID");
          console.log("Editing Note:", editingNote);
          return;
        }

        await updateNote(editingNote.id, noteData);
      } else {
        await createNote(noteData);
      }

      resetForm();
      onNoteSaved();
      onClose();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to save note");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title || "");
      setDescription(editingNote.description || "");
      setCategory(editingNote.category || "Journal");
      setPinned(Boolean(editingNote.pinned));
    } else {
      resetForm();
    }
  }, [editingNote, visible]);

  return (
    <Popup
      visible={visible}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title={editingNote ? "Edit Note" : "Add Note"}
      submitButtonText={editingNote ? "Update Note" : "Create Note"}
      cancelButtonText="Cancel"
      loading={loading}
      height={620}
    >
      <View style={styles.section}>
        <Text style={styles.label}>
          Title <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter note title"
          placeholderTextColor="#8b899e"
          value={title}
          onChangeText={setTitle}
          editable={!loading}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Write your note"
          placeholderTextColor="#8b899e"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={5}
          editable={!loading}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Category</Text>
        <View style={styles.optionsRow}>
          {CATEGORIES.map((item) => {
            const active = category === item;

            return (
              <TouchableOpacity
                key={item}
                style={[styles.option, active && styles.optionActive]}
                onPress={() => setCategory(item)}
                disabled={loading}
              >
                <Text
                  style={[
                    styles.optionText,
                    active && styles.optionTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <TouchableOpacity
        style={styles.checkboxOption}
        onPress={() => setPinned((value) => !value)}
        disabled={loading}
      >
        <View style={[styles.checkbox, pinned && styles.checkboxActive]}>
          {pinned && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.checkboxLabel}>Pinned</Text>
      </TouchableOpacity>
    </Popup>
  );
}
