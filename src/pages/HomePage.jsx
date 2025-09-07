import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// --- Helper Hook for Scroll Animations ---
const useScrollAnimation = () => {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  return ref;
};

// --- Helper Illustrations for Cards & Sections ---
const EventsIllustration = () => (
    <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="10" width="60" height="40" rx="4" fill="#E0E7FF"/>
        <path d="M20 20H80" stroke="#6366F1" strokeWidth="2"/>
        <circle cx="70" cy="18" r="3" fill="#C7D2FE"/>
        <path d="M50 50L45 65H55L50 50Z" fill="#A5B4FC"/>
        <circle cx="50" cy="45" r="5" fill="#818CF8"/>
    </svg>
);
const ExhibitionIllustration = () => (
    <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="15" width="30" height="40" rx="3" fill="#E0E7FF"/>
        <circle cx="25" cy="35" r="5" fill="#A5B4FC"/>
        <path d="M70 70L65 55H75L70 70Z" fill="#A5B4FC"/>
        <circle cx="70" cy="50" r="5" fill="#818CF8"/>
        <path d="M68 50L50 35" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);
const ArtistsIllustration = () => (
    <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 70L25 55H35L30 70Z" fill="#A5B4FC"/>
        <circle cx="30" cy="50" r="5" fill="#818CF8"/>
        <rect x="60" y="20" width="25" height="35" rx="4" fill="#E0E7FF"/>
        <path d="M72.5 40L65 55" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);
const CommissionIllustration = () => (
    <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 70L20 55H30L25 70Z" fill="#A5B4FC"/>
        <circle cx="25" cy="50" r="5" fill="#818CF8"/>
        <path d="M75 70L70 55H80L75 70Z" fill="#C7D2FE"/>
        <circle cx="75" cy="50" r="5" fill="#A5B4FC"/>
        <path d="M30 55H70" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);
const ContactIllustration = () => (
    <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="75" cy="75" r="60" fill="#E0E7FF"/>
        <path d="M75 120L65 95H85L75 120Z" fill="#A5B4FC"/>
        <circle cx="75" cy="85" r="10" fill="#818CF8"/>
        <rect x="50" y="40" width="50" height="30" rx="5" fill="#C7D2FE"/>
        <path d="M55 55H95" stroke="#6366F1" strokeWidth="3"/>
    </svg>
);

const HomePage = () => {
  // --- Animation Refs ---
  const heroRef = useScrollAnimation();
  const highlightsTitleRef = useScrollAnimation();
  const highlightCard1Ref = useScrollAnimation();
  const highlightCard2Ref = useScrollAnimation();
  const highlightCard3Ref = useScrollAnimation();
  const highlightCard4Ref = useScrollAnimation();
  const aboutRef = useScrollAnimation();
  const contactRef = useScrollAnimation();

  return (
    <>
      <style>{`
        .fade-in-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .fade-in-up.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="bg-gray-50 text-gray-800">
        {/* --- Hero Section --- */}
        <section ref={heroRef} className="fade-in-up container mx-auto text-center py-24 md:py-32">
          <h1 className="text-5xl md:text-8xl font-bold text-gray-900">
            Creative Arts
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mt-10">
            Create, Inspire, Share and Unleash Creativity
          </p>
        </section>

        {/* --- Highlights Section --- */}
        <section className="py-20">
          <div className="container mx-auto text-center">
            <h2 ref={highlightsTitleRef} className="fade-in-up text-4xl font-bold text-gray-900 mb-12">Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card 1 */}
              <div ref={highlightCard1Ref} className="fade-in-up bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <EventsIllustration />
                <h3 className="text-xl font-bold mt-4">Events </h3>
              </div>
              {/* Card 2 */}
              <div ref={highlightCard2Ref} className="fade-in-up bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2" style={{ transitionDelay: '150ms' }}>
                <ExhibitionIllustration />
                <h3 className="text-xl font-bold mt-4">E-Art Exhibition</h3>
              </div>
              {/* Card 3 */}
              <div ref={highlightCard3Ref} className="fade-in-up bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2" style={{ transitionDelay: '300ms' }}>
                <ArtistsIllustration />
                <h3 className="text-xl font-bold mt-4">Artists</h3>
              </div>
              {/* Card 4 */}
              <div ref={highlightCard4Ref} className="fade-in-up bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2" style={{ transitionDelay: '450ms' }}>
                <CommissionIllustration />
                <h3 className="text-xl font-bold mt-4">Commissioned Work</h3>
              </div>
            </div>
          </div>
        </section>

        {/* --- About Us Section --- */}
        <section ref={aboutRef} className="fade-in-up py-20 bg-white">
            <div className="container mx-auto max-w-4xl text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">About Us</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Welcome to the Creative Arts Club, where passion meets canvas and creativity knows no bounds. We are a vibrant community of artists, thinkers, and creators dedicated to fostering a supportive and inspiring environment. Whether you're a seasoned painter or a curious beginner, our club offers a space to explore your artistic potential, collaborate with peers, and share your unique vision with the world. Join us to be a part of something beautiful.
                </p>
            </div>
        </section>

        {/* --- Contact Us Section --- */}
        <section ref={contactRef} className="fade-in-up py-20">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-indigo-50 rounded-2xl p-10 shadow-lg flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
                        <form className="space-y-4">
                            <input type="text" placeholder="Name" className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            <input type="email" placeholder="Email" className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            <textarea placeholder="Message" rows="4" className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors">Send Message</button>
                        </form>
                    </div>
                    <div className="hidden md:block">
                       <ContactIllustration />
                    </div>
                </div>
            </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;

