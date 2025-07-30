import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- Helper Icons (re-used from previous version) ---
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);
const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
);

// --- Manual Event Data ---
const manualEvents = [
  // Existing Events
  { id: 1, title: 'Digital Painting Workshop', category: 'Workshop', date: '2025-08-15T14:00:00', location: 'Digital Arts Lab, Room 202', description: 'Learn the fundamentals of digital painting.', imageUrl: 'https://images.unsplash.com/photo-1558642392-5045a7a7a4a8?w=800' },
  { id: 2, title: 'Annual Art Exhibition', category: 'Exhibition', date: '2025-09-05T18:00:00', location: 'Main College Auditorium', description: 'Showcasing the best works from our members.', imageUrl: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=800' },
  { id: 3, title: 'Guest Talk: Pro Artist Life', category: 'Talk', date: '2025-07-20T16:00:00', location: 'Lecture Hall C', description: 'An inspiring talk with illustrator Jane Doe.', imageUrl: 'https://images.unsplash.com/photo-1582192730842-a62016d53b49?w=800' },
  { id: 4, title: 'Plein Air Painting Session', category: 'Activity', date: '2025-08-02T09:00:00', location: 'College Gardens', description: 'A relaxing outdoor painting session.', imageUrl: 'https://images.unsplash.com/photo-1619899896213-a93f5a5a5f4a?w=800' },
  { id: 5, title: 'Photography Basics', category: 'Workshop', date: '2025-06-10T11:00:00', location: 'Media Lab', description: 'Master your camera settings and composition.', imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800' },
  { id: 6, title: 'Sculpture Introduction', category: 'Workshop', date: '2025-10-01T10:00:00', location: '3D Arts Studio', description: 'Get hands-on with clay and basic sculpting.', imageUrl: 'https://images.unsplash.com/photo-1541696492399-a47a1071d53c?w=800' },
  
  // --- Newly Added Events ---
  { id: 7, title: 'Watercolor Wednesdays', category: 'Activity', date: '2025-05-14T15:00:00', location: 'Art Room 101', description: 'Casual watercolor painting get-together.', imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800' },
  { id: 8, title: 'Graphic Design Crash Course', category: 'Workshop', date: '2025-11-22T10:00:00', location: 'Computer Lab B', description: 'Learn Adobe Illustrator basics in one day.', imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800' },
  { id: 9, title: 'End-of-Year Art Gala', category: 'Exhibition', date: '2025-12-12T19:00:00', location: 'Grand Ballroom', description: 'A formal event to celebrate the year in art.', imageUrl: 'https://images.unsplash.com/photo-1527236438218-d82077ae1f85?w=800' },
  { id: 10, title: 'Figure Drawing Marathon', category: 'Activity', date: '2026-01-18T09:00:00', location: 'Studio 3', description: 'An all-day session with live models.', imageUrl: 'https://images.unsplash.com/photo-1549277124-4421ba1a3963?w=800' },
  { id: 11, title: 'Alumni Artist Spotlight', category: 'Talk', date: '2025-04-25T17:00:00', location: 'Online Webinar', description: 'Featuring successful alumni from our club.', imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800' },
  { id: 12, title: 'Printmaking Techniques', category: 'Workshop', date: '2025-03-19T13:00:00', location: 'Printmaking Studio', description: 'Explore lino-cutting and screen printing.', imageUrl: 'https://images.unsplash.com/photo-1618331834785-907839e35706?w=800' },
  { id: 13, title: 'Club Members Mixer', category: 'Activity', date: '2025-09-19T17:00:00', location: 'Student Lounge', description: 'Get to know your fellow artists.', imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800' },
  { id: 14, title: 'Art History Lecture: Renaissance', category: 'Talk', date: '2025-02-28T12:00:00', location: 'Lecture Hall A', description: 'A deep dive into the masters of the Renaissance.', imageUrl: 'https://images.unsplash.com/photo-1569068543112-865f23485147?w=800' },
  { id: 15, title: 'Ceramics & Pottery Day', category: 'Workshop', date: '2025-11-08T11:00:00', location: 'Ceramics Studio', description: 'Learn to throw on the pottery wheel.', imageUrl: 'https://images.unsplash.com/photo-1555097126-5a33c4a17968?w=800' },
  { id: 16, title: 'Creative Writing for Artists', category: 'Workshop', date: '2026-02-04T18:00:00', location: 'Library Seminar Room', description: 'Learn how to write compelling artist statements.', imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800' },
  { id: 17, title: 'Street Art Tour', category: 'Activity', date: '2025-10-25T10:00:00', location: 'Downtown Meetup Point', description: 'Explore the vibrant street art in our city.', imageUrl: 'https://images.unsplash.com/photo-1541793342895-06f15c456589?w=800' },
  { id: 18, title: 'Portfolio Review Day', category: 'Activity', date: '2025-04-05T13:00:00', location: 'Career Services Office', description: 'Get feedback on your portfolio from professionals.', imageUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=800' },
];

// --- TimelineSlider Component ---
const TimelineSlider = ({ minDate, maxDate, value, onChange }) => {
    const sliderRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDrag = useCallback((clientX) => {
        if (!sliderRef.current) return;
        const rect = sliderRef.current.getBoundingClientRect();
        let newValue = ((clientX - rect.left) / rect.width) * 100;
        newValue = Math.max(0, Math.min(100, newValue));
        onChange(newValue);
    }, [onChange]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging) handleDrag(e.clientX);
        };
        const handleMouseUp = () => setIsDragging(false);
        const handleTouchMove = (e) => {
            if (isDragging) handleDrag(e.touches[0].clientX);
        };
        const handleTouchEnd = () => setIsDragging(false);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isDragging, handleDrag]);
    
    if (!minDate || !maxDate) return null; // Don't render if no events

    const selectedDate = new Date(minDate.getTime() + (maxDate.getTime() - minDate.getTime()) * (value / 100));

    return (
        <div className="w-full px-8">
            <div className="relative py-4">
                <div ref={sliderRef} onMouseDown={(e) => { e.preventDefault(); handleDrag(e.clientX); }} className="h-2 bg-gray-200 rounded-full cursor-pointer">
                    <div className="h-2 bg-indigo-400 rounded-full" style={{ width: `${value}%` }}></div>
                </div>
                <div
                    onMouseDown={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onTouchStart={(e) => { e.preventDefault(); setIsDragging(true); }}
                    className="absolute top-1/2 w-6 h-6 bg-indigo-600 rounded-full border-4 border-white shadow-lg cursor-grab active:cursor-grabbing transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${value}%` }}
                ></div>
            </div>
            <div className="text-center mt-2">
                <p className="text-lg font-semibold text-gray-800">
                    Showing events around: {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
            </div>
        </div>
    );
};

// --- EventCard Component ---
const EventCard = ({ event }) => {
    // Determine if the event is in the past
    const isPast = new Date(event.date) < new Date();

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <img className="w-full h-48 object-cover" src={event.imageUrl} alt={event.title} />
            <div className="p-5 flex flex-col h-full">
                <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
                <div className="flex items-center text-sm text-gray-600 mt-2">
                    <CalendarIcon />
                    <span className="ml-2">{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-700 mt-2 text-sm flex-grow">{event.description}</p>
                {/* Conditional Button Rendering */}
                <button
                    className={`w-full mt-4 py-2 px-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                        isPast 
                        ? 'bg-gray-400 hover:bg-gray-500' 
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                >
                    {isPast ? 'View' : 'Register'}
                </button>
            </div>
        </div>
    );
};

// --- EventsPage Component ---
const EventsPage = () => {
    const [sliderValue, setSliderValue] = useState(0);
    const [filter, setFilter] = useState('Upcoming');
    const eventRefs = useRef({});

    const now = new Date();
    const sortedEvents = manualEvents
        .filter(event => {
            const eventDate = new Date(event.date);
            if (filter === 'Upcoming') return eventDate >= now;
            if (filter === 'Past') return eventDate < now;
            return true;
        })
        .sort((a, b) => {
             return filter === 'Past' 
                ? new Date(b.date) - new Date(a.date) // For past events, show most recent first
                : new Date(a.date) - new Date(b.date); // For upcoming/all, show oldest first
        });

    const minDate = sortedEvents.length > 0 ? new Date(sortedEvents[0].date) : null;
    const maxDate = sortedEvents.length > 0 ? new Date(sortedEvents[sortedEvents.length - 1].date) : null;

    useEffect(() => {
        if (!minDate || !maxDate) return;

        const totalTimeSpan = maxDate.getTime() - minDate.getTime();
        if (totalTimeSpan === 0) return;

        const selectedTime = minDate.getTime() + totalTimeSpan * (sliderValue / 100);

        let closestEventId = null;
        let minDiff = Infinity;

        sortedEvents.forEach(event => {
            const eventTime = new Date(event.date).getTime();
            const diff = Math.abs(eventTime - selectedTime);
            if (diff < minDiff) {
                minDiff = diff;
                closestEventId = event.id;
            }
        });

        if (closestEventId && eventRefs.current[closestEventId]) {
            const headerOffset = 150; 
            const elementPosition = eventRefs.current[closestEventId].getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }, [sliderValue, sortedEvents, minDate, maxDate]);
    
    const FilterButton = ({ value, label }) => (
        <button
          onClick={() => { setFilter(value); setSliderValue(0); }}
          className={`px-6 py-2 rounded-full text-md font-semibold transition-all duration-300 ${
            filter === value
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-200'
          }`}
        >
          {label}
        </button>
    );

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900">Club Events</h1>
                    <p className="text-lg text-gray-600 mt-2">Drag the timeline to explore our events.</p>
                </div>
                
                <div className="sticky top-0 z-10 py-4 bg-gray-50/80 backdrop-blur-sm">
                    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-2xl shadow-lg">
                        <div className="flex justify-center items-center space-x-4 mb-4">
                            {/* Changed Order */}
                            <FilterButton value="All" label="All Events" />
                            <FilterButton value="Past" label="Past" />
                            <FilterButton value="Upcoming" label="Upcoming" />
                        </div>
                        <TimelineSlider
                            minDate={minDate}
                            maxDate={maxDate}
                            value={sliderValue}
                            onChange={setSliderValue}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {sortedEvents.length > 0 ? (
                        sortedEvents.map(event => (
                            <div key={event.id} ref={el => eventRefs.current[event.id] = el}>
                                <EventCard event={event} />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10">
                            <h2 className="text-2xl font-semibold text-gray-700">No {filter.toLowerCase()} events found.</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventsPage;
