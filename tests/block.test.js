const test = require('node:test');
const assert = require('node:assert');
const Block = require('../models/block');

test('block has the time, activity, project fields', () => {
  const b = new Block({ time: '09:00', activity: 'reading', project: 'Web Basics' });
  assert.strictEqual(b.time, '09:00');
  assert.strictEqual(b.activity, 'reading');
  assert.strictEqual(b.project, 'Web Basics');
});
