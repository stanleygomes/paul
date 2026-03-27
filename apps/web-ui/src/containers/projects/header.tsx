import Link from "next/link";

export default function ProjectHeader() {
  return (
    <div className="py-10">
      <Link href="/" className="font-bold text-gray-700 hover:text-black">
        ← Back to Tasks
      </Link>
      <h1 className="text-4xl font-black mt-8">Projects & Filters</h1>
    </div>
  );
}
