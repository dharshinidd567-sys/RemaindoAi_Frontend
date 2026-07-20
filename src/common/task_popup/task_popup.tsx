import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { styles } from './task_popup_styles';
import { createTask, updateTask } from '../../services/api';
import { Task } from '../../screens/home/task_page/task_screen_types';
import Popup from '../popup/popup';

const CATEGORIES = ['Work', 'Personal', 'Family', 'Health'];
const PRIORITIES = ['Low', 'Medium', 'High'];
const REMINDERS = ['None', '10 mins before', '30 mins before', '1 hour before', '1 day before'];
const REPEAT_OPTIONS = ['None', 'Daily', 'Weekly', 'Monthly', 'Custom'];
const COLORS = ['#ff5fa2', '#7c5cff', '#00d4ff', '#ffa500', '#ff0000'];
const EMOJIS = ['💼', '🏃', '❤️', '📚', '🛌', '💰', '✅', '🏂'];

interface TaskPopupProps {
  visible: boolean;
  onClose: () => void;
  onTaskAdded?: () => void;
  editingTask?: Task | null;
}
type CategoryType = "Work" | "Personal" | "Family" | "Health";
type PriorityType = "Low" | "Medium" | "High";
export const TaskPopup: React.FC<TaskPopupProps> = ({
  visible,
  onClose,
  onTaskAdded,
  editingTask,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>("Work");

  const [selectedPriority, setSelectedPriority] =
    useState<PriorityType>("Medium");
  const [dueDate, setDueDate] = useState('');
  const [selectedReminder, setSelectedReminder] = useState('None');
  const [selectedRepeat, setSelectedRepeat] = useState('None');
  const [selectedColor, setSelectedColor] = useState('#7c5cff');
  const [selectedEmoji, setSelectedEmoji] = useState('💼');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
      setSelectedCategory(editingTask.category || 'Work');
      setSelectedPriority(editingTask.priority || 'Medium');
      setDueDate(editingTask.dueTime || '');
      setSelectedReminder(editingTask.reminder || 'None');
      setSelectedRepeat(editingTask.repeat || 'None');
      setSelectedColor(editingTask.color || '#7c5cff');
      setSelectedEmoji(editingTask.tag || '💼');
      setNotes(editingTask.notes || '');
    } else {
      resetForm();
    }
  }, [editingTask, visible]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSelectedCategory('Work');
    setSelectedPriority('Medium');
    setDueDate('');
    setSelectedReminder('None');
    setSelectedRepeat('None');
    setSelectedColor('#7c5cff');
    setSelectedEmoji('💼');
    setNotes('');
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    setLoading(true);
    try {
      const taskData = {
        title: title.trim(),
        description,
        category: selectedCategory,
        priority: selectedPriority,
        dueTime: dueDate,
        tag: selectedEmoji,
        reminder: selectedReminder,
        repeat: selectedRepeat,
        color: selectedColor,
        notes,
        order: 0,
      };

      console.log("Task Payload:", taskData);

      await createTask(taskData);

      // if (editingTask?.id) {
      //   await updateTask(editingTask.id, taskData);
      // } else {
      //   await createTask(taskData);
      // }

      resetForm();
      onClose();
      onTaskAdded?.();
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popup
      visible={visible}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={editingTask ? 'Edit Task' : 'Create Task'}
      submitButtonText={editingTask ? 'Update' : 'Create'}
      loading={loading}
      height={700}
    >
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Task Title */}
        <View style={styles.section}>
          <Text style={styles.label}>Task Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter task title"
            placeholderTextColor="#8b899e"
            value={title}
            onChangeText={setTitle}
            editable={!loading}
          />
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter task description"
            placeholderTextColor="#8b899e"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            editable={!loading}
          />
        </View>

        {/* Category */}
        <View style={styles.section}>
          <Text style={styles.label}>Category</Text>
          {CATEGORIES.map((cat:any) => (
            <TouchableOpacity
              key={cat}
              style={styles.checkboxOption}
              onPress={() => setSelectedCategory(cat)}
              disabled={loading}
            >
              <View
                style={[
                  styles.checkbox,
                  selectedCategory === cat && styles.checkboxActive,
                ]}
              >
                {selectedCategory === cat && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text style={styles.checkboxLabel}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Priority */}
        <View style={styles.section}>
          <Text style={styles.label}>Priority</Text>
          {PRIORITIES.map((pri:any) => (
            <TouchableOpacity
              key={pri}
              style={styles.checkboxOption}
              onPress={() => setSelectedPriority(pri)}
              disabled={loading}
            >
              <View
                style={[
                  styles.checkbox,
                  selectedPriority === pri && styles.checkboxActive,
                ]}
              >
                {selectedPriority === pri && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text style={styles.checkboxLabel}>{pri}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Due Date */}
        <View style={styles.section}>
          <Text style={styles.label}>Due Date</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#8b899e"
            value={dueDate}
            onChangeText={setDueDate}
            editable={!loading}
          />
        </View>

        {/* Emoji Selection */}
        <View style={styles.section}>
          <Text style={styles.label}>Icon / Emoji</Text>
          <View style={styles.emojiRow}>
            {EMOJIS.map((emoji) => (
              <TouchableOpacity
                key={emoji}
                style={[
                  styles.emojiOption,
                  selectedEmoji === emoji && styles.emojiOptionActive,
                ]}
                onPress={() => setSelectedEmoji(emoji)}
                disabled={loading}
              >
                <Text style={styles.emoji}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Reminder */}
        <View style={styles.section}>
          <Text style={styles.label}>
            Reminder <Text style={styles.reminderIcon}>🔔</Text>
          </Text>
          {REMINDERS.map((rem) => (
            <TouchableOpacity
              key={rem}
              style={styles.checkboxOption}
              onPress={() => setSelectedReminder(rem)}
              disabled={loading}
            >
              <View
                style={[
                  styles.checkbox,
                  selectedReminder === rem && styles.checkboxActive,
                ]}
              >
                {selectedReminder === rem && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text style={styles.checkboxLabel}>{rem}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Repeat */}
        <View style={styles.section}>
          <Text style={styles.label}>Repeat</Text>
          {REPEAT_OPTIONS.map((rep) => (
            <TouchableOpacity
              key={rep}
              style={styles.checkboxOption}
              onPress={() => setSelectedRepeat(rep)}
              disabled={loading}
            >
              <View
                style={[
                  styles.checkbox,
                  selectedRepeat === rep && styles.checkboxActive,
                ]}
              >
                {selectedRepeat === rep && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text style={styles.checkboxLabel}>{rep}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Color Selection */}
        <View style={styles.section}>
          <Text style={styles.label}>Assign Color</Text>
          <View style={styles.colorRow}>
            {COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorOption,
                  { backgroundColor: color },
                  selectedColor === color && styles.colorOptionActive,
                ]}
                onPress={() => setSelectedColor(color)}
                disabled={loading}
              >
                {selectedColor === color && (
                  <Text style={styles.colorCheckmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Add any notes"
            placeholderTextColor="#8b899e"
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
            editable={!loading}
          />
        </View>
      </ScrollView>
    </Popup>
  );
};
