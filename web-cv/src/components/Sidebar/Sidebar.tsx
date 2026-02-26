// ...existing code...
import { ContactCard } from '../ContactCard/ContactCard';
import styles from './Sidebar.module.scss';
import cv from '../../data/cv.json';

export const Sidebar = () => (
  <aside className={styles.sidebar}>
    <ContactCard contacts={cv.contacts} />
  </aside>
);
