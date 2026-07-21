import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Category, Summary, Task } from '../../../screens/home/task_page/task_screen_types';
import { fetchTasks, toggleTask as toggleTaskApi, deleteTask as deleteTaskApi } from '../../../services/api';

import ProgressCard from '../../../common/progresscard/progresscard';
import FilterTabs from '../../../common/filter_tabs/filtertabs';
import TaskPopup from './task_popup/task_popup';
import ListItem, { formatDateNoYear } from '../../../common/list_item/list_item';
import { Bell } from 'lucide-react-native';
import { styles } from './task_screen_styles';
import { COLORS } from '../../../common/footer/footer_styles';

// dueTime is saved by the task popup as a single combined string, e.g.
// "21 Jul 2026 05:30 PM". Split it back into a date part and a time part
// so the list row can show both instead of just one blob of text.
function splitDueDateTime(dueTime?: string | null): { datePart: string | null; timePart: string | null } {
  if (!dueTime) return { datePart: null, timePart: null };

  const timeMatch = dueTime.match(/(\d{1,2}:\d{2}\s?(?:AM|PM))$/i);
  if (!timeMatch) {
    // Only a date (or an unrecognised format) was stored.
    return { datePart: dueTime.trim(), timePart: null };
  }

  const timePart = timeMatch[1];
  const datePart = dueTime.slice(0, timeMatch.index).trim();
  return { datePart: datePart || null, timePart };
}

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

      console.log("API DATA:", data);

      const taskList = data.tasks ?? [];

      console.log("TASK LIST:", taskList);

      setTasks(taskList);
    } catch (err) {
      console.error("LOAD ERROR:", err);
      setError("Could not load tasks.");
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

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setModalVisible(true);
  };

  // Wired to ListItem's onDelete. Optimistically removes the row, then
  // rolls back + reloads if the API call fails.
  const handleDelete = async (taskId: string) => {
    const previousTasks = tasks;
    setTasks((prev) => prev.filter((t) => t.taskId !== taskId));

    try {
      await deleteTaskApi(taskId);
    } catch (err) {
      console.error("DELETE ERROR:", err);
      setError('Could not delete task.');
      setTasks(previousTasks); // rollback
      Alert.alert('Error', 'Failed to delete task. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tasks</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setEditingTask(null);
            setModalVisible(true);
          }}
        >
          <LinearGradient
             colors={[COLORS.accent1, COLORS.accent2]}
            start={{ x: 0.3, y: 0.2 }}
            end={{ x: 0.8, y: 0.9 }}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>+</Text>
          </LinearGradient>
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
            const datePart = formatDateNoYear(item.dueDate);
            const timePart = item.dueTime || null;

            return (
              <View style={styles.cardContainer}>
                {item.reminder && item.reminder !== 'None' && (
                  <View style={styles.bellBadge}>
                    <Bell
                      size={16}
                      color={isOverdue ? '#e8534c' : '#8b899e'}
                      strokeWidth={2}
                    />
                  </View>
                )}

                <ListItem
                  id={item.taskId}
                  title={item.title}
                  subtitle={item.category}
                  priority={item.priority}
                  hasReminder={!!item.reminder}
                  repeatType={item.repeat}
                  done={item.isDone}
                  leftAccessory="checkbox"
                  onToggle={handleToggle}
                  onPress={() => handleEdit(item)}
                  onDelete={handleDelete}
                  rightNode={
                    <View style={{ alignItems: 'flex-end', minWidth: 72 }}>
                      {isOverdue && (
                        <Text
                          style={{
                            color: '#e8534c',
                            fontSize: 12,
                            fontWeight: '700',
                          }}
                        >
                          ⚠ Late
                        </Text>
                      )}

                      {datePart && (
                        <Text
                          style={{
                            color: isOverdue ? '#e8534c' : '#8b899e',
                            fontSize: 11,
                            marginTop: 2,
                          }}
                          numberOfLines={1}
                        >
                          {datePart}
                        </Text>
                      )}

                      {timePart && (
                        <Text
                          style={{
                            color: isOverdue ? '#e8534c' : '#e8e6f0',
                            fontSize: 12,
                            fontWeight: '600',
                            marginTop: 2,
                          }}
                          numberOfLines={1}
                        >
                          {timePart}
                        </Text>
                      )}
                    </View>
                  }
                />
              </View>
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
        onClose={() => {
          setModalVisible(false);
          setEditingTask(null);
        }}
        onTaskSaved={() => loadTasks(activeCategory)}
        editingTask={editingTask}
      />
    </View>
  );
}