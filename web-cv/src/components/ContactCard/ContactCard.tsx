import styles from './ContactCard.module.scss';

interface ContactInfo {
  label: string;
  value: string;
  href: string;
  icon?: string;
}

// ContactCardProps removed, contacts is passed as prop

export const ContactCard = ({ contacts }: { contacts: ContactInfo[] }) => (
  <div className={styles['contact-card']}>
    <h2>Contact</h2>
    <ul>
      {contacts.map((item: ContactInfo) => {
        const isMail = typeof item.href === 'string' && item.href.startsWith('mailto:');
        let icon = item.icon;
        if (!icon) {
          if ((item as any).type === 'email') icon = '\ud83d\udce7'; // Email icon
          else if ((item as any).type === 'phone') icon = '\ud83d\udcde'; // Phone icon
          else if ((item as any).type === 'linkedin') icon = '\ud83d\udcbc'; // LinkedIn icon
          else icon = '\ud83d\udd17'; // Default icon
        }
        return (
          <li key={item.label}>
            <a href={item.href} target={isMail ? undefined : '_blank'} rel={isMail ? undefined : 'noopener noreferrer'}>
              <span className={styles['contact-icon']}>{icon}</span>
              <div className={styles['contact-text']}>
                <span className={styles['contact-label']}>{item.label}:</span>
                <span className={styles['contact-value']}>{item.value}</span>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  </div>
);
