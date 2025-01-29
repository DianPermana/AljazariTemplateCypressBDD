Feature: Login functionality for OrangeHRM

  Scenario Outline: Login with valid credentials
    Given I am on the OrangeHRM login page
    When I log in with username "<username>" and password "<password>"
    Then I should see the dashboard

    Examples:
      | username | password  |
      | Admin    | admin123  |

  Scenario Outline: Login with invalid credentials
    Given I am on the OrangeHRM login page
    When I log in with username "<username>" and password "<password>"
    Then I should see an error message

    Examples:
      | username    | password    |
      | invalidUser | invalidPass |