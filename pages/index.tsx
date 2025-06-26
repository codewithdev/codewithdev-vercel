import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';

import Container from '../components/Container';
import BlogPostCard from '../components/BlogPostCard';
import Subscribe from '../components/Subscribe';
import Footer from '../components/Footer';

export default function Home() {
  const { resolvedTheme } = useTheme();
  const [weather, setWeather] = useState<{
    temp: number | null;
    location: string;
    description: string;
    icon: string;
    country: string;
  }>({
    temp: null,
    location: '',
    description: '',
    icon: '',
    country: ''
  });

  useEffect(() => {
    // Get location and weather
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
          );
          const data = await res.json();
          setWeather({
            temp: Math.round(data.main.temp),
            location: data.name,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            country: data.sys.country
          });
        } catch (err) {
          console.error('Error fetching weather:', err);
        }
      });
    }
  }, []);

  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <div className="w-full mb-8">
          {weather.temp !== null && (
            <div className="bg-white dark:bg-gray-900 rounded-lg px-4 py-3 shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#F48024]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">
                    {weather.location}, {weather.country} • {weather.temp}°C
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-start">
          <div className="flex flex-col pr-8">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
              Dev Prakash Sharma
            </h1>
            <h2 className="text-gray-700 dark:text-gray-200 mb-4">
             <i>A</i> technology nerd, tech docs optimizer, a thought leader, and a minimalist coder.</h2>
            <div className="text-gray-600 dark:text-gray-400 mb-16">
              <h3>Hi 👋 , I'm Dev. A motorcycle rider, programming writer, public speaker, caffeine-addict, and an open source developer. When I am not at work, I like revving, exploring places, and collecting memories with my motorcycle.
              I read <i>Non</i>-fiction books, a bit nerdy, quite ambitious, and like adventure, I like chilled LIITs 🍷 more than wines. I dream about chatting in Markdown 💬
            </h3></div>
          </div>
          <div className="w-[80px] sm:w-[176px] relative mb-8 sm:mb-0 mr-auto">
            <Image
              alt="Dev Prakash Sharma"
              height={176}
              width={176}
              src="/headshot-dev.jpg"
              sizes="30vw"
              priority
              className={`rounded-full filter ${
                resolvedTheme === 'light' ? 'grayscale-0' : 'grayscale'
              }`}
            />
          </div>
        </div>

        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
          Featured Posts
        </h3>
        <div className="flex gap-6 flex-col md:flex-row">
          <BlogPostCard
            title="Technical Writing: Modern Practice for building Software Documentation in Tech Industry"
            slug="technical-writing-in-software-companies"
            gradient="from-[#F9C823] to-[#FC506E]"
          />
        </div>
        <div className="mt-12">
          <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
           Featured Tech Talks and Podcasts
          </h3>
          <div className="flex gap-6 flex-col md:flex-row">
            <a
              href="https://www.instagram.com/p/CKN8RJRLcqr/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 max-w-full md:max-w-[320px] rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              style={{ minWidth: 0 }}
            >
              <div className="relative w-full h-44 md:h-48">
                <Image
                  src="/public-talks-1.png"
                  alt=""
                  fill
                  className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
              <div className="p-4 flex flex-col gap-2 h-full justify-start">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                  Kickstart Open Source with Git and Versioning | Gitam University
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  This talk covered hands-on training for understanding Git and GitHub end-to-end, including practical guidance on contributing to open source projects like Tensorflow, GitHub Docs, and AngularJS.
                </p>
              </div>
            </a>
            <a
              href="https://x.com/GDG_IGDTUW/status/1353653006760341504"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 max-w-full md:max-w-[320px] rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              style={{ minWidth: 0 }}
            >
              <div className="relative w-full h-44 md:h-48">
                <Image
                  src="/public-talks-2.png"
                  alt=""
                  fill
                  className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
              <div className="p-4 flex flex-col gap-2 h-full justify-start">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                  Tech Talk: Google Developer Community | IGDTUW, New Delhi
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Conducted a full day and interactive session on Open Source, Git, best practices for participating in Hackathons, 
                  and hands-on practical training for students at IGDTUW. Talked about career growth, shared interview preparation, and covered 
                  practical tips for approaching problemns and developing string foundation skills.
                </p>
              </div>
            </a>
          </div>
          <div className="mt-8">
            <Link href="/blog" className="flex text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6">
              Read all posts
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6 ml-1"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
                />
              </svg>
            </Link>
          </div>
        </div>
        <span className="h-16" />
        <Subscribe />
      </div>
      <Footer />
    </Container>
  );
}

