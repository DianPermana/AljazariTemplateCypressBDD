import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const url = 'https://opensource-demo.orangehrmlive.com';

Given('I am on the OrangeHRM login page', () => {
  cy.log('Navigating to the login page...');
  cy.visit('/');
});

When('I log in with username {string} and password {string}', (username, password) => {
  //cy.log(`Attempting to log in with username: ${username}, password: ${password}`);
  cy.get('input[name="username"]').type(username);
  cy.screenshot('home-page');
  cy.get('input[name="password"]').type(password);
  cy.screenshot('home-page');
  cy.get('button[type="submit"]').click();
});

Then('I should see the dashboard', () => {
  cy.log('Verifying successful login...');
  cy.screenshot('home-page');
  cy.url().should('include', '/dashboard');
  cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard');
});

Then('I should see an error message', () => {
  cy.log('Verifying error message...');
  cy.screenshot('home-page');
  cy.get('.oxd-alert-content').should('be.visible')
    .and('contain', 'Invalid credentials');
  cy.screenshot('home-page');
});
