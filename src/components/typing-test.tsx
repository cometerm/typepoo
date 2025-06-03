"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";

interface TypingTestProps {
  quotes: string[];
}

type GameMode = "normal" | 15 | 30 | 60 | 120;

export default function TypingTest({ quotes }: TypingTestProps) {
  const [currentQuote, setCurrentQuote] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [liveWpm, setLiveWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [gameMode, setGameMode] = useState<GameMode>("normal");
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showModeSidebar, setShowModeSidebar] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const wpmIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [cursorStyle, setCursorStyle] = useState({
    left: 0,
    top: 0,
    height: 0,
  });

  const gameModes = [
    {
      value: "normal" as const,
      label: "Normal",
      description: "Complete the quote",
    },
    { value: 15 as const, label: "15s", description: "15 seconds" },
    { value: 30 as const, label: "30s", description: "30 seconds" },
    { value: 60 as const, label: "60s", description: "60 seconds" },
    { value: 120 as const, label: "120s", description: "2 minutes" },
  ];

  useEffect(() => {
    if (textContainerRef.current) {
      const textContainer = textContainerRef.current;
      const chars = textContainer.querySelectorAll("span[data-char]");

      if (chars.length > 0 && currentPosition < chars.length) {
        const currentChar = chars[currentPosition];
        const rect = currentChar.getBoundingClientRect();
        const containerRect = textContainer.getBoundingClientRect();

        setCursorStyle({
          left: rect.left - containerRect.left,
          top: rect.top - containerRect.top,
          height: rect.height,
        });
      }
    }
  }, [currentPosition, currentQuote, userInput]);

  useEffect(() => {
    if (
      gameMode !== "normal" &&
      isStarted &&
      !isFinished &&
      timeLeft !== null &&
      timeLeft > 0
    ) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev !== null && prev <= 1) {
            setIsFinished(true);
            setIsStarted(false);
            setEndTime(Date.now());

            if (startTime) {
              const timeInMinutes = (gameMode as number) / 60;
              const finalWpm = Math.round(userInput.length / 5 / timeInMinutes);
              setWpm(finalWpm);
            }

            return 0;
          }
          return prev !== null ? prev - 1 : null;
        });
      }, 1000);

      return () => {
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
        }
      };
    }
  }, [gameMode, isStarted, isFinished, timeLeft, startTime, userInput.length]);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  const initGame = () => {
    setCurrentQuote(getRandomQuote());
    setUserInput("");
    setStartTime(null);
    setEndTime(null);
    setWpm(0);
    setLiveWpm(0);
    setAccuracy(100);
    setIsFinished(false);
    setIsStarted(false);
    setCurrentPosition(0);
    setTimeLeft(gameMode === "normal" ? null : gameMode);
    setCursorStyle({ left: 0, top: 0, height: 0 });

    if (wpmIntervalRef.current) {
      clearInterval(wpmIntervalRef.current);
      wpmIntervalRef.current = null;
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  };

  const startGame = (mode: GameMode) => {
    setGameMode(mode);
    setCurrentQuote(getRandomQuote());
    setUserInput("");
    setStartTime(null);
    setEndTime(null);
    setWpm(0);
    setLiveWpm(0);
    setAccuracy(100);
    setIsFinished(false);
    setIsStarted(false);
    setCurrentPosition(0);
    setTimeLeft(mode === "normal" ? null : mode);
    setCursorStyle({ left: 0, top: 0, height: 0 });
    setShowModeSidebar(false);

    if (wpmIntervalRef.current) {
      clearInterval(wpmIntervalRef.current);
      wpmIntervalRef.current = null;
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  };

  useEffect(() => {
    initGame();
    return () => {
      if (wpmIntervalRef.current) {
        clearInterval(wpmIntervalRef.current);
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, [isFinished]);

  const calculateWPM = () => {
    if (!startTime || !isStarted) return 0;

    const timeInMinutes = (Date.now() - startTime) / 60000;
    const wordCount = userInput.length / 5;

    if (timeInMinutes === 0) return 0;
    return Math.round(wordCount / timeInMinutes);
  };

  useEffect(() => {
    if (isStarted && !isFinished) {
      if (wpmIntervalRef.current) {
        clearInterval(wpmIntervalRef.current);
      }

      wpmIntervalRef.current = setInterval(() => {
        setLiveWpm(calculateWPM());
      }, 1000);

      setLiveWpm(calculateWPM());
    }

    return () => {
      if (wpmIntervalRef.current) {
        clearInterval(wpmIntervalRef.current);
      }
    };
  }, [isStarted, isFinished, userInput]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showModeSidebar) {
      setShowModeSidebar(false);
    }

    if (
      e.ctrlKey ||
      e.altKey ||
      e.metaKey ||
      e.key === "Shift" ||
      e.key === "Control" ||
      e.key === "Alt" ||
      e.key === "Meta" ||
      e.key === "Tab" ||
      e.key === "CapsLock" ||
      e.key === "Escape"
    ) {
      return;
    }

    if (e.key !== "Backspace") {
      e.preventDefault();
    }

    if (!isStarted && !startTime) {
      setStartTime(Date.now());
      setIsStarted(true);
    }

    if (e.key === "Backspace" && currentPosition > 0) {
      e.preventDefault();
      setCurrentPosition(currentPosition - 1);
      setUserInput(userInput.slice(0, -1));
      return;
    }

    if (gameMode === "normal" && currentPosition >= currentQuote.length) {
      return;
    }

    if (e.key.length === 1) {
      const newUserInput = userInput + e.key;
      setUserInput(newUserInput);

      if (currentPosition < currentQuote.length) {
        setCurrentPosition(currentPosition + 1);
      }

      const correctChars = newUserInput
        .split("")
        .filter(
          (char, index) =>
            index < currentQuote.length && char === currentQuote[index],
        ).length;
      const accuracyPercent = Math.round(
        (correctChars / newUserInput.length) * 100,
      );
      setAccuracy(accuracyPercent);

      if (
        gameMode === "normal" &&
        newUserInput.length === currentQuote.length
      ) {
        setEndTime(Date.now());
        setIsFinished(true);
        setIsStarted(false);

        if (startTime) {
          const timeInMinutes = (Date.now() - startTime) / 60000;
          const finalWpm = Math.round(currentQuote.length / 5 / timeInMinutes);
          setWpm(finalWpm);
        }

        if (wpmIntervalRef.current) {
          clearInterval(wpmIntervalRef.current);
          wpmIntervalRef.current = null;
        }
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
        }
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (isFinished) {
    return (
      <div className="w-full h-[70vh] flex flex-col items-center justify-center relative">
        <div className="text-center mb-6">
          <div className="text-gray-400 text-lg mb-2">
            {gameMode === "normal"
              ? "Quote completed!"
              : `${gameMode}s challenge completed!`}
          </div>
        </div>

        <div className="flex flex-col items-center gap-0 text-center">
          <div className="text-gray-400 text-xl">wpm</div>
          <div className="text-7xl font-normal text-gray-300">{wpm}</div>
          <div className="text-gray-400 text-xl mt-6">acc</div>
          <div className="text-7xl font-normal text-gray-300">{accuracy}%</div>

          {gameMode !== "normal" && (
            <div className="mt-6 text-center">
              <div className="text-gray-400 text-xl">characters typed</div>
              <div className="text-3xl font-normal text-gray-300">
                {userInput.length}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4 mt-16">
          <button
            onClick={() => startGame(gameMode)}
            className="text-sm uppercase tracking-wider text-gray-400 hover:text-gray-300 bg-transparent border-none cursor-pointer transition-colors duration-200 px-4 py-2"
          >
            try again
          </button>
          <div className="relative">
            <button
              onClick={() => setShowModeSidebar(true)}
              onMouseEnter={() => setShowModeSidebar(true)}
              className="text-sm uppercase tracking-wider text-gray-400 hover:text-gray-300 bg-transparent border-none cursor-pointer transition-colors duration-200 px-4 py-2"
            >
              change mode
            </button>

            {/* Mode Dropdown Slider - Results Screen */}
            {showModeSidebar && (
              <div
                className="absolute top-full left-0 mt-1 w-44 bg-gray-900/20 backdrop-blur-xl border border-gray-600/20 shadow-2xl transform transition-all duration-300 z-50 opacity-100 scale-100 hover:bg-gray-900/30 hover:backdrop-blur-2xl"
                onMouseLeave={() => setShowModeSidebar(false)}
                style={{
                  transformOrigin: "top left",
                  background: "rgba(17, 24, 39, 0.1)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                }}
              >
                <div className="p-2 border-b border-gray-600/20">
                  <h3 className="text-white/90 text-xs font-medium uppercase tracking-wider">
                    Select Mode
                  </h3>
                </div>
                <div className="py-1">
                  {gameModes.map((mode) => (
                    <button
                      key={mode.value}
                      onClick={() => startGame(mode.value)}
                      className={`w-full text-left px-3 py-2 transition-all duration-200 hover:backdrop-blur-sm ${
                        gameMode === mode.value
                          ? "bg-cyan-500/10 border-l-2 backdrop-blur-sm"
                          : "text-gray-300/90 hover:bg-white/5 hover:text-white hover:backdrop-blur-md"
                      }`}
                      style={
                        gameMode === mode.value
                          ? {
                              borderLeftColor: "hsl(187.9 85.7% 53.3%)",
                              color: "hsl(187.9 85.7% 53.3%)",
                              background: "rgba(6, 182, 212, 0.05)",
                            }
                          : {}
                      }
                    >
                      <div className="text-sm font-medium">{mode.label}</div>
                      <div className="text-xs text-gray-400/80">
                        {mode.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-3 py-8 px-4 relative">
      {/* Game mode and timer display */}
      <div className="flex items-center justify-between w-full max-w-3xl mb-4">
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm uppercase tracking-wider">
            {gameMode === "normal" ? "Normal Mode" : `${gameMode}s Challenge`}
          </span>
          <div className="relative">
            <button
              onClick={() => setShowModeSidebar(true)}
              onMouseEnter={() => setShowModeSidebar(true)}
              className="text-xs uppercase tracking-wider text-gray-500 hover:text-gray-400 bg-transparent border-none cursor-pointer transition-colors duration-200 px-2 py-1"
            >
              change mode
            </button>

            {/* Mode Dropdown Slider - Main Game Screen */}
            {showModeSidebar && (
              <div
                className="absolute top-full left-0 mt-1 w-44 bg-gray-900/20 backdrop-blur-xl border border-gray-600/20 shadow-2xl transform transition-all duration-300 z-50 opacity-100 scale-100 hover:bg-gray-900/30 hover:backdrop-blur-2xl"
                onMouseLeave={() => setShowModeSidebar(false)}
                style={{
                  transformOrigin: "top left",
                  background: "rgba(17, 24, 39, 0.1)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                }}
              >
                <div className="p-2 border-b border-gray-600/20">
                  <h3 className="text-white/90 text-xs font-medium uppercase tracking-wider">
                    Select Mode
                  </h3>
                </div>
                <div className="py-1">
                  {gameModes.map((mode) => (
                    <button
                      key={mode.value}
                      onClick={() => startGame(mode.value)}
                      className={`w-full text-left px-3 py-2 transition-all duration-200 hover:backdrop-blur-sm ${
                        gameMode === mode.value
                          ? "bg-cyan-500/10 border-l-2 backdrop-blur-sm"
                          : "text-gray-300/90 hover:bg-white/5 hover:text-white hover:backdrop-blur-md"
                      }`}
                      style={
                        gameMode === mode.value
                          ? {
                              borderLeftColor: "hsl(187.9 85.7% 53.3%)",
                              color: "hsl(187.9 85.7% 53.3%)",
                              background: "rgba(6, 182, 212, 0.05)",
                            }
                          : {}
                      }
                    >
                      <div className="text-sm font-medium">{mode.label}</div>
                      <div className="text-xs text-gray-400/80">
                        {mode.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {gameMode !== "normal" && (
          <div className="text-right">
            <div
              className="text-2xl font-mono"
              style={{ color: "hsl(187.9 85.7% 53.3%)" }}
            >
              {timeLeft !== null ? formatTime(timeLeft) : formatTime(gameMode)}
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">
              time left
            </div>
          </div>
        )}
      </div>

      {/* Interactive quote display */}
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="w-full max-w-3xl max-h-80 overflow-y-auto focus:outline-none focus:ring-0"
      >
        <div
          ref={textContainerRef}
          className="relative text-lg md:text-xl leading-relaxed"
        >
          {/* Cursor */}
          <span
            className="absolute w-0.5 animate-pulse"
            style={{
              left: `${cursorStyle.left}px`,
              top: `${cursorStyle.top}px`,
              height: `${cursorStyle.height}px`,
              backgroundColor: "hsl(187.9 85.7% 53.3%)",
              transition: "all 30ms cubic-bezier(0.25, 0.1, 0.25, 1.0)",
            }}
          />

          {/* Text */}
          {currentQuote.split("").map((char, index) => {
            let className = "text-gray-600";

            if (index < userInput.length) {
              if (userInput[index] === char) {
                className = "text-white";
              } else {
                className = "text-red-500 bg-red-500/20";
              }
            }

            return (
              <span key={index} data-char={index} className={className}>
                {char}
              </span>
            );
          })}
        </div>
      </div>

      {/* Live WPM counter */}
      <div className="text-sm mt-4 flex items-center gap-1.5 h-5 text-gray-400">
        {isStarted && !isFinished ? (
          <>
            <span className="font-medium">{liveWpm}</span>
            <span className="uppercase text-xs tracking-wider">wpm</span>
          </>
        ) : (
          <span className="text-xs uppercase tracking-wider">
            {!isStarted ? "click and start typing" : ""}
          </span>
        )}
      </div>

      {/* Reset button */}
      <button
        onClick={() => startGame(gameMode)}
        className="mt-2 text-xs uppercase tracking-wider text-gray-400 hover:text-gray-300 bg-transparent border-none cursor-pointer transition-colors duration-200 px-3 py-1"
      >
        Reset
      </button>
    </div>
  );
}
