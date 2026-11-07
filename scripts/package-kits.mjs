import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { zipSync, strToU8 } from 'fflate';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const baseCss = `@font-face{font-family:Manrope;src:url('/assets/manrope.woff2') format('woff2');font-weight:200 800;font-display:swap}
:root{--font-display:Manrope,'Microsoft YaHei','PingFang SC',sans-serif}
*,*::before,*::after{box-sizing:border-box}html{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;scroll-behavior:smooth}body{margin:0;font-family:var(--font-display);-webkit-font-smoothing:antialiased}h1,h2,h3,h4,p,figure{margin:0}h1,h2,h3,h4{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:none}button,input,textarea{font:inherit;color:inherit}button{border:0;background:none;cursor:pointer}img{display:block;max-width:100%;height:auto}ul,ol{margin:0;padding:0;list-style:none}button,a{touch-action:manipulation}::selection{background:#d7ed8b;color:#21221e}@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}`;

async function kitDependencies(directory, slug, rootPackage) {
  const required = { dependencies: ['next', 'react', 'react-dom'], devDependencies: ['typescript', '@types/node', '@types/react', '@types/react-dom'] };
  const invalid = message => new Error(`Invalid dependencies.json for ${slug}: ${message}`);
  let declared = {};
  try {
    declared = JSON.parse(await readFile(join(directory, 'dependencies.json'), 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') throw invalid(error.message);
  }
  if (!declared || Array.isArray(declared) || typeof declared !== 'object') throw invalid('expected an object');
  for (const [section, names] of Object.entries(declared)) {
    if (!Object.hasOwn(required, section) || !Array.isArray(names) || names.some(name => typeof name !== 'string' || !/^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/.test(name))) {
      throw invalid(`${section} must be an array of package names in dependencies or devDependencies`);
    }
  }
  return Object.fromEntries(Object.entries(required).map(([section, names]) => [section, Object.fromEntries(
    [...new Set([...names, ...(declared[section] ?? [])])].map(name => {
      const spec = rootPackage[section]?.[name];
      if (!Object.hasOwn(rootPackage[section] ?? {}, name) || typeof spec !== 'string' || !spec.trim()) throw invalid(`missing version for ${section}.${name} in root package.json`);
      return [name, spec];
    }),
  )]));
}

export async function assembleKit(slug, root = projectRoot) {
  const directories = await readdir(join(root, 'src/kits'), { withFileTypes: true });
  const slugs = directories.filter(entry => entry.isDirectory()).map(entry => entry.name);
  if (!/^[a-z][a-z0-9-]*$/.test(slug) || !slugs.includes(slug)) throw new Error('Unknown template');
  const files = {};
  const add = (path, content) => { files[path] = typeof content === 'string' ? strToU8(content) : content; };
  const directory = join(root, 'src/kits', slug);
  const sourceNames = ['Template.tsx', 'content.ts', 'theme.css'];
  const entries = await readdir(directory, { withFileTypes: true });
  sourceNames.push(...entries.filter(entry => entry.isFile() && /\.(?:tsx?|css)$/.test(entry.name) && !sourceNames.includes(entry.name)).map(entry => entry.name).sort());
  let sourceText = '';
  for (const name of sourceNames) {
    const source = await readFile(join(directory, name));
    add(`app/kits/${slug}/${name}`, source);
    sourceText += `${source.toString('utf8')}\n`;
  }
  add('app/kits/types.ts', await readFile(join(root, 'src/kits/types.ts')));
  const assetNames = new Set(['manrope.woff2', 'Manrope-OFL.txt', ...Array.from(sourceText.matchAll(/\/assets\/([a-zA-Z0-9_.-]+)/g), match => match[1])]);
  for (const name of assetNames) add(`public/assets/${name}`, await readFile(join(root, 'public/assets', name)));
  const rootPackage = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
  const dependencies = await kitDependencies(directory, slug, rootPackage);
  add('package.json', JSON.stringify({ name: `forme-${slug}`, version: '1.0.0', private: true, type: 'module', scripts: { dev: 'next dev', build: 'next build', start: 'next start', typecheck: 'tsc --noEmit' }, ...dependencies }, null, 2));
  add('tsconfig.json', JSON.stringify({ compilerOptions: { target: 'ES2017', lib: ['dom', 'dom.iterable', 'esnext'], allowJs: true, skipLibCheck: true, strict: true, noEmit: true, esModuleInterop: true, module: 'esnext', moduleResolution: 'bundler', resolveJsonModule: true, isolatedModules: true, jsx: 'react-jsx', incremental: true, plugins: [{ name: 'next' }] }, include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts', '.next/dev/types/**/*.ts'], exclude: ['node_modules'] }, null, 2));
  add('next.config.ts', 'import type { NextConfig } from "next";\nconst config: NextConfig = { agentRules: false, devIndicators: false, turbopack: { root: process.cwd() } };\nexport default config;\n');
  add('.gitignore', 'node_modules/\n.next/\n*.tsbuildinfo\n.env*\n');
  add('app/base.css', baseCss);
  add('app/layout.tsx', `import './base.css';\nimport './kits/${slug}/theme.css';\nexport const metadata = { title: 'FORME ${slug}', description: '形集创意作品模板' };\nexport default function Layout({children}:{children:React.ReactNode}) { return <html lang="zh-CN"><body>{children}</body></html>; }\n`);
  for (const page of ['home', 'project', 'about']) {
    const path = page === 'home' ? 'app/page.tsx' : `app/${page}/page.tsx`;
    const prefix = page === 'home' ? './' : '../';
    add(path, `import Template from '${prefix}kits/${slug}/Template';\nexport default function Page() { return <Template page="${page}" basePath="" />; }\n`);
  }
  add('app/icon.svg', await readFile(join(root, 'src/app/icon.svg')));
  add('DESIGN.md', await readFile(join(root, 'src/kits', slug, 'DESIGN.md')));
  add('SOURCES.md', await readFile(join(root, 'SOURCES.md')));
  add('AGENTS.md', `# ${slug} 模板修改规则\n\n先阅读 README.md、DESIGN.md 和 app/kits/${slug}/content.ts。\n\n- 修改内容优先使用 content.ts，保持已定义的图片比例与路径。\n- 复用现有组件、布局、主题变量；新增页面先参照 project 与 about 页面。\n- CSS 作用域保持 .kit-${slug}，不得覆盖全局或其他品牌样式。\n- 不随意引入新颜色、字体、圆角、阴影、组件库或动效依赖。需要变更时说明原因。\n- 样式修改后检查手机、桌面、中文长标题、键盘焦点与减少动态效果。\n- 运行 npm run build，验证页面导航与联系按钮；新功能同步更新 README。\n- 规范是设计参照，自动化截图只能发现变化，审美仍需人工判断。\n`);
  add('README.md', `# FORME ${slug} 完整网站模板\n\n## 运行\n\n需要 Node.js 20.9 或更高版本。解压后在本目录运行：\n\n\`\`\`sh\nnpm install\nnpm run dev\n\`\`\`\n\n打开终端显示的 localhost 地址。发布前运行 \`npm run build\`，随后可运行 \`npm start\`。\n\n## 文件与页面\n\n- app/page.tsx：首页。\n- app/project/page.tsx：完整项目页。\n- app/about/page.tsx：关于与联系。\n- app/kits/${slug}/content.ts：文案、项目资料与图片配置。\n- app/kits/${slug}/Template.tsx：页面组件，和形集在线预览使用同一源码。\n- app/kits/${slug}/theme.css：本套模板主题与响应式样式。\n- DESIGN.md：设计规则。AGENTS.md：AI 修改约束。SOURCES.md：素材来源。\n\n## 修改方法\n\n先替换 content.ts 的演示资料和 public/assets 中的图片。让 AI 阅读 DESIGN.md、AGENTS.md，再复用现有组件扩展页面。新增详情页可复制 app/project/page.tsx 的路由结构，并给 Template 的内容配置扩展项目参数。不要把同一个样式改动散落到多个页面。\n\n## 说明\n\n当前版本供免费下载与本地试用。演示品牌与项目为虚构示例；联系按钮仅复制标记为示例的地址，不发送信息。图片与字体保留各自许可。正式公开发布前，由维护者确定模板授权条款。\n\n源码只包含本套模板，不依赖形集平台，也没有平台账号、远程 API 或追踪脚本。\n`);
  return files;
}

export async function packageAll(root = projectRoot) {
  const entries = await readdir(join(root, 'src/kits'), { withFileTypes: true });
  const directory = join(root, 'public/downloads');
  await mkdir(directory, { recursive: true });
  const manifest = [];
  const palettes = {};
  for (const entry of entries.filter(item => item.isDirectory())) {
    const css = await readFile(join(root, 'src/kits', entry.name, 'theme.css'), 'utf8');
    const values = Object.fromEntries(Array.from(css.matchAll(/--[a-z]+-(bg|ink|muted):\s*(#[\da-fA-F]+);/g), match => [match[1], match[2]]));
    if (!values.bg || !values.ink || !values.muted) throw new Error(`Missing palette in ${entry.name}`);
    palettes[entry.name] = [values.bg, values.ink, values.muted];
    const files = await assembleKit(entry.name, root);
    const archive = zipSync(files, { level: 6, mtime: new Date('2026-11-06T00:00:00Z') });
    await writeFile(join(directory, `${entry.name}.zip`), archive);
    manifest.push({ slug: entry.name, bytes: archive.byteLength, files: Object.keys(files).length });
  }
  await writeFile(join(directory, 'manifest.json'), JSON.stringify(manifest, null, 2));
  await writeFile(join(root, 'src/content/palettes.json'), JSON.stringify(palettes, null, 2));
  return manifest;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const manifest = await packageAll();
  process.stdout.write(`${JSON.stringify(manifest, null, 2)}\n`);
}
