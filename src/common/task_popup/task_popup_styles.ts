import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 10,
  },
  reminderIcon: {
    fontSize: 16,
  },
  input: {
    backgroundColor: '#232037',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#ffffff',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#3a3850',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
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
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    color: '#ffffff',
    fontSize: 14,
  },
  emojiRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  emojiOption: {
    width: '23%',
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#232037',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3a3850',
  },
  emojiOptionActive: {
    borderColor: '#7c5cff',
    backgroundColor: 'rgba(124, 92, 255, 0.2)',
  },
  emoji: {
    fontSize: 24,
  },
  colorRow: {
    flexDirection: 'row',
    gap: 12,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorOptionActive: {
    borderColor: '#ffffff',
  },
  colorCheckmark: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
