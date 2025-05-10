# Tech Quiz Application
A full-stack MERN application (MongoDB, Express.js, React, Node.js) which allows users to take a quiz of ten random questions and see their final score.
- Take a quiz with randomized tech questions
- See your score at the end of the quiz
- Start a new quiz after completion
- Responsive design that works on desktop and mobile

## Technologies Used
- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js, Express.js, MongoDB
- **Testing**: Cypress (Component & E2E tests)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation
1. Clone the repo
   ```
   git clone https://github.com/adeleinealger/tech-quiz.git
   ```
2. Install dependencies
   ```
   npm install
   ```
3. Install and startup MongoDB
   ```
   brew tap mongodb/brew
   brew install mongodb-community@6.0
   brew services start mongodb/brew/mongodb-community@6.0
   ```
4. Create a `.env` file in the server directory based on `.env.example`
5. With MongoDB running seed the database
   ```
   npm run seed
   ```
6. Start the development server
   ```
   npm run start:dev
   ```

## Running Tests

Pre-requisite: Make sure this is installed...
```
npm install start-server-and-test --save-dev
npm install express

```

#### Run both component and end-to-end tests:
```
npm run test
```
#### Run just the component tests:
```
npm run test:component
```
#### Run just the end-to-end tests:
```
npm run test:e2e
```
#### Open the Cypress Test Runner:
```
npm run cypress:open
```

## Test Overview

### Cypress Component Tests

Component tests validate individual React components in isolation. Our tests for the Quiz component verify:
```
✓ displays the start button initially (44ms)
✓ starts the quiz when the start button is clicked (100ms)
✓ displays the next question when an answer is clicked (168ms)
✓ displays the score at the end of the quiz (243ms)
✓ allows starting a new quiz after completion (323ms)
```

### Cypress End-to-End Tests

E2E tests validate the complete application flow from a user's perspective:

```
✓ displays the start button initially (44ms)
✓ starts the quiz when the start button is clicked (100ms)
✓ displays the next question when an answer is clicked (168ms)
✓ displays the score at the end of the quiz (243ms)
✓ allows starting a new quiz after completion (323ms)
```

## Project Structure

```
.
├── client/                 // the client application
├── cypress/                // Folder for Cypress
    ├── component/          // Folder for component tests
        └── Quiz.cy.jsx     // Component tests for the Quiz component
    ├── e2e/                // Folder for end-to-end tests
        └── quiz.cy.js      // End-to-end tests for the Tech Quiz
    ├── fixtures/           // Folder for test fixtures
        └── questions.json  // Mock data for testing
    └── tsconfig.json
├── server/                 // the server application
├── .gitignore
├── cypress.config.ts       // Cypress configuration
├── package.json
├── tsconfig.json
└── README.md              // This file
```

### Demo Video

[https://app.screencastify.com/v3/watch/kRDYMZIDspYV8WowOjSG]

### Credits
- Github Copilot
- Google
- Dad (senior software architect)
