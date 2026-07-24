import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./header_styles";

const COLORS = {
  accent1: "#7B61FF",
  accent2: "#F35BB6",
};

type HeaderWithAddProps = {
  title: string;
  onPress: () => void;
};

const HeaderWithAdd: React.FC<HeaderWithAddProps> = ({
  title,
  onPress,
}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>

      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <LinearGradient
          colors={[COLORS.accent1, COLORS.accent2]}
          start={{ x: 0.3, y: 0.2 }}
          end={{ x: 0.8, y: 0.9 }}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>+</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderWithAdd;