'use client';

import React from 'react';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl mb-6">404 - Oops! GPT's rage exploded!</h1>
      <p className="mb-4">You made GPT so mad it kicked you out. Now calm things down:</p>
      {/* game */}
      <iframe
        src="https://chromedino.com/" 
        width="600"
        height="200"
        style={{ border: 'none' }}
        title="Dinosaur Game"
      />
    </div>
  );
}
