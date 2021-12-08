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
  const Cars = ['https://members.iracing.com/membersite/member/Cars.do?forceload=unowned', 'https://members.iracing.com/membersite/member/Cars.do?forceload=owned'];
  for(var i = 0; i < Cars.length; i++){
    await page.goto(Cars[i]);
    const carListing = await page.evaluate(() => window.CarPage.data.content_group_arr);

    for(var i = 0; i < carListing[0].cars.length ; i++){ 
      var id = carListing[0].cars[i].carID;
      var img = carListing[0].cars[i].expanded_car_img;
      var screenpath = './public/static/cars/'+ id + '.jpg'
      if(!fs.existsSync(screenpath)){  
        try{
        var pic = await page.goto(img);
        fs.writeFile(screenpath, await pic.buffer(), function(err) {
          if(err) {
              return console.log(err);
          }
        });
      }
      catch{
        console.log("Error");
      }
      }
    }
  }
  await browser.close();
})().catch((e) => console.error(e));
