import React, { useState, useEffect } from 'react';
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
import DatePicker, { formatDate } from '../../../../common/date_picker/datePicker';
import TimePicker, { formatTime } from '../../../../common/time_picker/timePicker';
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

function convertDateToObject(dateStr: string): Date {
  const [day, month, year] = dateStr.split(" ");

  const months: Record<string, number> = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  return new Date(Number(year), months[month], Number(day));
}

function convertTimeToDate(time: string): Date {
  const today = new Date();

  const [clock, period] = time.split(" ");
  let [hour, minute] = clock.split(":").map(Number);

  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  today.setHours(hour);
  today.setMinutes(minute);
  today.setSeconds(0);

  return today;
}
// editingTask.dueTime is stored as a plain "DD MMM YYYY" (+ optional time)
// string from the API. This does a best-effort parse back into a Date so
// the pickers can show the existing value when editing a task.
function parseStoredDueTime(value?: string | null): { date: Date | null; time: Date | null } {
  if (!value) return { date: null, time: null };

  const parsed = new Date(value);
  if (!isNaN(parsed.getTime())) {
    return { date: parsed, time: parsed };
  }
  return { date: null, time: null };
}

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
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [dueTime, setDueTime] = useState<Date | null>(null);
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
    setDueDate(null);
    setDueTime(null);
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
      const dueTimeString = [
        dueDate ? formatDate(dueDate) : null,
        dueTime ? formatTime(dueTime) : null,
      ]
        .filter(Boolean)
        .join(' ');

      const taskData: Partial<Task> = {
        title: title.trim(),
        description,
        category: selectedCategory,
        priority: selectedPriority,
        dueDate: dueDate ? formatDate(dueDate) : '',
        dueTime: dueTime ? formatTime(dueTime) : '',
        reminder: selectedReminder ?? '',
        repeat: selectedRepeat,
        color: selectedColor,
        tag: selectedEmoji,
        notes,
      };  

      if (editingTask) {
        await updateTask(editingTask.taskId, taskData);
      } else {
        await createTask(taskData);
      }

      // Alert.alert('Success', editingTask ? 'Task updated!' : 'Task created!');
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
      const { date, time } = parseStoredDueTime(editingTask.dueTime);

      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
      setSelectedCategory(editingTask.category);
      setSelectedPriority(editingTask.priority ?? "Medium");
      setDueDate(
        editingTask.dueDate
          ? convertDateToObject(editingTask.dueDate)
          : null
      );
      setDueTime(
        editingTask.dueTime
          ? convertTimeToDate(editingTask.dueTime)
          : null
      );
      setSelectedReminder(editingTask.reminder || "None");
      setSelectedRepeat(editingTask.repeat || "None");
      setSelectedColor(editingTask.color || "#7c5cff");// or editingTask.color
      setSelectedEmoji(editingTask.tag || "🎯");
      setNotes(editingTask.notes || "");
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
        <DatePicker
          label="Due Date"
          value={dueDate}
          onChange={setDueDate}
          minimumDate={new Date()}
          disabled={loading}
        />
      </View>

      {/* Due Time */}
      <View style={styles.section}>
        <TimePicker
          label="Due Time"
          value={dueTime}
          onChange={setDueTime}
          disabled={loading}
        />
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
    </Popup>
  );
}