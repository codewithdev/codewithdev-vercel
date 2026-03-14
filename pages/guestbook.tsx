import Container from 'components/Container';
import Guestbook from 'components/Guestbook';

interface GuestbookEntry {
  id: string;
  body: string;
  created_by: string;
  image: string | null;
  provider: string | null;
  updated_at: string;
}

export default function GuestbookPage({ fallbackData }: { fallbackData: GuestbookEntry[] }) {
  return (
    <Container
      title="Guestbook – Dev Prakash Sharma"
      description="Sign in to my digital guestbook and share feedback and ideas"
    >
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Guestbook
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Leave a comment below. It could be anything – appreciation,
          information, wisdom, or even humor. Surprise me!
        </p>
        <Guestbook fallbackData={fallbackData} />
      </div>
    </Container>
  );
}

// No server-side DB fetch — page renders immediately; entries load via SWR from /api/guestbook
export async function getServerSideProps() {
  return {
    props: { fallbackData: [] as GuestbookEntry[] }
  };
}
