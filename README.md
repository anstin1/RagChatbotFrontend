News Chatbot Frontend
A modern, responsive React frontend for the RAG-powered news chatbot. Features chat, session management, and source citations.

🚀 Tech Stack
Framework: React 18 with functional components
Styling: SCSS with modern CSS features
HTTP Client: Axios
State Management: React Hooks (useState, useEffect, useRef)
Build Tool: Create React App
UI/UX: Responsive design with animations

✨ Features
📱 Responsive Design: Mobile-first approach with adaptive layouts
🔄 Session Management: Persistent chat history with clear functionality
📚 Source Citations: Display relevant news sources with relevance scores
⚡ Performance: Optimized rendering and smooth animations
🎨 Modern UI: Gradient designs and glassmorphism effects

📁 Project Structure
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── App.js              # Main application component
│   ├── App.scss            # Main stylesheet
│   ├── index.js            # React DOM entry point
│   ├── index.css           # Global styles
│   └── components/         # Additional components (future)
├── package.json            # Dependencies and scripts
├── .env.example           # Environment variables template
└── README.md              # This file

🛠️ Installation & Setup
Prerequisites
Node.js (v16 or higher)
npm or yarn
Backend server running on port 5000

1. Install Dependencies
bash
npm install
# or
yarn install

2. Environment Configuration
Copy .env.example to .env:

bash
cp .env.example .env

Configure environment variables:

env
REACT_APP_API_URL=<your-backend-url>

3. Start Development Server
bash
npm start
# or
yarn start
The application will open at http://localhost:3000.

🎨 UI Components & Features
Chat Interface
Message Types:

User messages (right-aligned, gradient background)
Bot responses (left-aligned, with source citations)
Typing indicators (animated)
Error messages (highlighted)
Interactive Elements:

Auto-scrolling to latest messages
Timestamp display
Clear chat functionality

🔌 API Integration
REST API

javascript
// Create session
const response = await axios.post('/api/sessions');

// Send message
const response = await axios.post('/api/chat', {
  sessionId,
  message
});

// Get history
const response = await axios.get(`/api/sessions/${sessionId}/history`);

📱 Responsive Behavior
Mobile Optimizations
Touch-friendly button sizes (min 44px)
Optimized input fields for mobile keyboards
Swipe-friendly message scrolling
Reduced animations for performance

Desktop Enhancements
Hover states for better interaction feedback
Keyboard shortcuts (Enter to send)
Advanced typography and spacing
Enhanced visual effects

🎨 Theming & Customization
Color Scheme
scss
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$background: rgba(255, 255, 255, 0.95);
$text-primary: #333;
$text-secondary: #666;
$border: #e1e5e9;
$shadow: rgba(0, 0, 0, 0.1);

Typography
scss
$font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto';
$font-sizes: (
  'small': 0.8rem,
  'normal': 1rem,
  'large': 1.2rem,
  'heading': 1.8rem
);

⚡ Performance Optimizations
React Optimizations
Functional Components: Better performance than class components
useRef: Prevent unnecessary re-renders
Conditional Rendering: Efficient DOM updates

CSS Optimizations
SCSS Mixins: Reusable styles for consistency
Variables: Centralized theme values
Minification: Production builds automatically minify CSS

🔒 Security Considerations
Environment variables for API URLs
CORS configured server-side

🧪 Testing
bash
# Run tests
npm test

# Lint code
npm run lint

📈 Deployment
Build the app and serve with Nginx (see Dockerfile in project)

🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

