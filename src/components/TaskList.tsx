"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
};

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
}: TaskListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id: number) => {
    if (editText.trim()) {
      onEdit(id, editText.trim());
      setEditingId(null);
      setEditText("");
    }
  };

  if (tasks.length === 0) {
    return <p className="mt-6 text-gray-500 text-center">Belum ada tugas</p>;
  }

  return (
    <div className="mt-6 space-y-2 text-sm">
      {tasks.map((task) => (
        <Card
          key={task.id}
          className="flex text-sm items-center justify-between p-3 transition hover:shadow-md"
        >
          {editingId === task.id ? (
            <div className="flex gap-3 w-full">
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <Button onClick={() => saveEdit(task.id)} variant="success">
                Simpan
              </Button>
              <Button onClick={() => setEditingId(null)} variant="outline">
                Batal
              </Button>
            </div>
          ) : (
            <>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggle(task.id)}
                />
                <span
                  className={task.completed ? "line-through text-gray-500" : ""}
                >
                  {task.text}
                </span>
              </label>
              <div className="flex gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => startEdit(task)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(task.id)}
                >
                  Hapus
                </Button>
              </div>
            </>
          )}
        </Card>
      ))}
    </div>
  );
}
