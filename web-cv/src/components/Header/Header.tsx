import styles from './Header.module.scss';

interface HeaderProps {
  name: string;
  lastname: string;
  titles: string[];
  resumeUrl: string;
  theme: string;
  toggleTheme: () => void;
}

export const Header = ({ name, lastname, titles, resumeUrl, theme, toggleTheme }: HeaderProps) => (
  <header className={styles['cvai-header']}>
    <div className={styles['cvai-header-inner']}>
      <div className={styles['cvai-header-title-group']}>
        <h1 className={styles['cvai-title']}>
          {name} {lastname}
        </h1>
        <div className={styles['cvai-header-subtitle']}>{Array.isArray(titles) ? titles.join(' · ') : titles}</div>
      </div>
      <div className={styles['cvai-header-actions']}>
        <nav className={styles['cvai-nav']} aria-label="Main navigation">
          <ul>
            <li>
              <a href={resumeUrl} download="resume.md">
                Download CV
              </a>
            </li>
          </ul>
        </nav>
        <button className={styles['theme-toggle']} onClick={toggleTheme} aria-label="Toggle dark mode">
          {theme === 'dark' ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Light mode"
            >
              <title>Switch to light mode</title>
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </g>
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Dark mode"
            >
              <title>Switch to dark mode</title>
              <path
                d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  </header>
);
