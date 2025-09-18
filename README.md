News Chatbot Frontend
A modern, responsive React frontend for a RAG-powered chatbot with session management, citations, and smooth UX.

## 🚀 Tech Stack
- React 18 (functional components)
- React Hooks: `useState`, `useEffect`, `useRef`, `useCallback`
- Axios (HTTP client)
- Create React App (build tooling)
- SCSS for styling

## 📁 Folder Structure
```
RagChatbotFrontend/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── App.scss
│   ├── index.js
│   ├── index.css
│   ├── hooks/
│   │   └── useChat.js
│   ├── components/
│   │   ├── Header.js
│   │   ├── InputForm.js
│   │   ├── MessageItem.js
│   │   └── MessageList.js
│   └── services/
│       └── api.js
├── package.json
└── README.md
```

## 🔌 API Endpoints Used (Frontend → Backend)
Base URL is configured by `REACT_APP_API_URL` at build time. Example: `https://ragchatbotbackend-osbu.onrender.com`.

- POST `/api/sessions`
  - Purpose: Create a new chat session
  - Request body: `{}`
  - Response: `{ "sessionId": string }`

- GET `/api/sessions/{sessionId}/history`
  - Purpose: Fetch chat history for a session
  - Response: `{ "history": Message[] }`

- DELETE `/api/sessions/{sessionId}`
  - Purpose: Clear a chat session and its messages
  - Response: `{ "ok": true }` (shape may vary)

- POST `/api/chat`
  - Purpose: Send a message and receive assistant reply with citations
  - Request body:
    ```json
    {
      "sessionId": "string",
      "message": "string"
    }
    ```
  - Response:
    ```json
    {
      "response": "string",
      "passages": [
        { "title": "string", "url": "string", "score": number, "snippet": "string" }
      ]
    }
    ```

- GET `/api/health`
  - Purpose: Backend health check
  - Response: `{ "status": "ok" }` (shape may vary)

## 💬 Message Model (UI)
The UI renders a normalized message list. Types and fields used by the frontend:

```json
// User message
{
  "id": number,
  "type": "user",
  "content": "string",
  "timestamp": "ISO-8601"
}

// Bot message
{
  "id": number,
  "type": "bot",
  "content": "string",
  "passages": [
    { "title": "string", "url": "string", "score": number, "snippet": "string" }
  ],
  "timestamp": "ISO-8601",
  "isError": boolean // only present for error messages
}
```

## 🧠 Hook Behavior (`src/hooks/useChat.js`)
- Initializes a session on first load, persisted in `sessionStorage` as `chatSessionId`.
- Loads session history; if the backend returns 404/500, treats history as empty to avoid blocking the UI.
- Shows a typing indicator while awaiting responses.
- Supports clearing the session (server + local state) and re-initializing.

## ⚙️ Environment Configuration
This project uses Create React App. Any variables used in the client bundle must be prefixed with `REACT_APP_`.

- `REACT_APP_API_URL`
  - Description: Backend base URL used by the Axios service
  - Example: `https://ragchatbotbackend-osbu.onrender.com`
  - Note: Values of `REACT_APP_*` are baked into the build. Do not put secrets here.

To run locally:
```
npm install
REACT_APP_API_URL=http://localhost:5000 npm start
```

## 🧪 Development
- Start: `npm start`
- Lint: `npm run lint`
- Build: `npm run build`

## 🔒 Security Notes
- Avoid committing `.env` files. Do not store secrets in `REACT_APP_*` variables.
- Backend must set CORS to allow the frontend origin.

## 📦 Deployment
- Set `REACT_APP_API_URL` in your hosting environment to point at the backend.
- If you prefer not to embed `REACT_APP_API_URL`, use hosting-layer rewrites to proxy `/api/*` to your backend and keep the frontend calling relative paths.

## ✨ UI Highlights
- Responsive layout with smooth animations
- Clear separation of user vs bot messages
- Typing indicator and error message rendering

## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss your proposed changes.