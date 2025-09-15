import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="w-full p-4 bg-gray-100 dark:bg-gray-900 shadow flex justify-between items-center">
      <h1 className="text-2xl font-bold text-center">HNB List</h1>
      <ThemeToggle />
    </header>
  );
}
