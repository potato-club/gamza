import { NextPage } from 'next';
import Link from 'next/link';

import styles from './index.module.css';

const Index: NextPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <p>
          홈페이지 <span className={styles.ready}>준비 중</span>이에요.
        </p>
        <p className={styles.description}>
          <span>현재 </span>
          <Link href="/domain">도메인</Link>
          <span> 서비스만 이용 가능해요.</span>
        </p>
      </div>
    </div>
  );
};

export default Index;
