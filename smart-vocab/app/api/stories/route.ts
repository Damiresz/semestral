import { NextResponse } from "next/server";

export async function GET() {
  const stories = [
    {
      id: "1",
      title: "A Day at the Park",
      text: "It was a sunny day. Anna went to the park with her dog. They played with a ball and met new friends.",
      audioUrl: "/audio/1.mp3",
    },
    {
      id: "2",
      title: "The Lost Key",
      text: "Tom could not find his key. He looked everywhere. Finally, he found it in his pocket.",
      audioUrl: "/audio/2.mp3",
    },
    {
      id: "3",
      title: "Holiday Trip",
      text: "Our family went to the mountains. We hiked, took photos, and enjoyed the fresh air.",
      audioUrl: "/audio/3.mp3",
    },
    {
      id: "4",
      title: "Birthday Surprise",
      text: "Sara's friends organized a surprise party. She was very happy and thanked everyone.",
      audioUrl: "/audio/4.mp3",
    },
  ];
  return NextResponse.json(stories);
} 