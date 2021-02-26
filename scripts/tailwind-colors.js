const resolveConfig = require('tailwindcss/resolveConfig');
const config = require('../tailwind.config.js');
const fullConfig = resolveConfig(config);
const fs = require('fs');
const path = require('path');

fs.writeFile(
  path.resolve(path.resolve(__dirname, '..'), './src/utils/tailwind-colors.ts'),
  'export default ' + JSON.stringify(fullConfig.theme.colors),
  'utf8',
  function() {}
);
