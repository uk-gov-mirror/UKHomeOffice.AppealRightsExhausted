@AreRegressionCI
Feature: ARE - Appeal Rights Exhausted - E2E

  Background:
    Given Test data has been created for "ARE" scenarios

  Scenario Outline: Validate ARE date successfully calculated with correct information E2E
    And I selected the data for scenario "<Scenario ID>" - "<Description>"
    When I visit the Appeal Rights Exhausted Date Calculator page
    Then the user should be on "Appeal Rights Exhausted Date Calculator – Calculate ARE date – GOV.UK" page
    When I fill out my answers for ARE and continue
    Then the user should be on "Calculated ARE date" page
    Examples:
      | Scenario ID | Description                     |
      | 1           | Not received confirmation email |
      | 2           | Not received decision           |
      | 3           | Question about decision         |


  Scenario Outline: ARE - Appeal Rights Exhausted content validation and click on Start again button
    And I selected the data for scenario "<Scenario ID>" - "<Description>"
    When I visit the Appeal Rights Exhausted Date Calculator page
    Then the user should be on "Appeal Rights Exhausted Date Calculator – Calculate ARE date – GOV.UK" page
    And I can validate content for ARE
    When I click Start Again button from Calculated ARE date page
    Then the user should be on "Appeal Rights Exhausted Date Calculator – Calculate ARE date – GOV.UK" page
    Examples:
      | Scenario ID | Description             |
      | 4           | ARE Content validations |


  Scenario Outline: Click on Change link from Calculated ARE date page is redirected to Appeal Rights Exhausted Date Calculator page
    When I visit the Appeal Rights Exhausted Date Calculator page
    And the user selected "<Country>", "<Appeal Stage>" and valid "<Promulgation Date>" and click on Calculate button
    Then the user should be on "Calculated ARE date" page
    And I click on Change link from Calculated ARE date page
    Then the user should be on "Appeal Rights Exhausted Date Calculator – Calculate ARE date – GOV.UK" page
    Examples:
      | Country         | Appeal Stage                            | Promulgation Date |
      | England & Wales | 08. Upper Tribunal IAC PTA - In Country | 09/09/2019        |


  Scenario Outline: ARE - Appeal Rights Exhausted Error validations
    And I selected the data for scenario "<Scenario ID>" - "<Description>"
    When I visit the Appeal Rights Exhausted Date Calculator page
    Then the user should be on "Appeal Rights Exhausted Date Calculator – Calculate ARE date – GOV.UK" page
    And I can validate error for ARE
    Examples:
      | Scenario ID | Description           |
      | 5           | ARE Error validations |


  Scenario Outline: Validate Country & Court of Sessions via IAC selection error message
    When I visit the Appeal Rights Exhausted Date Calculator page
    And the user selected "<Country>", "<Appeal Stage>" and valid "<Promulgation Date>" and click on Calculate button
    Then the user should see appeal stage "<Error Message>" error
    Examples:
      | Country          | Appeal Stage                  | Promulgation Date | Error Message                               |
      | England & Wales  | 14. Court of Sessions via IAC | 01/01/2015        | Country not valid for selected appeal stage |
      | Scotland         | 13. Court of Appeal via IAC   | 11/06/2016        | Country not valid for selected appeal stage |
      | Northern Ireland | 13. Court of Appeal via IAC   | 09/09/2019        | Country not valid for selected appeal stage |


  Scenario Outline: Validate Promulgation Date before 20th Oct 2014 error message
    When I visit the Appeal Rights Exhausted Date Calculator page
    And the user selected "<Country>", "<Appeal Stage>" and valid "<Promulgation Date>" and click on Calculate button
    Then the user should see Promulgation Date "<Error Message>" error
    Examples:
      | Country          | Appeal Stage                                                                                              | Promulgation Date | Error Message                                         |
      | England & Wales  | 02. First Tier IAC Appeal - Out of Country Appeals where the appellant must leave the UK before appealing | 01/01/2012        | Promulgation date can not be on or before 20 Oct 2014 |
      | Scotland         | 04. First Tier IAC Appeal - In Country Detained Fast Track                                                | 10/06/2013        | Promulgation date can not be on or before 20 Oct 2014 |
      | Northern Ireland | 10. Upper Tribunal IAC - Judicial Review                                                                  | 09/09/2014        | Promulgation date can not be on or before 20 Oct 2014 |