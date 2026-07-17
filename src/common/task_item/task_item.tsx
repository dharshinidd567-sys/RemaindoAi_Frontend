import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Task } from '../../screens/home/task_page/task_screen_types';
import { styles } from './task_items_styles';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

export default function TaskItem({ task, onToggle }: TaskItemProps) {
  const { title, category, tag, dueTime, isDone, isOverdue } = task;

  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={[styles.checkbox, isDone && styles.checkboxDone]}
        onPress={() => onToggle(task.taskId)}
        activeOpacity={0.7}
      >
        {isDone && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      <View style={styles.textWrap}>
        <Text style={[styles.title, isDone && styles.titleDone]} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {category}
          {tag ? ` · ${tag}` : ''}
        </Text>
      </View>

      <View style={styles.timeWrap}>
        {isOverdue && !isDone ? (
          <Text style={styles.lateText}>⚠ Late</Text>
        ) : (
          <Text style={styles.timeText}>{dueTime}</Text>
        )}
      </View>
    </View>
  );
}