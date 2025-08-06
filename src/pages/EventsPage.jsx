import React, { useState, useEffect, useRef, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase'; // Assuming your firebase config is here

// --- Event Service Logic ---
/**
 * Fetches all events from the 'events' collection in Firestore.
 * @returns {Promise<Array>} A promise that resolves to an array of event objects.
 */
const getAllEvents = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const events = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // Convert Firestore Timestamp to JavaScript Date object
            events.push({ 
                id: doc.id, 
                ...data,
                date: data.date.toDate().toISOString() // Convert to ISO string for consistency
            });
        });
        return events;
    } catch (error) {
        console.error("Error fetching events: ", error);
        throw new Error("Could not fetch events from the database.");
    }
};


// --- Helper Icons ---
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
    
    if (!minDate || !maxDate) return null;

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
    const [allEvents, setAllEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [sliderValue, setSliderValue] = useState(0);
    const [filter, setFilter] = useState('Upcoming');
    const eventRefs = useRef({});

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const eventsFromDb = await getAllEvents();
                setAllEvents(eventsFromDb);
            } catch (err) {
                setError('Failed to load events.');
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const now = new Date();
    const sortedEvents = allEvents
        .filter(event => {
            const eventDate = new Date(event.date);
            if (filter === 'Upcoming') return eventDate >= now;
            if (filter === 'Past') return eventDate < now;
            return true;
        })
        .sort((a, b) => {
             return filter === 'Past' 
                ? new Date(b.date) - new Date(a.date)
                : new Date(a.date) - new Date(b.date);
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
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
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

    if (loading) return <div className="text-center py-20">Loading events...</div>;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

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
