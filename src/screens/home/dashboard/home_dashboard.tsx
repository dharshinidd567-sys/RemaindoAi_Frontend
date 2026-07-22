import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckCircle2, NotebookText } from 'lucide-react-native';

import { COLORS } from '../../../common/footer/footer_styles';
import { styles } from './home_dashboard_styles';

interface HomeDashboardProps {
  onTaskPress: () => void;
  onNotesPress: () => void;
}

export default function HomeDashboard({ onTaskPress, onNotesPress }: HomeDashboardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Quick access</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} activeOpacity={0.82} onPress={onTaskPress}>
          <LinearGradient
            colors={[COLORS.accent1, COLORS.accent2]}
            start={{ x: 0.25, y: 0.2 }}
            end={{ x: 0.9, y: 0.95 }}
            style={styles.iconCircle}
          >
            <CheckCircle2 color="#ffffff" size={30} strokeWidth={1.9} />
          </LinearGradient>
          <Text style={styles.actionTitle}>Tasks</Text>
          <Text style={styles.actionSubtitle}>Open my tasks</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} activeOpacity={0.82} onPress={onNotesPress}>
          <LinearGradient
            colors={['#2ed3b7', '#5c86ff']}
            start={{ x: 0.2, y: 0.2 }}
            end={{ x: 0.9, y: 0.9 }}
            style={styles.iconCircle}
          >
            <NotebookText color="#ffffff" size={30} strokeWidth={1.9} />
          </LinearGradient>
          <Text style={styles.actionTitle}>Notes</Text>
          <Text style={styles.actionSubtitle}>Open notes page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
