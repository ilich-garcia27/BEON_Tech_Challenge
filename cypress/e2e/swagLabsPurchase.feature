@e2e @regression
Feature: E-commerce flow from Swag Labs site
  As an existing user
  I want to complete the e-commerce flow successfully
  So that I can get my products sent

  @wip
  Scenario: Existing user completes the e-commerce flow successfully
    Given the user opens the Login page
    When the user enters valid credentials
    And the user clicks the Login button
    Then the user should be logged in successfully
    When the user adds the second and third product to the cart
    And the user follows the checkout process
    And the user confirms their purchase
    Then the user gets a confirmation page