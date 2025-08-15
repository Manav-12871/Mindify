# Mindify Fullstack Chat

Mindify is a fullstack chat application powered by the Gemini API. It features a modern, responsive UI and allows users to interact with an AI chatbot.

## Features
- AI-powered chat using Gemini API
- Beautiful, responsive design (see `style.css`)
- Express.js backend
- Easy setup and usage

## Project Structure
```
├── index.html        # Main HTML file
├── index.js          # Express server and API logic
├── script.js         # Frontend JS (chat logic)
├── style.css         # App styling
├── generated-icon.png# App icon
├── package.json      # Node dependencies
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- Gemini API key (from Google)

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd Mindify_Fullstack-my-feature
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

### Running the App
Start the server:
```bash
node index.js
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
- Type your message in the chat box and interact with the AI.
- The backend handles requests to the Gemini API and returns responses.

## Customization
- Edit `style.css` for UI changes.
- Update `index.js` for backend logic.
- Modify `script.js` for frontend chat features.

## License
MIT
