import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './simple_screen_styles';

interface SimpleScreenProps {
  title: string;
}

export default function SimpleScreen({ title }: SimpleScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
