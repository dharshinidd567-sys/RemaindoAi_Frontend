import React from 'react';
import NotesScreen from '../screens/home/notes_page/notes_screen';
import TaskScreen from '../screens/home/task_page/task_screen';
import SimpleScreen from '../screens/shared/simple_screen';
import Dashboard from '../screens/home/dashboard/dashboard';

export type MainTabKey = 'home' | 'calendar' | 'analytics' | 'profile';

export type AppRouteKey =
  | 'home.dashboard'
  | 'home.tasks'
  | 'home.notes'
  | 'calendar.index'
  | 'analytics.index'
  | 'profile.index';

export interface AppRoute {
  key: AppRouteKey;
  tab: MainTabKey;
  title: string;
  render: (navigate: NavigateToRoute) => React.ReactElement;
}

export type NavigateToRoute = (route: AppRouteKey) => void;

export const DEFAULT_ROUTE: AppRouteKey = 'home.dashboard';

export const TAB_DEFAULT_ROUTES: Record<MainTabKey, AppRouteKey> = {
  home: 'home.dashboard',
  calendar: 'calendar.index',
  analytics: 'analytics.index',
  profile: 'profile.index',
};

export const APP_ROUTES: Record<AppRouteKey, AppRoute> = {
  'home.dashboard': {
    key: 'home.dashboard',
    tab: 'home',
    title: 'Dashboard',
    render: (navigate) => (
      <Dashboard
        onTaskPress={() => navigate('home.tasks')}
        onNotesPress={() => navigate('home.notes')}
      />
    ),
  },
  'home.tasks': {
    key: 'home.tasks',
    tab: 'home',
    title: 'My Tasks',
    render: () => <TaskScreen />,
  },
  'home.notes': {
    key: 'home.notes',
    tab: 'home',
    title: 'My Notes',
    render: () => <NotesScreen />,
  },
  'calendar.index': {
    key: 'calendar.index',
    tab: 'calendar',
    title: 'Calendar',
    render: () => <SimpleScreen title="Calendar" />,
  },
  'analytics.index': {
    key: 'analytics.index',
    tab: 'analytics',
    title: 'Analytics',
    render: () => <SimpleScreen title="Analytics" />,
  },
  'profile.index': {
    key: 'profile.index',
    tab: 'profile',
    title: 'Profile',
    render: () => <SimpleScreen title="Profile" />,
  },
};
