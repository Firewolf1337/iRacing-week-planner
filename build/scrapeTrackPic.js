import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import puppeteer from 'puppeteer';
import {username, password} from './credentials';
//import 'remove-html-element';

const writeFile = Promise.promisify(fs.writeFile);


(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: {width: 1200, height: 800}
});
  const page = await browser.newPage();
  await page.goto('https://members.iracing.com/membersite/login.jsp');

  const userField = await page.$('[name="username"]');
  await userField.focus();
  await userField.type(username);

  const passwordField = await page.$('[name="password"]');
  await passwordField.focus();
  await passwordField.type(password);

  const button = await page.$('input.log-in');
  await button.click();

  await page.waitForResponse('https://members.iracing.com/membersite/member/Home.do');
  await page.goto('http://members.iracing.com/membersite/member/Series.do');
  const trackListing = await page.evaluate(() => window.TrackListing);

for(var i = 0; i < trackListing.length ; i++){ 
  var id = trackListing[i].id;
  var tracksvgfile = '../public/static/tracks/'+ id + '.html'
  if(!fs.existsSync(tracksvgfile)){  
    await page.goto('https://members.iracing.com/membersite/member/TrackDetail.do?trkid=' + id);
    await page.re
    await page.waitForSelector('#svgMap');          // wait for the selector to load
    await page.evaluate(() => document.querySelectorAll(".screenshots-button").forEach(el => el.remove()));
    await page.evaluate(() => document.querySelectorAll(".select-track").forEach(el => el.remove()));
    await page.evaluate(() => document.getElementById('legend').remove());
    await page.evaluate(() => document.getElementById('legend-toggle').remove());
    await page.evaluate(() => document.getElementById('main-logo').remove());
    var element = await page.evaluate(() => document.querySelector('#svgMap').outerHTML);        // declare a variable with an ElementHandle
    element = '<link type="text/css" rel="Stylesheet" href="track.svg.scss" />' + element;
    await writeFile(path.join(__dirname, tracksvgfile),element);
  }
}
  await browser.close();
})().catch((e) => console.error(e));
