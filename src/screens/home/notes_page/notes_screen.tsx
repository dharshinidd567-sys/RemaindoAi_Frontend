import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";

import Header from "../../../helper_common/header/header";
import FilterTabs from "../../../common/filter_tabs/filtertabs";
import NoteCard from "../../../common/notes_page/note_card/note_card";
import NotesPopup from "../../../common/notes_page/notes_popup/notes_popup";

import { styles } from "./notes_screen_styles";
import { Note } from "./notes_types";

import {
  fetchNotes,
  deleteNote,
} from "../../../services/home_services/note_api";

const FILTERS = ["All", "Journal", "Pinned"];

type RawNote = Partial<Note> & {
  noteId?: number;
  _id?: string;
  content?: string;
};

type RawNotesResponse = {
  success?: boolean;
  notes?: RawNote[];
  data?: RawNote[];
};

const NOTE_CATEGORIES: Note["category"][] = [
  "Work",
  "Journal",
  "Meeting",
  "Learning",
  "Personal",
];

const getCategory = (category?: string): Note["category"] =>
  NOTE_CATEGORIES.includes(category as Note["category"])
    ? (category as Note["category"])
    : "Journal";
const getVariant = (category: Note["category"], variant?: string): Note["variant"] => {
  const normalizedVariant = variant?.toLowerCase();

  if (
    normalizedVariant === "work" ||
    normalizedVariant === "journal" ||
    normalizedVariant === "meeting" ||
    normalizedVariant === "learning" ||
    normalizedVariant === "personal" ||
    normalizedVariant === "default"
  ) {
    return normalizedVariant;
  }

  return category.toLowerCase() as Note["variant"];
};

const normalizeNotes = (response: RawNotesResponse): Note[] => {
  const rawNotes = Array.isArray(response.notes)
    ? response.notes
    : Array.isArray(response.data)
    ? response.data
    : [];

  return rawNotes.map((note) => {
    const category = getCategory(note.category);

    return {
      id: Number(note.noteId), // ✅ IMPORTANT CHANGE
      title: note.title || "Untitled Note",
      description: note.description || note.content || "",
      date: note.date || "",
      category,
      pinned: Boolean(note.pinned),
      variant: getVariant(category, note.variant),
    };
  });
};

export default function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState("All");

  const [modalVisible, setModalVisible] = useState(false);

  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const loadNotes = useCallback(async () => {
    try {
      setLoading(true);

      const data = await fetchNotes();

      if (data.success) {
        setNotes(normalizeNotes(data));
      }
    } catch {
      Alert.alert("Error", "Failed to load notes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadNotes();
    setRefreshing(false);
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setModalVisible(true);
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      "Delete Note",
      "Are you sure?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteNote(id);
              loadNotes();
            } catch {
              Alert.alert("Error", "Failed to delete note");
            }
          },
        },
      ]
    );
  };

  const filteredNotes = notes.filter((note) => {
    if (selectedFilter === "All") return true;

    if (selectedFilter === "Pinned") {
      return note.pinned;
    }

    return note.category === selectedFilter;
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7C5CFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title="Notes & Journal"
        onPress={() => {
          setEditingNote(null);
          setModalVisible(true);
        }}
      />

      <View style={styles.filterWrap}>
        <FilterTabs
          data={FILTERS}
          active={selectedFilter}
          gap={20}
          onChange={setSelectedFilter}
        />
      </View>

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          filteredNotes.length === 0 && {
            flexGrow: 1,
          },
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        renderItem={({ item }) => (
          <NoteCard
            title={item.title}
            description={item.description}
            date={item.date}
            category={item.category}
            pinned={item.pinned}
            variant={item.variant}
            onPress={() => handleEdit(item)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              No Notes Yet
            </Text>

            <Text style={styles.emptySubTitle}>
              Tap the + button to create your first note.
            </Text>
          </View>
        }
      />

      <NotesPopup
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setEditingNote(null);
        }}
        onNoteSaved={loadNotes}
        editingNote={editingNote}
      />
    </View>
  );
}
