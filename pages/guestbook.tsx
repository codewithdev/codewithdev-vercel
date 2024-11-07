import prisma from 'lib/prisma';
import Container from 'components/Container';
import Guestbook from 'components/Guestbook';

interface GuestbookEntry {
  id: string;
  body: string;
  created_by: string;
  updated_at: string;
}

interface GuestbookDbEntry {
  id: number;
  body: string;
  created_by: string;
  updated_at: Date;
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

export async function getStaticProps() {
  const entries = await prisma.portfolio.findMany({
    orderBy: {
      updated_at: 'desc'
    }
  }) as GuestbookDbEntry[];

  const fallbackData = entries.map((entry: GuestbookDbEntry) => ({
    id: entry.id.toString(),
    body: entry.body,
    created_by: entry.created_by.toString(),
    updated_at: entry.updated_at.toString()
  }));

  return {
    props: {
      fallbackData
    },
    revalidate: 60
  };
}
