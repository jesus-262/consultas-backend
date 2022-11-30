const consultacontrol = {}
//const path =require('path');
//console.log("funciona");

//const puppeteercore =require("puppeteer-core") ;
const PCR = require("puppeteer-chromium-resolver");
const {executablePath} = require('puppeteer')

const puppeteer = require('puppeteer-extra');
//const puper=require('puppeteer');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');

//const chromium = require('chromium');

puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: '2captcha',
      token: 'f68342d8a8694fb35a55f951cf639ade' 
    },
    visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
  })
);

//mostrar varios


 
 (async () => {
  
  const option = {
      revision: "",
      detectionPath: "",
      folderName: ".chromium-browser-snapshots",
      defaultHosts: ["https://storage.googleapis.com", "https://npm.taobao.org/mirrors"],
      hosts: [],
      cacheRevisions: 2,
      retry: 3,
      silent: false
  };
  const stats = await PCR(option);
  var browser = await stats.puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: stats.executablePath
  }).catch(function(error) {
      console.log(error);
  });
  console.log("paso y ejecuto")
  //await browser.close();
  console.log("paso y termino")
  console.log("abrio pagina")
  var page = await browser.newPage();
  await page.goto("https://www.npmjs.com/package/puppeteer-chromium-resolver");
  await browser.close();
  console.log("cerro pagina")
})();

 
 consultacontrol.postConsultaNombre = async(req, res)=>{
  console.log("prueba")
  const {cedula}=req.body;
  console.log(cedula);

  const browser= await puppeteer.launch({headless:true,  args: ['--no-sandbox', '--disable-setuid-sandbox'], executablePath: executablePath()});
  //const browser= await puppeteer.launch({headless:true, executablePath: executablePath()});
  // const browser= await puper.launch({headless:false, executablePath:  'C:/Program Files/Google/Chrome/Application/chrome.exe'});
   let page= await browser.newPage();
   console.log("BUSCANDO NOMBRE")
   
   console.log("10%")
   const html1='https://antecedentes.policia.gov.co:7005/WebJudicial/antecedentes.xhtml';
   var html2='https://www.procuraduria.gov.co/Pages/Consulta-de-Antecedentes.aspx';
   //const html3='https://www.skynovels.net/';
   //console.log(html2);
   await page.setDefaultNavigationTimeout(0); 
   await page.goto(html1,{waitUntil: 'networkidle2'}).catch(e => {
    console.log('FAIL');
    res.send("caida");
  });
   //await page.type('.devsite-search-field', 'Headless Chrome');
 
   console.log("20%")
 
   await page.waitForTimeout(2000)
 
  
   //no#main-wrapper > app-home > article > section.container.container-home > div:nth-child(1) > h2
   await page.evaluate(async() => {});
  
     await page.waitForSelector(`#aceptaOption > tbody > tr > td:nth-child(1) > input[type="radio"]`).catch(e => {
      console.log('FAIL #aceptaOption > tbody > tr > td:nth-child(1) > input[type="radio"]');
      res.send("XXXXXX");
    });
       // Hace que .then() devuelva una promesa rechazada
       console.log( '30%' );
       let elementt = await page.$('#aceptaOption > tbody > tr > td:nth-child(1) > input[type="radio"]');
       elementt.click();
       await page.waitForTimeout(2000)
       console.log( '40%' );
       await page.waitForSelector('#continuarBtn').catch(e => {
        console.log('FAIL #continuarBtn');
        res.send("XXXXXX");
      });
       
         console.log( '50%' );
      
         const form = await page.$('#continuarBtn');
        
         form.click();
         await page.waitForTimeout(2000)
         await page.waitForSelector(`#cedulaInput`).catch(e => {
          console.log('FAIL');
          res.send("XXXXXX");
        });
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
       console.log(data.length);
       if(data.length==0){
         console.log( '100%' );
       // return console.log("NO EXISTE LA CEDULA")
        res.send ("NO EXISTE LA CEDULA");
       }else{
         console.log( '100%' );
         console.log(data[2]);
         res.send (data[2]);
       
       }
     
     
     
       }
     
      


 }
 consultacontrol.postConsultaLugarDeVotacion = async(req, res)=>{
  console.log("consulta1")
  const {cedula}=req.body;
  console.log(cedula);
  const pagina= await puppeteer.launch({headless:true, executablePath: executablePath(),args : [ '--netifs-to-ignore=INTERFACE_TO_IGNORE' ]});
  let page= await pagina.newPage();
  await page.setDefaultNavigationTimeout(0); 
  page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
  await page.goto('https://wsp.registraduria.gov.co/censo/consultar');

   console.log("10%")
  await page.waitForTimeout(4000)
  await page.screenshot({
    path: 'example.png'
    });
 
  await page.waitForSelector(`#nuip`).catch(e => {
    console.log('FAIL #nuip');
    res.send("XXXXXX");
  });
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
     
      await page.waitForSelector('.table-responsive', { timeout: 1000}).then(async() => {
        const data = await page.evaluate(() => {
          const tds = Array.from(document.querySelectorAll('table tr td'))
        
          
  
          return tds.map(td => td.innerText)
         
        });
        console.log("100%")
        console.log(data);
    //  console.log(data[0]);
     
      await pagina.close();
      const myJSON = JSON.stringify(data);
      console.log(myJSON.toString());
     
      if(myJSON==null){
        myJSON="NO PUEDE VOTAR"
      }
      
      res.send(myJSON);
      
      }).catch(e => {
        console.log('FAIL');
        res.send("XXXXXX");
      });
    
      //const texto = await page.evaluate(() => document.querySelector('.table-responsive').innerText);
    
     

}
 }
 
module.exports = consultacontrol;