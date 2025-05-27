import Link from 'next/link';

export default function Dashboard() {
  // Mock data - in real app this would come from an API
  const vocabLists = [
    { id: 1, name: 'Basic English', progress: 75, totalWords: 100 },
    { id: 2, name: 'Business Terms', progress: 45, totalWords: 50 },
    { id: 3, name: 'Travel Vocabulary', progress: 90, totalWords: 200 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <Link 
            href="/vocabulary/new" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Create New List
          </Link>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Words Learned</p>
              <p className="text-2xl font-bold text-blue-600">245</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Active Lists</p>
              <p className="text-2xl font-bold text-green-600">3</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Mastery Rate</p>
              <p className="text-2xl font-bold text-purple-600">85%</p>
            </div>
          </div>
        </div>

        {/* Vocabulary Lists */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Vocabulary Lists</h2>
          <div className="space-y-4">
            {vocabLists.map((list) => (
              <div key={list.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{list.name}</h3>
                    <p className="text-sm text-gray-600">
                      {list.progress}% complete ({list.totalWords} words)
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/vocabulary/${list.id}/practice`}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Practice
                    </Link>
                    <Link
                      href={`/vocabulary/${list.id}/edit`}
                      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${list.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 