"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type TaskInputProps = {
  onAdd: (task: string) => void;
};

export default function TaskInput({ onAdd }: TaskInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mt-4">
      <Input
        placeholder="Tambah tugas baru..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" className="px-4 text-sm">
        Tambah
      </Button>
    </form>
  );
}
