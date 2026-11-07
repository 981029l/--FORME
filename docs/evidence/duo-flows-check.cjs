async(page)=>{
  const origin=new URL(page.url()).origin, report={checkedAt:new Date().toISOString(),origin,checks:[],errors:[]};
  const check=(name,pass,detail)=>{report.checks.push({name,pass:!!pass,detail});if(!pass)throw Error(name+': '+JSON.stringify(detail));};
  const attr=(selector,name)=>page.locator(selector).getAttribute('data-'+name);
  const still=async(selector)=>{await page.waitForTimeout(150);const a=await attr(selector,'frames');await page.waitForTimeout(350);const b=await attr(selector,'frames');return {a,b,stopped:a===b};};
  const onError=error=>report.errors.push(error.message);page.on('pageerror',onError);
  try{
    await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:1440,height:1000});
    await page.goto(origin+'/preview/doodle');await page.waitForFunction(()=>Number(document.querySelector('.do-scene')?.getAttribute('data-frames'))>0);
    check('doodle initial crowd',await attr('.do-scene','people')==='36');
    await page.getByRole('button',{name:'增加漫游者',exact:true}).click();check('crowd increases',await attr('.do-scene','people')==='54');
    check('upper crowd bound',await page.getByRole('button',{name:'增加漫游者',exact:true}).isDisabled());
    await page.getByRole('button',{name:'减少漫游者',exact:true}).click({clickCount:2});check('crowd decreases',await attr('.do-scene','people')==='20');
    check('lower crowd bound',await page.getByRole('button',{name:'减少漫游者',exact:true}).isDisabled());
    await page.getByRole('button',{name:'增加漫游者',exact:true}).click();
    await page.locator('.do-plant').click();check('plant button adds a mark',await attr('.do-scene','marks')==='1');
    await page.locator('.do-scene').click({position:{x:750,y:800}});check('canvas click adds a mark',await attr('.do-scene','marks')==='2');
    await page.locator('.do-pause').click();let sample=await still('.do-scene');check('doodle pause stops frames',sample.stopped,sample);
    await page.locator('.do-plant').click();sample=await still('.do-scene');check('plant while paused draws once',sample.stopped&&await attr('.do-scene','marks')==='3',sample);
    await page.getByRole('button',{name:'重新开始',exact:true}).click();check('reset clears marks and keeps crowd',await attr('.do-scene','marks')==='0'&&await attr('.do-scene','people')==='36');
    await page.locator('.do-scene').focus();await page.keyboard.press('Enter');check('keyboard plants',await attr('.do-scene','marks')==='1');
    await page.keyboard.press('Space');sample=await still('.do-scene');check('keyboard resumes movement',!sample.stopped,sample);
    await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>document.querySelector('.do-scene')?.getAttribute('data-paused')==='true');sample=await still('.do-scene');check('doodle reduced motion stops frames',sample.stopped,sample);
    await page.locator('.do-plant').click();sample=await still('.do-scene');check('reduced mode keeps plant action',sample.stopped&&await attr('.do-scene','marks')==='2',sample);
    await page.goto(origin+'/preview/doodle/project');await page.locator('.do-idea-card').first().waitFor();
    check('four original ideas',await page.locator('.do-idea-card').count()===4);
    for(const [name,count] of [['日常物件',2],['随手玩玩',1],['想象空间',1],['全部点子',4]]){await page.getByRole('button',{name,exact:true}).click();check('idea filter '+name,await page.locator('.do-idea-card').count()===count);}
    await page.locator('[data-idea="cloud-pocket"] .do-idea-image').click();check('selected idea updates URL',await attr('.do-idea-detail','selected-idea')==='cloud-pocket'&&page.url().includes('idea=cloud-pocket'));
    await page.reload();await page.waitForFunction(()=>document.querySelector('.do-idea-detail')?.getAttribute('data-selected-idea')==='cloud-pocket');check('idea survives reload',true);
    await page.getByRole('button',{name:'收起详情',exact:true}).click();check('idea details collapse',await page.locator('#do-detail-body').isHidden());
    await page.getByRole('button',{name:'点子详情',exact:true}).click();check('idea details expand',await page.locator('#do-detail-body').isVisible());
    await page.getByRole('button',{name:'再看一个',exact:true}).click();check('next idea',await attr('.do-idea-detail','selected-idea')==='cup-garden');
    await page.context().grantPermissions(['clipboard-read','clipboard-write']);await page.getByRole('button',{name:'复制邮箱',exact:true}).click();check('ramble email copied',await page.evaluate(()=>navigator.clipboard.readText())==='hello@ramble.example');
    await page.emulateMedia({reducedMotion:'no-preference'});await page.goto(origin+'/preview/depth');await page.locator('.dp-journey[data-renderer="css3d"]').waitFor();
    sample=await still('.dp-journey');check('depth idle renderer sleeps',sample.stopped,sample);
    const first=Number(await attr('.dp-journey','camera'));await page.mouse.move(700,500);await page.mouse.wheel(0,900);await page.waitForFunction(v=>Number(document.querySelector('.dp-journey')?.getAttribute('data-camera'))>v+100,first);
    check('wheel drives spatial camera',Number(await attr('.dp-journey','camera'))>first+100,await page.locator('.dp-camera').evaluate(el=>getComputedStyle(el).transform));
    for(const [i,id] of ['arrival','form','tide','human','night','possibility'].entries()){
      await page.locator('.dp-chapter-nav a').nth(i).click();
      await page.waitForFunction(target=>Math.abs(Number(document.querySelector('.dp-journey')?.getAttribute('data-camera'))-target)<4,i*1800,{timeout:8000});
      check('chapter '+id,await attr('.dp-journey','chapter')===id,{camera:await attr('.dp-journey','camera')});
      if([0,2,4].includes(i))await page.screenshot({path:'C:/Users/79402/Documents/Codex/2026-11-06/new-chat-2/outputs/forme-depth-scene-'+i+'.png'});
    }
    await page.locator('.dp-skip-experience').click();await page.waitForFunction(()=>Math.abs(document.querySelector('#dp-work').getBoundingClientRect().top)<130,null,{timeout:8000});check('skip reaches usable work index',true);
    check('six work links',await page.locator('.dp-work-list li').count()===6);
    await page.locator('.dp-work-list li').nth(4).getByRole('link').click();await page.waitForURL('**/project?project=nocturne');await page.locator('.dp-project[data-project="nocturne"]').waitFor();check('depth project query selects work',true);
    await page.locator('.dp-next-project').click();await page.locator('.dp-project[data-project="open-distance"]').waitFor();check('depth next project',true);
    await page.locator('.dp-project-back a').click();await page.locator('.dp-journey[data-renderer="css3d"]').waitFor();await page.waitForFunction(()=>Math.abs(document.querySelector('#dp-work').getBoundingClientRect().top)<130,null,{timeout:8000});check('return targets work list',page.url().endsWith('#dp-work'));
    await page.locator('.dp-replay').click();await page.waitForFunction(()=>Number(document.querySelector('.dp-journey')?.getAttribute('data-camera'))<4,{timeout:8000});check('replay returns to opening',true);
    await page.emulateMedia({reducedMotion:'reduce'});await page.locator('.dp-journey[data-renderer="static"]').waitFor();
    check('reduced mode shows all six chapters',await page.locator('.dp-static-content:visible').count()===6);
    sample=await still('.dp-journey');check('static mode stops rendering',sample.stopped,sample);
    check('static layout has no horizontal overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    await page.goto(origin+'/preview/depth/about');await page.getByRole('button',{name:'复制演示邮箱',exact:true}).click();check('depth email copied',await page.evaluate(()=>navigator.clipboard.readText())==='hello@depth.example');
  }catch(error){report.errors.push(error.stack);}finally{page.off('pageerror',onError);}
  return report;
}
