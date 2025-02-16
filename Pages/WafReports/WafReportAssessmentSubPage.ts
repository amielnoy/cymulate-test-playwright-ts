import { Page, Locator, test } from '@playwright/test';
import { BasePage } from '../BasePage';

export class WafReportAssessmentSubPage extends BasePage {
    readonly page: Page;
    readonly score: Locator;
    readonly url: Locator;
    readonly status: Locator;
    readonly generateReportButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.score = page.locator('.score-text span.pieChartInfoText span');
        this.url = page.locator('.summary-data .module-summary-title:has-text("URL") + .report-summary-data');
        this.status = page.getByTestId('assessment-status-report');
        this.generateReportButton = page.getByRole('button', { name: 'Generate Report' });
    }

    async clickGenerateReportButton():Promise<void> {
        await test.step('Click Generate Report button', async () => {
            await this.generateReportButton.click();
        });
    }

}
