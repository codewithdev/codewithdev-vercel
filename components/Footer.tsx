import { useState, useEffect, useRef } from 'react';
import NowPlaying from 'components/NowPlaying';

function RealtimeClock() {
  const [time, setTime] = useState<string | null>(null);
  // useRef: timezone metadata is computed once and never needs to trigger a re-render
  const tzMeta = useRef({ city: '', mapsUrl: '', ariaLabel: '' });

  useEffect(() => {
    // Graceful fallback — Intl can be undefined in very old environments
    let tz = 'UTC';
    try {
      tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      // keep fallback UTC
    }

    // Compute derived values once here, not on every 1-second render tick
    const tzCity = tz.split('/').pop()?.replace(/_/g, ' ') ?? tz;
    const tzRegion = tz.split('/')[0]?.replace(/_/g, ' ') ?? '';
    const mapsQuery = encodeURIComponent(tzRegion ? `${tzCity}, ${tzRegion}` : tzCity);

    tzMeta.current = {
      city: tzCity,
      mapsUrl: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
      ariaLabel: `See ${tzCity} on Google Maps`,
    };

    const tick = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: tz,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  const { city, mapsUrl, ariaLabel } = tzMeta.current;

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      title={ariaLabel}
      className="tabular-nums text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-150 [text-decoration:none] hover:[text-decoration:none]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-3.5 h-3.5 opacity-60"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      {time}
      <span className="opacity-60">· {city}</span>
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="w-full max-w-2xl mx-auto p-4">
      <div className="flex items-center justify-between space-x-4">
        <div className="flex-shrink-0 text-gray-600 dark:text-gray-400">
          <NowPlaying />
        </div>
        <RealtimeClock />
      </div>
    </footer>
  );
}
