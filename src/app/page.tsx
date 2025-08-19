export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-50 p-6">
      <h1 className="text-5xl font-extrabold text-purple-700 mb-4">Meet Bobbi 🤖</h1>
      <p className="text-lg text-gray-700 max-w-xl text-center mb-8">
        Your quirky, compassionate Back-Office-Bot-Buddi. Bobbi handles your admin,
        bookkeeping, and planning so you can focus on your craft.
      </p>
      <button className="px-6 py-3 rounded-2xl bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 transition">
        Get Started
      </button>
    </main>
  );
}

