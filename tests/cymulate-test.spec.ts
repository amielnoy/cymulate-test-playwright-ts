import {test} from '../Fixtures/testSetup'
import {expect} from '@playwright/test'
import {downloadReport, navigateToWAFReportHistory} from './test-flow-setup'
import {
  getDownloadFolderPath,
  getLastDownloadedFileName,
  isTextFile,
  readFileContent,
} from '../Utils/OsOperations'
// @ts-ignore
import path from 'path'

test.describe('Report History Tests', () => {
  const expectedAssessmentScore = '100'
  const expectedAssessmentUrl = 'https://ekslabs.cymulatedev.com'
  const expectedAssessmentStatus = 'Completed'

  test.beforeEach(async ({loginBuildingBlock}) => {
    await loginBuildingBlock.signIn();
  });

  test('Verify Report History', async ({mainPage, reportsPage, wafReportsPage}) => {
    await mainPage.getPage().setViewportSize({width: 1920, height: 937});
    const expectOptions = { timeout: 10000 };

    await navigateToWAFReportHistory(mainPage, reportsPage, wafReportsPage);

    await expect(wafReportsPage.wafReportAssessmentSubPage.score).toHaveText(expectedAssessmentScore,expectOptions);
    await expect(wafReportsPage.wafReportAssessmentSubPage.url).toHaveText(expectedAssessmentUrl);
    await expect(wafReportsPage.wafReportAssessmentSubPage.status).toHaveText(expectedAssessmentStatus);

    await wafReportsPage.wafReportAssessmentSubPage.clickGenerateReportButton()
    await downloadReport(mainPage, wafReportsPage)

    const expectedLineInDownloadedFile = 'ekslabs.cymulatedev.com'
    const downloadDir = getDownloadFolderPath() // Adjust the path as needed
    const lastDownloadedFile = getLastDownloadedFileName(downloadDir)
    const lastDownloadedFileFullPath = path.join(
      getDownloadFolderPath(),
      lastDownloadedFile,
    )
    console.log('Downloading file', downloadDir)

    if (isTextFile(lastDownloadedFileFullPath)) {
      const actualTestedFileText = await readFileContent(
        lastDownloadedFileFullPath,
      )
      expect(actualTestedFileText).toContain(expectedLineInDownloadedFile)
    } else {
      console.log(
        'The last downloaded file is not a text file.\n' +
          "It's not a simulate webApplicationFirewall report!",
      )
    }
  })
})
