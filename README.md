# CYMULATE: Web Testing with Playwright in Typescript


## I used here few infra concepts:

1.Environment file .env for global settings

2.Setups:
    Fixtures for easy page object setup
 
4.Middle layer between pages & test flows called Building blocks
5.Base page for implementing the page basic operations
    and sharing the methods shared among all page objects
3.Page objects
6.Composition of sub pages in containing ui Page

CI:
    Github actions pipeline for running the tests on ci in the microsoft cloud.



## Installation instructions

1.From the cli use:
      git clone

2.invoke terminal(cli) & Run the tests locally:
npx playwright test tests --headed report=html

3.Run the tests from docker
  docker run -it --rm



* [TAU: The Homecoming](https://applitools.com/on-demand-videos/tau-the-homecoming-2021/) (December 1, 2021)


## Outline

This tutorial has six main parts, each with three sections:

1. Getting started
   1. What is Playwright?
   2. Our web search test
   3. Test project setup
