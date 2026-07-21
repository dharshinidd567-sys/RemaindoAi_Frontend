import { StyleSheet } from "react-native";

export const COLORS = {
  cardBg: "#151328",
  cardBorder: "#272241",

  checkboxOff: "#3D365D",
  defaultAccent: "#2DD4A8",
  checkboxOnBg: "rgba(45,212,168,0.15)",

  titleActive: "#FFFFFF",
  titleDone: "#75718C",

  subtitleText: "#9B97B8",

  rightText: "#FFFFFF",

  deleteBg: "#E24B4A",
};

export const listRowStyles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: 18,
    marginBottom: 14,
  },

  cardDone: {
    opacity: 0.8,
  },

  /* ---------------- LEFT ---------------- */

  leftSlot: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
  },

  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,

    borderWidth: 2,
    borderColor: COLORS.checkboxOff,

    alignItems: "center",
    justifyContent: "center",
  },

  checkmark: {
    fontSize: 15,
    fontWeight: "700",
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  icon: {
    fontSize: 22,
  },

  /* ---------------- CENTER ---------------- */

  textCol: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    color: COLORS.titleActive,
    fontSize: 17,
    fontWeight: "700",
  },

  titleDone: {
    color: COLORS.titleDone,
    textDecorationLine: "line-through",
  },

  subtitle: {
    marginTop: 5,

    color: COLORS.subtitleText,
    fontSize: 13,
    fontWeight: "500",
  },

  /* ---------------- RIGHT ---------------- */

  rightSlot: {
    width: 75,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  rightText: {
    color: COLORS.rightText,
    fontSize: 14,
    fontWeight: "700",
  },

  rightTextStrikethrough: {
    textDecorationLine: "line-through",
  },

  /* ---------------- ACTIONS ---------------- */

  actionsCol: {
    flexDirection: "row",
    marginLeft: 10,
  },

  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,

    alignItems: "center",
    justifyContent: "center",

    marginLeft: 6,
  },

  /* ---------------- SWIPE ACTIONS ---------------- */

  swipeActionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingLeft: 8,
    marginBottom: 14, // matches card's marginBottom so it lines up while swiping
  },

  editAction: {
    width: 68,
    height: "100%",
    backgroundColor: COLORS.defaultAccent,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },

  deleteAction: {
    width: 68,
    height: "100%",
    backgroundColor: COLORS.deleteBg,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },

  actionIcon: {
    fontSize: 16,
    color: "#FFFFFF",
  },

  actionText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
});