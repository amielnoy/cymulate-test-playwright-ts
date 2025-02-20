import { Page, Locator, test } from '@playwright/test';
import { BasePage } from './BasePage';

export class ReportsPage extends BasePage {
    readonly webApplicationFirewallHistoryButton: Locator;

    constructor(page: Page) {
        super(page);
        // Define a robust locator for the History button using role and data-module attribute
        this.webApplicationFirewallHistoryButton = page.locator('[data-module="waf"]').getByRole('link', { name: 'History' });
    }

    async clickWebApplicationFireWallHistoryButton() {
        await test.step('Click Web Application Firewall History Button', async () => {
            await this.webApplicationFirewallHistoryButton.click();
        });
    }
}
