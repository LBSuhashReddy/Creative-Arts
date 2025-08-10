import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { listenToUserConversations, listenToMessages, sendMessage } from '../../services/chatService';
import { getUserProfile } from '../../services/userService'; // Assuming you have a function to get a single user's profile

// --- Helper Icons ---
const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
);

// --- InboxPage Component ---
const InboxPage = () => {
    const { currentUser } = useAuth();
    const [conversations, setConversations] = useState([]);
    const [selectedConversationId, setSelectedConversationId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [participants, setParticipants] = useState({});
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    // Effect to scroll to the bottom of the messages list
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Effect to listen for the user's conversations
    useEffect(() => {
        // If there's no user, stop loading and clear data.
        if (!currentUser) {
            setLoading(false);
            return;
        }

        setLoading(true);
        // This listener will run once and update in real-time
        const unsubscribe = listenToUserConversations(currentUser.uid, async (convs) => {
            // Handle the case where the user has no conversations
            if (convs.length === 0) {
                setConversations([]);
                setParticipants({});
                setLoading(false);
                return;
            }

            // Fetch profile details for any participants we haven't seen before
            const participantIds = convs.map(c => c.participantIds.find(id => id !== currentUser.uid));
            const newParticipantIds = participantIds.filter(id => id && !participants[id]);

            if (newParticipantIds.length > 0) {
                const participantPromises = newParticipantIds.map(id => getUserProfile(id));
                const profiles = await Promise.all(participantPromises);
                
                const newParticipants = {};
                profiles.forEach((profile, index) => {
                    if (profile) {
                        newParticipants[newParticipantIds[index]] = profile;
                    }
                });
                setParticipants(prev => ({ ...prev, ...newParticipants }));
            }
            
            setConversations(convs);
            // Automatically select the first conversation if none is selected
            if (!selectedConversationId) {
                setSelectedConversationId(convs[0].id);
            }
            setLoading(false);
        });

        // Cleanup the listener when the component unmounts or the user changes
        return () => unsubscribe();
    }, [currentUser]); // THE FIX: This effect ONLY re-runs if the currentUser changes.

    // Effect to listen for messages in the selected conversation
    useEffect(() => {
        // If no conversation is selected, do nothing.
        if (!selectedConversationId) {
            setMessages([]);
            return;
        };

        const unsubscribe = listenToMessages(selectedConversationId, setMessages);
        return () => unsubscribe();
    }, [selectedConversationId]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === '' || !selectedConversationId) return;

        const message = {
            text: newMessage,
            senderId: currentUser.uid,
        };

        try {
            await sendMessage(selectedConversationId, message);
            setNewMessage('');
        } catch (error) {
            console.error("Failed to send message:", error);
            // Optionally, show an error to the user
        }
    };

    if (loading) {
        return <div className="text-center py-20">Loading conversations...</div>;
    }

    const selectedConversation = conversations.find(c => c.id === selectedConversationId);

    return (
        <div className="container mx-auto h-[calc(100vh-8rem)]">
            <div className="bg-white rounded-2xl shadow-xl h-full flex">
                {/* Left Column: Conversation List */}
                <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800">Chats</h2>
                    </div>
                    <div>
                        {conversations.length > 0 ? conversations.map(conv => {
                            const otherParticipantId = conv.participantIds.find(id => id !== currentUser.uid);
                            const otherParticipant = participants[otherParticipantId];
                            const lastMessage = conv.lastMessage;

                            return (
                                <div
                                    key={conv.id}
                                    onClick={() => setSelectedConversationId(conv.id)}
                                    className={`p-4 flex items-center cursor-pointer transition-colors duration-200 ${
                                        selectedConversationId === conv.id ? 'bg-indigo-50' : 'hover:bg-gray-50'
                                    }`}
                                >
                                    <img src={otherParticipant?.profileImageUrl || 'https://i.pravatar.cc/150'} alt={otherParticipant?.name} className="w-12 h-12 rounded-full object-cover" />
                                    <div className="ml-4 flex-grow overflow-hidden">
                                        <h3 className="font-bold text-gray-800">{otherParticipant?.name || '...'}</h3>
                                        <p className="text-sm text-gray-500 truncate">{lastMessage?.text || 'No messages yet'}</p>
                                    </div>
                                </div>
                            );
                        }) : (
                            <p className="p-4 text-center text-gray-500">No conversations yet.</p>
                        )}
                    </div>
                </div>

                {/* Right Column: Chat Window */}
                <div className="w-2/3 flex flex-col">
                    {selectedConversation ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b border-gray-200 flex items-center">
                                <img src={participants[selectedConversation.participantIds.find(id => id !== currentUser.uid)]?.profileImageUrl || 'https://i.pravatar.cc/150'} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                                <h3 className="ml-4 font-bold text-xl text-gray-800">{participants[selectedConversation.participantIds.find(id => id !== currentUser.uid)]?.name}</h3>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-grow p-6 overflow-y-auto">
                                <div className="space-y-4">
                                    {messages.map(msg => (
                                        <div key={msg.id} className={`flex ${msg.senderId === currentUser.uid ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                                                msg.senderId === currentUser.uid 
                                                ? 'bg-indigo-600 text-white' 
                                                : 'bg-gray-200 text-gray-800'
                                            }`}>
                                                <p>{msg.text}</p>
                                                <p className={`text-xs mt-1 ${msg.senderId === currentUser.uid ? 'text-indigo-200' : 'text-gray-500'} text-right`}>
                                                    {msg.timestamp?.toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) || ''}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>

                            {/* Message Input */}
                            <div className="p-4 bg-gray-50 border-t border-gray-200">
                                <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-grow px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <button type="submit" className="p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                                        <SendIcon />
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">Select a conversation to start chatting.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InboxPage;
