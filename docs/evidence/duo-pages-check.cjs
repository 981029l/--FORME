async (page) => {
  const origin = new URL(page.url()).origin;
  const report = { checkedAt:new Date().toISOString(),origin,results:[],errors:[] };
  const onError = error => report.errors.push(error.message);
  page.on('pageerror',onError);
  try {
    for(const width of [1440,768,390,320]) {
      await page.setViewportSize({width,height:width<400?844:1000});
      await page.emulateMedia({reducedMotion:'no-preference'});
      for(const slug of ['doodle','depth']) for(const path of [`/preview/${slug}`,`/preview/${slug}/project`,`/preview/${slug}/about`,`/templates/${slug}`]) {
        const response = await page.goto(origin+path);
        await page.locator('main').waitFor();
        await page.waitForFunction(()=>Object.keys(document.querySelector('main')).some(key=>key.startsWith('__reactFiber$')));
        await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(img=>{img.loading='eager';return img.decode().catch(()=>{});}));});
        await page.waitForTimeout(200);
        const layout=await page.evaluate(()=>({h1:document.querySelectorAll('h1').length,main:document.querySelectorAll('main').length,overflow:document.documentElement.scrollWidth>innerWidth+1,broken:[...document.images].filter(img=>!img.naturalWidth).map(img=>img.src)}));
        await page.addScriptTag({path:'C:/Users/79402/AppData/Local/npm-cache/_npx/0f94ee7615faf582/node_modules/axe-core/axe.min.js'});
        const violations=await page.evaluate(async()=>(await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})));
        report.results.push({path,width,status:response.status(),...layout,violations,pass:response.ok()&&layout.h1===1&&layout.main===1&&!layout.overflow&&!layout.broken.length&&!violations.length});
      }
    }
  } catch(error) { report.errors.push(error.stack); }
  finally { page.off('pageerror',onError); }
  return report;
}
