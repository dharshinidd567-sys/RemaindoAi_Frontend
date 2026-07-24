import { StyleSheet, Platform } from 'react-native';
export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
  },

  addButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  addButtonText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    marginTop: -2,
  },
});
export default styles;