import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { styles } from './time_picker_styles';

// Exported so screens/forms can format a Date the same way this component
// displays it (e.g. when building an API payload string).
export function formatTime(date: Date): string {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;
  return `${String(hours).padStart(2, '0')}:${minutes} ${period}`;
}

interface TimePickerProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  minuteInterval?: 1 | 5 | 10 | 15 | 20 | 30;
}

export default function TimePicker({
  label,
  value,
  onChange,
  placeholder = 'hh:mm AM/PM',
  disabled = false,
  required = false,
  error,
  minuteInterval = 5,
}: TimePickerProps) {
  const [show, setShow] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    // Android closes the native dialog itself and reports 'dismissed' on cancel.
    if (Platform.OS === 'android') {
      setShow(false);
    }
    if (event.type === 'dismissed') {
      return;
    }
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}

      <TouchableOpacity
        style={[styles.timeButton, disabled && styles.timeButtonDisabled]}
        activeOpacity={0.7}
        onPress={() => !disabled && setShow(true)}
        disabled={disabled}
      >
        <Text style={styles.icon}>⏰</Text>
        <Text style={[styles.timeText, !value && styles.placeholderText]}>
          {value ? formatTime(value) : placeholder}
        </Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {show && (
        <DateTimePicker
          value={value ?? new Date()}
          mode="time"
          is24Hour={false}
          minuteInterval={minuteInterval}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
        />
      )}

      {Platform.OS === 'ios' && show && (
        <TouchableOpacity style={styles.doneButton} onPress={() => setShow(false)}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}