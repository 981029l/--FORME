import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { assembleKit } from '../scripts/package-kits.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
async function createFixture(t, extra = {}) {
  const fixtureRoot = await mkdtemp(join(tmpdir(), 'forme-package-'));
  t.after(() => rm(fixtureRoot, { recursive: true, force: true }));
  const fixtureFiles = {
    'package.json': JSON.stringify({ dependencies: { next: '16.4.5', react: '19.3.1', 'react-dom': '19.3.1', three: '^0.187.0', unrelated: '1.0.0' }, devDependencies: { typescript: '^5.9.0', '@types/node': '^24.0.0', '@types/react': '^19.0.0', '@types/react-dom': '^19.0.0', '@types/three': '~0.187.0' } }),
    'src/kits/example/Template.tsx': 'export default function Template() { return <main>示例</main>; }',
    'src/kits/example/content.ts': 'export const title = "示例";',
    'src/kits/example/theme.css': '.kit-example { color: #111; }',
    'src/kits/example/DESIGN.md': '# 示例设计',
    'src/kits/types.ts': 'export type Page = "home" | "about" | "project";',
    'src/app/icon.svg': '<svg xmlns="http://www.w3.org/2000/svg"/>',
    'public/assets/manrope.woff2': 'fixture-font',
    'public/assets/Manrope-OFL.txt': 'fixture-license',
    'SOURCES.md': '# Fixture sources',
    ...extra,
  };
  for (const [path, content] of Object.entries(fixtureFiles)) {
    if (content === null) continue;
    const target = join(fixtureRoot, path);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, content);
  }
  return fixtureRoot;
}
test('a download contains the three working routes, editable source and local assets', async () => {
  const files = await assembleKit('editorial', root);
  for (const path of ['package.json', 'app/page.tsx', 'app/project/page.tsx', 'app/about/page.tsx', 'README.md', 'DESIGN.md', 'AGENTS.md', 'SOURCES.md', 'public/assets/manrope.woff2', 'public/assets/interior.jpg']) {
    assert.ok(files[path]?.length > 0, `Missing ${path}`);
  }
  const manifest = JSON.parse(Buffer.from(files['package.json']).toString('utf8'));
  assert.equal(manifest.scripts.build, 'next build');
  assert.ok(manifest.dependencies.next);
});
test('download uses the exact preview template and carries no platform alias dependency', async () => {
  const files = await assembleKit('gallery', root);
  const source = await readFile(new URL('../src/kits/gallery/Template.tsx', import.meta.url));
  assert.deepEqual(Buffer.from(files['app/kits/gallery/Template.tsx']), source);
  for (const [path, bytes] of Object.entries(files)) {
    if (/\.(tsx?|css)$/.test(path)) assert.ok(!Buffer.from(bytes).toString('utf8').includes('@/'), `Platform alias in ${path}`);
  }
});
test('unknown kit names cannot escape the template directory', async () => {
  await assert.rejects(assembleKit('../editorial', root), /Unknown template/);
});
test('download copies local source helpers exactly and includes their referenced assets', async t => {
  const scene = 'export const Scene = () => <img alt="场景" src="/assets/scene.svg"/>;\n';
  const math = 'export const distance = (x: number) => Math.abs(x);\n';
  const css = '.scene { background: url("/assets/scene-background.svg"); }\n';
  const fixtureRoot = await createFixture(t, {
    'src/kits/example/Scene.tsx': scene,
    'src/kits/example/math.ts': math,
    'src/kits/example/scene.css': css,
    'src/kits/example/notes.md': 'Internal notes',
    'public/assets/scene.svg': '<svg>scene</svg>',
    'public/assets/scene-background.svg': '<svg>background</svg>',
  });
  const files = await assembleKit('example', fixtureRoot);
  for (const [name, content] of [['Scene.tsx', scene], ['math.ts', math], ['scene.css', css]]) {
    assert.deepEqual(Buffer.from(files[`app/kits/example/${name}`] ?? []), Buffer.from(content));
  }
  assert.equal(Buffer.from(files['public/assets/scene.svg']).toString(), '<svg>scene</svg>');
  assert.equal(Buffer.from(files['public/assets/scene-background.svg']).toString(), '<svg>background</svg>');
  assert.equal(files['app/kits/example/notes.md'], undefined);
});
test('declared dependencies use exact specs from the matching root package sections', async t => {
  const fixtureRoot = await createFixture(t, {
    'src/kits/example/dependencies.json': JSON.stringify({ dependencies: ['three'], devDependencies: ['@types/three'] }),
  });
  const files = await assembleKit('example', fixtureRoot);
  const manifest = JSON.parse(Buffer.from(files['package.json']).toString());
  assert.equal(manifest.dependencies.three, '^0.187.0');
  assert.equal(manifest.devDependencies['@types/three'], '~0.187.0');
  assert.equal(manifest.dependencies.unrelated, undefined);
  assert.equal(manifest.dependencies['@types/three'], undefined);
  assert.equal(manifest.devDependencies.three, undefined);
});
test('old kits do not acquire optional dependencies from the root project', async () => {
  const files = await assembleKit('editorial', root);
  const manifest = JSON.parse(Buffer.from(files['package.json']).toString());
  assert.deepEqual(Object.keys(manifest.dependencies).sort(), ['next', 'react', 'react-dom']);
  assert.deepEqual(Object.keys(manifest.devDependencies).sort(), ['@types/node', '@types/react', '@types/react-dom', 'typescript']);
});
test('invalid dependency declarations fail with an actionable kit-specific error', async t => {
  for (const declaration of ['{', 'null', '[]', '{"optionalDependencies":[]}', '{"dependencies":"three"}', '{"dependencies":[null]}', '{"dependencies":["missing-package"]}', '{"dependencies":["@types/three"]}', '{"devDependencies":["three"]}', '{"dependencies":["__proto__"]}']) {
    await t.test(declaration, async t => {
      const fixtureRoot = await createFixture(t, { 'src/kits/example/dependencies.json': declaration });
      await assert.rejects(assembleKit('example', fixtureRoot), /example.*dependenc|dependenc.*example/i);
    });
  }
});
test('additional helpers do not make mandatory template source files optional', async t => {
  for (const name of ['Template.tsx', 'content.ts', 'theme.css']) {
    await t.test(name, async t => {
      const fixtureRoot = await createFixture(t, { [`src/kits/example/${name}`]: null, 'src/kits/example/Scene.tsx': 'export const Scene = () => null;' });
      await assert.rejects(assembleKit('example', fixtureRoot), new RegExp(name.replace('.', '\\.')));
    });
  }
});
