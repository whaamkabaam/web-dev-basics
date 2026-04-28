const test = require('node:test');
const assert = require('node:assert');
const Block = require('../models/block');

test('block has the time, activity, project fields', () => {
  const b = new Block({ time: '09:00', activity: 'reading', project: 'Web Basics' });
  assert.strictEqual(b.time, '09:00');
  assert.strictEqual(b.activity, 'reading');
  assert.strictEqual(b.project, 'Web Basics');
});

test('block gets a generated _id', () => {
  const b = new Block({ time: '10:00', activity: 'coding', project: 'X' });
  assert.ok(b._id);
});

test('empty block has undefined fields but still has an _id', () => {
  const b = new Block();
  assert.strictEqual(b.time, undefined);
  assert.strictEqual(b.activity, undefined);
  assert.ok(b._id);
});
