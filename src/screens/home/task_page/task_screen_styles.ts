import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0a14',
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '700',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#a259ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '600',
    marginTop: -2,
  },
  progressWrap: {
    marginBottom: 18,
  },
  filtersWrap: {
    marginBottom: 8,
  },
  listContent: {
    paddingBottom: 24,
  },
  loader: {
    marginTop: 40,
  },
  errorText: {
    color: '#e8a13c',
    fontSize: 13,
    marginBottom: 8,
  },
  emptyText: {
    color: '#6b697d',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 40,
  },
});