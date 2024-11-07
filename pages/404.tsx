import Link from 'next/link';

import Container from 'components/Container';

export default function NotFound() {
  return (
    <Container title="404 – Dev Prakash Sharma">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Uh!Oh Page Not Found 😔
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          It seems like you've found something that doesn't exist, or you've spelled something
          wrong. I'm guessing you spelled something wrong. If you're looking for something click <strong>Return Home.</strong>
        </p>
        <Link href="/" legacyBehavior>
          <div className="p-1 sm:p-4 w-64 font-bold mx-auto bg-gray-200 dark:bg-gray-800 text-center rounded-md text-black dark:text-white">
            Return Home
          </div>
        </Link>
      </div>
    </Container>
  );
}
