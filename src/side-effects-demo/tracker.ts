/**
 * Side-effects demo: tracker module
 *
 * This module exports useful tracking functions, but the importer only does:
 *   import './side-effects-demo/tracker'
 *
 * No named exports are consumed, so rspack creates only a
 * "harmony side effect evaluation" connection (active: true).
 * The new `tree-shaking-side-effects-only` rule should detect this
 * as a potential unintended tree-shaking failure.
 */

export function trackEvent(eventName: string, payload?: Record<string, unknown>) {
  console.log('[tracker] event:', eventName, payload);
}

export function trackPageView(page: string) {
  console.log('[tracker] pageview:', page);
}

export function setUserId(id: string) {
  (globalThis as any).__tracker_userId = id;
}

// Side effect: register tracker on the global scope
(globalThis as any).__tracker = { trackEvent, trackPageView, setUserId };
console.log('[tracker] initialized');
