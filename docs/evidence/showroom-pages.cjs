const { chromium } = require('../outputs/forme/node_modules/@playwright/test');
const fs = require('fs');
const path = require('path');
const base = process.env.FORME_BASE || 'http://127.0.0.1:3001';
const out = path.join(__dirname,'showroom-check');
const report = {checkedAt:new Date().toISOString(),base,results:[],errors:[]};
const routes=['/','/templates','/templates/editorial','/guide','/standards','/sources','/feedback'];
(async()=>{
  fs.mkdirSync(out,{recursive:true});
  const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  const page=await browser.newPage();
  page.on('pageerror',e=>report.errors.push({url:page.url(),error:e.message}));
  page.on('console',e=>{if(e.type()==='error')report.errors.push({url:page.url(),error:e.text()})});
  page.on('response',r=>{if(r.status()>=400)report.errors.push({url:r.url(),status:r.status()})});
  for(const theme of ['light','dark']) for(const width of theme==='light'?[1440,768,390,320]:[1440,390]) for(const route of theme==='light'?routes:['/','/templates','/templates/editorial']){
    const height=width===320?768:width<768?844:1000;
    await page.setViewportSize({width,height});
    await page.emulateMedia({colorScheme:theme,reducedMotion:'reduce'});
    const response=await page.goto(base+route,{waitUntil:'networkidle'});
    await page.evaluate(async()=>{document.querySelectorAll('img').forEach(e=>e.loading='eager');await Promise.all([...document.images].map(e=>e.decode().catch(()=>{})));await document.fonts.ready;});
    await page.addScriptTag({path:'C:/Users/79402/AppData/Local/npm-cache/_npx/0f94ee7615faf582/node_modules/axe-core/axe.min.js'});
    const info=await page.evaluate(async()=>({
      height:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth>innerWidth+1,
      h1:document.querySelectorAll('h1').length,main:document.querySelectorAll('main').length,
      images:[...document.images].filter(e=>e.complete&&!e.naturalWidth).map(e=>e.src),
      columns:document.querySelector('.library-grid')?getComputedStyle(document.querySelector('.library-grid')).gridTemplateColumns.split(' ').length:null,
      savedVisible:getComputedStyle(document.querySelector('.saved-link svg')).display!=='none',
      violations:(await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}})).violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))
    }));
    const result={route,width,height,theme,status:response.status(),...info};
    result.pass=result.status===200&&!info.overflow&&info.h1===1&&info.main===1&&!info.images.length&&!info.violations.length&&info.savedVisible;
    report.results.push(result);
    if((width===1440||width===390)&&['/','/templates','/templates/editorial'].includes(route)) await page.screenshot({path:path.join(out,`showroom-${route==='/'?'home':route.replaceAll('/','-').slice(1)}-${width}-${theme}.png`),fullPage:true});
    console.log(JSON.stringify(result));
  }
  await browser.close();
  fs.writeFileSync(path.join(__dirname,'showroom-pages.json'),JSON.stringify(report,null,2));
  if(report.results.some(x=>!x.pass)||report.errors.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
