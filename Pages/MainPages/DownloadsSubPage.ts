import {Page, Locator, test} from '@playwright/test'
import {BasePage} from '../BasePage'

export class DownloadsSubPage extends BasePage {
  readonly downloadCsvReportsButton: Locator
  readonly downloadedCsvReportDateAndTimeLabel: Locator

  constructor(page: Page) {
    super(page)
    this.downloadedCsvReportDateAndTimeLabel = page
      .getByTestId('card-text-container-67b1deeba932a347e5a33032')
      .first()
    this.downloadCsvReportsButton = page.getByTestId(
      'download-report-button-67b1deeba932a347e5a33032',
    )
  }

  async clickDownloadReportsButton(): Promise<void> {
    await test.step('Goto main page', async () => {
      //await this.clickElement(this.downloadCsvReportsButton);
      const downloadPromise = this.getPage().waitForEvent('download')
      await this.getPage().getByText('Download').first().click()
      const download = await downloadPromise

      // Wait for the download process to complete and save the downloaded file somewhere.
      //await download.saveAs('/path/to/save/at/' + download.suggestedFilename());

      const reliablePath = '/Users/amielpeled/Documents/Important'
      // save into the desired path
      await download.saveAs(reliablePath)
      // wait for the download and delete the temporary file
      await download.delete()
    })
  }
}
