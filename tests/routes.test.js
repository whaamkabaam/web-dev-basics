const test = require('node:test');
const assert = require('node:assert');
const express = require('express');
const Block = require('../models/block');
const trackerRoutes = require('../routes/tracker');

// small app with only the tracker routes, the db calls get mocked in each test
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/', trackerRoutes);

const server = app.listen(0);
const url = 'http://localhost:' + server.address().port;

test.after(() => server.close());

test('tracker sorts blocks by time', async (t) => {
  let sortedBy;
  t.mock.method(Block, 'find', () => {
    return {
      sort: async (s) => {
        sortedBy = s;
        return [{ _id: '1', time: '08:00', activity: 'reading', project: '' }];
      }
    };
  });

  const res = await fetch(url + '/tracker');
  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(sortedBy, { time: 1 });
});

test('edit saves the new values and goes back to the tracker', async (t) => {
  let savedId;
  let savedData;
  t.mock.method(Block, 'findByIdAndUpdate', async (id, data) => {
    savedId = id;
    savedData = data;
  });

  const res = await fetch(url + '/tracker/abc123/edit', {
    method: 'POST',
    body: new URLSearchParams({ time: '09:15', activity: 'coding', project: 'web basics' }),
    redirect: 'manual'
  });
  assert.strictEqual(res.status, 302);
  assert.strictEqual(res.headers.get('location'), '/tracker');
  assert.strictEqual(savedId, 'abc123');
  assert.deepStrictEqual(savedData, { time: '09:15', activity: 'coding', project: 'web basics' });
});

test('edit page sends 404 if the block does not exist', async (t) => {
  t.mock.method(Block, 'findById', async () => null);

  const res = await fetch(url + '/tracker/abc123/edit');
  assert.strictEqual(res.status, 404);
});

test('reset day deletes all blocks', async (t) => {
  let filter;
  t.mock.method(Block, 'deleteMany', async (f) => {
    filter = f;
  });

  const res = await fetch(url + '/tracker/reset', { method: 'POST', redirect: 'manual' });
  assert.strictEqual(res.status, 302);
  assert.deepStrictEqual(filter, {});
});

test('add does not save a time like 8:30', async (t) => {
  const create = t.mock.method(Block, 'create', async () => {});

  const res = await fetch(url + '/tracker', {
    method: 'POST',
    body: new URLSearchParams({ time: '8:30', activity: 'reading', project: '' }),
    redirect: 'manual'
  });
  assert.strictEqual(res.status, 400);
  assert.strictEqual(create.mock.callCount(), 0);
});

test('edit does not save a time that is not a time', async (t) => {
  const update = t.mock.method(Block, 'findByIdAndUpdate', async () => {});

  const res = await fetch(url + '/tracker/abc123/edit', {
    method: 'POST',
    body: new URLSearchParams({ time: 'morning', activity: 'coding', project: '' }),
    redirect: 'manual'
  });
  assert.strictEqual(res.status, 400);
  assert.strictEqual(update.mock.callCount(), 0);
});
