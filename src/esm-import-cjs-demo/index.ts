/**
 * ESM Import Resolved to CJS Demo
 *
 * Demonstrates E1009: a package declares both ESM and CJS formats,
 * but the bundler resolves an ESM `import` statement to the CJS entry.
 *
 * Root cause here: resolve.mainFields = ['browser', 'main'] — 'module' is
 * intentionally omitted, so rspack falls back to the 'main' (CJS) field
 * instead of 'module' (ESM). This prevents tree-shaking and increases
 * bundle size.
 *
 * @arco-design/web-react declares:
 *   "main": "./lib/index.js"   ← CJS, resolved by rspack here ❌
 *   "module": "./es/index.js"  ← ESM, would be resolved if 'module' were in mainFields ✅
 *
 * Fix: add 'module' before 'main' in resolve.mainFields:
 *   resolve: { mainFields: ['browser', 'module', 'main'] }
 */

// ❌ ESM import → resolved to CJS (@arco-design/web-react/lib/index.js)
//    Triggers E1009: "esm-resolved-to-cjs"
import { Badge } from '@arco-design/web-react';

export function getDemoBadgeComponent() {
  return Badge;
}
