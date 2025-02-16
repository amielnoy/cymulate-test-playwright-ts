import { test } from '../Fixtures/testSetup';
import { expect } from "@playwright/test";
import {DateAndTimeUtility} from "../Utils/DateAndTime";
import {getDownloadFolderPath}  from "../Utils/OsOperations";


test('TestReportHistory', async ({ loginBuildingBlock, mainPage, reportsPage,wafReportsPage }) => {
  let dateAndTimeUtility: DateAndTimeUtility = new DateAndTimeUtility();

  await mainPage.getPage().setViewportSize({ width: 1920, height: 937 });

  const expectedAssessmentScore = "100";
  const expectedAssessmentUrl = "https://ekslabs.cymulatedev.com";
  const expectedAssessmentStatus = "Completed";

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

  await expect(wafReportsPage.wafReportAssessmentSubPage.score).toHaveText(expectedAssessmentScore);
  await expect(wafReportsPage.wafReportAssessmentSubPage.url).toHaveText(expectedAssessmentUrl);
  await expect(wafReportsPage.wafReportAssessmentSubPage.status).toHaveText(expectedAssessmentStatus);

  await wafReportsPage.wafReportAssessmentSubPage.clickGenerateReportButton();
  if(await wafReportsPage.generateReportSubPage.isElementEnabled(wafReportsPage.generateReportSubPage.csvButton)) {
    await wafReportsPage.generateReportSubPage.csvButton.click();
    if (await mainPage.isElementEnabled(mainPage.mainCymulateSubMenuPage.downloadReportsButton)) {
      await mainPage.mainCymulateSubMenuPage.clickDownloadReportsButton();

      if( await mainPage.isElementVisible(mainPage.reportAddedSuccessMessage) ){
        const expectedReportText = `Module - Web Application FirewallAssessment generated at 
          ${dateAndTimeUtility.getCurrentDate()} ${dateAndTimeUtility.getCurrentTime()}}`;
        await expect(mainPage.downloadsSubPage.downloadedCsvReportDateAndTimeLabel).toHaveText(expectedReportText);

        if (await mainPage.isElementEnabled(mainPage.downloadsSubPage.downloadCsvReportsButton)) {
          await mainPage.downloadsSubPage.clickDownloadReportsButton();
          const expectedLineInDownloadedFile="https://ekslabs.cymulatedev.com\\Program Files\\Apache Group\\Apache\\logs\\error.log";
          expect(getDownloadFolderPath().toString).toContain(expectedLineInDownloadedFile)
        }
      }
    }
  }
});
