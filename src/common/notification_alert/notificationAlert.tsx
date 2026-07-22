import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { styles } from '../task_popup/task_popup_styles';

export type AlertType = 'success' | 'error' | 'info';

interface NotificationAlertProps {
  visible: boolean;
  type?: AlertType;
  title: string;
  message?: string;
  buttonText?: string;
  onClose: () => void;
  autoDismiss?: boolean; // auto close after a few seconds
  autoDismissTime?: number;
}

const ICONS: Record<AlertType, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
};

const COLORS: Record<AlertType, { bg: string; text: string }> = {
  success: { bg: '#e1f5ee', text: '#0f6e56' },
  error: { bg: '#fcebeb', text: '#a32d2d' },
  info: { bg: '#e6f1fb', text: '#185fa5' },
};

export default function NotificationAlert({
  visible,
  type = 'success',
  title,
  message,
  buttonText = 'Done',
  onClose,
  autoDismiss = false,
  autoDismissTime = 2000,
}: NotificationAlertProps) {
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      if (autoDismiss) {
        const timer = setTimeout(onClose, autoDismissTime);
        return () => clearTimeout(timer);
      }
    } else {
      scaleAnim.setValue(0.9);
      opacityAnim.setValue(0);
    }
  }, [visible]);

  const palette = COLORS[type];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.card,
            { opacity: opacityAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <View style={[styles.iconCircle, { backgroundColor: palette.bg }]}>
            <Text style={[styles.iconText, { color: palette.text }]}>
              {ICONS[type]}
            </Text>
          </View>

          <Text style={styles.title}>{title}</Text>
          {message ? <Text style={styles.message}>{message}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}