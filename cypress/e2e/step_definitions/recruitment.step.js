import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import 'cypress-file-upload';

When('I navigate to Recruitment page', () => {
  // Ensure the dashboard URL is loaded
  cy.url().should('include', '/dashboard');

  // Log the current URL
  cy.url().then(url => {
    cy.log('Current URL:', url);
  });

  // Hover over the Recruitment menu item and click it
  cy.contains('span', 'Recruitment', { timeout: 20000 })
    .should('be.visible')
    .trigger('mouseover')
    .click();
});

When('I click on Vacancies tab', () => {
  // Wait for the Vacancies tab to appear and click it
  cy.contains('a.oxd-topbar-body-nav-tab-item', 'Vacancies', { timeout: 20000 })
    .should('be.visible')
    .click();
});

When('I click Add button', () => {
  // Ensure the specific Add button within the orangehrm-header-container is visible and click it
  cy.get('.orangehrm-header-container')
    .find('button.oxd-button--secondary')
    .contains('Add')
    .should('be.visible')
    .click();
});

Then('I should see "Add Vacancy" form', () => {
  // Wait for the Add Vacancy form title to appear
  cy.get('h6.orangehrm-main-title', { timeout: 20000 })
    .should('be.visible')
    .and('contain', 'Add Vacancy');
});

When('I add vacancy with following details', (dataTable) => {
  dataTable.hashes().forEach(row => {
    cy.get('#addJobVacancy_jobTitle').select(row['Job Title']);
    cy.get('#addJobVacancy_name').type(row['Vacancy Name']);
    cy.get('#addJobVacancy_hiringManager').type(row['Hiring Manager']);
    cy.get('#addJobVacancy_noOfPositions').type(row['Number of Positions']);
    cy.get('#addJobVacancy_description').type(row['Job Description']);
    if (row['Status'] === 'Active') {
      cy.get('#addJobVacancy_status').check();
    }
  });
});

When('I save the vacancy', () => {
  // Wait for the Save button to appear and click it
  cy.get('#btnSave', { timeout: 20000 }).should('be.visible').click();
});

Then('I should see success message {string}', (message) => {
  // Wait for the success message to appear
  cy.get('.message.success', { timeout: 20000 }).should('contain', message);
});

Then('the vacancy {string} should be visible in the list', (vacancyName) => {
  // Wait for the vacancy to appear in the list
  cy.get('#resultTable', { timeout: 20000 }).should('contain', vacancyName);
});