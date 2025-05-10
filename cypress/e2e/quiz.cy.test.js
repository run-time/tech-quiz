// cypress/e2e/quiz.cy.test.js
describe('Tech Quiz Application E2E Tests - Debugging', () => {
  beforeEach(() => {
    // Intercept the API call and provide our fixture data
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuestions');
    cy.visit('/');
  });

  it('should display "Mock server is running" if the app fails to load correctly', () => {
    cy.contains('Mock server is running').should('not.exist'); // Ensure this message is not visible
  });

  it('should verify the mock API response is intercepted correctly', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions').its('response.statusCode').should('eq', 200); // Ensure mock API returns 200
    cy.fixture('questions.json').then((questions) => {
      expect(questions).to.have.length.greaterThan(0); // Ensure fixture has questions
    });
  });

  it('should display the start button on load', () => {
    cy.contains('Start Quiz').should('be.visible');
  });

  it('should start the quiz and display the first question', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
    cy.get('.card').should('be.visible');
    cy.get('h2').should('be.visible');
  });

  it('should present a new question when an answer is selected', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
    let firstQuestionText = '';
    cy.get('h2').then(($h2) => {
      firstQuestionText = $h2.text();
      cy.contains('1').click();
      cy.get('h2').should(($newH2) => {
        expect($newH2.text()).to.not.equal(firstQuestionText);
      });
    });
  });

  it('should complete the quiz after answering all questions', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
    for (let i = 0; i < 10; i++) {
      cy.contains('1').click();
    }
    cy.contains('Quiz Completed').should('be.visible');
    cy.contains('Your score: 10/10').should('be.visible');
  });

  it('should allow starting a new quiz after completion', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
    for (let i = 0; i < 10; i++) {
      cy.contains('1').click();
    }
    cy.contains('Quiz Completed').should('be.visible');
    cy.contains('Take New Quiz').click();
    cy.wait('@getQuestions');
    cy.get('h2').should('be.visible');
    cy.contains('1').should('be.visible');
  });
});
// Append the following tests to cypress/e2e/quiz.cy.test.js

describe('Tech Quiz Application E2E Tests - Additional Scenarios', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuestions');
    cy.visit('/');
  });

  it('should display "Mock server is running" if the app fails to load correctly', () => {
    cy.intercept('GET', '/api/questions/random', { forceNetworkError: true }).as('getQuestionsError');
    cy.visit('/');
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestionsError');
    cy.contains('Mock server is running').should('be.visible');
  });

  it('should handle API failure gracefully', () => {
    cy.intercept('GET', '/api/questions/random', { statusCode: 500 }).as('getQuestionsError');
    cy.visit('/');
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestionsError');
    cy.contains('Failed to load questions. Please try again later.').should('be.visible');
  });

  it('should display a loading spinner while fetching questions', () => {
    cy.intercept('GET', '/api/questions/random', (req) => {
      req.reply((res) => {
        res.delay(2000); // Simulate network delay
        res.send({ fixture: 'questions.json' });
      });
    }).as('getQuestionsDelayed');
    cy.visit('/');
    cy.contains('Start Quiz').click();
    cy.get('.spinner').should('be.visible'); // Ensure spinner is visible during loading
    cy.wait('@getQuestionsDelayed');
    cy.get('.spinner').should('not.exist'); // Ensure spinner disappears after loading
  });

  it('should display an error message if the API returns an error', () => {
    cy.intercept('GET', '/api/questions/random', { statusCode: 404 }).as('getQuestionsNotFound');
    cy.visit('/');
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestionsNotFound');
    cy.contains('Failed to load questions. Please try again later.').should('be.visible');
  });
});