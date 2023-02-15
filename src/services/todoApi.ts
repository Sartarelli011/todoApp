import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
});

export async function getTask() {
  return api.get("/api");
}
export async function addTask(task: {}) {
  try {
    const response = await api.post("/api", task);
    return console.log(response);
  } catch (error) {
    return console.log(error);
  }
}
export async function updateTask(id: string, task: {}) {
  try {
    const response = await api.put("/api" + "/" + id, task);
    return console.log(response);
  } catch (error) {
    return console.log(error);
  }
}
export function deleteTask(id: string) {
  return api.delete("/api" + "/" + id);
}
