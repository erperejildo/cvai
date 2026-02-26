import styles from './Footer.module.scss';
import cv from '../../data/cv.json';

export const Footer = () => (
  <footer className={styles['cvai-footer']}>
    <div className={styles['cvai-footer-inner']}>
      <div style={{ flex: 1, textAlign: 'right' }}>
        © {new Date().getFullYear()} {`${cv.name} ${cv.lastname}`}
      </div>
    </div>
  </footer>
);
