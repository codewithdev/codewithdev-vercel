import Link from 'next/link';
import Image from 'next/future/image';

import Container from 'components/Container';
import avatar from 'public/codewithdev.jpg';
import avatarBW from 'public/avatar-bw.jpg';

export default function About() {
  return (
    <Container title="About – Dev">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          About Me
        </h1>
        <div className="mb-8 prose dark:prose-dark leading-6">
          <h2>Links</h2>
          <ul>
            <li>
              Twitter: <a href="https://twitter.com/codewithdev">@codewithdev</a>
            </li>
            <li>
              GitHub: <a href="https://github.com/codewithdev">@codewithdev</a>
            </li>
            <li>
              Website:{' '}
              <Link href="https://codewithdev.github.io">
                <a>https://codewithdev.github.io</a>
              </Link>
            </li>
            <li>
              LinkedIn:{' '}
              <a href="https://www.linkedin.com/in/idevprakaash">
                https://www.linkedin.com/in/idevprakaash
              </a>
            </li>
          </ul>
          <h2>Bio</h2>
          <h3>Job Title</h3>
          <p>Technical Writer and Open Source Developer</p>
          <h3>Brief, 3rd Person</h3>
          <p>
            Dev is a passionate Technical Writer and Open Source Developer. An educator, writer, and speaker, Dev has contributed to
            Microsoft Docs, GitHub Docs, Circle CI, and other open source softwares and communities. He has also been part of core team of Chargebee Developer Commmunity {' '}
            <a href= "https://devbuzz.chargebee.com/"> DevBuzz Community</a>.
            He has also delivered technical talks and workshops on Open Source, Data Science, and Machine Learning.
            Dev has extensive knowledge and experience on working with SaaS, Power BI, Anlaytics, AI/ML and API focused companies. He is a product guy and delivered documentation for both user and developers.
            </p>
          <h3>Long, 1st Person</h3>
          <p>
            Hey, I'm Dev. I'm Technical Writer at{' '}
            <a href="https://chargebee.com/">Chargebee</a>, where my team helps
            create user and developer documentation for multiple products of Chargebee. I'm an Open Source contributor and help
            software our open-source communities. I've passionate about Automation testing, frontend
            development and have given session on Open Source technologies, web development, Machine Learning. I'm also freelance writer and help companies solve their documentation problems.
          </p>
          <h3>Education</h3>
          <p>
            Dev is graduated from Dr. APJ Kalam Technical University with a Masters Degree (MCA) in
            Computer Science and Engineering.
          </p>
          <h2>Headshots</h2>
          <div className="flex space-x-8">
            <a href="/codewithdev.jpg">
              <Image
                alt="Dev"
                width={400}
                quality={100}
                src={avatar}
                className="rounded-md"
              />
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}
