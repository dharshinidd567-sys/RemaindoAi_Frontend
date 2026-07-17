export type TabKey = 'home' | 'calendar' | 'analytics' | 'profile';

export interface IconProps {
  color: string;
}

export interface TabConfig {
  key: TabKey;
  label: string;
  Icon: React.FC<IconProps>;
}

export interface FooterProps {
  onTabPress?: (key: TabKey) => void;
  onFabPress?: () => void;
  onTaskPress?: () => void;
  initialActive?: TabKey;
}

export interface NavItemProps {
  label: string;
  Icon: React.FC<IconProps>;
  isActive: boolean;
  onPress: () => void;
}