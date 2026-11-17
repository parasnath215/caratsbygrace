import React, { useState, useEffect, useRef } from 'react';
import { useUI } from '../../context/UIContext';
import styles from './AnnouncementBar.module.css';

// [PLACEHOLDER: confirm messages with client]
const MESSAGES = [
  '✦ Private Salon Viewings & Bespoke Consultations Available',
  '✦ Certified BIS 750 Hallmarked Gold & Lab-Grown Diamonds',
  'Book a personal atelier consultation →',
];

export default function AnnouncementBar() {
  const { announcementVisible, dismissAnnouncement } = useUI();
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!announcementVisible) return;

    intervalRef.current = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % MESSAGES.length);
        setFade(true);
      }, 300);
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [announcementVisible]);

  if (!announcementVisible) return null;

  return (
    <div className={styles.bar} role="region" aria-label="Announcements">
      <div className={styles.inner}>
        <span
          className={`${styles.message} ${fade ? styles.visible : styles.hidden}`}
          aria-live="polite"
          aria-atomic="true"
        >
          {MESSAGES[index]}
        </span>
        <button
          className={styles.dismiss}
          onClick={dismissAnnouncement}
          aria-label="Dismiss announcement"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
