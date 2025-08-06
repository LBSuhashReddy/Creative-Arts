import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext'; // To identify the current user

// --- Helper Icons ---
const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
);

// --- Placeholder Data ---
// In a real app, this would come from your AuthContext and Firestore
const currentUserId = 'currentUser'; // A mock ID for the logged-in user
const allUsers = {
    'currentUser': { name: 'Jojo', avatarUrl: 'https://i.pravatar.cc/150?u=jojo' },
    '1': { name: 'Suhas Kumar', avatarUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=100' },
    '2': { name: 'Priya Sharma', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
};

const conversationsData = [
    {
        id: 'conv1',
        participantIds: ['currentUser', '2'], // Chat with Priya Sharma
        messages: [
            { id: 'msg1', text: 'Hi Priya, I love your "Azure Depths" piece! Is it still available?', senderId: 'currentUser', timestamp: '10:30 AM' },
            { id: 'msg2', text: 'Hey Jojo! Thank you so much. Yes, it is!', senderId: '2', timestamp: '10:31 AM' },
        ]
    },
    {
        id: 'conv2',
        participantIds: ['currentUser', '1'], // Chat with Suhas Kumar
        messages: [
            { id: 'msg3', text: 'Hey, are you free to collaborate on a project?', senderId: '1', timestamp: 'Yesterday' },
        ]
    }
];

// --- InboxPage Component ---
const InboxPage = () => {
    const [conversations, setConversations] = useState(conversationsData);
    const [selectedConversationId, setSelectedConversationId] = useState(conversationsData[0].id);
    const [newMessage, setNewMessage] = useState('');

    const selectedConversation = conversations.find(c => c.id === selectedConversationId);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const message = {
            id: `msg${Date.now()}`,
            text: newMessage,
            senderId: currentUserId,
            timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };

        // Update the state to simulate sending a message
        const updatedConversations = conversations.map(conv => {
            if (conv.id === selectedConversationId) {
                return { ...conv, messages: [...conv.messages, message] };
            }
            return conv;
        });
        setConversations(updatedConversations);
        setNewMessage('');
    };

    return (
        <div className="container mx-auto h-[calc(100vh-8rem)]">
            <div className="bg-white rounded-2xl shadow-xl h-full flex">
                {/* Left Column: Conversation List */}
                <div className="w-1/3 border-r border-gray-200">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800">Chats</h2>
                    </div>
                    <div>
                        {conversations.map(conv => {
                            const otherParticipantId = conv.participantIds.find(id => id !== currentUserId);
                            const otherParticipant = allUsers[otherParticipantId];
                            const lastMessage = conv.messages[conv.messages.length - 1];

                            return (
                                <div
                                    key={conv.id}
                                    onClick={() => setSelectedConversationId(conv.id)}
                                    className={`p-4 flex items-center cursor-pointer transition-colors duration-200 ${
                                        selectedConversationId === conv.id ? 'bg-indigo-50' : 'hover:bg-gray-50'
                                    }`}
                                >
                                    <img src={otherParticipant.avatarUrl} alt={otherParticipant.name} className="w-12 h-12 rounded-full object-cover" />
                                    <div className="ml-4 flex-grow">
                                        <h3 className="font-bold text-gray-800">{otherParticipant.name}</h3>
                                        <p className="text-sm text-gray-500 truncate">{lastMessage.text}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Column: Chat Window */}
                <div className="w-2/3 flex flex-col">
                    {selectedConversation ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b border-gray-200 flex items-center">
                                <img src={allUsers[selectedConversation.participantIds.find(id => id !== currentUserId)].avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                                <h3 className="ml-4 font-bold text-xl text-gray-800">{allUsers[selectedConversation.participantIds.find(id => id !== currentUserId)].name}</h3>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-grow p-6 overflow-y-auto">
                                <div className="space-y-4">
                                    {selectedConversation.messages.map(msg => (
                                        <div key={msg.id} className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                                                msg.senderId === currentUserId 
                                                ? 'bg-indigo-600 text-white' 
                                                : 'bg-gray-200 text-gray-800'
                                            }`}>
                                                <p>{msg.text}</p>
                                                <p className={`text-xs mt-1 ${msg.senderId === currentUserId ? 'text-indigo-200' : 'text-gray-500'} text-right`}>{msg.timestamp}</p>
                                            </div>
                                        </div>
                                    ))}
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
