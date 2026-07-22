import React from 'react';
import { Text, View } from 'react-native';
import { NotebookText } from 'lucide-react-native';

import { styles } from './notes_screen_styles';

export default function NotesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Notes</Text>
      </View>

      <View style={styles.emptyState}>
        <View style={styles.iconWrap}>
          <NotebookText color="#2ed3b7" size={34} strokeWidth={1.8} />
        </View>
        <Text style={styles.emptyTitle}>No notes yet</Text>
        <Text style={styles.emptyText}>Your notes will show here.</Text>
      </View>
    </View>
  );
}
