import { MDXRemote } from 'next-mdx-remote';
import SnippetLayout from 'layouts/snippets';
import components from 'components/MDXComponents';
import { snippetsQuery, snippetSlugsQuery } from 'lib/queries';
import { sanityClient, getClient } from 'lib/sanity-server';
import { mdxToHtml } from 'lib/mdx';
import { Snippet } from 'lib/types';
import { serialize } from 'next-mdx-remote/serialize';

export default function SnippetsPage({ snippet }: { snippet: Snippet }) {
  return (
    <SnippetLayout snippet={snippet}>
      <MDXRemote {...snippet.content} components={components} />
    </SnippetLayout>
  );
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(snippetSlugsQuery);
  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: 'blocking'
  };
}

export async function getStaticProps({ 
  params,
  preview = false 
}: {
  params: { slug: string };
  preview?: boolean;
}) {
  const client = await getClient(preview);
  const { snippet } = await client.fetch(snippetsQuery, {
    slug: params.slug
  });

  if (!snippet) {
    return { notFound: true };
  }

  const mdxSource = await serialize(snippet.content);

  return {
    props: {
      snippet: {
        ...snippet,
        content: mdxSource
      }
    }
  };
}
