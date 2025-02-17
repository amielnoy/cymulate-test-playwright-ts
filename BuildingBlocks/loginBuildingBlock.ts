import {Page} from "@playwright/test";
import {LoginPage} from "../Pages/loginPage";
// @ts-ignore
import dotenv from 'dotenv';

// Load environment variables from .env file


export class LoginBuildingBlock {

    readonly page: Page;
    readonly loginPage: LoginPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);

    }


    async signIn(): Promise<void> {
        const email = process.env.EMAIL;
        const password = process.env.PASSWORD;

        await this.loginPage.gotoLoginPage();

        if (email && password) {
            await this.loginPage.setEmail(email);
            await this.loginPage.setPassword(password);
            await this.loginPage.clickSignInButton();
        } else {
            throw new Error("Email or Password environment variable is not set.");
        }
    }



}
