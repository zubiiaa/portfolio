import { Link } from "wouter";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#10151e] px-6 text-center text-[#eef4f0]">
      <p className="text-xs uppercase tracking-[0.28em] text-[#a4f5bf]">404 / signal lost</p>
      <h1 className="font-display text-5xl">Page not found.</h1>
      <p className="max-w-md text-sm leading-7 text-[#9aa9a4]">
        This route does not exist in the current portfolio system.
      </p>
      <Link href="/" className="border-b border-[#a4f5bf] pb-1 text-sm text-[#a4f5bf]">
        Return home
      </Link>
    </main>
  );
}
