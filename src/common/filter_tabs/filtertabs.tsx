import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface CommonFilterTabsProps<T extends string> {
  data: T[];
  active: T;
  onChange: (item: T) => void;

  // Container
  containerStyle?: ViewStyle;
  gap?: number;
  showsHorizontalScrollIndicator?: boolean;

  // Tab
  width?: number;
  height?: number;
  paddingHorizontal?: number;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
  activeBackgroundColor?: string;

  tabStyle?: ViewStyle;
  activeTabStyle?: ViewStyle;

  // Text
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  activeFontWeight?: TextStyle['fontWeight'];

  textColor?: string;
  activeTextColor?: string;

  textStyle?: TextStyle;
  activeTextStyle?: TextStyle;

  activeOpacity?: number;
}

export default function CommonFilterTabs<T extends string>({
  data,
  active,
  onChange,

  containerStyle,
  gap = 12,
  showsHorizontalScrollIndicator = false,

  width,
  height = 36,
  paddingHorizontal = 18,
  borderRadius = 20,
  borderWidth = 1,
  borderColor = '#2E355A',

  backgroundColor = '#1A1F3A',
  activeBackgroundColor = '#5C5CFF',

  tabStyle,
  activeTabStyle,

  fontSize = 14,
  fontWeight = '500',
  activeFontWeight = '600',

  textColor = '#FFFFFF',
  activeTextColor = '#FFFFFF',

  textStyle,
  activeTextStyle,

  activeOpacity = 0.7,
}: CommonFilterTabsProps<T>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      contentContainerStyle={[
        {
          gap,
        },
        containerStyle,
      ]}
    >
      {data.map((item) => {
        const isActive = active === item;

        return (
          <TouchableOpacity
            key={item}
            activeOpacity={activeOpacity}
            onPress={() => onChange(item)}
            style={[
              {
                width,
                height,
                paddingHorizontal,
                borderRadius,
                borderWidth,
                borderColor,
                backgroundColor: isActive
                  ? activeBackgroundColor
                  : backgroundColor,
                justifyContent: 'center',
                alignItems: 'center',
              },
              tabStyle,
              isActive && activeTabStyle,
            ]}
          >
            <Text
              style={[
                {
                  color: isActive
                    ? activeTextColor
                    : textColor,
                  fontSize,
                  fontWeight: isActive
                    ? activeFontWeight
                    : fontWeight,
                },
                textStyle,
                isActive && activeTextStyle,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}