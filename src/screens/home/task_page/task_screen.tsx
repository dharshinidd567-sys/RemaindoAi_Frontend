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
import ListRow from '../../../common/list_item/list_item';
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
  const CATEGORIES = ['All', 'Work', 'Personal', 'Family', 'Health'];
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = useCallback(async (category: Category) => {
    try {
      setError(null);
      const data = await fetchTasks(category);
      const taskList = data.tasks ?? [];
      setTasks(taskList);
    } catch (err) {
      console.error(err);
      setError('Could not load tasks.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Client-side safety net: filters what's shown by the active tab even if
  // the API doesn't already filter by category server-side.
  const visibleTasks =
    activeCategory === 'All'
      ? tasks
      : tasks.filter((t) => t.category === activeCategory);

  useEffect(() => {
    const done = visibleTasks.filter((t) => t.isDone).length;
    const pending = visibleTasks.length - done;
    const overdue = visibleTasks.filter((t) => t.isOverdue).length;

    setSummary({
      total: visibleTasks.length,
      done,
      pending,
      overdue,
      percent: visibleTasks.length === 0 ? 0 : Math.round((done / visibleTasks.length) * 100),
    });
  }, [tasks, activeCategory]);

  useEffect(() => {
    setLoading(true);
    loadTasks(activeCategory);
  }, [activeCategory, loadTasks]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadTasks(activeCategory);
  };

  const handleToggle = async (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.taskId === taskId ? { ...t, isDone: !t.isDone } : t))
    );
    try {
      await toggleTaskApi(taskId);
      loadTasks(activeCategory);
    } catch (err) {
      setError('Could not update task.');
      loadTasks(activeCategory);
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
        <ActivityIndicator style={styles.loader} color="#a259ff" size="large" />
      ) : (
        <FlatList
          data={visibleTasks}
          keyExtractor={(item) => item.taskId}
          renderItem={({ item }) => {
            const isOverdue = !item.isDone && item.isOverdue;
            // Task time — adjust this field name to whatever your Task type
            // actually calls it (e.g. dueTime, scheduledAt, time).
            const timeLabel = (item as any).time ?? (item as any).dueTime ?? null;

            return (
              <ListRow
                id={item.taskId}
                title={item.title}
                subtitle={`${item.category} · ${item.priority}`}
                done={item.isDone}
                onToggle={handleToggle}
                rightNode={
                  isOverdue ? (
                    <Text style={{ color: '#e8534c', fontSize: 12, fontWeight: '700' }}>
                      ⚠ Late
                    </Text>
                  ) : undefined
                }
                rightText={!isOverdue ? timeLabel : undefined}
              />
            );
          }}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#a259ff"
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