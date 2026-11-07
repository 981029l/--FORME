const {chromium}=require('../outputs/forme/node_modules/@playwright/test');
const fs=require('fs');
const path=require('path');
const base=process.env.FORME_BASE||'http://127.0.0.1:3000';
const report={checkedAt:new Date().toISOString(),base,checks:[],errors:[]};
const check=(name,pass,detail)=>{report.checks.push({name,pass:Boolean(pass),detail});if(!pass)throw new Error(name)};
(async()=>{
  const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  page.on('pageerror',e=>report.errors.push(e.message));
  page.on('console',e=>{if(e.type()==='error'||e.text().includes('GSAP target'))report.errors.push({text:e.text(),location:e.location()})});
  const goto=async url=>page.goto(base+url,{waitUntil:'networkidle'});
  const active=()=>page.locator('.showroom-exhibit').getAttribute('data-active-slug');
  const settle=()=>page.waitForFunction(()=>document.querySelector('.showroom-exhibit')?.dataset.transitioning==='false');
  try{
    await goto('/');
    const slugs=['depth','cinema','doodle','editorial','architecture','music'];
    for(const slug of slugs){
      await page.locator(`.showroom-thumbnail[data-slug="${slug}"]`).click();await settle();
      check('Selected '+slug+' has matching detail and preview',await active()===slug&&await page.locator('.showroom-detail-link').getAttribute('href')==='/templates/'+slug&&await page.locator('.showroom-preview-link').getAttribute('href')==='/preview/'+slug);
    }
    await page.getByRole('button',{name:'下一件作品',exact:true}).click();await settle();
    check('Forward wraps from last to first',await active()==='depth');
    await page.getByRole('button',{name:'上一件作品',exact:true}).click();await settle();
    check('Backward wraps from first to last',await active()==='music');
    for(let i=0;i<9;i++)await page.getByRole('button',{name:'下一件作品',exact:true}).click();await settle();
    check('Rapid nine switches settle without outgoing image',await active()==='doodle'&&await page.locator('.showroom-outgoing').count()===0);
    await page.locator('.showroom-stage').focus();await page.keyboard.press('ArrowRight');await settle();
    check('Keyboard changes active work',await active()==='editorial');
    await page.emulateMedia({reducedMotion:'reduce'});await page.keyboard.press('ArrowRight');await settle();
    check('Reduced motion switches immediately',await active()==='architecture'&&await page.locator('.showroom-outgoing').count()===0);
    await page.emulateMedia({reducedMotion:'no-preference'});await page.keyboard.press('ArrowRight');
    await page.emulateMedia({reducedMotion:'reduce'});await settle();
    check('Enabling reduce during animation settles',await active()==='music'&&await page.locator('.showroom-outgoing').count()===0);
    await page.emulateMedia({reducedMotion:'no-preference'});
    const box=await page.locator('.showroom-stage').boundingBox();
    await page.mouse.move(box.x+box.width*.55,box.y+box.height*.5);await page.mouse.down();await page.mouse.move(box.x+box.width*.35,box.y+box.height*.5,{steps:6});await page.mouse.up();await settle();
    check('Mouse horizontal drag changes work',await active()==='depth');
    await page.getByRole('button',{name:'下一件作品',exact:true}).click();await page.locator('.showroom-library-link').click();await page.waitForURL('**/templates');
    await page.goBack({waitUntil:'networkidle'});await settle();
    check('Unmount during animation leaves clean homepage',await page.locator('.showroom-outgoing').count()===0);
    await page.setViewportSize({width:1920,height:1080});await goto('/templates');
    check('Wide library has four columns',await page.locator('.library-grid').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length)===4);
    await page.locator('#template-search').fill('DEPTH');await page.waitForFunction(()=>document.querySelectorAll('.library-card').length===1);
    check('Single wide result starts at grid left',await page.locator('.library-card').evaluate(e=>Math.abs(e.getBoundingClientRect().left-e.parentElement.getBoundingClientRect().left)<1));
    for(const width of [1440,390,320]){
      await page.setViewportSize({width,height:width<768?844:1000});await goto('/templates');
      await page.locator('.library-card[data-template="editorial"] .library-quick-open').click();await page.waitForFunction(()=>document.querySelector('dialog')?.open);
      await page.addScriptTag({path:'C:/Users/79402/AppData/Local/npm-cache/_npx/0f94ee7615faf582/node_modules/axe-core/axe.min.js'});
      const a=await page.evaluate(async()=>({overflow:document.querySelector('dialog').scrollWidth>document.querySelector('dialog').clientWidth+1,violations:(await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))}));
      check('Quick preview '+width+'px layout and axe',!a.overflow&&!a.violations.length,a);
      if(width!==320)await page.screenshot({path:path.join(__dirname,'showroom-check',`showroom-quick-${width}.png`)});
      await page.locator('.quick-preview-close').click();
    }
    for(const slug of ['cinema','doodle','depth'])for(const route of ['', '/project','/about']){
      const response=await goto('/preview/'+slug+route);
      check('Preserved preview '+slug+route,response.status()===200&&await page.locator('main').count()===1);
    }
    const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
    const touch=await mobile.newPage();await touch.goto(base,{waitUntil:'networkidle'});
    const client=await mobile.newCDPSession(touch);
    const swipe=async(x,y,dx,dy)=>{
      await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
      for(let i=1;i<=8;i++)await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+dx*i/8,y:y+dy*i/8}]});
      await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
    };
    const b=await touch.locator('.showroom-stage').boundingBox();await swipe(b.x+b.width*.7,b.y+b.height*.5,-120,0);
    await touch.waitForFunction(()=>document.querySelector('.showroom-exhibit').dataset.transitioning==='false');
    check('Native touch horizontal swipe changes work',await touch.locator('.showroom-exhibit').getAttribute('data-active-slug')==='cinema');
    await swipe(195,550,0,-240);await touch.waitForFunction(()=>scrollY>40);
    check('Vertical touch scroll preserves work',await touch.locator('.showroom-exhibit').getAttribute('data-active-slug')==='cinema'&&await touch.evaluate(()=>scrollY)>40);
    await mobile.close();
  }catch(e){report.checks.push({name:'Extra suite completed',pass:false,detail:e.message})}
  await browser.close();fs.writeFileSync(path.join(__dirname,'showroom-extra.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
  if(report.checks.some(c=>!c.pass)||report.errors.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
