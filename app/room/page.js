'use client';

import { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

export default function RoomPage() {
  const router = useSearchParams();
  // const { roomId, user } = router;
  const roomId = router.get('roomId');
  const user = router.get('user');
  const containerRef = useRef(null);

  console.log('room id , user', roomId, user);
  

  useEffect(() => {
    if (!roomId || !containerRef.current) return;

    const appID = process.env.ZEGO_APP_ID; // 🟢 Replace with your Zego App ID
    const serverSecret = process.env.ZEGO_SERVER_SECRET; // ⚠️ For testing only!

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
          url: `${window.location.origin}/room/${roomId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference, // VideoConference or OneONoneCall
      },
    });
  }, [roomId, user]);

  return <div ref={containerRef} className="w-screen h-screen" />;
}
