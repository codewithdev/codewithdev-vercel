import { useState, useRef, Suspense } from 'react';
import { format } from 'date-fns';
import { signIn, signOut, useSession } from 'next-auth/react';
import useSWR, { useSWRConfig } from 'swr';
import Image from 'next/image';

import fetcher from 'lib/fetcher';
import { Form, FormState } from 'lib/types';
import SuccessMessage from 'components/SuccessMessage';
import ErrorMessage from 'components/ErrorMessage';
import LoadingSpinner from 'components/LoadingSpinner';

// ─── Provider sign-in buttons ────────────────────────────────────────────────

const PROVIDERS = [
  {
    id: 'github',
    label: 'GitHub',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    bg: 'bg-[#24292e] hover:bg-[#1a1e22] text-white',
  },
  {
    id: 'twitter',
    label: 'X / Twitter',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    bg: 'bg-black hover:bg-gray-900 text-white',
  },
];

// ─── Provider badge shown on each entry ──────────────────────────────────────

function ProviderBadge({ provider }: { provider: string | null }) {
  if (!provider) return null;
  const p = PROVIDERS.find((x) => x.id === provider);
  if (!p) return null;
  return (
    <span className="inline-flex items-center text-gray-400 dark:text-gray-500" title={p.label}>
      {p.icon}
    </span>
  );
}

// ─── Single guestbook entry ───────────────────────────────────────────────────

interface Entry {
  id: string;
  body: string;
  created_by: string;
  image: string | null;
  provider: string | null;
  updated_at: string;
}

interface GuestbookEntryProps {
  entry: Entry;
  currentUserName?: string | null;
}

function GuestbookEntry({ entry, currentUserName }: GuestbookEntryProps) {
  const { mutate } = useSWRConfig();

  const deleteEntry = async (e: React.MouseEvent) => {
    e.preventDefault();
    await fetch(`/api/guestbook/${entry.id}`, { method: 'DELETE' });
    mutate('/api/guestbook');
  };

  return (
    <div className="flex items-start gap-3">
      {/* Avatar */}
      <div className="flex-shrink-0">
        {entry.image ? (
          <Image
            src={entry.image}
            alt={entry.created_by}
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-semibold text-gray-600 dark:text-gray-300">
            {entry.created_by.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
            {entry.created_by}
          </span>
          <ProviderBadge provider={entry.provider} />
          <span className="text-xs text-gray-400 dark:text-gray-600">
            · {format(new Date(entry.updated_at), 'd MMM yyyy')}
          </span>
          {currentUserName && entry.created_by === currentUserName && (
            <button
              className="text-xs text-red-500 dark:text-red-400 hover:underline ml-auto"
              onClick={deleteEntry}
            >
              Delete
            </button>
          )}
        </div>
        <p className="mt-0.5 text-sm text-gray-700 dark:text-gray-300 break-words">
          {entry.body}
        </p>
      </div>
    </div>
  );
}

// ─── Main Guestbook component ─────────────────────────────────────────────────

interface GuestbookProps {
  fallbackData: Entry[];
}

export default function Guestbook({ fallbackData }: GuestbookProps) {
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();
  const [form, setForm] = useState<FormState>({ state: Form.Initial });
  const inputEl = useRef<HTMLInputElement>(null);
  const { data: entries } = useSWR<Entry[]>('/api/guestbook', fetcher, { fallbackData });

  const leaveEntry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForm({ state: Form.Loading });
    if (!inputEl.current) return;

    const res = await fetch('/api/guestbook', {
      body: JSON.stringify({ body: inputEl.current.value }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setForm({
        state: Form.Error,
        message: (data.message || data.error || res.statusText) as string
      });
      return;
    }
    if (data.error) {
      setForm({ state: Form.Error, message: data.error });
      return;
    }

    inputEl.current.value = '';
    mutate('/api/guestbook');
    setForm({ state: Form.Success, message: 'Thanks for signing the guestbook!' });
  };

  return (
    <>
      {/* ── Sign-in / compose card ── */}
      <div className="border border-blue-200 rounded-xl p-6 my-4 w-full dark:border-gray-800 bg-blue-50 dark:bg-blue-opaque">
        <h5 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
          Sign the Guestbook
        </h5>
        <p className="mt-1 mb-4 text-sm text-gray-600 dark:text-gray-400">
          Share a message for future visitors. Sign in with any account below.
        </p>

        {!session ? (
          <div className="flex flex-wrap gap-2">
            {PROVIDERS.map((p) => (
              <button
                key={p.id}
                onClick={() => signIn(p.id, { callbackUrl: '/guestbook' })}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${p.bg}`}
              >
                {p.icon}
                {p.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {/* Signed-in user row */}
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? ''}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span>
                Signed in as{' '}
                <strong className="text-gray-900 dark:text-gray-100">{session.user?.name}</strong>
              </span>
              <button
                onClick={() => signOut()}
                className="ml-auto text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 underline"
              >
                Sign out
              </button>
            </div>

            {/* Message input */}
            <form className="relative" onSubmit={leaveEntry}>
              <input
                ref={inputEl}
                aria-label="Your message"
                placeholder="Say something nice..."
                required
                maxLength={500}
                className="pl-4 pr-20 py-2 focus:ring-blue-500 focus:border-blue-500 block w-full border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
              />
              <button
                className="flex items-center justify-center absolute right-1 top-1 px-4 font-medium h-8 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                type="submit"
              >
                {form.state === Form.Loading ? <LoadingSpinner /> : 'Post'}
              </button>
            </form>
          </div>
        )}

        <div className="mt-3">
          {form.state === Form.Error ? (
            <ErrorMessage>{form.message}</ErrorMessage>
          ) : form.state === Form.Success ? (
            <SuccessMessage>{form.message}</SuccessMessage>
          ) : (
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Only your name and profile picture are shown publicly.
            </p>
          )}
        </div>
      </div>

      {/* ── Entries list ── */}
      <div className="mt-6 space-y-6">
        <Suspense fallback={null}>
          {entries?.map((entry) => (
            <GuestbookEntry
              key={entry.id}
              entry={entry}
              currentUserName={session?.user?.name}
            />
          ))}
        </Suspense>
      </div>
    </>
  );
}
