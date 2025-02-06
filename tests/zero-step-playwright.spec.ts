import { test, expect } from '@playwright/test';
import {auto} from "auto-playwright";
import * as dotenv from 'dotenv'



import { ai } from '@zerostep/playwright'

dotenv.config()
test('zerostep example', async ({ page }) => {
  await page.goto('https://zerostep.com/')

  // An object with page and test must be passed into every call
  const aiArgs = { page, test }
  const headerText = await ai('Get the header text', aiArgs)
  await page.goto('https://google.com/')
  await ai(`Type "${headerText}" in the search box`, aiArgs)
  await ai('Press enter', aiArgs)
})
