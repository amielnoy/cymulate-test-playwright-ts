import {Page, Locator, test} from '@playwright/test';
import {BasePage} from "../BasePage";

export class DownloadsSubPage extends BasePage{
    readonly downloadCsvReportsButton: Locator;
    readonly downloadedCsvReportDateAndTimeLabel: Locator;

    constructor(page: Page) {
        super(page);
        this.downloadedCsvReportDateAndTimeLabel = page.getByTestId('card-text-container-67b1deeba932a347e5a33032');
        this.downloadCsvReportsButton = page.getByTestId('download-report-button-67b1deeba932a347e5a33032');
    }

    async clickDownloadReportsButton(): Promise<void> {
        await test.step('Goto main page', async () => {
            await this.clickElement(this.downloadCsvReportsButton);
        })
    }
}
