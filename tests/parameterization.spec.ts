import * as fs from 'fs';
// import path from 'path';
import { test } from '@playwright/test';
import { parse } from 'csv-parse/sync';
const path = require('path');

const records = parse(fs.readFileSync(path.join(__dirname, '../parameters.csv')), {
  columns: true,
  skip_empty_lines: true
});

for (const record of records) {
  test(`fooo: ${record.test_case}`, async ({ page }) => {
    console.log(record.test_case, record.some_value, record.some_other_value);
  });
}