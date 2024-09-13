import puppeteer from "puppeteer";
import { html } from "../../reports/applicantsReport.js";

export const RPTScheduleDetails = async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      userDataDir: "./reports/tmp",
     
    });

    const file = html();
    const page = await browser.newPage();
    page.isJavaScriptEnabled(true);
    await page.setContent(file, {
      waitUntil: "domcontentloaded",
    });
    await page.emulateMediaType("screen");
    const pdf = await page.pdf({
      printBackground: true,
      format: "A4",
      landscape: true,
      margin: { top: 50, bottom: 50, left: 50, right: 50 },
    });
    browser.close();
    return pdf;
  } catch (error) {
    console.log(error);
    throw Error();
  }
};
