import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';
import { FaXTwitter as FaXTwitter } from 'react-icons/fa6';
import { LuExternalLink } from "react-icons/lu";
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useState, useEffect } from 'react';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';
import { BsStackOverflow } from "react-icons/bs";
import { TypeAnimation } from 'react-type-animation';

import Container from 'components/Container';
import avatar from 'public/headshot-dev.jpg';
import avatarBW from 'public/avatar-bw.jpg';
import Footer from 'components/Footer';

export default function About() {
  const { resolvedTheme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);
    
    // Handle resize
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const timeline = [
    {
      company: "The D.E. Shaw Group",
      location: "Hyderabad, India", 
      role: "Senior Technical Writer, Core Tech",
      period: "Oct 2023 - Present",
      bgColor: "dark:bg-green-900/20",
      skills: ["Technical Documentation", "API Documentation", "Process Documentation", "Knowledge Management"],
      details: "Working on internal documentation infrastructure and maintaining technical documentation for various teams. Collaborating with engineering teams to document complex financial systems."
    },
    {
      company: "Chargebee",
      location: "Remote, India",
      role: "Senior Technical Writer (Product)",
      period: "Sept 2021 - Oct 2022", 
      bgColor: "dark:bg-blue-900/20",
      skills: ["API Documentation", "Product Documentation", "Developer Guides", "Technical Content Strategy"],
      details: "Led documentation efforts for subscription management platform. Created comprehensive API documentation and developer guides."
    },
    {
      company: "Personal AI",
      location: "San Diego, CA",
      role: "Engineering Consultant and Documentation Lead",
      period: "Apr 2021 - Jan 2022",
      bgColor: "dark:bg-purple-900/20",
      skills: ["AI/ML Documentation", "Technical Consulting", "Documentation Strategy", "Developer Experience"],
      details: "Developed documentation strategy for AI-powered personal assistant platform. Consulted on technical architecture and documentation infrastructure."
    },
    {
      company: "Tutorialspoint India Pvt Ltd.",
      location: "Hyderabad, India",
      role: "Software Engineer",
      period: "Dec 2020 - Sept 2022",
      bgColor: "dark:bg-gray-900/20",
      skills: ["Full Stack Development", "Technical Writing", "Content Management", "Educational Content"],
      details: "Developed educational content platform features and contributed to technical documentation infrastructure."
    },
    {
      company: "GitHub (GitHub Docs)",
      location: "Remote, India",
      role: "Technical Writer Intern",
      period: "May 2021 - Oct 2021",
      bgColor: "dark:bg-indigo-900/20",
      skills: ["Open Source Documentation", "Git", "GitHub Actions", "Developer Tools"],
      details: "Contributed to GitHub's public documentation, focusing on GitHub Actions and developer tools documentation."
    },
    {
      company: "HackerEarth",
      location: "Remote",
      role: "Software Developer Intern",
      period: "Oct 2020 - Dec 2020",
      bgColor: "dark:bg-lime-900/20",
      skills: ["Python", "Django", "REST APIs", "Developer Tools"],
      details: "Developed features for technical assessment platform and contributed to internal documentation."
    },
    {
      company: "ColoredCow",
      location: "Tehri, Uttarakhand",
      role: "Software Developer",
      period: "June 2020 - Aug 2020",
      bgColor: "dark:bg-teal-900/20",
      skills: ["Web Development", "PHP", "Laravel", "MySQL"],
      details: "Worked on web development projects and contributed to client documentation."
    }
  ];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = timeline.length - 1;
      if (newIndex >= timeline.length) newIndex = 0;
      return newIndex;
    });
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  return (
    <Container title="About – Dev">
      <div className="flex flex-col justify-center items-start max-w-xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 text-black dark:text-white">
          About Me
        </h1>
        <div className="mb-6 prose dark:prose-dark leading-6">
          <div className="flex items-center gap-1 mb-6">
            <Link href="https://twitter.com/codewithdev" className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
              <FaXTwitter className="w-4 h-4 text-gray-800 dark:text-white" />
            </Link>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <Link href="https://github.com/codewithdev" className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
              <FaGithub className="w-4 h-4 text-gray-800 dark:text-white" />
            </Link>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <Link href="https://codewithdev.github.io/hosted-resume" className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
              <LuExternalLink className="w-4 h-4 text-green-600" />
            </Link>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <Link href="https://www.linkedin.com/in/idevprakaash" className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
              <FaLinkedin className="w-4 h-4 text-[#0077b5]" />
            </Link>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <Link href="https://stackoverflow.com/users/13662843/codewithdev" className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
            <BsStackOverflow className='w-4 h-4 text-[#0077b5]'/>
            </Link>
          </div>
          <div className="h-12">
            <TypeAnimation
              sequence={[
                'Technical Writer and Open Source Developer',
                1000,
                'Community Builder and Tech Speaker',
                1000,
                'Product Builder Enthusiast and a Teacher',
              ]}
              wrapper="p"
              speed={50}
              repeat={Infinity}
              className="text-lg text-gray-800 dark:text-gray-200"
            />
          </div>
          <h3 className="mb-1">Work Experience</h3>
          <div className="relative h-[500px] md:h-[400px] w-full">
            <div className="absolute inset-0 flex items-center justify-between z-10 px-2">
              {currentIndex !== 0 && (
                <button 
                  onClick={() => paginate(-1)}
                  className="bg-white dark:bg-gray-800 rounded-full p-1 shadow-md hover:scale-105 transition-transform"
                >
                  <BsArrowLeftCircle className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
              )}
              {currentIndex !== timeline.length - 1 && (
                <button 
                  onClick={() => paginate(1)}
                  className="ml-auto bg-white dark:bg-gray-800 rounded-full p-1 shadow-md hover:scale-105 transition-transform"
                >
                  <BsArrowRightCircle className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
              )}
            </div>
            
            <div className="relative h-full flex justify-center items-center overflow-hidden">
              {[-1, 0, 1].map((offset) => {
                const index = (currentIndex + offset + timeline.length) % timeline.length;
                const shouldShow = !(
                  (currentIndex === 0 && offset === -1) || 
                  (currentIndex === timeline.length - 1 && offset === 1)
                );
                
                return shouldShow && (
                  <motion.div
                    key={index}
                    initial={false}
                    animate={{
                      scale: offset === 0 ? 1 : 0.6,
                      x: offset * (windowWidth < 768 ? 120 : 260),
                      opacity: offset === 0 ? 1 : 0.15,
                      zIndex: offset === 0 ? 2 : 0,
                      filter: offset === 0 ? 'blur(0px)' : 'blur(4px)',
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut"
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={handleDragEnd}
                    className={`absolute w-[90vw] sm:w-full max-w-[300px] ${
                      offset === 0 
                        ? 'pointer-events-auto backdrop-blur-none' 
                        : 'pointer-events-none backdrop-blur-sm'
                    }`}
                  >
                    <div className={`${timeline[index].bgColor} p-3 md:p-4 rounded-lg
                      dark:border dark:border-gray-700 transition-colors duration-300 
                      relative overflow-hidden ${
                        offset === 0 
                          ? 'shadow-lg ring-1 ring-gray-900/5 dark:ring-white/10' 
                          : 'shadow-none opacity-50'
                      }`}
                    >
                      <div className="flex flex-col items-start space-y-0.5">
                        <span className="text-xs text-gray-500 dark:text-gray-400">{timeline[index].period}</span>
                        <h4 className="text-base text-gray-900 dark:text-white">{timeline[index].company}</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{timeline[index].role}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">{timeline[index].location}</p>
                        
                        <div className="mt-2 flex flex-wrap gap-1">
                          {timeline[index].skills.map((skill, skillIndex) => (
                            <span 
                              key={skillIndex}
                              className="px-2 py-1 text-xs rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <h3>Brief, 3rd Person</h3>
          <p>
            Dev is an experienced professional technical writer, community builder, product builder, teacher, and part time open source developer. His capabilities and interests span across domains of technical writing, public speaking, writing, and open source development. He has diverse set of open source contributions across Microsoft Docs, GitHub Docs, Circle CI, and many other open source softwares and communities.
            As a public speaker and community builder, he delivered tech talks and hosted workshops on various open source technologies in Python, AI, and Cloud technologies.
            His industry level experience involves working with SaaS companies, EdTech, Finance (HFTs), AI/ML and API focused companies.
          </p>
          <h3>Long, 1st Person</h3>
          <p>
            Hey👋, I'm Dev. I'm currently working with a global HFT and investment firm as a Technical Writer. As a Technical Writer, I spend my most time in bridging the technical information gap between various groups/teams across the organization while working with engineering team, product team, and leaderships in an agile environment. 
            Over the years, I have worked with multiple companies from SaaS, FinTech, EdTech, AI, and others.
            My work involves analyzing, ideating, and shipping the product faster and ensuring the accurate and up-to-date technical information is delivered to the clients. After office hours, I love to explore new technologies, build stuffs, and contribute to open source technolgies and softwares.
          </p>
          <h3>Education</h3>
          <p>
            I am a computer science graduate (Masters in Computer Applications, MCA) from <Link href="https://knit.ac.in" className="text-blue-600 dark:text-blue-400 hover:underline">Kamla Nehru Institute of Technology</Link> (<Link href="https://maps.app.goo.gl/Ld4Ld6Ue5Vy4Yvxz7" className="text-blue-600 dark:text-blue-400 hover:underline">Sultanpur, Uttar Pradesh, India</Link>) from 2021 batch.
          </p>
          <h2>Headshots</h2>
          <div className="flex space-x-8">
            <Link href="/headshot-dev.jpg" className="rounded-md">
              <Image
                alt="Dev"
                width={300}
                quality={100}
                src={avatar}
                className="rounded-md grayscale dark:grayscale"
              />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </Container>
  );
}
