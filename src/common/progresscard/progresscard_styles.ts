
import { StyleSheet } from 'react-native';

export const COLORS = {
  cardBg: '#1a1830',
  cardBorder: '#2b2745',
  ringTrack: '#2f2b4d',
  ringActive: '#7c5cff',
  textPrimary: '#ffffff',
  textSecondary: '#9997ab',
  pendingBg: 'rgba(29, 158, 117, 0.18)',
  pendingText: '#5dcaa5',
  overdueBg: 'rgba(83, 74, 183, 0.35)',
  overdueText: '#b9a6ff',
};

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 16,
    gap: 16,
  },
  ringWrap: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentText: {
    position: 'absolute',
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  infoWrap: {
    flex: 1,
  },
  doneText: {
    color: COLORS.textPrimary,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 2,
  },
  subText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginBottom: 10,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 8,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pillPending: {
    backgroundColor: COLORS.pendingBg,
  },
  pillOverdue: {
    backgroundColor: COLORS.overdueBg,
  },
  pillTextPending: {
    color: COLORS.pendingText,
    fontSize: 11,
    fontWeight: '600',
  },
  pillTextOverdue: {
    color: COLORS.overdueText,
    fontSize: 11,
    fontWeight: '600',
  },
});