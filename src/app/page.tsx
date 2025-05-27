import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">Smart Vocab</h1>
          <p className="text-xl text-gray-600">Master vocabulary through interactive learning</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Interactive Flashcards</h2>
            <p className="text-gray-600">Learn vocabulary with visual flashcards and engaging exercises</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Custom Vocabulary Lists</h2>
            <p className="text-gray-600">Create and manage your own vocabulary lists or choose from pre-made sets</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Progress Tracking</h2>
            <p className="text-gray-600">Monitor your learning progress with detailed statistics</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Multiple Learning Modes</h2>
            <p className="text-gray-600">Practice with various exercises including multiple choice, fill-in-the-blank, and writing</p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/auth/login" className="bg-blue-600 text-white px-8 py-3 rounded-lg mr-4 hover:bg-blue-700">
            Login
          </Link>
          <Link href="/auth/register" className="bg-white text-blue-600 px-8 py-3 rounded-lg border border-blue-600 hover:bg-blue-50">
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
