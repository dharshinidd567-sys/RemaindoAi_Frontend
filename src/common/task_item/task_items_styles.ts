import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#211f36',
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: '#3a3650',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: '#3fb897',
    borderColor: '#3fb897',
  },
  checkmark: {
    color: '#0e2a22',
    fontSize: 13,
    fontWeight: '700',
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  titleDone: {
    color: '#6b697d',
    textDecorationLine: 'line-through',
  },
  subtitle: {
    color: '#8b899e',
    fontSize: 12,
  },
  timeWrap: {
    alignItems: 'flex-end',
  },
  timeText: {
    color: '#9997ab',
    fontSize: 12,
    fontWeight: '500',
  },
  lateText: {
    color: '#e8a13c',
    fontSize: 12,
    fontWeight: '600',
  },
});