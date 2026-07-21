import React, { ReactNode, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Swipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import { SharedValue } from 'react-native-reanimated';
import { listRowStyles as s, COLORS } from './list_items_styles';
import { Pencil, Trash2 } from "lucide-react-native";
type LeftAccessory = 'checkbox' | 'dot' | 'icon' | 'none';

export type ListRowProps = {
  id: string;
  title: string;
  subtitle?: string;

  // Whether this row is "done" — drives strikethrough + default checkbox state.
  done?: boolean;

  // What to show on the left. Defaults to 'checkbox'.
  //  - 'checkbox' -> tappable circle, filled + checkmark when done
  //  - 'dot'      -> plain colored dot, no tap target (good for reminders/events)
  //  - 'icon'     -> emoji/icon instead of a checkbox (e.g. grocery items)
  //  - 'none'     -> nothing on the left, text starts at the edge
  leftAccessory?: LeftAccessory;

  // Icon/emoji to render when leftAccessory === 'icon' (e.g. "🥛").
  icon?: string;

  // Task-level emoji/tag (e.g. item.tag). Independent of leftAccessory —
  // shows as its own small badge next to the checkbox, doesn't replace it.
  emoji?: string;

  // Color for the checkbox fill/ring or the dot. Defaults to teal.
  // This is the "customise if you want, otherwise default" color knob.
  // Also used for the card's left border strip when provided.
  accentColor?: string;

  // Whether the title gets struck through when done. Default true.
  strikeWhenDone?: boolean;

  onToggle?: (id: string) => void;

  // Right side content. rightNode takes priority over rightText if both given.
  // rightText covers the common cases (time, price) as a simple string.
  // rightNode lets you pass something custom (e.g. avatar initials, a link).
  rightText?: string;
  rightTextStrikethrough?: boolean; // e.g. struck-through price once bought/done
  rightNode?: ReactNode;

  // onPress on the text column = "edit". Tapping the title/subtitle opens edit.
  onPress?: () => void;

  // Swipe left to reveal a delete action. Fully wired to the Swipeable below.
  onDelete?: (id: string) => void;

  // Set false if you want this row to be non-deletable (e.g. a locked item).
  swipeToDelete?: boolean;
};

export default function ListItem({
  id,
  title,
  subtitle,
  done = false,
  leftAccessory = 'checkbox',
  icon,
  emoji,
  accentColor = COLORS.defaultAccent,
  strikeWhenDone = true,
  onToggle,
  rightText,
  rightTextStrikethrough = false,
  rightNode,
  onPress,
  onDelete,
  swipeToDelete = true,
}: ListRowProps) {
  const swipeableRef = useRef<SwipeableMethods>(null);
  const titleStyle = [s.title, done && strikeWhenDone && s.titleDone];

  const renderLeft = () => {
    if (leftAccessory === "none") return null;

    if (leftAccessory === "dot") {
      return (
        <View style={s.leftSlot}>
          <View
            style={[
              s.dot,
              {
                backgroundColor: accentColor,
              },
            ]}
          />
        </View>
      );
    }

    if (leftAccessory === "icon") {
      return (
        <View style={s.leftSlot}>
          <Text style={s.icon}>{icon}</Text>
        </View>
      );
    }

    return (
      <View style={s.leftSlot}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onToggle?.(id)}
          style={[
            s.checkbox,
            done && {
              backgroundColor: `${accentColor}26`,
              borderColor: accentColor,
            },
          ]}
        >
          {done && (
            <Text
              style={[
                s.checkmark,
                {
                  color: accentColor,
                },
              ]}
            >
              ✓
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  // Small rounded badge for the task's emoji/tag. Sits between the
  // checkbox/dot/icon slot and the text column. Doesn't render at all
  // if no emoji was passed, so rows without a tag look unchanged.
  const renderEmojiBadge = () => {
    if (!emoji) return null;

    return (
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          backgroundColor: 'rgba(255,255,255,0.06)',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 8,
        }}
      >
        <Text style={{ fontSize: 16 }}>{emoji}</Text>
      </View>
    );
  };

  const renderCard = () => (
    <View
      style={[
        s.card,
        done && s.cardDone,
        // Left border colour strip driven by accentColor (e.g. item.color).
        // borderRadius reset to 0 so a single-side border doesn't look clipped.
        !!accentColor && {
          borderLeftWidth: 4,
          borderLeftColor: accentColor,
        },
      ]}
    >
      {renderLeft()}
      {renderEmojiBadge()}

      <TouchableOpacity
        style={s.textCol}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <Text style={titleStyle} numberOfLines={1}>
          {title}
        </Text>

        {!!subtitle && (
          <Text style={s.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </TouchableOpacity>

      <View style={s.rightSlot}>
        {rightNode ? (
          rightNode
        ) : (
          <Text
            style={[
              s.rightText,
              rightTextStrikethrough && s.rightTextStrikethrough,
            ]}
          >
            {rightText}
          </Text>
        )}
      </View>
    </View>
  );

  if (!swipeToDelete || !onDelete) {
    return renderCard();
  }

  // Two actions revealed on left swipe: Edit then Delete, each its own
  // rounded pill with breathing room between them and the card.
  const renderRightActions = (
    _progress: SharedValue<number>,
    _translation: SharedValue<number>
  ) => (
    <View style={s.swipeActionsRow}>
      <TouchableOpacity
        style={s.editAction}
        activeOpacity={0.85}
        onPress={() => {
          swipeableRef.current?.close();
          onPress?.();
        }}
      >
        <Pencil size={20} color="#fff" />
        <Text style={s.actionText}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={s.deleteAction}
        activeOpacity={0.85}
        onPress={() => {
          swipeableRef.current?.close();
          onDelete(id);
        }}
      >
        <Trash2 size={20} color="#fff" />
        <Text style={s.actionText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      overshootRight={false}
      rightThreshold={24}
      friction={1.5}
    >
      {renderCard()}
    </Swipeable>
  );
}