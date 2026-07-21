import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { styles } from './date_picker_styles';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

// Exported so screens/forms can format a Date the same way this component
// displays it (e.g. when building an API payload string).
export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = MONTHS[date.getMonth()];
  return `${day} ${month} ${date.getFullYear()}`;
}

interface DatePickerProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

export default function DatePicker({
  label,
  value,
  onChange,
  placeholder = 'DD MMM YYYY',
  minimumDate,
  maximumDate,
  disabled = false,
  required = false,
  error,
}: DatePickerProps) {
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
        style={[styles.dateButton, disabled && styles.dateButtonDisabled]}
        activeOpacity={0.7}
        onPress={() => !disabled && setShow(true)}
        disabled={disabled}
      >
        <Text style={styles.icon}>📅</Text>
        <Text style={[styles.dateText, !value && styles.placeholderText]}>
          {value ? formatDate(value) : placeholder}
        </Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {show && (
        <DateTimePicker
          value={value ?? new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
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