import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <Link href="/" className="text-lg font-bold">
          Task Manager
        </Link>
        <div>
          <Link href="/tasks" className="mx-2">
            Tasks
          </Link>
          <Link href="/login" className="mx-2">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
