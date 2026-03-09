import React from 'react';
import { Button } from '@arco-design/web-react';
import '@arco-design/web-react/dist/css/arco.css';
import * as styles from './index.module.less';
// Side-effects-only import demo: tracker exports trackEvent/trackPageView/setUserId,
// but none of them are consumed here. Rspack will record this as a
// "harmony side effect evaluation" connection (active=true), triggering
// the `tree-shaking-side-effects-only` rule.
import './side-effects-demo/tracker';

export function App({ name }: any) {
  return (
    <>
      Hello <i>{name}</i>. Welcome!
      <>
        <h1 className={styles.header}>标题{name}</h1>
        <p className="worker">内容</p>
        <Button type="primary">Hello Arco</Button>,
      </>
    </>
  );
}
