import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import { Category, Summary, Task } from '../../../screens/home/task_page/task_screen_types';
import { fetchTasks, toggleTask as toggleTaskApi } from '../../../services/task_page/task_api';

import ProgressCard from '../../../common/progresscard/progresscard';
import FilterTabs from '../../../common/filter_tabs/filtertabs';
import TaskItem from '../../../common/task_item/task_item';
import TaskPopup from './task_form_modal/task_popup';

import { styles } from './task_screen_styles';

export default function TaskScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [summary, setSummary] = useState<Summary>({
    total: 0,
    done: 0,
    pending: 0,
    overdue: 0,
    percent: 0,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const CATEGORIES = [
    'All',
    'Work',
    'Personal',
    'Family',
    'Health',
  ];
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = useCallback(async (category: Category) => {
    try {
      setError(null);
      const data = await fetchTasks(category);
      setTasks(data.tasks);
      setSummary(data.summary);
    } catch (err) {
      setError('Could not load tasks. Check your connection and try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    loadTasks(activeCategory);
  }, [activeCategory, loadTasks]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadTasks(activeCategory);
  };

  const handleToggle = async (taskId: string) => {
    // optimistic update so the checkbox feels instant
    setTasks((prev) =>
      prev.map((t) => (t.taskId === taskId ? { ...t, isDone: !t.isDone } : t))
    );
    try {
      await toggleTaskApi(taskId);
      loadTasks(activeCategory); // resync summary counts (done/pending/overdue)
    } catch (err) {
      setError('Could not update task.');
      loadTasks(activeCategory); // revert on failure
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tasks</Text>
        <TouchableOpacity 
          style={styles.addButton} 
          activeOpacity={0.8}
          onPress={() => {
            setEditingTask(null);
            setModalVisible(true);
          }}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressWrap}>
        <ProgressCard summary={summary} />
      </View>

      <View style={styles.filtersWrap}>
        <FilterTabs
          data={CATEGORIES}
          active={activeCategory}
          onChange={(item) => setActiveCategory(item as Category)}
          gap={10}
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {loading ? (
        <ActivityIndicator style={styles.loader} color="#7c5cff" size="large" />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.taskId}
          renderItem={({ item }) => <TaskItem task={item} onToggle={handleToggle} />}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#7c5cff"
            />
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>No tasks in this category yet.</Text>
          }
        />
      )}

      <TaskPopup
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onTaskSaved={() => loadTasks(activeCategory)}
        editingTask={editingTask}
      />
    </View>
  );
}