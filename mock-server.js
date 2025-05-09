import http from 'http';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sample quiz questions
const mockQuestions = [
  {
    "_id": "1",
    "question": "What is React?",
    "answers": [
      { "text": "A JavaScript library for building user interfaces", "isCorrect": true },
      { "text": "A programming language", "isCorrect": false },
      { "text": "A database system", "isCorrect": false },
      { "text": "A server-side framework", "isCorrect": false }
    ]
  },
  {
    "_id": "2",
    "question": "What is TypeScript?",
    "answers": [
      { "text": "A statically typed superset of JavaScript", "isCorrect": true },
      { "text": "A database system", "isCorrect": false },
      { "text": "A CSS framework", "isCorrect": false },
      { "text": "A testing framework", "isCorrect": false }
    ]
  },
  {
    "_id": "3",
    "question": "What is Node.js?",
    "answers": [
      { "text": "A JavaScript runtime environment", "isCorrect": true },
      { "text": "A database system", "isCorrect": false },
      { "text": "A front-end framework", "isCorrect": false },
      { "text": "A programming language", "isCorrect": false }
    ]
  },
  {
    "_id": "4",
    "question": "What is MongoDB?",
    "answers": [
      { "text": "A NoSQL database", "isCorrect": true },
      { "text": "A SQL database", "isCorrect": false },
      { "text": "A front-end framework", "isCorrect": false },
      { "text": "A back-end framework", "isCorrect": false }
    ]
  },
  {
    "_id": "5",
    "question": "What is Express.js?",
    "answers": [
      { "text": "A web application framework for Node.js", "isCorrect": true },
      { "text": "A database system", "isCorrect": false },
      { "text": "A front-end framework", "isCorrect": false },
      { "text": "A programming language", "isCorrect": false }
    ]
  },
  {
    "_id": "6",
    "question": "What is Vite?",
    "answers": [
      { "text": "A build tool for frontend development", "isCorrect": true },
      { "text": "A database system", "isCorrect": false },
      { "text": "A back-end framework", "isCorrect": false },
      { "text": "A CSS framework", "isCorrect": false }
    ]
  },
  {
    "_id": "7",
    "question": "What is Redux?",
    "answers": [
      { "text": "A state management library", "isCorrect": true },
      { "text": "A database system", "isCorrect": false },
      { "text": "A back-end framework", "isCorrect": false },
      { "text": "A routing library", "isCorrect": false }
    ]
  },
  {
    "_id": "8",
    "question": "What is GraphQL?",
    "answers": [
      { "text": "A query language for APIs", "isCorrect": true },
      { "text": "A database system", "isCorrect": false },
      { "text": "A front-end framework", "isCorrect": false },
      { "text": "A back-end framework", "isCorrect": false }
    ]
  },
  {
    "_id": "9",
    "question": "What is Jest?",
    "answers": [
      { "text": "A JavaScript testing framework", "isCorrect": true },
      { "text": "A build tool", "isCorrect": false },
      { "text": "A state management library", "isCorrect": false },
      { "text": "A CSS framework", "isCorrect": false }
    ]
  },
  {
    "_id": "10",
    "question": "What is Docker?",
    "answers": [
      { "text": "A platform for developing, shipping, and running applications in containers", "isCorrect": true },
      { "text": "A database system", "isCorrect": false },
      { "text": "A front-end framework", "isCorrect": false },
      { "text": "A programming language", "isCorrect": false }
    ]
  }
];

const server = http.createServer(async (req, res) => {
  const url = req.url;
  const method = req.method;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (url === '/api/questions/random' && method === 'GET') {
    // Return mock questions
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(mockQuestions));
    return;
  }

  // Static file serving
  try {
    let filePath;
    
    if (url === '/' || url === '/index.html') {
      filePath = path.join(__dirname, 'client', 'dist', 'index.html');
    } else {
      filePath = path.join(__dirname, 'client', 'dist', url);
    }

    const stat = await fs.stat(filePath).catch(() => null);
    
    if (stat && stat.isFile()) {
      const content = await fs.readFile(filePath);
      
      // Set content type
      const ext = path.extname(filePath);
      let contentType = 'text/html';
      
      switch (ext) {
        case '.js':
          contentType = 'text/javascript';
          break;
        case '.css':
          contentType = 'text/css';
          break;
        case '.json':
          contentType = 'application/json';
          break;
        case '.png':
          contentType = 'image/png';
          break;
        case '.jpg':
          contentType = 'image/jpg';
          break;
        case '.svg':
          contentType = 'image/svg+xml';
          break;
      }
      
      res.setHeader('Content-Type', contentType);
      res.statusCode = 200;
      res.end(content);
      return;
    }
  } catch (err) {
    console.error(`Error reading file: ${err}`);
  }

  // If not found, return a 404
  res.statusCode = 404;
  res.end('Not found');
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Mock Server running at http://localhost:${PORT}`);
});