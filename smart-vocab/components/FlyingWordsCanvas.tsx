"use client";

import { useEffect, useRef, useState } from "react";

interface FlyingWord {
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
}

interface FlyingWordsCanvasProps {
  words: string[];
  width?: number;
  height?: number;
}

export default function FlyingWordsCanvas({
  words,
  width = 800,
  height = 400,
}: FlyingWordsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [flyingWords, setFlyingWords] = useState<FlyingWord[]>([]);
  const flyingWordsRef = useRef<FlyingWord[]>([]);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (words.length === 0) return;
    const ctx = canvasRef.current?.getContext("2d");
    const fw: FlyingWord[] = words.map((text, i) => {
      let w = 60, h = 30;
      if (ctx) {
        ctx.font = "bold 20px sans-serif";
        w = ctx.measureText(text).width + 20;
      }
      return {
        text,
        x: Math.random() * (width - w),
        y: Math.random() * (height - h),
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        width: w,
        height: h,
      };
    });
    setFlyingWords(fw);
    flyingWordsRef.current = fw;
  }, [words, width, height]);

  useEffect(() => {
    flyingWordsRef.current = flyingWords;
  }, [flyingWords]);

  useEffect(() => {
    let animationId: number;
    const animate = () => {
      flyingWordsRef.current = flyingWordsRef.current.map((word, i) => {
        if (draggedIdx === i) return word;
        let { x, y, vx, vy, width: w, height: h } = word;
        x += vx;
        y += vy;
        if (x < 0) { x = 0; vx = -vx; }
        if (x + w > width) { x = width - w; vx = -vx; }
        if (y < 0) { y = 0; vy = -vy; }
        if (y + h > height) { y = height - h; vy = -vy; }
        return { ...word, x, y, vx, vy };
      });
      draw();
      animationId = requestAnimationFrame(animate);
    };
    const draw = () => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      flyingWordsRef.current.forEach((word, i) => {
        ctx.save();
        ctx.font = "bold 20px sans-serif";
        ctx.fillStyle = draggedIdx === i ? "#38bdf8" : "#f4f4f5";
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(word.x, word.y, word.width, word.height, 10);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#18181b";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(word.text, word.x + word.width / 2, word.y + word.height / 2);
        ctx.restore();
      });
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [draggedIdx, width, height]);

  const getWordAt = (mx: number, my: number) =>
    flyingWordsRef.current.findIndex(
      w => mx >= w.x && mx <= w.x + w.width && my >= w.y && my <= w.y + w.height
    );

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const idx = getWordAt(mx, my);
    if (idx !== -1) {
      setDraggedIdx(idx);
      setOffset({ x: mx - flyingWordsRef.current[idx].x, y: my - flyingWordsRef.current[idx].y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedIdx === null) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    flyingWordsRef.current = flyingWordsRef.current.map((w, i) =>
      i === draggedIdx
        ? { ...w, x: mx - offset.x, y: my - offset.y, vx: 0, vy: 0 }
        : w
    );
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (draggedIdx === null) return;
    flyingWordsRef.current = flyingWordsRef.current.map((w, i) =>
      i === draggedIdx
        ? { ...w, vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2 }
        : w
    );
    setDraggedIdx(null);
  };

  return (
    <div className="w-full flex flex-col items-center mt-12">
      <h2 className="text-xl font-bold mb-2">Catch and drag words!</h2>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="rounded-lg border-2 border-sky-700 bg-zinc-800"
        style={{ maxWidth: "100%", cursor: draggedIdx !== null ? "grabbing" : "grab" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
} 