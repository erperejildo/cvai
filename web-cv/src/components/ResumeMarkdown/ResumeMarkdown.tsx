import styles from './ResumeMarkdown.module.scss';
import cv from '../../data/cv.json';

export const ResumeMarkdown = () => {
  // Render all sections in cv.sections in order
  return (
    <div className={styles.resumeMarkdown}>
      {cv.sections.map((section: any, idx: number) => (
        <section key={idx} className={styles.section}>
          <h3>{section.section_title}</h3>
          {section.items.map((item: any, itemIdx: number) => {
            // Resume Summary
            if (item.content) return <p key={itemIdx}>{item.content}</p>;
            // Professional Experience
            if (item.title && item.company) {
              return (
                <div key={itemIdx} className={styles.resumeItem}>
                  <div className="cv-section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.4em' }}>
                    <span>{item.title}</span>
                    <span style={{ fontWeight: 500 }}>&mdash;</span>
                    <span>{item.company}</span>
                  </div>
                  <div className={styles.jobMeta}>
                    <em>
                      {item.dates}
                      {item.location ? ' · ' + item.location : ''}
                    </em>
                  </div>
                  {Array.isArray(item.bullets) && item.bullets.length > 0 && (
                    <ul className={styles.jobBullets}>
                      {item.bullets.map((b: string, i: number) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            }
            // Education
            if (item.title && item.dates) {
              return (
                <div key={itemIdx} className={styles.educationItem}>
                  <div className="cv-section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.4em' }}>
                    <span>{item.title}</span>
                  </div>
                  <div className={styles.jobMeta}>
                    <em>
                      {item.dates}
                      {item.location ? ' · ' + item.location : ''}
                    </em>
                  </div>
                  {Array.isArray(item.bullets) && item.bullets.length > 0 && (
                    <ul className={styles.jobBullets}>
                      {item.bullets.map((b: string, i: number) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            }
            return null;
          })}
        </section>
      ))}
    </div>
  );
};
