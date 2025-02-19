import {Page, Locator, test} from '@playwright/test';
import {BasePage} from "../BasePage";

export class MainCymulateSubMenuPage extends BasePage{
    readonly downloadReportsButton: Locator;

    constructor(page: Page) {
        super(page);
        this.downloadReportsButton = page.getByTestId('open-download-manager-button');
    }

    async clickDownloadReportsButton(){
        await test.step('click download reports button', async () => {
            await this.clickElement(this.downloadReportsButton);
        })
    }
}
