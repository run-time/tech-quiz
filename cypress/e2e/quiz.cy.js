describe('Tech Quiz Application E2E Tests', () => {
  beforeEach(() => {
    // Intercept the API call and provide our fixture data
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuestions');
    cy.visit('/');
  });

  it('should display the start button on load', () => {
    cy.contains('Start Quiz').should('be.visible');
  });

  it('should start the quiz when the start button is clicked', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
    
    // First question should be visible
    cy.get('.card').should('be.visible');
    cy.get('h2').should('be.visible');
  });

  it('should present a new question when an answer is selected', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
    
    // Store text of first question
    let firstQuestionText = '';
    cy.get('h2').then($h2 => {
      firstQuestionText = $h2.text();
      
      // Click the first answer
      cy.contains('1').click();
      
      // Check that we see a different question
      cy.get('h2').should($newH2 => {
        expect($newH2.text()).to.not.equal(firstQuestionText);
      });
    });
  });

  it('should complete the quiz after answering all questions', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
    
    // Answer all 10 questions
    for (let i = 0; i < 10; i++) {
      cy.contains('1').click(); // Always select the first answer (the correct one in our fixture)
    }
    
    // Quiz should be completed
    cy.contains('Quiz Completed').should('be.visible');
    cy.contains('Your score: 10/10').should('be.visible');
  });

  it('should allow starting a new quiz after completion', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
    
    // Answer all 10 questions
    for (let i = 0; i < 10; i++) {
      cy.contains('1').click(); // Always select the first answer
    }
    
    // Quiz should be completed
    cy.contains('Quiz Completed').should('be.visible');
    
    // Start a new quiz
    cy.contains('Take New Quiz').click();
    cy.wait('@getQuestions');
    
    // Should see a question again
    cy.get('h2').should('be.visible');
    cy.contains('1').should('be.visible'); // Answer button should be visible
  });
});