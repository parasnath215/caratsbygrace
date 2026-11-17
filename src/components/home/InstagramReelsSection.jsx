// src/components/home/InstagramReelsSection.jsx
// Carats by Grace — Live Instagram Reels Section ("Follow The Story")
// Features the original reel (https://www.instagram.com/reel/DfzguqvyChA/) in authentic 9:16 reel format
// with interactive audio, authentic reel actions, captions, and direct Instagram links.

import React, { useState, useRef } from 'react';
import {
  Instagram,
  Volume2,
  VolumeX,
  Play,
  Heart,
  MessageCircle,
  Share2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Music,
} from 'lucide-react';
import { INSTAGRAM_LINK } from '../../utils/whatsapp';
import styles from './InstagramReelsSection.module.css';

const ORIGINAL_REEL_URL =
  'https://www.instagram.com/reel/DfzguqvyChA/?utm_source=ig_web_copy_link';
const EMBED_REEL_URL = 'https://www.instagram.com/reel/DfzguqvyChA/embed/';

const REELS = [
  {
    id: 'reel-original',
    isOriginal: true,
    videoSrc: '/video/reel-carats-original.mp4',
    poster: '/video/reel-carats-original-poster.jpg',
    url: ORIGINAL_REEL_URL,
    title: '0% Making Charges · Live Studio Reveal',
    caption:
      'Going live on insta on Wednesday on 0% making charges. Whatsapp us on 9120530531 for more queries 😍 Lucknow #labgrowndiamonds',
    audioTrack: 'Original Audio · caratsbygrace',
    views: '65.4K',
    likes: '4,820',
    comments: '9',
    shares: '412',
    badge: 'ORIGINAL REEL',
  },
  {
    id: 'reel-embed',
    isEmbed: true,
    embedSrc: EMBED_REEL_URL,
    url: ORIGINAL_REEL_URL,
    title: 'Official Instagram Post Embed',
    caption: 'Official Instagram reel player directly from @caratsbygrace',
    badge: 'LIVE ON INSTAGRAM',
  },
  {
    id: 'reel-bench',
    videoSrc: '/video/reel-1.mp4',
    poster: '/assets/model1/m1_8403_final.webp',
    url: INSTAGRAM_LINK,
    title: 'Behind the Atelier Bench',
    caption:
      'Setting a 4.10 ct Radiant Solitaire in 18K Solid Gold · Handcrafted at our Lucknow bench.',
    audioTrack: 'Atelier Bench Acoustic · caratsbygrace',
    views: '24.8K',
    likes: '1,840',
    comments: '14',
    shares: '128',
    badge: 'ATELIER BENCH',
  },
  {
    id: 'reel-suite',
    videoSrc: '/video/reel-2.mp4',
    poster: '/assets/model2/cg_jewellers8471.webp',
    url: INSTAGRAM_LINK,
    title: 'The Empress Suite in Motion',
    caption:
      '7.50 ct TW of IGI-certified Type IIa grown diamonds. Unrepeatable singular masterwork.',
    audioTrack: 'Graceful Symphony · caratsbygrace',
    views: '38.2K',
    likes: '3,120',
    comments: '28',
    shares: '246',
    badge: 'MASTER SUITE',
  },
];

export default function InstagramReelsSection() {
  const [mutedStates, setMutedStates] = useState({
    'reel-original': true,
    'reel-bench': true,
    'reel-suite': true,
  });

  const [pausedStates, setPausedStates] = useState({});
  const [likedStates, setLikedStates] = useState({});
  const [copiedLink, setCopiedLink] = useState(false);
  const videoRefs = useRef({});
  const scrollContainerRef = useRef(null);

  const toggleSound = (e, reelId) => {
    e.preventDefault();
    e.stopPropagation();
    const video = videoRefs.current[reelId];
    if (!video) return;

    const newMuted = !mutedStates[reelId];
    video.muted = newMuted;
    setMutedStates((prev) => ({ ...prev, [reelId]: newMuted }));

    // Unmuting one reel mutes all others to avoid sound clash
    if (!newMuted) {
      Object.keys(videoRefs.current).forEach((key) => {
        if (key !== reelId && videoRefs.current[key]) {
          videoRefs.current[key].muted = true;
          setMutedStates((prev) => ({ ...prev, [key]: true }));
        }
      });
    }
  };

  const togglePlay = (reelId) => {
    const video = videoRefs.current[reelId];
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
      setPausedStates((prev) => ({ ...prev, [reelId]: false }));
    } else {
      video.pause();
      setPausedStates((prev) => ({ ...prev, [reelId]: true }));
    }
  };

  const toggleLike = (e, reelId) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedStates((prev) => ({ ...prev, [reelId]: !prev[reelId] }));
  };

  const handleShare = async (e, url) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Carats by Grace — Instagram Reel',
          url,
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.section} aria-label="Follow The Story on Instagram Reels">
      <div className={styles.container}>
        {/* Section Header */}
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <a
              href={ORIGINAL_REEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.handleBadge}
              title="Watch Original Reel on Instagram"
            >
              <Instagram size={14} />
              <span>@caratsbygrace · REELS</span>
            </a>
          </div>

          <h2 className={styles.title}>Follow The Story</h2>

          <p className={styles.subtitle}>
            Live atelier reveals, master diamond craftsmanship, and behind-the-scenes
            moments from our private Lucknow showroom.
          </p>

          {/* Carousel Arrows on Desktop */}
          <div className={styles.carouselControls}>
            <button
              type="button"
              className={styles.carouselArrow}
              onClick={scrollLeft}
              aria-label="Scroll reels left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className={styles.carouselArrow}
              onClick={scrollRight}
              aria-label="Scroll reels right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </header>

        {copiedLink && (
          <div className={styles.copiedToast}>
            <span>Reel link copied to clipboard!</span>
          </div>
        )}

        {/* Reels Track / Grid */}
        <div ref={scrollContainerRef} className={styles.reelsGrid}>
          {REELS.map((reel) => {
            // Render Official Instagram Embed Iframe for reel-embed
            if (reel.isEmbed) {
              return (
                <article
                  key={reel.id}
                  className={`${styles.reelCard} ${styles.embedCard}`}
                >
                  <div className={styles.embedHeader}>
                    <span className={styles.reelBadge}>
                      <span className={styles.livePulseDot} />
                      <span>{reel.badge}</span>
                    </span>
                    <a
                      href={reel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.embedDirectLink}
                      title="Open in Instagram App"
                    >
                      <span>Open App</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                  <div className={styles.iframeWrapper}>
                    <iframe
                      src={reel.embedSrc}
                      title="Instagram Reel Embed"
                      className={styles.instagramIframe}
                      frameBorder="0"
                      scrolling="no"
                      allowTransparency="true"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    />
                  </div>
                </article>
              );
            }

            const isMuted = mutedStates[reel.id] ?? true;
            const isPaused = pausedStates[reel.id] ?? false;
            const isLiked = likedStates[reel.id] ?? false;

            return (
              <article
                key={reel.id}
                className={`${styles.reelCard} ${
                  reel.isOriginal ? styles.originalReelCard : ''
                }`}
              >
                <div
                  className={styles.reelVideoWrapper}
                  onClick={() => togglePlay(reel.id)}
                >
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current[reel.id] = el;
                    }}
                    src={reel.videoSrc}
                    poster={reel.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className={styles.reelVideo}
                  />

                  {/* Gradient Overlay for high-contrast reel typography */}
                  <div className={styles.videoOverlay} />

                  {/* Top Bar: Badge + Audio Toggle */}
                  <div className={styles.reelTopBar}>
                    <span
                      className={`${styles.reelBadge} ${
                        reel.isOriginal ? styles.originalBadge : ''
                      }`}
                    >
                      <span className={styles.livePulseDot} />
                      <span>{reel.badge}</span>
                    </span>

                    <button
                      type="button"
                      className={styles.soundBtn}
                      onClick={(e) => toggleSound(e, reel.id)}
                      title={isMuted ? 'Tap to unmute sound' : 'Mute audio'}
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                    >
                      {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                    </button>
                  </div>

                  {/* Center Paused Indicator */}
                  {isPaused && (
                    <div className={styles.pausedIndicator}>
                      <Play size={26} fill="currentColor" />
                    </div>
                  )}

                  {/* Right-Side Authentic Reel Action Bar */}
                  <aside className={styles.reelActionBar}>
                    <button
                      type="button"
                      className={`${styles.actionBtn} ${isLiked ? styles.liked : ''}`}
                      onClick={(e) => toggleLike(e, reel.id)}
                      title="Like reel"
                      aria-label="Like reel"
                    >
                      <Heart
                        size={20}
                        fill={isLiked ? '#ff3b30' : 'none'}
                        color={isLiked ? '#ff3b30' : '#ffffff'}
                      />
                      <span className={styles.actionCount}>
                        {isLiked ? 'Liked' : reel.likes}
                      </span>
                    </button>

                    <a
                      href={reel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionBtn}
                      onClick={(e) => e.stopPropagation()}
                      title="View comments on Instagram"
                      aria-label="View comments"
                    >
                      <MessageCircle size={20} />
                      <span className={styles.actionCount}>{reel.comments}</span>
                    </a>

                    <button
                      type="button"
                      className={styles.actionBtn}
                      onClick={(e) => handleShare(e, reel.url)}
                      title="Share reel"
                      aria-label="Share reel"
                    >
                      <Share2 size={20} />
                      <span className={styles.actionCount}>{reel.shares}</span>
                    </button>

                    <a
                      href={reel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.actionBtn} ${styles.instaLogoBtn}`}
                      onClick={(e) => e.stopPropagation()}
                      title="Open in Instagram"
                      aria-label="Open reel in Instagram"
                    >
                      <Instagram size={20} />
                    </a>
                  </aside>

                  {/* Bottom Bar: Profile Handle, Caption, Audio Ticker */}
                  <div className={styles.reelBottomBar}>
                    {/* Profile Header Row */}
                    <div className={styles.reelUserRow}>
                      <div className={styles.avatarMini}>
                        <span>CG</span>
                      </div>
                      <a
                        href={reel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.usernameLink}
                        onClick={(e) => e.stopPropagation()}
                      >
                        caratsbygrace
                      </a>
                      <a
                        href={reel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.followPill}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Watch
                      </a>
                    </div>

                    {/* Title & Caption */}
                    <h3 className={styles.reelTitle}>{reel.title}</h3>
                    <p className={styles.reelCaption}>{reel.caption}</p>

                    {/* Audio Track Ticker */}
                    <div className={styles.audioTickerRow}>
                      <Music size={12} className={styles.musicIcon} />
                      <span className={styles.audioTickerText}>{reel.audioTrack}</span>
                    </div>

                    {/* Watch on Instagram CTA */}
                    <a
                      href={reel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.watchOnInstaLink}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Watch Full Reel on Instagram</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Global Section Action Button */}
        <div className={styles.actionsRow}>
          <a
            href={ORIGINAL_REEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.followBtnPrimary}
            title="Watch Original Reel on Instagram"
          >
            <Instagram size={17} />
            <span>WATCH ORIGINAL REEL ON INSTAGRAM</span>
          </a>

          <a
            href={INSTAGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.followBtnOutline}
            title="Follow Carats by Grace on Instagram"
          >
            <span>VIEW ALL @CARATSBYGRACE REELS</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
