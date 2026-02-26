import { Sidebar } from '../Sidebar/Sidebar';
import { ResumeMarkdown } from '../ResumeMarkdown/ResumeMarkdown';
import styles from './MainLayout.module.scss';


interface MainLayoutProps {
  name: string;
  bio: string;
  contacts: Array<{ label: string; value: string; href: string; icon: string }>;
  sections: any[];
}


export const MainLayout = (props: MainLayoutProps) => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <ResumeMarkdown />
      </main>
    </div>
  );
};
