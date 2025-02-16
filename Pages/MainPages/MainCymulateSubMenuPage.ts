import {Page, Locator, test} from '@playwright/test';
import {BasePage} from "../BasePage";

export class MainCymulateSubMenuPage extends BasePage{
    readonly downloadReportsButton: Locator;

    constructor(page: Page) {
        super(page);
        this.downloadReportsButton = page.getByTestId('open-download-manager-button');
    }

    async clickDownloadReportsButton(){
        await test.step('Goto main page', async () => {
            await this.clickElement(this.downloadReportsButton);
        })
    }
}
