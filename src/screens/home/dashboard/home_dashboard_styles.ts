import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0a14',
    paddingHorizontal: 20,
    paddingTop: 54,
  },
  header: {
    marginBottom: 26,
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: '#8b899e',
    fontSize: 14,
    marginTop: 6,
  },
  actions: {
    flexDirection: 'row',
    gap: 14,
  },
  actionButton: {
    flex: 1,
    minHeight: 150,
    borderRadius: 18,
    backgroundColor: '#171424',
    borderWidth: 1,
    borderColor: '#28243a',
    padding: 16,
    justifyContent: 'center',
  },
  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  actionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  actionSubtitle: {
    color: '#8b899e',
    fontSize: 12,
    marginTop: 5,
  },
});
