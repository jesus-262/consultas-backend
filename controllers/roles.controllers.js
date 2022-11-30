const rolescontrol = {}
const path =require('path');
console.log("funciona");
var jsdom = require("jsdom");

const cheerio = require('cheerio');
const {executablePath} = require('puppeteer')
const puper = require('puppeteer')
const puppeteer = require('puppeteer-extra');
//const puper=require('puppeteer');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
const e = require('express');
puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: '2captcha',
      token: 'f68342d8a8694fb35a55f951cf639ade' 
    },
    visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
  })
);


 
async function regis(cedula){
    const pagina= await puppeteer.launch({headless:false, executablePath: executablePath()});
    let page= await pagina.newPage();
    await page.setDefaultNavigationTimeout(0); 
    await page.goto('https://wsp.registraduria.gov.co/censo/consultar');

     console.log("10%")
    await page.waitForTimeout(2000)
    await page.waitForSelector(`#nuip`)
      // Hace que .then() devuelva una promesa rechazada
     
    
      let element = await page.$('#nuip');

      await page.evaluate((el,cedu) =>{
        el.value=cedu
       
    
    }, element,cedula);
    console.log("40%")
    //let element = await page.$eval('input[name=nuip]');
   const {solved, error}= await page.solveRecaptchas();
    if(solved){
      console.log("80%")
        await page.$eval( '#enviar', form => form.click() );
        await page.waitForSelector('.table-responsive')
        //const texto = await page.evaluate(() => document.querySelector('.table-responsive').innerText);
      
        const data = await page.evaluate(() => {
            const tds = Array.from(document.querySelectorAll('table tr td'))
          
            

            return tds.map(td => td.innerText)
           
          });
          console.log("100%")
        console.log(data);
      //  console.log(data[0]);
       
        await pagina.close();

}
}
async function poli(cedula){

  const browser= await puppeteer.launch({headless:true, executablePath: executablePath()});
 // const browser= await puper.launch({headless:false, executablePath:  'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  let page= await browser.newPage();
  console.log("BUSCANDO NOMBRE")
  
  console.log("10%")
  const html1='https://antecedentes.policia.gov.co:7005/WebJudicial/antecedentes.xhtml';
  const html2='https://www.procuraduria.gov.co/Pages/Consulta-de-Antecedentes.aspx';
  const html3='https://www.skynovels.net/';
  await page.setDefaultNavigationTimeout(0); 
  await page.goto(html1,{waitUntil: 'networkidle2'});
  //await page.type('.devsite-search-field', 'Headless Chrome');

  console.log("20%")

  await page.waitForTimeout(2000)

 
  //no#main-wrapper > app-home > article > section.container.container-home > div:nth-child(1) > h2
  await page.evaluate(async() => {});
 
    await page.waitForSelector(`#aceptaOption > tbody > tr > td:nth-child(1) > input[type="radio"]`) 
      // Hace que .then() devuelva una promesa rechazada
      console.log( '30%' );
      let elementt = await page.$('#aceptaOption > tbody > tr > td:nth-child(1) > input[type="radio"]')
      elementt.click();
      await page.waitForTimeout(2000)
      console.log( '40%' );
      await page.waitForSelector('#continuarBtn')
      
        console.log( '50%' );
     
        const form = await page.$('#continuarBtn');
       
        form.click();
        await page.waitForTimeout(2000)
        await page.waitForSelector(`#cedulaInput`)
          // Hace que .then() devuelva una promesa rechazada
         
        
          let element = await page.$('#cedulaInput');
         // element.i="1107071154"
          //element.innerText="1107071154";
   
        
         
      await page.evaluate((el,cedu) =>{
       el.value=cedu 
      

 }, element,cedula);
     //await page.evaluate(el => el.value="dd", element);
    
     
      console.log( '60%' );
      await page.waitForTimeout(1000)
     
      //j_idt17
      
      const {solved, error}= await page.solveRecaptchas();
      if(solved){
      
         const form = await page.$('#j_idt17');
       
      form.click();
      console.log( '80%' );
      await page.waitForTimeout(2000)
    
    
      var data = await page.$$eval('table tr td span b', tds => tds.map((b) => {
        return b.innerHTML;
      }));
    
      //console.log(data);
      //data.length 6 si tiene cedula
      //data.length 4 si no tiene cedula
      await page.close();
      await browser.close();
      if(data.length==4){
        console.log( '100%' );
       return console.log("NO EXISTE LA CEDULA")
      }else{
        console.log( '100%' );
        console.log(data[2]);
        return data[2];
      
      }
    
    
    
      }
    
     
    
}
//mostrar varios
rolescontrol.getRoles = async(req, res)=>{
  
 
 
 //poli('1107071154'); 94377923
 regis('1107071154');

  res.send("termino");
  //await preparePageForTests(page);
    console.log("entro")
}
//mostrar uno
rolescontrol.getRol = (req, res)=>{
   
    res.send("holad");
    console.log("entro")
}
//crear uno
rolescontrol.createRol = (req, res)=>{
   
    res.send("hobla");
    console.log("entro")
}






module.exports = rolescontrol;