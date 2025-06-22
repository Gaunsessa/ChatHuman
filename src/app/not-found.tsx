'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';  // Next.js 13+ 的路由hook

export default function Custom404() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    let animationFrameId: number;
    let obstacleX = width;
    let dinoY = height - 40;
    let dinoVy = 0;
    let gravity = 0.8;
    let jumpPower = -15;
    let isJumping = false;

    function resetGame() {
      obstacleX = width;
      dinoY = height - 40;
      dinoVy = 0;
      setScore(0);
      setGameOver(false);
      loop();
    }

    function drawDino() {
      ctx.fillStyle = 'white';
      ctx.fillRect(50, dinoY, 30, 30);
    }

    function drawObstacle() {
      ctx.fillStyle = 'red';
      ctx.fillRect(obstacleX, height - 40, 20, 40);
    }

    function loop() {
      ctx.clearRect(0, 0, width, height);

      // Dino physics
      dinoVy += gravity;
      dinoY += dinoVy;
      if (dinoY > height - 40) {
        dinoY = height - 40;
        dinoVy = 0;
        isJumping = false;
      }

      // Move obstacle
      obstacleX -= 6;
      if (obstacleX < -20) {
        obstacleX = width;
        setScore(prev => prev + 1);
      }

      // Draw everything
      drawDino();
      drawObstacle();

      // Collision detection
      if (
        obstacleX < 80 && obstacleX > 50 && // horizontally near dino
        dinoY + 30 > height - 40 // vertically touching
      ) {
        setGameOver(true);
        return;
      }

      if (!gameOver) {
        animationFrameId = requestAnimationFrame(loop);
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        if (!isJumping) {
          dinoVy = jumpPower;
          isJumping = true;
        }
        if (gameOver) {
          resetGame();
        }
      }
    }

    window.addEventListener('keydown', onKeyDown);
    resetGame();

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameOver]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl mb-4">404 - Oops! GPT's rage exploded!</h1>
      <p className="mb-4">You made GPT so mad it kicked you out. Press Space to jump and avoid the red obstacle!</p>
      <canvas
        ref={canvasRef}
        width={600}
        height={150}
        className="border border-white rounded"
        style={{ backgroundColor: '#222' }}
      />
      <p className="mt-4">Score: {score}</p>
      {gameOver && <p className="text-red-500 mt-2">Game Over! Press Space to restart.</p>}

      <button
        onClick={() => router.push('/')} // 跳转回首页或你的 ChatHuman 页面路由
        className="mt-8 px-6 py-3 bg-red-600 hover:bg-red-700 rounded text-white font-bold transition"
      >
        Return to ChatHuman
      </button>
    </div>
  );
}
