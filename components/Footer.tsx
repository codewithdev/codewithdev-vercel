import { useState, useEffect } from 'react';
import NowPlaying from 'components/NowPlaying';

export default function Footer() {
  return (
    <footer className="w-full max-w-2xl mx-auto p-4">
      <div className="flex items-center justify-between space-x-4">
        <div className="flex-shrink-0 text-gray-600 dark:text-gray-400">
          <NowPlaying />
        </div>
      </div>
    </footer>
  );
}
