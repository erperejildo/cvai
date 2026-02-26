import styles from './Profile.module.scss';
import cv from '../../data/cv.json';

export const Profile = () => (
  <div className={styles.profile}>
    <div className="profile-header">
      <h1>{`${cv.name} ${cv.lastname}`}</h1>
      <div className="profile-titles">{Array.isArray(cv.titles) ? cv.titles.join(' · ') : cv.titles}</div>
    </div>
  </div>
);
