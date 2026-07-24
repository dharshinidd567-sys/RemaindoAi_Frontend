import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#b9a6ff",
    marginBottom: 10,
  },
  required: {
    color: "#ff5fa2",
  },
  input: {
    backgroundColor: "#232037",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#3a3650",
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#fff",
    fontSize: 14,
  },
  textArea: {
    minHeight: 110,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#232037",
    borderWidth: 1,
    borderColor: "#3a3650",
    marginBottom: 8,
  },
  optionActive: {
    backgroundColor: "rgba(124, 92, 255, 0.2)",
    borderColor: "#7c5cff",
  },
  optionText: {
    fontSize: 13,
    color: "#b9a6ff",
  },
  optionTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  checkboxOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#8b899e",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxActive: {
    backgroundColor: "#7c5cff",
    borderColor: "#7c5cff",
  },
  checkmark: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  checkboxLabel: {
    fontSize: 13,
    color: "#b9a6ff",
  },
});
