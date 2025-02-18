# CYMULATE: Web Testing with Playwright in Typescript


## I used here few infra concepts:

1.Environment file .env for global settings

2.Setups:
    Fixtures for easy page object setup
3.Page objects 
4.Middle layer between pages & test flows called Building blocks
5.Base page for implementing the page basic operations
    and sharing the methods shared among all page objects

6.Composition of sub pages in containing ui Page

7.Github actions pipeline


## Installation instructions

1.From the cli use:
      git clone https://github.com/amielnoy/cymulate-test-playwright-ts.git

2.invoke terminal(cli) & Run the tests locally:
npx playwright test tests --headed report=html

3.Run github actions pipe line.
Navigate to:
https://github.com/amielnoy/cymulate-test-playwright-ts/actions





