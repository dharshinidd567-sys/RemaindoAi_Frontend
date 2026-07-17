import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },

  tab: {
    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 16,
    paddingVertical: 8,

    borderRadius: 18,

    backgroundColor: '#1C1A30',

    borderWidth: 1,
    borderColor: '#2B2745',

    minHeight: 36,
  },

  activeTab: {
    backgroundColor: '#7C5CFF',
    borderColor: '#7C5CFF',
  },

  text: {
    color: '#9997AB',
    fontSize: 13,
    fontWeight: '600',
  },

  activeText: {
    color: '#FFFFFF',
  },
});