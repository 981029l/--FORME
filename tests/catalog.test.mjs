import test from 'node:test';
import assert from 'node:assert/strict';
import * as catalog from '../src/lib/catalog.ts';
const { filterTemplates } = catalog;

const templates = [
  { slug: 'editorial', name: '间野', english: 'FIELDWORK', category: 'editorial', tags: ['编辑排版', '工作室'], description: '自然与创意' },
  { slug: 'gallery', name: '暗场', english: 'NOIR', category: 'gallery', tags: ['影像', '摄影'], description: '影像展览' },
];

test('search matches trimmed Chinese tags and case-insensitive English names', () => {
  assert.deepEqual(filterTemplates(templates, { query: ' 摄影 ' }).map(t => t.slug), ['gallery']);
  assert.deepEqual(filterTemplates(templates, { query: 'fieldwork' }).map(t => t.slug), ['editorial']);
});

test('category and favorite filters intersect rather than override each other', () => {
  assert.deepEqual(filterTemplates(templates, { category: 'gallery', favoritesOnly: true, favorites: ['editorial'] }), []);
  assert.deepEqual(filterTemplates(templates, { favoritesOnly: true, favorites: ['editorial'] }).map(t => t.slug), ['editorial']);
});

test('an unmatched query returns an empty list without changing source records', () => {
  assert.deepEqual(filterTemplates(templates, { query: '不存在的风格' }), []);
  assert.equal(templates.length, 2);
});

test('catalog URL round trip preserves intersecting filters and Chinese search text', () => {
  assert.equal(typeof catalog.parseCatalogState, 'function');
  const state = catalog.parseCatalogState('?q=%E5%B7%A5%E4%BD%9C%E5%AE%A4&category=editorial&sort=name&page=2&view=favorites');
  assert.deepEqual(state, { query: '工作室', category: 'editorial', sort: 'name', page: 2, view: 'favorites' });
  assert.deepEqual(catalog.parseCatalogState(new URL(catalog.catalogHref(state), 'https://forme.test').searchParams), state);
  assert.equal(catalog.catalogHref(catalog.parseCatalogState('')), '/templates');
});

test('untrusted category, sort, view and non-integer pages fall back safely', () => {
  assert.equal(typeof catalog.parseCatalogState, 'function');
  for (const page of ['-2', '0', '1.5', '2e2', 'Infinity', '9007199254740992', 'word']) {
    assert.equal(catalog.parseCatalogState(`?page=${page}`).page, 1);
  }
  assert.deepEqual(catalog.parseCatalogState('?category=unknown&sort=random&view=private&page=7'), { query: '', category: 'all', sort: 'curated', page: 7, view: 'all' });
});

test('pagination clamps to available rows and never loses or repeats results', () => {
  assert.equal(typeof catalog.paginateTemplates, 'function');
  const rows = Array.from({ length: 25 }, (_, index) => index);
  assert.deepEqual(catalog.paginateTemplates(rows, 99), { items: [24], page: 3, pageCount: 3, total: 25, start: 25, end: 25 });
  assert.equal(catalog.paginateTemplates(rows, -2).page, 1);
  assert.deepEqual([1, 2, 3].flatMap(page => catalog.paginateTemplates(rows, page).items), rows);
  assert.deepEqual(catalog.paginateTemplates([], 99), { items: [], page: 1, pageCount: 1, total: 0, start: 0, end: 0 });
});

test('curated and latest orders are explicit and preserve source records', () => {
  assert.equal(typeof catalog.orderTemplates, 'function');
  const rows = [
    { ...templates[0], slug: 'editorial' },
    { ...templates[1], slug: 'cinema' },
    { ...templates[0], slug: 'depth' },
    { ...templates[1], slug: 'doodle' },
  ];
  assert.deepEqual(catalog.orderTemplates(rows, 'curated').map(row => row.slug), ['depth', 'cinema', 'doodle', 'editorial']);
  assert.deepEqual(catalog.orderTemplates(rows, 'latest').map(row => row.slug), ['depth', 'doodle', 'cinema', 'editorial']);
  assert.deepEqual(rows.map(row => row.slug), ['editorial', 'cinema', 'depth', 'doodle']);
});

test('name order uses the visible English name with stable equal-name results', () => {
  assert.equal(typeof catalog.orderTemplates, 'function');
  const rows = [{ ...templates[0], slug: 'z', english: 'ZEBRA' }, { ...templates[1], slug: 'a1', english: 'APPLE' }, { ...templates[0], slug: 'a2', english: 'APPLE' }];
  assert.deepEqual(catalog.orderTemplates(rows, 'name').map(row => row.slug), ['a1', 'a2', 'z']);
});

test('query, category and favorites all intersect before pagination', () => {
  assert.equal(typeof catalog.paginateTemplates, 'function');
  const result = catalog.paginateTemplates(catalog.orderTemplates(filterTemplates(templates, { query: '工作室', category: 'editorial', favoritesOnly: true, favorites: ['editorial', 'gallery'] }), 'latest'), 8);
  assert.equal(result.total, 1);
  assert.equal(result.page, 1);
  assert.deepEqual(result.items.map(row => row.slug), ['editorial']);
});

test('detail return paths only permit the catalog and known URL state', () => {
  assert.equal(typeof catalog.safeCatalogReturn, 'function');
  for (const href of [null, '', 'https://evil.test/templates?page=2', '//evil.test/templates', '/templates/other', '/template', '/templates/../guide', '/templates\\evil', '/templates%2Fother', 'javascript:alert(1)', ' /templates?page=2']) {
    assert.equal(catalog.safeCatalogReturn(href), '/templates', String(href));
  }
  assert.equal(catalog.safeCatalogReturn('/templates?q=%E6%91%84%E5%BD%B1&category=gallery&sort=latest&page=2&view=favorites#ignored'), '/templates?q=%E6%91%84%E5%BD%B1&category=gallery&sort=latest&page=2&view=favorites');
  assert.equal(catalog.safeCatalogReturn('/templates?returnTo=https://evil.test'), '/templates');
});
