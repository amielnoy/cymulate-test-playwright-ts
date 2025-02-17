import {Page, Locator, test} from '@playwright/test';
import {BasePage} from "../BasePage";
import {MainCymulateSubMenuPage} from "./MainCymulateSubMenuPage";
import {DownloadsSubPage} from "./DownloadsSubPage";

export class MainPage extends BasePage{
    readonly reportsTabButton: Locator;
    readonly mainCymulateSubMenuPage: MainCymulateSubMenuPage;
    readonly downloadsSubPage: DownloadsSubPage;
    readonly reportAddedSuccessMessage: Locator;
    readonly reportAddedToDownloadManagerSuccessMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.reportsTabButton = page.getByTestId('link-button-Reports');
        this.reportAddedSuccessMessage=page.locator('notification-container--bottom-left')
        this.mainCymulateSubMenuPage=new MainCymulateSubMenuPage(page)
        this.downloadsSubPage = new DownloadsSubPage(page)
    }

    async clickReportsTabButton(){
        await test.step('Goto main page', async () => {
            await this.clickElement(this.reportsTabButton);
        })
    }
}
