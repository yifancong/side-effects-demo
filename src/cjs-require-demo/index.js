/**
 * CJS Require Demo
 *
 * Demonstrates the difference between:
 * - CJS require (bare require): E1008 — entire module bundled, no tree-shaking
 * - CJS full require (require().property): partial tree-shaking possible
 */

// ❌ CJS require — bare require(), triggers E1008 rule
//    The bundler cannot determine which exports are used, so the entire
//    utils module is included even though only `add` is called.
const utils = require('./utils');

// ✅ CJS full require — property access at require site, no E1008 warning
//    The bundler knows only `multiply` is needed, enabling partial tree-shaking.
const multiply = require('./utils').multiply;

module.exports = {
  compute(a, b) {
    return utils.add(a, b);
  },
  triple(x) {
    return multiply(x, 3);
  },
};
