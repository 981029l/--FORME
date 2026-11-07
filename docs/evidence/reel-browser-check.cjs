async (page) => {
  const root = 'C:/Users/79402/Documents/Codex/2026-11-06/new-chat-2';
  const origin = new URL(page.url()).origin;
  const report = { checkedAt: new Date().toISOString(), origin, pages: [], flows: [], errors: [] };
  page.on('pageerror', error => report.errors.push(error.message));
  const check = (name, value, detail) => { report.flows.push({ name, pass: !!value, detail }); if (!value) throw new Error(name + ': ' + JSON.stringify(detail)); };
  const scene = () => page.locator('.re-scene');
  const active = () => page.locator('.re-gallery').getAttribute('data-active-film');
  const pause = async () => { const button = page.getByRole('button', {name:'暂停动态',exact:true}); if (await button.count()) await button.click(); };
  try {
    await page.emulateMedia({reducedMotion:'no-preference'});
    await page.setViewportSize({width:1440,height:1080});
    await page.goto(origin + '/preview/cinema');
    await page.locator('.re-gallery[data-renderer="webgl"]').waitFor();
    await pause();
    const main = page.getByRole('main'); await main.focus();
    for (const [key,id] of [['ArrowRight','under-canopy'],['ArrowLeft','after-tide'],['End','beyond-the-map'],['Home','after-tide']]) {
      await page.keyboard.press(key); await page.waitForTimeout(70); check('keyboard ' + key, await active() === id, await active());
    }
    await page.keyboard.press('Space'); await page.waitForTimeout(80);
    check('flip back', await page.locator('.re-gallery').getAttribute('data-face') === 'back');
    await page.screenshot({path:root+'/outputs/forme-reel-back.png'});
    await page.keyboard.press('Space'); await page.waitForTimeout(80);
    check('flip front', await page.locator('.re-gallery').getAttribute('data-face') === 'front');
    await page.waitForTimeout(200); const a = await scene().getAttribute('data-frames'); await page.waitForTimeout(300); const b = await scene().getAttribute('data-frames');
    check('pause stops continuous frames', a === b, {a,b});
    await page.getByRole('button',{name:'恢复动态',exact:true}).click(); await page.waitForTimeout(100); const d = await scene().getAttribute('data-frames'); await page.waitForTimeout(300); const e = await scene().getAttribute('data-frames');
    check('resume restarts frames', Number(e) > Number(d), {d,e});
    await page.mouse.move(850,540); await page.mouse.wheel(0,300); await page.waitForTimeout(50); await page.mouse.wheel(0,300); await page.waitForTimeout(850);
    check('wheel next', await active() === 'under-canopy', await active());
    await page.mouse.move(900,540); await page.mouse.down(); await page.mouse.move(370,540,{steps:20}); await page.mouse.up(); await page.waitForTimeout(850);
    check('mouse drag changes film', await active() !== 'under-canopy', await active());
    const toggle = page.getByRole('button',{name:'索引',exact:true}); await toggle.click();
    check('index opened', await page.getByRole('dialog').isVisible());
    const link = page.getByRole('dialog').getByRole('link').nth(1); await link.focus(); await page.waitForTimeout(750);
    check('index focus previews film', await active() === 'under-canopy');
    await page.keyboard.press('Escape'); await page.waitForTimeout(100);
    check('index Esc restores focus', await toggle.evaluate(el => el === document.activeElement));
    check('index expanded state reset', await toggle.getAttribute('aria-expanded') === 'false');
    await toggle.click(); await page.getByRole('dialog').getByRole('link').nth(2).click(); await page.waitForURL('**/project?film=folds-of-city');
    await page.getByRole('heading',{level:1,name:'城的褶皱'}).waitFor();
    check('index navigates to selected film', await page.getByRole('heading',{level:1}).innerText() === '城的褶皱');
    const expand = page.getByRole('button',{name:'展开画面'}); await expand.click();
    check('detail expands images', await page.locator('#re-frame-list').evaluate(el => el.classList.contains('re-frames-expanded')));
    await page.getByRole('button',{name:'收起画面'}).click();
    check('detail collapses images', !(await page.locator('#re-frame-list').evaluate(el => el.classList.contains('re-frames-expanded'))));
    await page.locator('.re-back a').click(); await page.locator('.re-gallery[data-renderer="webgl"]').waitFor();
    check('return preserves selected film', await active() === 'folds-of-city', await active());
    await pause(); await page.getByRole('main').focus(); await page.keyboard.press('Enter'); await page.waitForURL('**/project?film=folds-of-city');
    await page.getByRole('heading',{level:1,name:'城的褶皱'}).waitFor();
    check('Enter opens selected film', await page.getByRole('heading',{level:1}).innerText() === '城的褶皱');
    await page.locator('.re-next-film').click(); await page.waitForURL('**/project?film=room-at-dusk');
    await page.getByRole('heading',{level:1,name:'暮色房间'}).waitFor();
    check('next film detail', await page.getByRole('heading',{level:1}).innerText() === '暮色房间');
    await page.goto(origin+'/preview/cinema/about');
    await page.context().grantPermissions(['clipboard-read','clipboard-write']);
    await page.getByRole('button',{name:'复制演示邮箱'}).click();
    check('copy example email', await page.evaluate(() => navigator.clipboard.readText()) === 'hello@reel.example');
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.goto(origin+'/preview/cinema'); await page.locator('.re-gallery[data-renderer="webgl"]').waitFor();
    await page.waitForTimeout(200); const f = await scene().getAttribute('data-frames'); await page.waitForTimeout(300); const g = await scene().getAttribute('data-frames');
    check('reduced motion stops continuous frames', f === g, {f,g});
    await page.getByRole('button',{name:'下一张',exact:true}).click(); await page.waitForTimeout(80);
    check('reduced motion selection works', await active() === 'under-canopy');
    await page.getByRole('button',{name:'翻转光盘',exact:true}).click(); await page.waitForTimeout(80);
    check('reduced motion flip works', await page.locator('.re-gallery').getAttribute('data-face') === 'back');
    for (const width of [1440,768,390,320]) {
      await page.setViewportSize({width,height:width<400?844:1000});
      for (const route of ['/preview/cinema','/preview/cinema/project?film=paper-distance','/preview/cinema/about','/templates/cinema']) {
        const response = await page.goto(origin+route); await page.waitForTimeout(160);
        await page.locator('main').waitFor();
        if (route==='/preview/cinema') await page.locator('.re-gallery[data-renderer="webgl"]').waitFor();
        await page.evaluate(async () => { await Promise.all([...document.images].map(img => img.decode().catch(() => {}))); });
        const metrics = await page.evaluate(() => ({h1:document.querySelectorAll('h1').length,main:document.querySelectorAll('main').length,overflow:document.documentElement.scrollWidth>innerWidth+1,broken:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src)}));
        await page.addScriptTag({path:'C:/Users/79402/AppData/Local/npm-cache/_npx/0f94ee7615faf582/node_modules/axe-core/axe.min.js'});
        const violations = await page.evaluate(async () => (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})));
        report.pages.push({route,width,status:response.status(),...metrics,violations,pass:response.ok()&&metrics.h1===1&&metrics.main===1&&!metrics.overflow&&!metrics.broken.length&&!violations.length});
        if (width===390&&route==='/preview/cinema') await page.screenshot({path:root+'/outputs/forme-reel-mobile.png'});
      }
    }
  } catch(error) { report.errors.push(error.stack); }
  return report;
}
