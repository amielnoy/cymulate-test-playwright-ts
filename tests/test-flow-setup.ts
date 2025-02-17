import {LoginBuildingBlock} from "../BuildingBlocks/loginBuildingBlock";
import {MainPage} from "../Pages/MainPages/MainCymulatePage";
import {ReportsPage} from "../Pages/ReportsPage";
import {WafReportsPage} from "../Pages/WafReports/WafReportsPage";
import {DateAndTimeUtility} from "../Utils/DateAndTime";
import {expect} from "@playwright/test";

export async function testFlowSetup(loginBuildingBlock: LoginBuildingBlock,mainPage: MainPage,
                              reportsPage: ReportsPage,wafReportsPage: WafReportsPage
) {
    try {
        await loginBuildingBlock.signIn();

        if (await mainPage.isElementEnabled(mainPage.reportsTabButton)) {
            await mainPage.clickReportsTabButton();

            if (await reportsPage.isElementEnabled(reportsPage.webApplicationFirewallHistoryButton)) {
                await reportsPage.clickWebApplicationFireWallHistoryButton();

                if (await wafReportsPage.isElementEnabled(wafReportsPage.getRowWithCompletedSibling())) {
                    await wafReportsPage.clickRowWithCompletedSibling();
                }
            }
        }
    } catch (error) {
        console.error('An error occurred during <<< test-setup or navigation >>>', error);
        throw error; // Re-throw the error to ensure the test fails
    }
}

export async function navigateToWAFReportHistory(mainPage: MainPage, reportsPage: ReportsPage, wafReportsPage: WafReportsPage) {
    if (await mainPage.isElementEnabled(mainPage.reportsTabButton)) {
        await mainPage.clickReportsTabButton();

        if (await reportsPage.isElementEnabled(reportsPage.webApplicationFirewallHistoryButton)) {
            await reportsPage.clickWebApplicationFireWallHistoryButton();

            if (await wafReportsPage.isElementEnabled(wafReportsPage.getRowWithCompletedSibling())) {
                await wafReportsPage.clickRowWithCompletedSibling();
            }
        }
    }
}

export async function downloadReport(mainPage: MainPage, wafReportsPage: WafReportsPage) {
    if (await wafReportsPage.generateReportSubPage.isElementEnabled(wafReportsPage.generateReportSubPage.csvButton)) {
        await wafReportsPage.generateReportSubPage.csvButton.click();

        if (await mainPage.isElementEnabled(mainPage.mainCymulateSubMenuPage.downloadReportsButton)) {
            await mainPage.mainCymulateSubMenuPage.clickDownloadReportsButton();

            const dateTimeUtility = new DateAndTimeUtility();
            if (await mainPage.isElementVisible(mainPage.reportAddedSuccessMessage)) {
                const expectedReportText = `Module - Web Application FirewallAssessment generated at 
            ${dateTimeUtility.getCurrentDate()} ${dateTimeUtility.getCurrentTime()}}`;
                await expect(mainPage.downloadsSubPage.downloadedCsvReportDateAndTimeLabel).toHaveText(expectedReportText);

                if (await mainPage.isElementEnabled(mainPage.downloadsSubPage.downloadCsvReportsButton)) {
                    await mainPage.downloadsSubPage.clickDownloadReportsButton();
                }
            }
        }
    }
}
