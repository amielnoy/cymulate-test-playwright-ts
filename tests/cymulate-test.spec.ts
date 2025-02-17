import { test } from '../Fixtures/testSetup';
import { expect } from "@playwright/test";
import {DateAndTimeUtility} from "../Utils/DateAndTime";
import { MainPage } from '../Pages/MainPages/MainCymulatePage';
import { WafReportsPage } from '../Pages/WafReports/WafReportsPage';
import {downloadReport, navigateToWAFReportHistory} from "./test-flow-setup";
import {
  getDownloadFolderPath,
  getLastDownloadedFileName,
  readFileAndLogContent,
  readFileContent
} from "../Utils/OsOperations";
import path from "path";
import * as Path from "node:path";


test.describe('Report History Tests', () => {
  const expectedAssessmentScore = "100";
  const expectedAssessmentUrl = "https://ekslabs.cymulatedev.com";
  const expectedAssessmentStatus = "Completed";

  test.beforeEach(async ({page, loginBuildingBlock, mainPage}) => {

    await loginBuildingBlock.signIn();
  });

  test('Verify Report History', async ({mainPage, reportsPage, wafReportsPage}) => {
    await mainPage.getPage().setViewportSize({width: 1920, height: 937});
    await navigateToWAFReportHistory(mainPage, reportsPage, wafReportsPage);

    await expect(wafReportsPage.wafReportAssessmentSubPage.score).toHaveText(expectedAssessmentScore);
    await expect(wafReportsPage.wafReportAssessmentSubPage.url).toHaveText(expectedAssessmentUrl);
    await expect(wafReportsPage.wafReportAssessmentSubPage.status).toHaveText(expectedAssessmentStatus);

    await wafReportsPage.wafReportAssessmentSubPage.clickGenerateReportButton();
    await downloadReport(mainPage,wafReportsPage);
    const expectedLineInDownloadedFile = "ekslabs.cymulatedev.com";
    const downloadDir = getDownloadFolderPath(); // Adjust the path as needed
    const lastDownloadedFile = getLastDownloadedFileName(downloadDir);
    const lastDownloadedFileFullPath = path.join(getDownloadFolderPath(),lastDownloadedFile)

    const actualTestedFileText=readFileContent(lastDownloadedFileFullPath);
    expect(actualTestedFileText).toContain(expectedLineInDownloadedFile)
  });
})
