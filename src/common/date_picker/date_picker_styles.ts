import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e8e6f0',
    marginBottom: 6,
  },
  required: {
    color: '#e8534c',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#211f2e',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3a374a',
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
  },
  dateButtonDisabled: {
    opacity: 0.5,
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
  dateText: {
    flex: 1,
    fontSize: 15,
    color: '#ffffff',
  },
  placeholderText: {
    color: '#8b899e',
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: '#e8534c',
  },
  doneButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#7c5cff',
  },
  doneButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 13,
  },
});