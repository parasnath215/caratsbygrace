import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import styles from './AnnouncementBar.module.css';

const MESSAGES = [
];

export default function AnnouncementBar() {
  const { announcementVisible, dismissAnnouncement } = useUI();
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isDismissing, setIsDismissing] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!announcementVisible) return;

    intervalRef.current = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % MESSAGES.length);
        setFade(true);
      }, 300);
    }, 4500);

    return () => clearInterval(intervalRef.current);
  }, [announcementVisible]);

  const handleDismiss = () => {
    setIsDismissing(true);
    setTimeout(() => {
      dismissAnnouncement();
    }, 280);
  };

  if (!announcementVisible) return null;

  return (
    <aside
      className={`${styles.bar} ${isDismissing ? styles.dismissing : ''}`}
      role="region"
      aria-label="Announcements"
    >
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
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          title="Dismiss announcement"
          type="button"
        >
          <X size={15} strokeWidth={2} />
        </button>
      </div>
    </aside>
  );
}
