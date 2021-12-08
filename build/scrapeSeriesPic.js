import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import puppeteer from 'puppeteer';
import {username, password} from './credentials';

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
  const seasonListing = await page.evaluate(() => window.SeasonListing);

for(var i = 0; i < seasonListing.length ; i++){ 
  var id = seasonListing[i].seriesid;
  var screenpath = './public/static/series/'+ id + '.jpg'
  if(!fs.existsSync(screenpath)){  
    var pic = await page.goto('https://ir-core-sites.iracing.com/members/member_images/series/seriesid_' + id + '/logo.jpg');
    fs.writeFile(screenpath, await pic.buffer(), function(err) {
      if(err) {
          return console.log(err);
      }
    });
  }
}
  await browser.close();
})().catch((e) => console.error(e));
