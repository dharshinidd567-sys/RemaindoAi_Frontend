import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Task } from '../task_screen_types';
import { createTask, updateTask } from '../../../../services/api';
import Popup from '../../../../common/popup/popup';
import { styles } from './task_popup_styles';

interface TaskFormModalProps {
  visible: boolean;
  onClose: () => void;
  onTaskSaved: () => void;
  editingTask?: Task | null;
}

const CATEGORIES = ['Work', 'Personal', 'Family', 'Health'];
const PRIORITIES = ['Low', 'Medium', 'High'];
const REMINDERS = ['None', '10 mins before', '30 mins before', '1 hour before', '1 day before'];
const REPEAT_OPTIONS = ['None', 'Daily', 'Weekly', 'Monthly', 'Custom'];
const COLORS = ['#ff5fa2', '#7c5cff', '#00d4ff', '#ffa500', '#ff0000'];
const EMOJIS = ['💼', '🏃', '❤️', '📚', '🛒', '💰', '✅', '🎯'];

export default function TaskFormModal({
  visible,
  onClose,
  onTaskSaved,
  editingTask,
}: TaskFormModalProps) {
  const [title, setTitle] = useState(editingTask?.title || '');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(editingTask?.category || 'Work');
  const [selectedPriority, setSelectedPriority] = useState(editingTask?.priority || 'Medium');
  const [dueDate, setDueDate] = useState(editingTask?.dueTime || '');
  const [selectedReminder, setSelectedReminder] = useState('None');
  const [selectedRepeat, setSelectedRepeat] = useState('None');
  const [selectedColor, setSelectedColor] = useState('#7c5cff');
  const [selectedEmoji, setSelectedEmoji] = useState('💼');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Task title is required');
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
      };

      if (editingTask) {
        await updateTask(editingTask.taskId, taskData);
      } else {
        await createTask(taskData);
      }

      Alert.alert('Success', editingTask ? 'Task updated!' : 'Task created!');
      resetForm();
      onTaskSaved();
      onClose();
    } catch (err) {
      Alert.alert('Error', 'Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
      setSelectedCategory(editingTask.category);
      setSelectedPriority(editingTask.priority?? "Low");
      setDueDate(editingTask.dueTime || "");
      setSelectedEmoji(editingTask.tag || "💼");
    } else {
      resetForm();
    }
  }, [editingTask, visible]);
  return (
    <Popup
      visible={visible}
      onClose={handleClose}
      onSubmit={handleSave}
      title={editingTask ? 'Edit Task' : 'Add New Task'}
      submitButtonText={editingTask ? 'Update Task' : 'Create Task'}
      cancelButtonText="Cancel"
      loading={loading}
    >
      {/* Task Title */}
      <View style={styles.section}>
        <Text style={styles.label}>
          Task Title <Text style={styles.required}>*</Text>
        </Text>
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
        <Text style={styles.label}>
          Category <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.optionsRow}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.radioOption,
                selectedCategory === cat && styles.radioOptionActive,
              ]}
              onPress={() => setSelectedCategory(cat as typeof selectedCategory)}
              disabled={loading}
            >
              <View
                style={[
                  styles.radio,
                  selectedCategory === cat && styles.radioActive,
                ]}
              >
                {selectedCategory === cat && <View style={styles.radioDot} />}
              </View>
              <Text style={styles.optionText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Priority */}
      <View style={styles.section}>
        <Text style={styles.label}>
          Priority <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.priorityRow}>
          {PRIORITIES.map((pri) => (
            <TouchableOpacity
              key={pri}
              style={[
                styles.priorityButton,
                selectedPriority === pri && styles.priorityButtonActive,
              ]}
              onPress={() => setSelectedPriority(pri as typeof selectedPriority)}
              disabled={loading}
            >
              <View
                style={[
                  styles.priorityDot,
                  selectedPriority === pri && styles.priorityDotActive,
                ]}
              />
              <Text
                style={[
                  styles.priorityText,
                  selectedPriority === pri && styles.priorityTextActive,
                ]}
              >
                {pri}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Due Date */}
      <View style={styles.section}>
        <Text style={styles.label}>Due Date</Text>
        <TouchableOpacity style={styles.dateButton}>
          <Text style={styles.dateButtonIcon}>📅</Text>
          <TextInput
            style={styles.dateInput}
            placeholder="DD MMM YYYY"
            placeholderTextColor="#8b899e"
            value={dueDate}
            onChangeText={setDueDate}
            editable={!loading}
          />
        </TouchableOpacity>
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

      {/* Emoji Selection */}
      <View style={styles.section}>
        <Text style={styles.label}>Emoji / Icon</Text>
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
              <Text style={styles.emojiText}>{emoji}</Text>
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
    </Popup>
  );
}
