import {Page, Locator, test} from '@playwright/test'
import {BasePage} from './BasePage'
import dotenv from "dotenv";

dotenv.config()

export  class LoginPage extends BasePage {
  readonly email: Locator
  readonly password: Locator
  readonly signInButton: Locator

  constructor(page: Page) {
    super(page)
    this.email = page.getByRole('textbox', {name: 'Email address'})
    this.password = page.getByRole('textbox', {name: 'Password'})
    this.signInButton = page.getByRole('button', {name: 'Sign in'}).first()
  }

  async gotoLoginPage(): Promise<void> {
    await test.step('Goto login page', async () => {
      const loginPageUrl = process.env.LOGIN_URL
      if (loginPageUrl) {
        await this.navigateTo(loginPageUrl)
      } else {
        throw new Error('Login page URL is not defined')
      }
    })
  }

  async setEmail(email: string): Promise<void> {
    await test.step('Set email', async () => {
      await this.fillInput(this.email, email)
    })
  }

  async setPassword(password: string) {
    await test.step('Set password', async () => {
      await this.fillInput(this.password, password)
    })
  }

  async clickSignInButton() {
    await test.step('Click sign in button', async () => {
      await this.clickElement(this.signInButton)
    })
  }
}
