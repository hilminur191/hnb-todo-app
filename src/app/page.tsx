"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import TaskInput from "@/components/TaskInput";
import TaskList from "@/components/TaskList";
import { Button } from "@/components/ui/button";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type Filter = "all" | "completed" | "active";
type SortBy = "newest" | "oldest" | "completed";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [sortBy, setSortBy] = useState<SortBy>("newest");

  // 🔹 Load data dari LocalStorage saat pertama kali render
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // 🔹 Simpan ke LocalStorage setiap kali tasks berubah
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const handleToggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id: number, newText: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  // Filtering
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  // Sorting
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "newest") return b.id - a.id;
    if (sortBy === "oldest") return a.id - b.id;
    if (sortBy === "completed")
      return Number(b.completed) - Number(a.completed);
    return 0;
  });

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Header />
      <div className="max-w-md mx-auto p-4">
        <TaskInput onAdd={handleAddTask} />

        {/* Filter Tabs */}
        <div className="flex justify-center gap-3 mt-4 text-sm">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            Semua
          </Button>
          <Button
            variant={filter === "active" ? "default" : "outline"}
            onClick={() => setFilter("active")}
          >
            Belum
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            onClick={() => setFilter("completed")}
          >
            Selesai
          </Button>
        </div>

        {/* Dropdown Sort */}
        <div className="flex justify-end mt-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="p-2 rounded border border-gray-300 dark:bg-gray-800"
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="completed">Selesai duluan</option>
          </select>
        </div>

        <div>
          <p className="text-sm text-gray-500 mt-2">
            Total: {tasks.length} | Belum selesai:{" "}
            {tasks.filter((t) => !t.completed).length}
          </p>
        </div>

        {/* Tasklist pakai sortedTasks */}
        <TaskList
          tasks={sortedTasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      </div>
    </main>
  );
}
