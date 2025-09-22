"use client";

interface TaskFilterProps {
  filter: "all" | "completed" | "active";
  setFilter: (filter: "all" | "completed" | "active") => void;
}

export default function TaskFilter({ filter, setFilter }: TaskFilterProps) {
  return (
    <div className="flex gap-2 justify-center">
      {["all", "active", "completed"].map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f as "all" | "completed" | "active")}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
            filter === f
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-600 dark:text-gray-100"
          }`}
        >
          {f === "all" ? "Semua" : f === "active" ? "Belum Selesai" : "Selesai"}
        </button>
      ))}
    </div>
  );
}
