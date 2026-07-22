import React, { ReactNode, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Swipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { listRowStyles as s } from './list_items_styles';
import { Bell, Pencil, Trash2 } from 'lucide-react-native';
type LeftAccessory = 'checkbox' | 'dot' | 'icon' | 'none';
  
export type Priority = 'high' | 'medium' | 'low';
export type RepeatType = 'daily' | 'weekly' | 'monthly' | 'custom';

// Single source of truth for priority -> color. The left strip and
// checkbox both read from this, so priority always drives the accent
// regardless of any per-task color field.
export const PRIORITY_COLORS: Record<Priority, string> = {
  high: '#713852',   // red
  medium: '#4a295a', // orange
  low: '#503d57',    // grey
};

// Short label shown next to the bell so the repeat frequency is visible
// at a glance without opening the task.
export const REPEAT_LABELS: Record<RepeatType, string> = {
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  custom: 'Custom',
};

// API values sometimes come back as "High", "HIGH", or with stray
// whitespace. Normalize before lookup so a casing mismatch never
// silently falls through to an unstyled default.
function resolveAccentColor(priority?: string): string {
  const key = (priority ?? '').trim().toLowerCase() as Priority;
  return PRIORITY_COLORS[key] ?? PRIORITY_COLORS.low;
}

// Strips a bare 4-digit year out of a date string, e.g.
// "21 Jul 2026" -> "21 Jul". Leaves anything else untouched.
export function formatDateNoYear(dateStr?: string | null): string | null {
  if (!dateStr) return null;
  return dateStr.replace(/\s*\b\d{4}\b/, '').trim();
}

export type ListRowProps = {
  id: string;
  title: string;
  subtitle?: string; // category only, e.g. "Family" — no priority text

  priority?: string;       // 'high' | 'medium' | 'low' (case-insensitive)
  hasReminder?: boolean;   // shows a bell when true
  repeatType?: any;

  done?: boolean;
  leftAccessory?: LeftAccessory;
  icon?: string;
  emoji?: string;
  strikeWhenDone?: boolean;

  onToggle?: (id: string) => void;

  rightText?: string;
  rightTextStrikethrough?: boolean;
  rightNode?: ReactNode;

  onPress?: () => void;
  onDelete?: (id: string) => void;
  swipeToDelete?: boolean;
};

// Circular swipe action button that scales/fades in as swipe progress
// increases, driven by the shared value Reanimated passes in.
function SwipeAction({
  progress,
  color,
  icon,
  label,
  onPress,
}: {
  progress: SharedValue<number>;
  color: string;
  icon: ReactNode;
  label: string;
  onPress: () => void;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [0.6, 1], Extrapolation.CLAMP);
    const opacity = interpolate(progress.value, [0, 0.5, 1], [0, 0.6, 1], Extrapolation.CLAMP);
    return { transform: [{ scale }], opacity };
  });

  return (
    <Animated.View style={[{ alignItems: 'center', marginHorizontal: 6 }, animatedStyle]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: color,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </TouchableOpacity>
      <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>
        {label}
      </Text>
    </Animated.View>
  );
}

export default function ListItem({
  id,
  title,
  subtitle,
  priority,
  hasReminder = false,
  repeatType,
  done = false,
  leftAccessory = 'checkbox',
  icon,
  emoji,
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
  const accentColor = resolveAccentColor(priority);

  const renderLeft = () => {
    if (leftAccessory === 'none') return null;

    if (leftAccessory === 'dot') {
      return (
        <View style={s.leftSlot}>
          <View style={[s.dot, { backgroundColor: accentColor }]} />
        </View>
      );
    }

    if (leftAccessory === 'icon') {
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
          {done && <Text style={[s.checkmark, { color: accentColor }]}>✓</Text>}
        </TouchableOpacity>
      </View>
    );
  };

  // Small rounded badge for the task's emoji/tag. Doesn't render if no
  // emoji was passed, so rows without a tag look unchanged.
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
      {
        borderLeftWidth: 4,
        borderLeftColor: accentColor,
        position: 'relative',
      },
    ]}
  >
    {/* Reminder Bell */}
    {hasReminder && (
      <View
        style={{
          position: 'absolute',
          top: -8,
          right: -1,
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: '#2B2442',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100,
        }}
      >
        <Bell
          size={14}
           color= '#8b899e'
          strokeWidth={2}
        />
      </View>
    )}

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

  const renderRightActions = (progress: SharedValue<number>) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8 }}>
      <SwipeAction
        progress={progress}
        color="rgba(255,255,255,0.08)"
        icon={<Pencil size={18} color="#fff" />}
        label="Edit"
        onPress={() => {
          swipeableRef.current?.close();
          onPress?.();
        }}
      />
      <SwipeAction
        progress={progress}
        color="#E24B4A"
        icon={<Trash2 size={18} color="#fff" />}
        label="Delete"
        onPress={() => {
          swipeableRef.current?.close();
          onDelete(id);
        }}
      />
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