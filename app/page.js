'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function Home() {
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');
  const router = useRouter();

  const handleJoin = () => {
    if (roomId.trim() && userName.trim()) {
      router.push(`/room?roomId=${roomId}&user=${encodeURIComponent(userName)}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  ">
      <h1 className="text-3xl font-bold mb-6">🎥 ZegoCloud Video Call</h1>

      <input
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter your name"
        className="p-2 rounded mb-3 text-black border-2 border-gray-300"
      />

      <input
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Enter Room ID"
        className="p-2 rounded mb-3 text-black border-2 border-gray-300"
      />

      <button
        onClick={handleJoin}
        className="mt-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
      >
        Join Room
      </button>
    </div>
  );
}
