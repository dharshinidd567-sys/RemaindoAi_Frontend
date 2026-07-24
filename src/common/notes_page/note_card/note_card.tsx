import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Pin } from "lucide-react-native";
import { styles } from "./note_card_styles";

export type CardVariant =
  | "work"
  | "journal"
  | "meeting"
  | "learning"
  | "personal"
  | "default";

type NoteCardProps = {
  title: string;
  description: string;
  date: string;
  category: string;
  pinned?: boolean;
  variant?: CardVariant;
  onPress?: () => void;
};

const getCardTheme = (variant: CardVariant) => {
  switch (variant) {
    case "work":
      return {
        card: "#171539",
        border: "#40348F",
        badge: "#5344B9",
      };

    case "journal":
      return {
        card: "#25162D",
        border: "#6C305E",
        badge: "#A54176",
      };

    case "meeting":
      return {
        card: "#111C34",
        border: "#236A7A",
        badge: "#1E94A7",
      };

    case "learning":
      return {
        card: "#1C1B33",
        border: "#5B556E",
        badge: "#B8872E",
      };

    case "personal":
      return {
        card: "#18251D",
        border: "#2F8C57",
        badge: "#2FB86D",
      };

    default:
      return {
        card: "#171539",
        border: "#40348F",
        badge: "#5344B9",
      };
  }
};

export default function NoteCard({
  title,
  description,
  date,
  category,
  pinned = false,
  variant = "default",
  onPress,
}: NoteCardProps) {
  const theme = getCardTheme(variant);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          {pinned && (
            <>
              <Pin
                size={14}
                color="#FF5B9F"
                fill="#FF5B9F"
                style={{ marginRight: 8 }}
              />

              <View
                style={[
                  styles.pinnedBadge,
                  {
                    backgroundColor: theme.badge,
                  },
                ]}
              >
                <Text style={styles.badgeText}>Pinned</Text>
              </View>
            </>
          )}
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.date}>{date}</Text>

        <View
          style={[
            styles.categoryBadge,
            {
              backgroundColor: theme.badge,
            },
          ]}
        >
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}