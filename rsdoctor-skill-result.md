# Tree Shaking 分析报告（Rsdoctor）

**结论：项目共有 769 个模块无法被 tree-shake，其中用户代码 20 个，主要问题集中在 4 类场景。**

---

## 整体数据

| 来源 | 数量 | 主要包 |
|------|------|--------|
| node_modules | 749 个模块 | @arco-design (449, **1.8 MB**)、lodash (176)、react-dom (3) 等 |
| 用户源码 | 20 个模块 | 见下方详细分析 |

---

## 用户代码 4 类问题

### 问题 1：组件内有顶层 `console.log`（副作用语句）

**文件：** `src/components/Select.js`, `Button.js`, `Input.js`, `Modal.js`

```js
// Select.js
import './Select.css';
console.log('Select module evaluated'); // ← 顶层语句，阻止 tree-shake
export const Select = () => { ... };
```

**影响：** 导入 `Button` 时，`Modal`、`Input`、`Select` 等也会被打包，因为 barrel 文件 `src/components/index.js` 会触发这些副作用。

---

### 问题 2：barrel 文件中混有副作用逻辑

**文件：** `src/components/index.js:13`

```js
function test() {
  const { key1 } = require("./inner"); // dynamic require
  console.log(key1);
}
test(); // ← 顶层调用，整个 barrel 文件变为有副作用
```

**影响：** 任何从 `./components` 导入单个组件（如只用 `Button`），都会导致 `Modal`、`Input`、`Select` 全部打包进来。

---

### 问题 3：CJS `require()` 阻止 tree-shaking（E1008）

**文件：** `src/index.tsx:20`, `src/cjs-require-demo/index.js:12`

```js
// index.tsx
const cjsDemo = require('./cjs-require-demo'); // ← 裸 require，整个模块被打包
cjsDemo.compute(1, 2);

// cjs-require-demo/index.js
const utils = require('./utils'); // ← 裸 require，utils 的 subtract/multiply/divide 也被包含
```

**对比：** 同文件中 `require('./utils').multiply` 写法则可以部分 tree-shake（仅引入 `multiply`）。

---

### 问题 4：tracker 模块全局注册副作用

**文件：** `src/side-effects-demo/tracker.ts:21-26`

```ts
(globalThis as any).__tracker = { trackEvent, trackPageView, setUserId };
console.log('[tracker] initialized');
```

导出函数本可被 tree-shake，但全局注册语句使整个模块无法移除。

---

## 第三方包问题

| 包 | 模块数 | 大小 | 根因 |
|----|--------|------|------|
| **@arco-design/web-react** | 449 | 1.8 MB | 使用 `lib/` CJS 产物，不支持 tree-shake；应使用 `es/` 目录或按需引入插件 |
| **lodash** | 176 | 27 KB | 全量 import，应换用 `lodash-es` 或直接 `import xxx from 'lodash/xxx'` |
| react-focus-lock / focus-lock | 39 | ~34 KB | 库自身含顶层副作用语句 |

---

## 优先修复建议

**高优先级**

1. **@arco-design** — 配置 `babel-plugin-import` 或 Rspack `builtin:swc-loader` 的按需引入，切换到 `es/` 产物目录，预计可减少 **1.8 MB+**
2. **lodash** → 换 `lodash-es` + 具名导入，预计减少 ~27 KB
3. **`src/components/index.js`** — 移除 `test()` 函数调用，barrel 文件只做 re-export

**中优先级**

4. 移除各组件顶层 `console.log`（`Select.js`、`Button.js` 等），这些是开发调试代码不应出现在产物中
5. `src/index.tsx` 中的裸 `require('./cjs-require-demo')` 改为 ESM 动态 import 或具名引用
