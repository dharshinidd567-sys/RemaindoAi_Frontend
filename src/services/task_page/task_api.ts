import { Category, Task, TasksResponse } from '../../screens/home/task_page/task_screen_types';

// Point this at your machine's LAN IP when testing on a physical device —
// 'localhost' won't resolve to your dev machine from a real phone.
// e.g. 'http://192.168.1.42:5000/api/v1'
const BASE_URL = 'http://10.91.121.224:5000/api/v1';

export async function fetchTasks(category: Category): Promise<TasksResponse> {
  const query = category !== 'All' ? `?category=${category}` : '';
  const res = await fetch(`${BASE_URL}/get_alltask/${query}`);
  if (!res.ok) throw new Error('Failed to load tasks');
  return res.json();
}

export async function fetchTaskById(id: string): Promise<Task> {
  const res = await fetch(`${BASE_URL}/get_task/${id}`);
  if (!res.ok) throw new Error('Failed to load task');
  return res.json();
}

export async function toggleTask(id: string): Promise<Task> {
  const res = await fetch(`${BASE_URL}/toggle_task/${id}`, { method: 'PATCH' });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
}

export async function createTask(payload: Partial<Task>): Promise<Task> {
     console.log("Sending Payload:", payload);
  const res = await fetch(`${BASE_URL}/create_task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.text();

  console.log("Status:", res.status);
  console.log("Response:", data);

  if (!res.ok) {
    throw new Error(data);
  }
  return JSON.parse(data);
}

export async function updateTask(id: string, payload: Partial<Task>): Promise<Task> {
  const res = await fetch(`${BASE_URL}/update_task/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/delete_task/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete task');
}