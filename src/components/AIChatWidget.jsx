import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, X, Send, Settings, Sparkles, Volume2, VolumeX, Upload } from 'lucide-react';

// --- Constants ---

const DEFAULT_AVATAR = "/sugrivlodhi.png"; 

const DEFAULT_KNOWLEDGE_BASE = `

You are the AI Clone of Sugriv Lodhi.

Here is your persona and verified data:

NAME: Sugriv Lodhi

ROLE: Full Stack Developer

EXPERIENCE:
- 3+ years of experience in Full Stack Development
- Strong knowledge of JavaScript, TypeScript, and scalable system design
- Hands-on experience in both frontend & backend development
- Practical experience deploying and managing applications on AWS

TECH STACK & SKILLS:

FRONTEND:
- JavaScript, TypeScript
- React.js, Next.js
- Material-UI (MUI), Tailwind CSS
- Responsive UI, SEO Optimization

BACKEND:
- Node.js, Express.js
- Sequelize ORM, Prisma ORM
- REST APIs, Cron Jobs, Microservices

DATABASES:
- PostgreSQL, MongoDB
- Designing relational models (City–State–Country, FamilyMember, Sangh)
- Managing complex associations and data flows

AWS & DEVOPS:
- EC2 (deployment, PM2 process manager)
- RDS & Aurora (PostgreSQL setup, subnet groups, security groups)
- S3 (file storage)
- VPC, Subnets, Security Groups
- IAM roles & access control
- Basic understanding of Load Balancers, CloudFront, Route 53
- Git, GitHub workflow

PAYMENTS & INTEGRATIONS:
- Razorpay Webhooks: payment capture, status processing, email notifications
- Power BI: fetching dashboards with relational logic

EMAIL AUTOMATION EXPERIENCE:
- Created professional email templates for:
  - Trial period start
  - Grace period start
  - Congratulations messages
  - Regret emails
  - Partner & Admin invoice notifications
- Developed common reusable template structures

PROJECT EXPERIENCE (REAL WORK DONE BY YOU):
- Built multiple full-stack modules involving:
  - Plan and trial management with Active / Inactive / Grace / Trial states
  - Cron Job to auto-update plan status after 7 days
  - Power BI dashboard fetching with user validation
  - Microservice architecture (Order → PostgreSQL, User/Product → MongoDB)
  - Next.js SEO for all pages including dynamic blogs
  - React UI conversions of HTML templates (navbar, forms, sections, footer)
  - Custom components with MUI including Autocomplete, DataGrid, inputs
  - Register/Login forms with password visibility toggle
  - Razorpay payment webhook handler with email notifications
  - Managing alerts and state based on company/order data

BIO:
A passionate Full Stack Developer who loves building clean, modern, and scalable applications. Strong believer in writing maintainable code and improving systems with best practices. Always eager to learn new technologies and solve meaningful problems.

CONTACT:
You can reach out via the portfolio contact form or linked social media.

AVAILABILITY:
Open to freelance projects, collaborations, and new opportunities.

TONE:
Friendly, confident, professional, and concise.

GUIDELINES:
If asked something outside this knowledge base, respond:
"I'm not entirely sure about that detail, but feel free to reach out to me directly through the contact form or social media links on my portfolio!"

`;


// --- Components ---

const AvatarFace = ({ isSpeaking, mousePos, avatarUrl }) => {
  // Calculate parallax effect based on mouse position
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
  const moveX = (mousePos.x / windowWidth - 0.5) * 10;
  const moveY = (mousePos.y / windowHeight - 0.5) * 10;

  return (
    <div className="relative mx-auto mb-2 w-24 h-24 group">
      {/* Main Avatar Container with Parallax */}
      <div 
        className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-xl overflow-hidden relative z-10 transition-transform duration-100 ease-out bg-white"
        style={{ 
          transform: `translate(${moveX}px, ${moveY}px) ${isSpeaking ? 'scale(1.1)' : 'scale(1)'}`,
          boxShadow: isSpeaking ? '0 0 25px rgba(59, 130, 246, 0.6)' : '0 10px 25px -5px rgba(0, 0, 0, 0.15)'
        }}
      >
        {/* User Image */}
        <img
          src={avatarUrl} 
          alt="AI Avatar" 
          className="w-full h-full object-cover"
        />
        
        {/* Speaking Overlay (Simulates mouth movement/activity) */}
        {isSpeaking && (
          <div className="absolute inset-0 bg-white/10 animate-pulse mix-blend-overlay"></div>
        )}
      </div>
      {/* Waving Hand Animation */}
      <div className={`absolute -right-4 bottom-0 z-20 transition-all duration-500 ${isSpeaking || moveX > 2 ? 'opacity-100 rotate-12' : 'opacity-0 rotate-0'}`}>
        <div className="text-4xl animate-[wave_2s_infinite_ease-in-out] origin-bottom-right">
          👋
        </div>
      </div>
      {/* CSS Styles for Animations */}
      <style>{`
        @keyframes wave {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(14deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
          60% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

const ChatMessage = ({ role, text }) => {
  const isUser = role === 'user';
  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
        <div className={`p-3 rounded-2xl text-sm shadow-sm ${
          isUser 
            ? 'bg-blue-600 text-white rounded-tr-none' 
            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-tl-none border border-gray-100 dark:border-gray-700'
        }`}>
          {text}
        </div>
      </div>
    </div>
  );
};

const PortfolioSection = ({ title, icon: Icon, children }) => (
  <div className="mb-12">
    <div className="flex items-center gap-2 mb-4">
      <Icon className="text-blue-600" size={24} />
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
    </div>
    {children}
  </div>
);

const ProjectCard = ({ title, desc, tags }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{desc}</p>
    <div className="flex gap-2 flex-wrap">
      {tags.map(tag => (
        <span key={tag} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs rounded-md font-medium">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export default function AIChatWidget() {
  // --- State ---
  const [isOpen, setIsOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  const [apiKey, setApiKey] = useState('AIzaSyBmDuEuwqZNLYH7zw3SriAWMk0xglg3ojg'); 
  const [knowledgeBase, setKnowledgeBase] = useState(DEFAULT_KNOWLEDGE_BASE);
  const [avatarUrl, setAvatarUrl] = useState(DEFAULT_AVATAR);
  const [messages, setMessages] = useState([
    { role: 'model', text: "👋 Hi there! I'm Sugriv's AI assistant. Ask me anything about my work, projects, skills, or experience!" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Voice State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const synth = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const isInitialMount = useRef(true);

  // Define scrollToBottom before using it in useEffect
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // --- Effects ---
  useEffect(() => {
    // Only scroll to bottom if there are new messages (more than just the initial one)
    // Don't scroll on initial mount to keep the welcome message visible
    if (isInitialMount.current) {
      isInitialMount.current = false;
      // Reset scroll to top on initial open to show the welcome message
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = 0;
      }
      return;
    }
    
    // Only auto-scroll if there are more than 1 message (user has sent something)
    if (messages.length > 1) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [messages, scrollToBottom]);

  // Reset scroll position when chat opens
  useEffect(() => {
    if (isOpen && messagesContainerRef.current) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        messagesContainerRef.current.scrollTop = 0;
      }, 50);
    }
  }, [isOpen]);

  // Track mouse movement for eye/head tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !synth.current) return;
    
    // Load voices
    const loadVoices = () => {
      const voices = synth.current.getVoices();
      setAvailableVoices(voices);
      
      // --- MALE VOICE SELECTION LOGIC ---
      const maleVoice = voices.find(v => 
        v.name.includes('Male') || 
        v.name.includes('David') || 
        v.name.includes('Daniel') || 
        v.name.includes('Mark')
      );
      const genericVoice = voices.find(v => v.name.includes('Google US English'));
      setSelectedVoice(maleVoice || genericVoice || voices[0]);
    };
    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
    return () => {
      synth.current.cancel(); 
    };
  }, []);

  // --- Image Upload Handler ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
    }
  };

  // --- Speech Logic ---
  const speak = (text) => {
    if (isMuted || !text || !synth.current) return;
    synth.current.cancel();

    const cleanText = text.replace(/[*#]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    if (selectedVoice) utterance.voice = selectedVoice;
    
    utterance.pitch = 0.9; 
    utterance.rate = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    synth.current.speak(utterance);
  };

  // --- Handlers ---
  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    if (synth.current) {
      synth.current.cancel();
      setIsSpeaking(false);
    }
    
    if (!apiKey) {
      setMessages(prev => [...prev, { role: 'model', text: "⚠️ Please check Settings. API Key is missing." }]);
      return;
    }
    const userMsg = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            ...messages.slice(-6).map(m => ({ 
              role: m.role === 'model' ? 'model' : 'user',
              parts: [{ text: m.text }]
            })),
            { role: 'user', parts: [{ text: currentInput }] }
          ],
          systemInstruction: {
            parts: [{ text: knowledgeBase + " Keep responses conversational, short, and witty." }]
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300,
          }
        })
      });
      const data = await response.json();
      
      let finalBotText;
      
      if (data.error) {
          // Explicit API error (e.g., API key invalid, quota exceeded)
          console.error("Gemini API Error:", data.error.message);
          finalBotText = `🚨 API Error: ${data.error.message}. Please check your API Key and quota in the **Settings (gear icon)**.`;
      } else {
          const candidate = data.candidates?.[0];
          const botText = candidate?.content?.parts?.[0]?.text;
          if (botText) {
              finalBotText = botText;
          } else {
              // No content generated (may be due to safety filters or, most often, placeholder API key)
              finalBotText = "🤔 I received your request, but the model returned an empty response. This often happens if the **API Key** is invalid or has expired. Please double-check it in the **Settings (gear icon)**.";
          }
      }
      
      setMessages(prev => [...prev, { role: 'model', text: finalBotText }]);
      
      // Only speak if it's not an error message
      if (!finalBotText.startsWith("🚨 API Error:") && !finalBotText.startsWith("🤔 I received your request")) {
          speak(finalBotText);
      }
    } catch (error) {
      console.error("AI Error:", error);
      const errorMsg = `Connection glitch: ${error.message}. Please check your API key in the **Settings (gear icon)**.`;
      setMessages(prev => [...prev, { role: 'model', text: errorMsg }]);
      speak(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  // --- Render ---
  return (
    <>
      {/* --- Floating Action Button --- */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999] flex flex-col items-end gap-3">
          {/* Welcome Popup */}
          {showWelcomePopup && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 w-[calc(100vw-3rem)] max-w-[280px] border border-gray-200 dark:border-gray-700 animate-in slide-in-from-bottom-5 fade-in duration-500 relative">
              <button
                onClick={() => setShowWelcomePopup(false)}
                className="absolute top-2 right-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                title="Close"
              >
                <X size={14} className="text-gray-500" />
              </button>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 shadow-md">
                  <img 
                    src={DEFAULT_AVATAR} 
                    alt="Sugriv Lodhi" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-800 dark:text-white">Sugriv Lodhi</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Full Stack Developer</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 pr-4">
                👋 Hi! I am here to help. <strong>Ask me anything</strong> about my work, projects, or skills!
              </p>
              <button 
                onClick={() => {
                  setIsOpen(true);
                  setShowWelcomePopup(false);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <MessageCircle size={16} />
                Start Chatting
              </button>
            </div>
          )}
          {/* Chat Button */}
          <button 
            onClick={() => {
              setIsOpen(true);
              setShowWelcomePopup(false);
            }}
            className="w-14 h-14 md:w-16 md:h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 animate-bounce relative"
            title="Chat with me!"
          >
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            <MessageCircle size={32} />
          </button>
        </div>
      )}
      {/* --- Chat Widget --- */}
      {isOpen && (
        <div 
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999] w-[calc(100vw-2rem)] max-w-[380px] h-[calc(100vh-8rem)] max-h-[650px] min-h-[400px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300"
          style={{
            top: 'auto',
            left: 'auto',
            transform: 'none'
          }}
        >
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
                <img 
                  src={avatarUrl} 
                  alt="Sugriv Lodhi" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles size={16} />
                  <span className="font-bold text-sm tracking-wide">AI Assistant</span>
                </div>
                <p className="text-xs opacity-80">Ask me anything!</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
               <button 
                onClick={() => {
                  setIsMuted(!isMuted);
                  if (!isMuted && synth.current) synth.current.cancel();
                }}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                title={isMuted ? "Unmute Voice" : "Mute Voice"}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <button 
                onClick={() => setIsConfigOpen(!isConfigOpen)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <Settings size={18} />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          {/* Content Container */}
          {isConfigOpen ? (
            <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-800 overflow-y-auto">
               <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">Configuration</h3>
               
               <div className="space-y-4">
                 <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Avatar Photo</label>
                    <div className="flex gap-2 items-center">
                       <div className="relative w-full">
                         <input 
                           type="file" 
                           accept="image/*"
                           onChange={handleImageUpload}
                           className="hidden"
                           id="avatar-upload"
                         />
                         <label 
                           htmlFor="avatar-upload"
                           className="flex items-center justify-center gap-2 w-full p-3 rounded-lg border border-dashed border-blue-400 bg-blue-50 dark:bg-blue-900/20 text-blue-600 cursor-pointer hover:bg-blue-100 transition-colors text-sm font-medium"
                         >
                           <Upload size={16} />
                           Upload Your Photo
                         </label>
                       </div>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">Select "image_2d831f.png" from your device.</p>
                 </div>
                 <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">API Key</label>
                    <input 
                      type="password" 
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm"
                    />
                 </div>
                 <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Knowledge Base</label>
                    <textarea 
                      value={knowledgeBase}
                      onChange={(e) => setKnowledgeBase(e.target.value)}
                      className="w-full h-40 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm font-mono"
                    />
                 </div>
                 <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Voice Selection</label>
                    <select 
                      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm"
                      onChange={(e) => setSelectedVoice(availableVoices.find(v => v.name === e.target.value))}
                      value={selectedVoice?.name}
                    >
                      {availableVoices.map(v => (
                        <option key={v.name} value={v.name}>{v.name}</option>
                      ))}
                    </select>
                 </div>
                 <button 
                    onClick={() => setIsConfigOpen(false)}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                  >
                    Save & Back to Chat
                  </button>
               </div>
            </div>
          ) : (
            <>
              {/* Avatar & Chat Area */}
              <div className="flex-1 overflow-hidden flex flex-col relative bg-gradient-to-b from-blue-50/50 via-white to-white dark:from-gray-800 dark:via-gray-800 dark:to-gray-900">
                
                {/* Welcome Banner */}
                {/* <div className="pt-4 pb-2 px-4 shrink-0 text-center z-10">
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-4 mb-3 border border-blue-200 dark:border-blue-800">
                    <AvatarFace isSpeaking={isSpeaking} mousePos={mousePos} avatarUrl={avatarUrl} />
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-1">Sugriv Lodhi</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Full Stack Developer</p>
                    <p className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center justify-center gap-1">
                      {isSpeaking ? (
                          <>
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                              Speaking...
                          </>
                      ) : isMuted ? "Voice Muted" : "✨ Online & Ready"}
                    </p>
                  </div>
                </div> */}
                {/* Messages */}
                <div 
                  ref={messagesContainerRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  <div className="text-center text-xs text-gray-400 my-2">Today</div>
                  {messages.map((msg, idx) => (
                    <ChatMessage key={idx} role={msg.role} text={msg.text} />
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                       <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 dark:border-gray-700 flex gap-1.5 items-center">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                       </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              {/* Input Area */}
              <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shrink-0">
                <div className="relative flex items-center gap-2">
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="w-full pl-4 pr-12 py-3.5 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isLoading || !inputValue.trim()}
                    className="absolute right-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-md"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

