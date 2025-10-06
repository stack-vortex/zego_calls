'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';


// Dynamically import ZegoUIKitPrebuilt to prevent SSR issues
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';


function RoomContent() {
  const router = useSearchParams();
  // const { roomId, user } = router;
  const roomId = router.get('roomId');
  const user = router.get('user');
  const containerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  console.log('room id , user', roomId, user);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!roomId || !containerRef.current || !isMounted || typeof window === 'undefined') return;

    const appID = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID); // 🟢 Replace with your Zego App ID
    const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET; // ⚠️ For testing only!



    console.log('appID, serverSecret', appID, serverSecret);
    const userID = Date.now().toString();
    const userName = user || 'Guest_' + userID;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      userID,
      userName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: containerRef.current,
      sharedLinks: [
        {
          name: 'Copy Link',
          url: typeof window !== 'undefined' ? `${window.location.origin}/room?roomId=${roomId}` : `/room?roomId=${roomId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference, // VideoConference or OneONoneCall
      },
    });
  }, [roomId, user, isMounted]);

  if (!isMounted) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return <div ref={containerRef} className="w-screen h-screen" />;
}

export default function RoomPage() {
  return (
    <Suspense fallback={
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    }>
      <RoomContent />
    </Suspense>
  );
}
