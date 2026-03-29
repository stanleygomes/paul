import Link from "next/link";

export default function ProjectHeader() {
  return (
    <div className="py-10">
      <Link
        href="/"
        className="font-bold text-foreground/70 hover:text-foreground"
      >
        ← Back to Tasks
      </Link>
      <h1 className="text-4xl font-black mt-8">Projects & Filters</h1>
    </div>
  );
}
