"use client";

import { useState } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
}: TaskListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  if (tasks.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400 text-center">
        Belum ada tugas
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          {editingId === task.id ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!editText.trim()) return;
                onEdit(task.id, editText);
                setEditingId(null);
              }}
              className="flex gap-2 flex-1"
            >
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 px-2 py-1 border rounded-md dark:bg-gray-600 dark:text-white"
              />
              <button
                type="submit"
                className="px-2 py-1 bg-green-500 text-white rounded-md"
              >
                Simpan
              </button>
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="px-2 py-1 bg-gray-300 dark:bg-gray-500 rounded-md"
              >
                Batal
              </button>
            </form>
          ) : (
            <>
              {/* ✅ Checkbox */}
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggle(task.id)}
                  className="h-5 w-5 accent-blue-600"
                />
                <span
                  className={`cursor-pointer ${
                    task.completed
                      ? "line-through text-gray-500 dark:text-gray-400"
                      : "text-gray-800 dark:text-gray-100"
                  }`}
                  onClick={() => onToggle(task.id)}
                >
                  {task.text}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(task.id);
                    setEditText(task.text);
                  }}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="text-red-500 hover:underline"
                >
                  Hapus
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
