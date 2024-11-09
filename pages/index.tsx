import { Suspense, useState, useEffect } from 'react';
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
    <Suspense fallback={null}>
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
               An Open Source developer with passion to code, write and build stuffs.</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-16">
                Helping Developers and Businesses to ship better software documentation. Contributing to Open Source, Data Science/ML Enthusiast, and building communities.
              </p>
            </div>
            <div className="w-[80px] sm:w-[176px] relative mb-8 sm:mb-0 mr-auto">
              <Image
                alt="Dev Prakash Sharma"
                height={176}
                width={176}
                src="/headshot-dev.jpg"
                sizes="30vw"
                priority
                className={`rounded-full ${resolvedTheme === 'dark' ? 'grayscale' : ''}`}
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
          <Link href="/blog" className="flex mt-8 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6">
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
          <span className="h-16" />
          <Subscribe />
        </div>
        <Footer />
      </Container>
    </Suspense>
  );
}