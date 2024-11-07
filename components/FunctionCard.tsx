import Link from 'next/link';
import Image from 'next/image';
import { urlForImage } from 'lib/sanity';

interface FunctionCardProps {
  title: string;
  description: string;
  slug: string;
  logo: {
    asset?: {
      _ref?: string;
    };
    _ref?: string;
  };
}

export default function FunctionCard({
  title,
  description,
  slug,
  logo,
}: FunctionCardProps) {
  return (
    <Link 
      href={`/snippets/${slug}`}
      className="border border-grey-200 dark:border-gray-800 rounded p-4 w-full bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow"
      legacyBehavior={false}  
    >
      {logo && (
        <Image
          alt={title}
          height={32}
          width={32}
          src={urlForImage(logo)?.url() || ''}
          className="rounded-full"
        />
      )}
      <h3 className="text-lg font-bold text-left mt-2 text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <p className="mt-1 text-gray-700 dark:text-gray-400">{description}</p>
    </Link>
  );
}
