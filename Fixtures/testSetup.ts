import {test as base, expect} from '@playwright/test'
// @ts-ignore
import {LoginBuildingBlock} from '../BuildingBlocks/loginBuildingBlock'
import {ReportsPage} from '../Pages/ReportsPage'
import {MainPage} from '../Pages/MainPages/MainCymulatePage'

import {WafReportsPage} from '../Pages/WafReports/WafReportsPage'
import {WafReportAssessmentSubPage} from '../Pages/WafReports/WafReportAssessmentSubPage'
import {GenerateReportSubPage} from '../Pages/WafReports/GenerateReportSubPage'

interface ITestFixtures {
  loginBuildingBlock: LoginBuildingBlock
  mainPage: MainPage
  reportsPage: ReportsPage
  wafReportsPage: WafReportsPage
  wafReportAssessmentSubPage: WafReportAssessmentSubPage
  generateReportSubPage: GenerateReportSubPage
}

const test = base.extend<ITestFixtures>({
  loginBuildingBlock: async ({page}, use) => {
    const loginBuildingBlock = new LoginBuildingBlock(page)
    await use(loginBuildingBlock)
  },
  mainPage: async ({page}, use) => {
    const mainPage = new MainPage(page)
    await use(mainPage)
  },
  reportsPage: async ({page}, use) => {
    const reportsPage = new ReportsPage(page)
    await use(reportsPage)
  },
  wafReportsPage: async ({page}, use) => {
    const wafReportsPage = new WafReportsPage(page)
    await use(wafReportsPage)
  },
  wafReportAssessmentSubPage: async ({page}, use) => {
    const wafReportAssessmentSubPage = new WafReportAssessmentSubPage(page)
    await use(wafReportAssessmentSubPage)
  },
  generateReportSubPage: async ({page}, use) => {
    const generateReportSubPage = new GenerateReportSubPage(page)
    await use(generateReportSubPage)
  },
})

export {test, expect}
