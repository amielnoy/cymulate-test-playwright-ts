import { Page, Locator, test } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public getPage(){
        return this.page;
    }

    async navigateTo(url: string): Promise<void> {
        await test.step('Navigate to URL', async () => {
            await this.page.goto(url);
        });
    }

    async waitForElement(locator: Locator, timeout: number = 5000): Promise<void> {
        await test.step('Wait for element to be visible', async () => {
            await locator.waitFor({ state: 'visible', timeout });
        });
    }

    async clickElement(locator: Locator): Promise<void> {
        await test.step('Click element', async () => {
            await locator.click();
        });
    }

    async fillInput(locator: Locator, text: string): Promise<void> {
        await test.step('Fill input field', async () => {
            await locator.fill(text);
        });
    }

    async getText(locator: Locator): Promise<string> {
        return await test.step('Get text content', async () => {
            return await locator.textContent() || '';
        });
    }

    async isElementVisible(locator: Locator): Promise<boolean> {
        return await test.step('Check if element is visible', async () => {
            return await locator.isVisible();
        });
    }

    async isElementEnabled(locator: Locator): Promise<boolean> {
        return await test.step('Check if element is enabled', async () => {
            return await locator.isEnabled();
        });
    }

    async getElementAttribute(locator: Locator, attribute: string): Promise<string | null> {
        return await test.step(`Get element attribute: ${attribute}`, async () => {
            return await locator.getAttribute(attribute);
        });
    }
}
