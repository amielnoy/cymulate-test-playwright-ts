import { Page, Locator, test } from '@playwright/test';
import { BasePage } from '../BasePage';

export class GenerateReportSubPage extends BasePage {
    readonly score: Locator;
    readonly url: Locator;
    readonly status: Locator;
    readonly generateReportButton: Locator;
    readonly csvButton: Locator;

    constructor(page: Page) {
        super(page);
        this.csvButton = page.getByRole('button', { name: 'CSV' }).nth(0);
    }

    async clickCsvButton() {
        await test.step('Click CSV button', async () => {
            await this.csvButton.click();
        });
    }
}
