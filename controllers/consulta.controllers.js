const consultacontrol = {}
const path =require('path');
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
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: stats.executablePath
  }).catch(function(error) {
      console.log(error);
  });
 
  //await browser.close();
 
  
  //var page= await browser.newPage();

  //page.goto("https://www.npmjs.com/package/puppeteer-chromium-resolver");
   //await browser.newPage().goto("https://www.npmjs.com/package/puppeteer-chromium-resolver");;
  
 //await browser.close();
  console.log("Funciono PUP")
})();
consultacontrol.postnombreperfecto = async(req, res)=>{
  console.log("procuraduria")
  const {cedula}=req.body;
  
  const browser= await puppeteer.launch({headless:true,  
    args: ["--no-sandbox"],
    env: {
      DISPLAY: ":10.0"
  }, executablePath: executablePath()}).catch(e => {
    console.log('FAIL');
    return res.send ("FALLO TRAER CEDULA, INTENTE DE NUEVO");
  });
  // const browser= await puper.launch({headless:false, executablePath:  'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 
  const page= await browser.newPage();
  
 
   console.log("BUSCANDO NOMBRE")
   const pathToExtension = path.join(process.cwd(), 'my-extension')

   const html1='https://apps.procuraduria.gov.co/webcert/inicio.aspx?tpo=1';
   //const html2='https://www.procuraduria.gov.co/Pages/Consulta-de-Antecedentes.aspx';
   
   //const html3='https://www.skynovels.net/';
   //console.log(html2);
   await page.setDefaultNavigationTimeout(0); 
   await page.goto(html1).catch(e => {
    console.log('PAGINA DONDE TRAEN LA INFO CAIDA, INTENTE OTRA VEZ');
    return res.send("PAGINA DONDE TRAEN LA INFO CAIDA, INTENTE OTRA VEZ");
  });
 
  let element = await page.$('#txtNumID');
  await page.evaluate((el,cedu) =>{
    el.value=cedu
   

}, element,cedula);


await page.select('#ddlTipoID', '1')


  console.log('paso');
  /*
  const n= await page.$("#lblPregunta")
const texto = await (await n.getProperty('textContent')).jsonValue();
console.log(texto);*/
await page.waitForTimeout(4000)
const element2 = await page.waitForSelector("#lblPregunta");


let texto=await page.evaluate(el => el.innerText, element2)

text(res,texto,cedula,page,browser)



  //res.send ("entro procuraduria");
}
async function text(res,texto,cedula,page,browser){

  console.log(texto);
  await page.waitForTimeout(2000)
 

  //await page.$eval( '#rblTipoCert_1', form => form.click() )
  //await page.waitForTimeout(2000)
  //await page.$eval( '#rblTipoCert_0', form => form.click() )
  if(texto=='¿Cual es el primer nombre de la persona a la cual esta expidiendo el certificado?'){
    reload(res,cedula,page,browser);
  }else if(texto=='¿Escriba la cantidad de letras del primer nombre de la persona a la cual esta expidiendo el certificado?'){
    reload(res,cedula,page,browser);
  }else if(texto=='¿Escriba las dos primeras letras del primer nombre de la persona a la cual esta expidiendo el certificado?'){
    reload(res,cedula,page,browser);
  }else if(texto=='¿ Cuanto es 9 - 2 ?'){
  
    await page.waitForTimeout(2000).then(async () => {
    let element = await page.$('#txtRespuestaPregunta');
    await page.evaluate((el,cedu) =>{
      el.value=cedu
     
  
  }, element,'7');
  boton(res,cedula,page,browser);}).catch(e => {
    console.log('FAIL buscar nombre');
    return res.send ("FALLO TRAER CEDULA, INTENTE DE NUEVO");
  })
  }else if(texto=='¿ Cuanto es 2 X 3 ?'){
    await page.waitForTimeout(2000).then(async () => {
    let element = await page.$('#txtRespuestaPregunta');
    await page.evaluate((el,cedu) =>{
      el.value=cedu
     
  
  }, element,'6');
  boton(res,cedula,page,browser);}).catch(e => {
    console.log('FAIL buscar nombre');
    return res.send ("FALLO TRAER CEDULA, INTENTE DE NUEVO");
  })
  }else if(texto=='¿ Cuanto es 4 + 3 ?'){
    await page.waitForTimeout(2000).then(async () => {
    let element = await page.$('#txtRespuestaPregunta');
    await page.evaluate((el,cedu) =>{
      el.value=cedu
     
  
  }, element,'7');
  boton(res,cedula,page,browser);  }).catch(e => {
    console.log('FAIL buscar nombre');
    return res.send ("FALLO TRAER CEDULA, INTENTE DE NUEVO");
  })

  }else if(texto=='¿Escriba los dos ultimos digitos del documento a consultar?'){
    
    var respuesta = cedula.toString().substring(cedula.toString().length, cedula.toString().length-2);
    console.log(respuesta)
    await page.waitForTimeout(2000).then(async () => {
    let element = await page.$('#txtRespuestaPregunta');
    await page.evaluate((el,cedu) =>{
      el.value=cedu
     
  
  }, element,respuesta);
  boton(res,cedula,page,browser);}).catch(e => {
    console.log('FAIL buscar nombre');
    return res.send ("FALLO TRAER CEDULA, INTENTE DE NUEVO");
  })
  }else if(texto=='¿Escriba los tres primeros digitos del documento a consultar?'){
    
    var respuesta = cedula.toString().substring( 0 ,3);
    console.log(respuesta)
    await page.waitForTimeout(2000).then(async () => {
    let element = await page.$('#txtRespuestaPregunta');
    await page.evaluate((el,cedu) =>{
      el.value=cedu
     
  
  }, element,respuesta);
  boton(res,cedula,page,browser);}).catch(e => {
    console.log('FAIL buscar nombre');
    return res.send ("FALLO TRAER CEDULA, INTENTE DE NUEVO");
  })
  }else if(texto=='¿ Cual es la Capital de Antioquia (sin tilde)?'){
    
    await page.waitForTimeout(2000).then(async () => {
    let element = await page.$('#txtRespuestaPregunta');
    await page.evaluate((el,cedu) =>{
      el.value=cedu
     
  
  }, element,'medellin');
  boton(res,cedula,page,browser);}).catch(e => {
    console.log('FAIL buscar nombre');
    return res.send ("FALLO TRAER CEDULA, INTENTE DE NUEVO");
  })
  }else if(texto=='¿ Cuanto es 5 + 3 ?'){
    
    await page.waitForTimeout(2000).then(async () => {
    let element = await page.$('#txtRespuestaPregunta');
    await page.evaluate((el,cedu) =>{
      el.value=cedu
     
  
  }, element,'8');
  boton(res,cedula,page,browser);}).catch(e => {
    console.log('FAIL buscar nombre');
    return res.send ("FALLO TRAER CEDULA, INTENTE DE NUEVO");
  })
  }else if(texto=='¿ Cuanto es 3 X 3 ?'){
    
    await page.waitForTimeout(3000).catch(e => {
      console.log('FAIL buscar nombre');
      return res.send ("FALLO TRAER CEDULA, INTENTE DE NUEVO");
    }).then(async () => {
    let element = await page.$('#txtRespuestaPregunta');
    await page.evaluate((el,cedu) =>{
      el.value=cedu
     
  
  }, element,'9');
  boton(res,cedula,page,browser);})
  }else if(texto=='¿ Cuanto es 6 + 2 ?'){
    
    await page.waitForTimeout(2000).then(async () => {
    let element = await page.$('#txtRespuestaPregunta');
    await page.evaluate((el,cedu) =>{
      el.value=cedu
     
  
  }, element,'8');
  boton(res,cedula,page,browser);}).catch(e => {
    console.log('FAIL buscar nombre');
    return res.send ("FALLO TRAER CEDULA, INTENTE DE NUEVO");
  })
  }else if(texto=='¿ Cual es la Capital del Atlantico?'){
    await page.waitForTimeout(2000).then(async () => {
    let element = await page.$('#txtRespuestaPregunta');
    await page.evaluate((el,cedu) =>{
      el.value=cedu
     
  
  }, element,'barranquilla');
  boton(res,cedula,page,browser);}).catch(e => {
    console.log('FAIL buscar nombre');
    return res.send ("FALLO TRAER CEDULA, INTENTE DE NUEVO");
  })
  }else if(texto=='¿ Cuanto es 3 - 2 ?'){
    await page.waitForTimeout(3000).then(async () => {
    let element = await page.$('#txtRespuestaPregunta');
    await page.evaluate((el,cedu) =>{
      el.value=cedu
     
  
  }, element,'1');
  boton(res,cedula,page,browser);}).catch(e => {
    console.log('FAIL buscar nombre');
    return res.send ("FALLO TRAER CEDULA, INTENTE DE NUEVO");
  })
  }else if(texto=='¿ Cual es la Capital de Colombia (sin tilde)?'){
    await page.waitForTimeout(2000).then(async () => {
    let element = await page.$('#txtRespuestaPregunta');
    await page.evaluate((el,cedu) =>{
      el.value=cedu
     
  
  }, element,'bogota');
  boton(res,cedula,page,browser);}).catch(e => {
    console.log('FAIL buscar nombre');
    return res.send ("FALLO TRAER CEDULA, INTENTE DE NUEVO");
  })
  }else if(texto=='¿ Cual es la Capital del Vallle del Cauca?'){
    await page.waitForTimeout(2000).then(async () => {
    let element = await page.$('#txtRespuestaPregunta');
    await page.evaluate((el,cedu) =>{
      el.value=cedu
     
  
  }, element,'cali');
  boton(res,cedula,page,browser);}).catch(e => {
    console.log('FAIL buscar nombre');
    return res.send ("FALLO TRAER CEDULA, INTENTE DE NUEVO");
  })
  }else{
    reload(res,cedula,page,browser);
  }
  

  
 
  
  
}
async function boton(res,cedula,page,browser){
  await page.waitForTimeout(4000).then(async () => {
  
  await page.$eval( '.Botones', form => form.click() )
  await page.waitForTimeout(2000).then(async () => {
  
  var data = await page.$$eval('.datosConsultado span', span => span.map((b) => {
    return b.innerHTML;
  }));
  
  console.log(data);
 
  if(data==""){
    console.log("entro en null de data")
    
  //  return res.send ("FALLO TRAER CEDULA, INTENTE DE NUEVO");
   //ValidationSummary1
   await page.waitForTimeout(4000)
const element = await page.waitForSelector("#ValidationSummary1");


let advertencia=await page.evaluate(el =>  el.innerText, element)
console.log(advertencia)
let procesado;
procesado = advertencia.trim();
if(procesado=='EL NÚMERO DE IDENTIFICACIÓN INGRESADO NO SE ENCUENTRA REGISTRADO EN EL SISTEMA.'){
  console.log("EL NÚMERO DE IDENTIFICACIÓN INGRESADO NO SE ENCUENTRA REGISTRADO EN EL SISTEMA.")
  await browser.close();
  return res.send ("EL NÚMERO DE IDENTIFICACIÓN INGRESADO NO SE ENCUENTRA REGISTRADO EN EL SISTEMA.");
}else{
  console.log("FALLO TRAER CEDULA, INTENTE DE NUEVO")
  await browser.close();
  return res.send ("FALLO TRAER CEDULA, INTENTE DE NUEVO");
 
}

  }else{
    var nombrecompleto= data[2] +" "+ data[3] +" "+ data[0] +" "+ data[1];
    console.log(nombrecompleto);
    await browser.close();
    return res.send (nombrecompleto);
  
  }
 
}).catch(e => {
  console.log('FAIL buscar nombre');
  return res.send ("FALLO TRAER CEDULA, INTENTE DE NUEVO");
})
}).catch(e => {
  console.log('FAIL buscar nombre');
  return res.send ("FALLO TRAER CEDULA, INTENTE DE NUEVO");
})
}
async function reload(res,cedula,page,browser){
  await page.waitForTimeout(2000)
  await page.$eval( '#ImageButton1', form => form.click() ).catch(e => {
    console.log('FAIL boton');
  
     
  }).finally(async(e) => {
    console.log('paso');
    /*
    const n= await page.$("#lblPregunta")
  const texto = await (await n.getProperty('textContent')).jsonValue();
  console.log(texto);*/
  await page.waitForTimeout(4000)
  const element2 = await page.waitForSelector("#lblPregunta");
  
  
  let texto=await page.evaluate(el => el.innerText, element2)


  text(res,texto,cedula,page,browser)
  });
}
consultacontrol.postConsultaNombre = async(req, res)=>{
  console.log("Consulta : Nombre")
 
  const {cedula}=req.body;
  console.log(cedula);
  const browser= await puppeteer.launch({headless:true,  
    args: ["--no-sandbox"],
    env: {
      DISPLAY: ":10.0"
  }, executablePath: executablePath()}).catch(e => {
    console.log('FAIL');
    return res.send ("FALLO TRAER CEDULA, INTENTE DE NUEVO");
  });
  // const browser= await puper.launch({headless:false, executablePath:  'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  (async () => { 
  const page= await browser.newPage();
  
  if (page) {
    console.log('BROWSER ABIERTO');
}
   console.log("BUSCANDO NOMBRE")
       
   console.log("10%")
   const html1='https://antecedentes.policia.gov.co:7005/WebJudicial/antecedentes.xhtml';
   var html2='https://www.procuraduria.gov.co/Pages/Consulta-de-Antecedentes.aspx';
   //const html3='https://www.skynovels.net/';
   //console.log(html2);
   await page.setDefaultNavigationTimeout(0); 
   await page.goto(html1,{waitUntil: 'networkidle2'}).catch(e => {
    console.log('PAGINA DONDE TRAEN LA INFO CAIDA, INTENTE OTRA VEZ');
    return res.send("PAGINA DONDE TRAEN LA INFO CAIDA, INTENTE OTRA VEZ");
  });
   //await page.type('.devsite-search-field', 'Headless Chrome');
 
   console.log("20%")
 
   await page.waitForTimeout(2000)
 
  
   //no#main-wrapper > app-home > article > section.container.container-home > div:nth-child(1) > h2
   await page.evaluate(async() => {}).catch(e => {
    console.log('FAIL');
    return res.send ("FALLO TRAER CEDULA, INTENTE DE NUEVO");
  });
  
     await page.waitForSelector(`#aceptaOption > tbody > tr > td:nth-child(1) > input[type="radio"]`).catch(e => {
      console.log('FAIL #aceptaOption > tbody > tr > td:nth-child(1) > input[type="radio"]');
      // este da problemas y abajo puede cerrarlo igual
      //return res.send ("FALLO TRAER CEDULA, INTENTE DE NUEVO");
    });
       // Hace que .then() devuelva una promesa rechazada
       console.log( '30%' );
       /*
       let elementt = await page.$('#aceptaOption > tbody > tr > td:nth-child(1) > input[type="radio"]').catch(e => {
        console.log('FAIL');
        return res.send ("FALLO TRAER CEDULA, INTENTE DE NUEVO");
      }).finally(e => {
        elementt.click();
      });*/
      var primeraPagina=true;
      await page.$eval( '#aceptaOption > tbody > tr > td:nth-child(1) > input[type="radio"]', form => form.click() ).catch(e => {
        console.log('FAIL boton element');
        primeraPagina=false;
        return res.send("FALLO TRAER CEDULA, INTENTE DE NUEVO");
        
         
      });
       if(primeraPagina==true){
       await page.waitForTimeout(2000)
       console.log( '40%' );
       await page.waitForSelector('#continuarBtn').catch(e => {
        console.log('FAIL #continuarBtn');
        return res.send("FALLO TRAER CEDULA, INTENTE DE NUEVO");
      });
       
         console.log( '50%' );
      
         const form = await page.$('#continuarBtn');
        
         form.click();
         await page.waitForTimeout(2000)
         await page.waitForSelector(`#cedulaInput`).catch(e => {
          console.log('FAIL');
          return res.send("FALLO TRAER CEDULA, INTENTE DE NUEVO");
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
       var estadoBoton=false;
       const {solved, error}= await page.solveRecaptchas();
         if(solved){
       
         // const form = await page.$('#j_idt17');
         /* const form = page.waitForSelector('#j_idt17').finally(e => {
             page.waitForTimeout(3000)
     
             form.click();
          });;*/
          await page.waitForTimeout(2000)
         
          await page.$eval( '#j_idt17', form => form.click() ).catch(e => {
            console.log('FAIL boton');
            estadoBoton=true;
             
          });;
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
       
        if(estadoBoton==true){
          return res.send ("FALLO TRAER CEDULA, INTENTE DE NUEVO");
        }else{
          return res.send ("NO EXISTE LA CEDULA");
        }
       }else{
         console.log( '100%' );
        
         if(data[2]=='NO TIENE ASUNTOS PENDIENTES CON LAS AUTORIDADES JUDICIALES'){
          console.log( 'NO TIENE ASUNTOS PENDIENTES CON LAS AUTORIDADES JUDICIALES CAMBIO A NOMBRE' );
          console.log( 'resultado' );
          console.log( data[0] );
          
         

          return res.send (data[0]);
         }else{
          console.log("resultado");
          if(data[2]=='<u>preguntas frecuentes</u>'){
            console.log('<u>preguntas frecuentes</u> CAMBIO A NO EXISTE LA CEDULA');
            return res.send ("NO EXISTE LA CEDULA");
          }else{
            console.log(data[2]);
            return res.send (data[2]);
          }
        
         }
       
        
       
       }
     
     
     
       }
      }
    })();
}
       

 
 consultacontrol.postConsultaLugarDeVotacion = async(req, res)=>{
  console.log("Consulta : Lugar de votacion")
  const {cedula}=req.body;
  console.log(cedula);
  const browser= await puppeteer.launch({headless:true,  
    args: ["--no-sandbox"],
    env: {

      DISPLAY: ":10.0"
  }, executablePath: executablePath()}).catch(e => {
    console.log('FAIL');
    return res.send("Intente otra vez, muchas peticiones a la vez");
  });
 // const pagina= await puppeteer.launch({headless:true, executablePath: executablePath(),args : [ '--netifs-to-ignore=INTERFACE_TO_IGNORE' ]});
 
 (async () => {
  const page= await browser.newPage();

  if (page) {
    console.log('BROWSER ABIERTO');
}
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
    return res.send("XXXXXX");
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
     
      await browser.close();
      const myJSON = JSON.stringify(data);
      console.log(myJSON.toString());
     
      if(myJSON==null){
        myJSON="NO PUEDE VOTAR"
      }
      
      res.send(myJSON);
      
      }).catch(e => {
        console.log('FAIL');
        return res.send("XXXXXX");
      });
    
      //const texto = await page.evaluate(() => document.querySelector('.table-responsive').innerText);
    
     

}
})();
 }
 
module.exports = consultacontrol;