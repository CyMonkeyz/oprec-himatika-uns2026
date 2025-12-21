// app/layout.tsx
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-zinc-950 text-zinc-50 antialiased">
        {/* subtle background glow (ringan, pure CSS) */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
          <div className="absolute top-48 right-[-10rem] h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-[-12rem] left-[-8rem] h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
        </div>

        <div className="relative">{children}</div>
      </body>
    </html>
  );
}
