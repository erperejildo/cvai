import { useEffect, useState } from 'react';
import cv from './data/cv.json';
import './App.scss';
import { MainLayout } from './components/MainLayout/MainLayout';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

const resumeUrl = import.meta.env.BASE_URL + 'resumes/resume.md';
const THEME_KEY = 'cvai-theme';

// ...existing code...

function getSystemTheme() {
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

function App() {
  const [theme, setTheme] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      return stored || getSystemTheme();
    } catch {
      return getSystemTheme();
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    const listener = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(THEME_KEY)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const contactInfo = (cv.contacts || []).map((c: any) => ({
    label: c.label,
    value: c.value,
    href: c.href,
    icon: c.icon || '🔗',
  }));

  return (
    <div className="cvai-app">
      <Header
        name={cv.name}
        lastname={cv.lastname}
        titles={cv.titles || []}
        resumeUrl={resumeUrl}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <MainLayout
        name={`${cv.name} ${cv.lastname}`}
        bio={cv.titles?.join(' · ') || ''}
        contacts={contactInfo}
        sections={cv.sections}
      />
      <Footer />
    </div>
  );
}

export default App;
