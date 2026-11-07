async (page) => {
  const origin = new URL(page.url()).origin;
  const report = {checkedAt:new Date().toISOString(),checks:[],errors:[]};
  const check = (name,value,detail) => {report.checks.push({name,pass:!!value,detail});if(!value) throw Error(name);};
  const active = p => p.locator('.re-gallery').getAttribute('data-active-film');
  let mobile, fallback;
  try {
    await page.emulateMedia({reducedMotion:'no-preference'});
    await page.goto(origin+'/preview/cinema'); await page.locator('.re-gallery[data-renderer="webgl"]').waitFor();
    await page.getByRole('button',{name:'翻转光盘',exact:true}).click();
    await page.getByRole('button',{name:'索引',exact:true}).click();
    await page.getByRole('dialog').getByRole('link').nth(3).focus(); await page.waitForTimeout(400);
    await page.keyboard.press('Escape'); await page.getByRole('button',{name:'暂停动态',exact:true}).click();
    await page.waitForTimeout(200); const a=await page.locator('.re-scene').getAttribute('data-frames'); await page.waitForTimeout(300); const b=await page.locator('.re-scene').getAttribute('data-frames');
    check('offscreen flip settles while paused',a===b,{a,b,baseline:{a:'53',b:'71'}});
    mobile = await page.context().browser().newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1});
    const touch = await mobile.newPage(); await touch.goto(origin+'/preview/cinema'); await touch.locator('.re-gallery[data-renderer="webgl"]').waitFor();
    await touch.waitForTimeout(1100);
    const cdp = await mobile.newCDPSession(touch);
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:310,y:430}]});
    for(let x=290;x>=55;x-=20) await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y:430}]});
    await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]}); await touch.waitForTimeout(1000);
    check('mobile touch swipe changes film',await active(touch)!=='after-tide',await active(touch));
    await touch.getByRole('main').focus(); await touch.keyboard.press('Home'); await touch.waitForTimeout(800);
    await touch.touchscreen.tap(160,360); await touch.waitForTimeout(700);
    check('mobile tap flips disc',await touch.locator('.re-gallery').getAttribute('data-face')==='back');
    await mobile.close(); mobile=null;
    fallback = await page.context().browser().newContext({viewport:{width:390,height:844}});
    await fallback.addInitScript(() => {const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){if(type==='webgl'||type==='webgl2'||type==='experimental-webgl') return null;return original.call(this,type,...args);};});
    const flat=await fallback.newPage(); await flat.goto(origin+'/preview/cinema'); await flat.locator('.re-gallery[data-renderer="fallback"]').waitFor();
    check('WebGL unavailable shows fallback',await flat.locator('.re-fallback-disc').isVisible());
    await flat.getByRole('button',{name:'下一张',exact:true}).click(); check('fallback next works',await active(flat)==='under-canopy');
    await flat.getByRole('button',{name:'翻转光盘',exact:true}).click(); check('fallback flip works',await flat.locator('.re-fallback-back').count()===1);
    await flat.getByRole('button',{name:'查看映像',exact:true}).click(); await flat.waitForURL('**/project?film=under-canopy'); await flat.getByRole('heading',{level:1,name:'林间静默'}).waitFor(); check('fallback opens correct detail',flat.url().endsWith('project?film=under-canopy'));
    await fallback.close(); fallback=null;
    await page.goto(origin+'/preview/cinema'); await page.locator('.re-gallery[data-renderer="webgl"]').waitFor();
    await page.locator('.re-scene canvas').evaluate(canvas=>canvas.dispatchEvent(new Event('webglcontextlost',{cancelable:true})));
    await page.locator('.re-gallery[data-renderer="fallback"]').waitFor();
    await page.getByRole('button',{name:'下一张',exact:true}).click();check('context loss preserves navigation',await active(page)==='under-canopy');
    await page.goto(origin+'/'); await page.locator('.template-card').first().waitFor();
    check('catalog has 22 templates',await page.locator('.template-card').count()===22);
    const search=page.getByRole('searchbox',{name:'搜索模板'}); await search.fill('回映');
    check('Chinese search finds REEL',await page.locator('.template-card').count()===1 && await page.locator('.card-cinema').count()===1);
    await page.locator('.card-cinema img').evaluate(img=>img.decode());check('catalog thumbnail loads',await page.locator('.card-cinema img').evaluate(img=>img.naturalWidth>0));
    for(const width of [1440,1920,2560]) {await page.setViewportSize({width,height:1080});check('single search card left aligned '+width,await page.locator('.template-grid').evaluate(grid=>Math.abs(grid.firstElementChild.getBoundingClientRect().left-grid.getBoundingClientRect().left)<1));}
    await search.fill('REEL');check('English search finds REEL',await page.locator('.card-cinema').count()===1);
    const bookmark = page.locator('.card-cinema .bookmark-button'); const initial=await bookmark.getAttribute('aria-pressed'); await bookmark.click(); check('favorite toggles',await bookmark.getAttribute('aria-pressed')!==initial); await bookmark.click();
    await page.getByRole('button',{name:'清除搜索',exact:true}).click();check('clear restores catalog',await page.locator('.template-card').count()===22);
  }catch(error){report.errors.push(error.stack);}
  finally{if(mobile)await mobile.close();if(fallback)await fallback.close();}
  return report;
}
