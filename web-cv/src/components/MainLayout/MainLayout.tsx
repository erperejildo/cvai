import { Sidebar } from '../Sidebar/Sidebar';
import { ResumeMarkdown } from '../ResumeMarkdown/ResumeMarkdown';
import styles from './MainLayout.module.scss';

export const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <ResumeMarkdown />
      </main>
    </div>
  );
};
