import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { templates } from '../src/content/templates.ts';
import { kitComponents } from '../src/kits/registry.ts';
import { assembleKit } from '../scripts/package-kits.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));

test('catalog, renderable kits and source directories stay in sync', async () => {
  const catalog = templates.map(item => item.slug).sort();
  const directories = (await readdir(new URL('../src/kits/', import.meta.url), { withFileTypes: true })).filter(item => item.isDirectory()).map(item => item.name).sort();
  assert.equal(new Set(catalog).size, catalog.length);
  assert.deepEqual(Object.keys(kitComponents).sort(), catalog);
  assert.deepEqual(directories, catalog);
});

for (const template of templates) {
  test(`${template.slug}: complete independent export and navigation on every page`, async () => {
    const files = await assembleKit(template.slug, root);
    for (const name of ['Template.tsx', 'content.ts', 'theme.css']) {
      assert.deepEqual(Buffer.from(files[`app/kits/${template.slug}/${name}`]), await readFile(new URL(`../src/kits/${template.slug}/${name}`, import.meta.url)));
    }
    for (const name of ['app/page.tsx', 'app/project/page.tsx', 'app/about/page.tsx', 'README.md', 'DESIGN.md', 'AGENTS.md', 'SOURCES.md']) assert.ok(files[name]?.length, name);
    for (const [path, bytes] of Object.entries(files)) {
      if (/\.(tsx?|css)$/.test(path)) assert.ok(!Buffer.from(bytes).toString('utf8').includes('@/'), `Platform alias in ${path}`);
    }
    for (const page of ['home', 'project', 'about']) {
      for (const basePath of ['', `/preview/${template.slug}`]) {
        const html = renderToStaticMarkup(React.createElement(kitComponents[template.slug], { page, basePath }));
        assert.equal((html.match(/<h1\b/g) || []).length, 1, `${page}: one h1`);
        assert.equal((html.match(/<main\b/g) || []).length, 1, `${page}: one main`);
        for (const href of [basePath || '/', `${basePath}/project`, `${basePath}/about`]) assert.ok(html.includes(`href="${href}"`), `${page}: missing ${href}`);
        for (const match of html.matchAll(/src="\/assets\/([^"?]+)"/g)) assert.ok(files[`public/assets/${match[1]}`]?.length, `${page}: unpackaged asset ${match[1]}`);
      }
    }
  });
}
