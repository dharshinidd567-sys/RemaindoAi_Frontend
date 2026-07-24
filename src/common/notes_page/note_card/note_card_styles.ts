import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#171539",
    borderWidth: 1,
    borderColor: "#47337D",
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  pinnedBadge: {
    backgroundColor: "#463E8A",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },

  badgeText: {
    color: "#D9D4FF",
    fontSize: 12,
    fontWeight: "600",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },

  description: {
    color: "#A8A6C0",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 18,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  date: {
    color: "#8A89A3",
    fontSize: 13,
  },

  categoryBadge: {
    backgroundColor: "#4736A6",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 18,
  },

  categoryText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
});