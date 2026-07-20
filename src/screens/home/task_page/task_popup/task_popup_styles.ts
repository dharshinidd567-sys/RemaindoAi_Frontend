import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#b9a6ff',
    marginBottom: 10,
  },
  required: {
    color: '#ff5fa2',
  },
  reminderIcon: {
    marginLeft: 8,
  },
  input: {
    backgroundColor: '#232037',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3a3650',
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 14,
  },
  textArea: {
    textAlignVertical: 'top',
    paddingTop: 12,
  },

  /* Category */
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#232037',
    marginRight: 8,
    marginBottom: 8,
  },
  radioOptionActive: {
    backgroundColor: 'rgba(124, 92, 255, 0.2)',
    borderWidth: 1,
    borderColor: '#7c5cff',
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#8b899e',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: {
    borderColor: '#7c5cff',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7c5cff',
  },
  optionText: {
    fontSize: 13,
    color: '#b9a6ff',
  },

  /* Priority */
  priorityRow: {
    flexDirection: 'row',
    gap: 10,
  },
  priorityButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#232037',
    borderWidth: 1,
    borderColor: '#3a3650',
  },
  priorityButtonActive: {
    backgroundColor: '#7c5cff',
    borderColor: '#7c5cff',
  },
  priorityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8b899e',
    marginRight: 6,
  },
  priorityDotActive: {
    backgroundColor: '#fff',
  },
  priorityText: {
    fontSize: 13,
    color: '#8b899e',
    fontWeight: '600',
  },
  priorityTextActive: {
    color: '#fff',
  },

  /* Date */
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#232037',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3a3650',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  dateButtonIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  dateInput: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },

  /* Checkbox */
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#8b899e',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#7c5cff',
    borderColor: '#7c5cff',
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 13,
    color: '#b9a6ff',
  },

  /* Color Selection */
  colorRow: {
    flexDirection: 'row',
    gap: 12,
  },
  colorOption: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  colorOptionActive: {
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  colorCheckmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  /* Emoji Selection */
  emojiRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  emojiOption: {
    width: '22%',
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: '#232037',
    borderWidth: 2,
    borderColor: '#3a3650',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiOptionActive: {
    backgroundColor: '#7c5cff',
    borderColor: '#7c5cff',
  },
  emojiText: {
    fontSize: 24,
  },
});
