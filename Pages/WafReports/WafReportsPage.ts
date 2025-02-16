import { Page, Locator,test } from '@playwright/test';
import { BasePage } from '../BasePage';
import {GenerateReportSubPage} from "./GenerateReportSubPage";
import {WafReportAssessmentSubPage} from "./WafReportAssessmentSubPage";

export class WafReportsPage extends BasePage {
    readonly page: Page;
    readonly generateReportSubPage: GenerateReportSubPage;
    readonly wafReportAssessmentSubPage: WafReportAssessmentSubPage;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.generateReportSubPage= new GenerateReportSubPage(page)
        this.wafReportAssessmentSubPage= new WafReportAssessmentSubPage(page)
    }

    getRowWithCompletedSibling(): Locator {
        return this.page.locator('.table-row').filter({
            has: this.page.locator('.attack-status:has-text("Completed")')
        }).locator('a[href*="/cym/waf_category/action"]').first();
    }

    async clickRowWithCompletedSibling():Promise<void> {
        await test.step('Click row with "Completed" as a sibling', async () => {
            const targetRow = this.getRowWithCompletedSibling();
            await targetRow.click();
        });
    }
}
