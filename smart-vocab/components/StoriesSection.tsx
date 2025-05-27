"use client";

import { useRef, useState } from "react";
import { Story } from "@/app/actions/vocabulary";
import { Button } from "@heroui/button";

interface StoriesSectionProps {
  stories: Story[];
}

export default function StoriesSection({ stories }: StoriesSectionProps) {
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const [progress, setProgress] = useState<number[]>(Array(stories.length).fill(0));
  const [playbackRate, setPlaybackRate] = useState<number[]>(Array(stories.length).fill(1));
  const [isPaused, setIsPaused] = useState<boolean[]>(Array(stories.length).fill(true));

  const handleTimeUpdate = (idx: number) => {
    const audio = audioRefs.current[idx];
    if (audio) {
      setProgress(prev => {
        const updated = [...prev];
        updated[idx] = (audio.currentTime / audio.duration) || 0;
        return updated;
      });
    }
  };

  const handlePlayPause = async (idx: number) => {
    const audio = audioRefs.current[idx];
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      setIsPaused(prev => {
        const updated = [...prev];
        updated[idx] = true;
        return updated;
      });
      return;
    }
    audioRefs.current.forEach((a, i) => {
      if (a && i !== idx) {
        a.pause();
        a.currentTime = 0;
      }
    });
    try {
      await audio.play();
      setIsPaused(prev => {
        const updated = [...prev];
        updated[idx] = false;
        return updated;
      });
      setPlayingIdx(idx);
    } catch (e) {
      console.error("Audio playback failed", e);
    }
  };

  const handleStop = (idx: number) => {
    const audio = audioRefs.current[idx];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setPlayingIdx(null);
      setIsPaused(prev => {
        const updated = [...prev];
        updated[idx] = true;
        return updated;
      });
    }
  };

  const handleSeek = (idx: number, value: number) => {
    const audio = audioRefs.current[idx];
    if (audio && audio.duration) {
      audio.currentTime = value * audio.duration;
    }
  };

  const handleSkip = (idx: number, seconds: number) => {
    const audio = audioRefs.current[idx];
    if (audio) {
      audio.currentTime = Math.max(0, Math.min(audio.currentTime + seconds, audio.duration));
    }
  };

  // Скорость
  const handleRate = (idx: number, rate: number) => {
    const audio = audioRefs.current[idx];
    if (audio) {
      audio.playbackRate = rate;
      setPlaybackRate(prev => {
        const updated = [...prev];
        updated[idx] = rate;
        return updated;
      });
    }
  };

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Short Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stories.map((story, idx) => (
          <div key={story.id} className="bg-zinc-900 rounded-xl p-6 shadow-lg flex flex-col gap-4 border-zinc-800 border-2">
            <div>
              <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
              <p className="text-default-400">{story.text}</p>
            </div>
            <div className="w-full flex flex-col items-center">
              <audio
                ref={el => { audioRefs.current[idx] = el; }}
                src={story.audioUrl}
                preload="none"
                onTimeUpdate={() => handleTimeUpdate(idx)}
                onEnded={() => {
                  setPlayingIdx(null);
                  setIsPaused(prev => {
                    const updated = [...prev];
                    updated[idx] = true;
                    return updated;
                  });
                }}
                onPause={() => {
                  setIsPaused(prev => {
                    const updated = [...prev];
                    updated[idx] = true;
                    return updated;
                  });
                }}
                onPlay={() => {
                  setIsPaused(prev => {
                    const updated = [...prev];
                    updated[idx] = false;
                    return updated;
                  });
                }}
              />
              {/* Прогресс-бар сверху */}
              <div className="w-full flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-400 w-10 text-right">
                  {audioRefs.current[idx]?.currentTime
                    ? new Date(audioRefs.current[idx]!.currentTime * 1000).toISOString().substr(14, 5)
                    : "00:00"}
                </span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={progress[idx] || 0}
                  onChange={e => handleSeek(idx, parseFloat(e.target.value))}
                  className="flex-1 accent-sky-600"
                  aria-label="Progress"
                />
                <span className="text-xs text-gray-400 w-10 text-left">
                  {audioRefs.current[idx]?.duration
                    ? new Date(audioRefs.current[idx]!.duration * 1000).toISOString().substr(14, 5)
                    : "00:00"}
                </span>
              </div>
              {/* Кнопки управления снизу */}
              <div className="flex items-center gap-2 mt-2">
                <Button isIconOnly size="sm" variant="flat" onPress={() => handleSkip(idx, -5)} aria-label="Назад 5 секунд">⏪</Button>
                <Button isIconOnly size="sm" color="primary" onPress={() => handlePlayPause(idx)} aria-label={isPaused[idx] ? "Воспроизвести" : "Пауза"}>
                  {isPaused[idx] ? "▶" : "⏸"}
                </Button>
                <Button isIconOnly size="sm" color="danger" onPress={() => handleStop(idx)} aria-label="Стоп">■</Button>
                <Button isIconOnly size="sm" variant="flat" onPress={() => handleSkip(idx, 5)} aria-label="Вперёд 5 секунд">⏩</Button>
              </div>
              <div className="flex gap-2 mt-2">
                {[0.75, 1, 1.5, 2].map(rate => (
                  <Button
                    key={rate}
                    size="sm"
                    variant={playbackRate[idx] === rate ? "solid" : "flat"}
                    color={playbackRate[idx] === rate ? "primary" : "default"}
                    onPress={() => handleRate(idx, rate)}
                  >
                    {rate}x
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 