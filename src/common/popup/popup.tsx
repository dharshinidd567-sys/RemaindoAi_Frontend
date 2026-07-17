import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import { styles } from '../popup/popup_styles';

interface PopupProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  children: React.ReactNode;
  cancelButtonText?: string;
  submitButtonText?: string;
  loading?: boolean;
  showHeader?: boolean;
  height?: number;
}

export default function Popup({
  visible,
  onClose,
  onSubmit,
  title,
  children,
  cancelButtonText = 'Cancel',
  submitButtonText = 'Submit',
  loading = false,
  showHeader = true,
  height = 500,
}: PopupProps) {
  const { height: screenHeight } = useWindowDimensions();
  const modalHeight = height;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { height: modalHeight }]}>
          {/* Header */}
          {showHeader && (
            <View style={styles.header}>
              <Text style={styles.headerTitle}>{title}</Text>
              <TouchableOpacity onPress={onClose} disabled={loading}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Form Content */}
          <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
            {children}
            <View style={styles.spacer} />
          </ScrollView>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={styles.cancelButtonText}>{cancelButtonText}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.submitButton, loading && styles.submitButtonDisabled]}
              onPress={onSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>{submitButtonText}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
