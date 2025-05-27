/**
 * Flying Words Canvas component that creates an interactive animation of floating words
 * Features word dragging, collision detection, and smooth animations
 */

"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Interface for flying word object
 * @property {string} text - The word text to display
 * @property {number} x - X coordinate position
 * @property {number} y - Y coordinate position
 * @property {number} vx - X velocity
 * @property {number} vy - Y velocity
 * @property {number} width - Word container width
 * @property {number} height - Word container height
 */
interface FlyingWord {
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
}

/**
 * Props interface for the FlyingWordsCanvas component
 * @property {string[]} words - Array of words to display
 * @property {number} [width] - Canvas width (default: 800)
 * @property {number} [height] - Canvas height (default: 400)
 */
interface FlyingWordsCanvasProps {
  words: string[];
  width?: number;
  height?: number;
}

/**
 * FlyingWordsCanvas component that renders an interactive canvas with animated words
 * Features:
 * - Word animation with velocity and collision
 * - Drag and drop interaction
 * - Smooth animation using requestAnimationFrame
 * - Responsive canvas sizing
 */
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

  // Initialize flying words with random positions and velocities
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

  // Keep ref in sync with state
  useEffect(() => {
    flyingWordsRef.current = flyingWords;
  }, [flyingWords]);

  // Animation and rendering loop
  useEffect(() => {
    let animationId: number;
    const animate = () => {
      flyingWordsRef.current = flyingWordsRef.current.map((word, i) => {
        if (draggedIdx === i) return word;
        let { x, y, vx, vy, width: w, height: h } = word;
        // Update position based on velocity
        x += vx;
        y += vy;
        // Handle collision with canvas boundaries
        if (x < 0) { x = 0; vx = -vx; }
        if (x + w > width) { x = width - w; vx = -vx; }
        if (y < 0) { y = 0; vy = -vy; }
        if (y + h > height) { y = height - h; vy = -vy; }
        return { ...word, x, y, vx, vy };
      });
      draw();
      animationId = requestAnimationFrame(animate);
    };

    // Draw function to render words on canvas
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

  /**
   * Find word at specific mouse coordinates
   * @param {number} mx - Mouse X coordinate
   * @param {number} my - Mouse Y coordinate
   * @returns {number} Index of the word at coordinates, -1 if none found
   */
  const getWordAt = (mx: number, my: number) =>
    flyingWordsRef.current.findIndex(
      w => mx >= w.x && mx <= w.x + w.width && my >= w.y && my <= w.y + w.height
    );

  /**
   * Handle mouse down event for word dragging
   * @param {React.MouseEvent} e - Mouse event
   */
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

  /**
   * Handle mouse move event for word dragging
   * @param {React.MouseEvent} e - Mouse event
   */
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

  /**
   * Handle mouse up event to release dragged word
   * @param {React.MouseEvent} e - Mouse event
   */
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