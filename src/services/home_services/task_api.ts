import { apiRequest } from "../api";
import {
  Category,
  Task,
  TasksResponse,
} from "../../screens/home/task_page/task_screen_types";

// GET ALL TASKS
export const fetchTasks = (category: Category) => {
  const query =
    category !== "All"
      ? `?category=${category}`
      : "";

  return apiRequest<TasksResponse>(
    `/task/get_alltask${query}`
  );
};

// GET SINGLE TASK
export const fetchTaskById = (id: string) =>
  apiRequest<Task>(`/task/get_task/${id}`);

// CREATE
export const createTask = (
  payload: Partial<Task>
) =>
  apiRequest<Task>("/task/create_task", {
    method: "POST",
    body: JSON.stringify(payload),
  });

// UPDATE
export const updateTask = async (id: string, payload: any) => {
  
  return apiRequest(`/task/update_task/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};

// DELETE
export const deleteTask = (id: string) =>
  apiRequest<void>(`/task/delete_task/${id}`, {
    method: "PUT",
  });

// TOGGLE
export const toggleTask = (id: string) =>
  apiRequest<Task>(`/task/toggle_task/${id}`, {
    method: "PATCH",
  });