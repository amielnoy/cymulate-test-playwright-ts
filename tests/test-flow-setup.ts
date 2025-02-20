import {LoginBuildingBlock} from '../BuildingBlocks/loginBuildingBlock'
import {MainPage} from '../Pages/MainPages/MainCymulatePage'
import {ReportsPage} from '../Pages/ReportsPage'
import {WafReportsPage} from '../Pages/WafReports/WafReportsPage'
import {DateAndTimeUtility} from '../Utils/DateAndTime'
import {expect} from '@playwright/test'
import {GlobalConstants} from '../Globals/global-constants'

export async function testFlowSetup(
  loginBuildingBlock: LoginBuildingBlock,
  mainPage: MainPage,
  reportsPage: ReportsPage,
  wafReportsPage: WafReportsPage,
) {
  try {
    await loginBuildingBlock.signIn()

    if (await mainPage.isElementEnabled(mainPage.reportsTabButton)) {
      await mainPage.clickReportsTabButton()

      if (
        await reportsPage.isElementEnabled(
          reportsPage.webApplicationFirewallHistoryButton,
        )
      ) {
        await reportsPage.clickWebApplicationFireWallHistoryButton()

        if (
          await wafReportsPage.isElementEnabled(
            wafReportsPage.getRowWithCompletedSibling(),
          )
        ) {
          await wafReportsPage.clickRowWithCompletedSibling()
        }
      }
    }
  } catch (error) {
    console.error(
      'An error occurred during <<< test-setup or navigation >>>',
      error,
    )
    throw error // Re-throw the error to ensure the test fails
  }
}

export async function navigateToWAFReportHistory(
  mainPage: MainPage,
  reportsPage: ReportsPage,
  wafReportsPage: WafReportsPage,
) {
  if (await mainPage.isElementEnabled(mainPage.reportsTabButton)) {
    await mainPage.clickReportsTabButton()

    if (
      await reportsPage.isElementEnabled(
        reportsPage.webApplicationFirewallHistoryButton,
      )
    ) {
      await reportsPage.clickWebApplicationFireWallHistoryButton()

      if (
        await wafReportsPage.isElementEnabled(
          wafReportsPage.getRowWithCompletedSibling(),
        )
      ) {
        await wafReportsPage.clickRowWithCompletedSibling()
      }
    }
  }
}

export async function downloadReport(
  mainPage: MainPage,
  wafReportsPage: WafReportsPage,
) {
  const dateTimeUtility = new DateAndTimeUtility()

  await wafReportsPage.generateReportSubPage.csvButton.click()
  await mainPage.mainCymulateSubMenuPage.clickDownloadReportsButton()

  await expect(mainPage.reportAddedSuccessMessage).toBeVisible({timeout: GlobalConstants.MEDIUM_TIMEOUT});
  const expectedReportTextLine1 = 'Module - Web Application FirewallAssessment generated at'
  //const expectedReportTextLine2 =  `${dateTimeUtility.getCurrentDate()} ${dateTimeUtility.getCurrentTime()}}`;
  await expect(mainPage.downloadsSubPage.downloadedCsvReportDateAndTimeLabel).toContainText(expectedReportTextLine1);
  await mainPage.downloadsSubPage.clickDownloadReportsButton();

}
