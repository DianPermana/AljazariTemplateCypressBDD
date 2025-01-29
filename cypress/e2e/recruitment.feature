Feature: OrangeHRM Recruitment Management

  Background: 
    Given I am on the OrangeHRM login page
    When I log in with username "Admin" and password "admin123"
    Then I should see the dashboard
    When I navigate to Recruitment page

  @recruitment @vacancy
  Scenario: Add a new job vacancy
    When I click on Vacancies tab
    And I click Add button
    Then I should see "Add Vacancy" form
    When I add vacancy with following details
      | Field           | Value                 |
      | Vacancy Name    | Senior QA Engineer    |
      | Job Title       | QA Engineer           |
      | Hiring Manager  | Linda Anderson        |
      | Positions       | 2                     |
      | Description     | Looking for Senior QA |
      | Status          | Active                |
    And I save the vacancy
    Then I should see success message "Successfully Saved"
    And the vacancy "Senior QA Engineer" should be visible in the list