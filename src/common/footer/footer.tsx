import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

import { styles, COLORS } from './footer_styles';
import { FooterProps, IconProps, NavItemProps, TabConfig, TabKey } from './footer_types';

const HomeIcon: React.FC<IconProps> = ({ color }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 11.5 12 4l9 7.5" />
    <Path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
  </Svg>
);

const TaskIcon: React.FC<IconProps> = ({ color }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9 11l3 3L22 4" />
    <Path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </Svg>
);

const CalendarIcon: React.FC<IconProps> = ({ color }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Rect x={3.5} y={5} width={17} height={16} rx={2.5} />
    <Path d="M8 3v4M16 3v4M3.5 9.5h17" />
  </Svg>
);

const AnalyticsIcon: React.FC<IconProps> = ({ color }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 20V10M11 20V4M18 20v-7" />
  </Svg>
);

const ProfileIcon: React.FC<IconProps> = ({ color }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx={12} cy={8} r={3.5} />
    <Path d="M4.5 20c1.4-4 4-6 7.5-6s6.1 2 7.5 6" />
  </Svg>
);

const BotIcon: React.FC = () => (
  <Svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <Rect x={4} y={8} width={16} height={11} rx={4} />
    <Path d="M12 8V4" />
    <Circle cx={12} cy={3.2} r={1} fill="#fff" stroke="none" />
    <Circle cx={9} cy={13.2} r={1.4} fill="#fff" stroke="none" />
    <Circle cx={15} cy={13.2} r={1.4} fill="#fff" stroke="none" />
    <Path d="M2.5 12v3M21.5 12v3" />
  </Svg>
);

const TABS: TabConfig[] = [
  { key: 'home', label: 'Home', Icon: HomeIcon },
  { key: 'calendar', label: 'Calendar', Icon: CalendarIcon },
  { key: 'analytics', label: 'Analytics', Icon: AnalyticsIcon },
  { key: 'profile', label: 'Profile', Icon: ProfileIcon },
];

const NavItem: React.FC<NavItemProps> = ({ label, Icon, isActive, onPress }) => {
  const color = isActive ? COLORS.active : COLORS.inactive;

  return (
    <TouchableOpacity style={styles.navItem} onPress={onPress} activeOpacity={0.7}>
      {isActive ? (
        <LinearGradient
          colors={['rgba(255,95,162,0.35)', 'rgba(124,92,255,0.35)']}
          start={{ x: 0.3, y: 0.2 }}
          end={{ x: 0.8, y: 0.9 }}
          style={[styles.iconCircle, styles.iconCircleGlow]}
        >
          <Icon color={color} />
        </LinearGradient>
      ) : (
        <View style={styles.iconCircle}>
          <Icon color={color} />
        </View>
      )}
      <Text style={[styles.label, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const Footer: React.FC<FooterProps> = ({ onTabPress, onFabPress, onTaskPress, initialActive = 'home' }) => {
  const [active, setActive] = useState<TabKey>(initialActive);

  const handlePress = (key: TabKey) => {
    setActive(key);
    onTabPress?.(key);
  };

  const leftTabs = TABS.slice(0, 2);
  const rightTabs = TABS.slice(2);

  return (
    <View style={styles.navbarContainer}>
      <View style={styles.navbar}>
        {leftTabs.map(({ key, label, Icon }) => (
          <NavItem
            key={key}
            label={label}
            Icon={Icon}
            isActive={active === key}
            onPress={() => handlePress(key)}
          />
        ))}

        <View style={[styles.fabWrap, { marginBottom: active === 'home' ? 75 : 75 }]}>
          <TouchableOpacity activeOpacity={0.95} onPress={onFabPress} style={styles.fabShadow}>
            <LinearGradient
              colors={[COLORS.accent1, COLORS.accent2]}
              start={{ x: 0.3, y: 0.2 }}
              end={{ x: 0.8, y: 0.9 }}
              style={styles.fab}
            >
              <BotIcon />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {rightTabs.map(({ key, label, Icon }) => (
          <NavItem
            key={key}
            label={label}
            Icon={Icon}
            isActive={active === key}
            onPress={() => handlePress(key)}
          />
        ))}
      </View>

      {active === 'home' && (
        <View style={styles.taskIconWrapper}>
          <TouchableOpacity 
            style={styles.taskIconButton}
            onPress={onTaskPress}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['rgba(255,95,162,0.3)', 'rgba(124,92,255,0.3)']}
              start={{ x: 0.3, y: 0.2 }}
              end={{ x: 0.8, y: 0.9 }}
              style={styles.taskIconCircle}
            >
              <TaskIcon color={COLORS.active} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Footer;