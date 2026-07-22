import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0a14',
    paddingHorizontal: 20,
    paddingTop: 45,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '700',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 90,
  },
  iconWrap: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#162720',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  emptyText: {
    color: '#8b899e',
    fontSize: 13,
    marginTop: 6,
  },
});
