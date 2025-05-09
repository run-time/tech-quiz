import Quiz from '../../client/src/components/Quiz';

describe('Quiz Component', () => {
  beforeEach(() => {
    // Mock the fetch API before mounting the component
    cy.intercept('GET', '/api/questions/random', {
      statusCode: 200,
      body: [
        {
          _id: '1',
          question: 'What is React?',
          answers: [
            { text: 'A JavaScript library for building user interfaces', isCorrect: true },
            { text: 'A programming language', isCorrect: false },
            { text: 'A database system', isCorrect: false },
            { text: 'A server-side framework', isCorrect: false }
          ]
        },
        {
          _id: '2',
          question: 'What is TypeScript?',
          answers: [
            { text: 'A statically typed superset of JavaScript', isCorrect: true },
            { text: 'A database system', isCorrect: false },
            { text: 'A CSS framework', isCorrect: false },
            { text: 'A testing framework', isCorrect: false }
          ]
        }
      ]
    }).as('getQuestions');

    cy.mount(<Quiz />);
  });

  it('displays the start button initially', () => {
    cy.contains('Start Quiz').should('be.visible');
  });

  it('starts the quiz when the start button is clicked', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
    cy.contains('What is React?').should('be.visible');
  });

  it('displays the next question when an answer is clicked', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
    cy.contains('1').click(); // Click the first answer
    cy.contains('What is TypeScript?').should('be.visible');
  });

  it('displays the score at the end of the quiz', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
    cy.contains('1').click(); // Click the first answer (correct)
    cy.contains('1').click(); // Click the first answer (correct)
    cy.contains('Quiz Completed').should('be.visible');
    cy.contains('Your score: 2/2').should('be.visible');
  });

  it('allows starting a new quiz after completion', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
    cy.contains('1').click(); // Click the first answer
    cy.contains('1').click(); // Click the first answer
    cy.contains('Take New Quiz').click();
    cy.wait('@getQuestions');
    cy.contains('What is React?').should('be.visible');
  });
});