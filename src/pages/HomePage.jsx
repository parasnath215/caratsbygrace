// src/pages/HomePage.jsx
// Carats by Grace — Landing page (single-file build)
// Tech: React (JSX).
// NOTE: Hero is now video-only and loops continuously. All images/URLs marked
// PLACEHOLDER — replace with brand assets.

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useUI } from "../context/UIContext";
import BrandLogo from "../components/ui/BrandLogo";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import {
  HERO_ASSETS,
  CATEGORIES_LIST,
  EDITORIAL_ASSETS,
  LIMITED_EDITIONS,
  INSTAGRAM_GALLERY,
  PRODUCT_ASSETS,
} from "../data/assets";

/* ===========================================================================
   DESIGN TOKENS + GLOBAL STYLES
=========================================================================== */
const BRAND_CSS = `
:root{
  --white:#FFFFFF; --ivory:#FAF6F1; --burgundy:#7B1E3A; --wine:#4A1124;
  --gold:#C6A15B; --ink:#17120F; --muted:#7A6F70; --line:#E9E1D8;
  --blush:#F1E3DC; --wine-deep:#3B0F1F; --rose-gold:#C9967F; --ruby:#A3152F;
  --serif:"Cormorant Garamond","Playfair Display",Georgia,serif;
  --sans:"Jost","Inter",system-ui,-apple-system,"Segoe UI",sans-serif;
  --ease:cubic-bezier(.22,.61,.36,1);
  --pad-x:clamp(20px,5vw,80px);
  --section-y:clamp(38px,4.8vw,64px);
}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{font-family:var(--sans);color:var(--ink);background:var(--white);
  -webkit-font-smoothing:antialiased;line-height:1.55;overflow-x:hidden}
img{display:block;max-width:100%}
a{color:inherit;text-decoration:none}
button{font-family:inherit;cursor:pointer;background:none;border:0}
:focus-visible{outline:2px solid var(--gold);outline-offset:3px}

.cg-wrap{max-width:1440px;margin:0 auto;padding-inline:var(--pad-x)}
.cg-section{padding-block:var(--section-y)}
.cg-eyebrow{font-size:.72rem;letter-spacing:.28em;text-transform:uppercase;
  color:var(--muted);font-weight:500}
.cg-display{font-family:var(--serif);font-weight:400;line-height:1.05;
  letter-spacing:-.01em;margin:0}
.cg-hairline{height:1px;background:var(--line);border:0;margin:0;width:100%}
.cg-sparkle{color:var(--gold);font-size:.9em;line-height:1}

.cg-btn{display:inline-flex;align-items:center;justify-content:center;
  min-height:44px;padding:0 26px;border-radius:1px;font-size:.78rem;
  letter-spacing:.16em;text-transform:uppercase;font-weight:500;
  transition:all .3s var(--ease);border:1px solid transparent;white-space:nowrap}
.cg-btn--solid{background:var(--burgundy);color:var(--ivory)}
.cg-btn--solid:hover{background:var(--wine)}
.cg-btn--ghost{border-color:var(--ink);color:var(--ink)}
.cg-btn--ghost:hover{background:var(--ink);color:var(--ivory)}
.cg-btn--ghost-light{border-color:rgba(250,246,241,.7);color:var(--ivory)}
.cg-btn--ghost-light:hover{background:var(--ivory);color:var(--ink)}

.reveal{opacity:0;transform:translateY(28px);
  transition:opacity .8s var(--ease),transform .8s var(--ease)}
.reveal.is-in{opacity:1;transform:none}

/* Announcement */
.cg-ann{background:var(--burgundy);color:var(--ivory);font-size:.7rem;
  letter-spacing:.14em;text-transform:uppercase;position:relative;z-index:2;width:100%;
  border-bottom:1px solid rgba(250,246,241,.12)}
.cg-ann__inner{display:flex;align-items:center;justify-content:center;
  min-height:38px;gap:16px;padding:6px var(--pad-x);text-align:center}
.cg-ann__msg{transition:opacity .5s var(--ease)}
.cg-ann__x{position:absolute;right:calc(var(--pad-x) - 8px);top:50%;
  transform:translateY(-50%);color:var(--ivory);opacity:.7;font-size:1rem;
  width:44px;height:44px;display:grid;place-items:center}
.cg-ann__x:hover{opacity:1}

/* Top bar wrapper — absolute at top of hero, scrolls up naturally with the page */
.cg-header-wrapper{position:absolute;top:0;left:0;right:0;z-index:70;display:flex;
  flex-direction:column;width:100%}

/* Header */
.cg-header{position:relative;width:100%;z-index:1;
  transition:background .35s var(--ease),box-shadow .35s var(--ease),
  border-color .35s var(--ease);border-bottom:1px solid transparent}
.cg-header.is-scrolled{background:var(--white);border-bottom:1px solid var(--line);
  box-shadow:0 6px 24px -18px rgba(23,18,15,.4)}
.cg-header__bar{display:grid;grid-template-columns:1fr auto 1fr;
  align-items:center;min-height:72px;gap:16px}
.cg-header__nav{display:flex;gap:22px;align-items:center}
.cg-header__nav a{font-size:.74rem;letter-spacing:.18em;text-transform:uppercase;
  font-weight:500;position:relative;padding:6px 0;color:var(--ink);
  transition:color .25s var(--ease)}
.cg-header__nav a::after{content:"";position:absolute;left:0;bottom:0;
  height:1px;width:0;background:var(--rose-gold);transition:width .35s var(--ease)}
.cg-header__nav a:hover::after{width:100%}
.cg-logo{display:flex;align-items:center;justify-content:center}
.cg-logo img{height:44px;width:auto}
.cg-logo span{color:inherit;transition:color .25s var(--ease)}
.cg-header__util{display:flex;gap:6px;justify-content:flex-end;align-items:center}
.cg-header__util button,
.cg-header__util a{width:44px;height:44px;display:grid;place-items:center;
  color:var(--ink);position:relative;transition:color .3s var(--ease)}
.cg-cart-count,
.cg-wish-count{position:absolute;top:6px;right:6px;min-width:16px;height:16px;
  background:var(--burgundy);color:var(--ivory);font-size:.6rem;border-radius:999px;
  display:grid;place-items:center;padding:0 4px;font-family:var(--sans);font-weight:600;line-height:1}
.cg-burger{display:none}

/* Header over dark hero — ivory text + soft top scrim for legibility */
.cg-header.is-onhero{
  background:linear-gradient(180deg,rgba(23,18,15,.55),rgba(23,18,15,0));
}
.cg-header.is-onhero .cg-header__nav a,
.cg-header.is-onhero .cg-header__util button,
.cg-header.is-onhero .cg-header__util a,
.cg-header.is-onhero .cg-logo,
.cg-header.is-onhero .cg-logo span,
.cg-header.is-onhero .cg-burger{
  color:var(--ivory);
  text-shadow:0 1px 2px rgba(0,0,0,.45);
}
.cg-header.is-onhero .cg-header__nav a::after{
  background:var(--ivory);
}
.cg-header.is-onhero .cg-cart-count,
.cg-header.is-onhero .cg-wish-count{
  background:var(--ivory);color:var(--burgundy);
}

/* Mega menu */
.cg-mega{position:absolute;left:0;right:0;top:100%;background:var(--white);
  border-top:1px solid var(--line);border-bottom:1px solid var(--line);
  opacity:0;visibility:hidden;transform:translateY(-6px);
  transition:opacity .3s var(--ease),transform .3s var(--ease),visibility .3s;
  z-index:55}
.cg-mega.is-open{opacity:1;visibility:visible;transform:none}
.cg-mega__inner{display:grid;grid-template-columns:repeat(4,1fr) 1.3fr;
  gap:40px;padding:48px var(--pad-x) 56px;max-width:1440px;margin:0 auto}
.cg-mega__col h4{font-size:.68rem;letter-spacing:.24em;text-transform:uppercase;
  color:var(--muted);margin:0 0 16px;font-weight:500}
.cg-mega__col a{display:block;padding:7px 0;font-size:.9rem;color:var(--ink);
  transition:color .25s var(--ease)}
.cg-mega__col a:hover{color:var(--burgundy)}
.cg-mega__img{aspect-ratio:3/4;overflow:hidden}
.cg-mega__img img{width:100%;height:100%;object-fit:cover;transition:transform .6s var(--ease)}
.cg-mega__img:hover img{transform:scale(1.04)}

/* Hero — video only, continuous loop */
.cg-hero{position:relative;min-height:100svh;display:grid;overflow:hidden;
  background:var(--ink)}
.cg-hero__media{position:absolute;inset:0;overflow:hidden;background:var(--ink);
  pointer-events:none;user-select:none}
.cg-hero__media video{width:100%;height:100%;object-fit:cover;
  object-position:center 35%;display:block;pointer-events:none;user-select:none}
.cg-hero__media::after{display:none!important;content:none!important}
.cg-hero__copy{position:relative;align-self:end;z-index:2;color:var(--ivory);
  padding:0 var(--pad-x) clamp(48px,8vh,96px);max-width:820px;
  text-shadow:0 2px 14px rgba(0,0,0,.65)}
.cg-hero__copy .cg-eyebrow{color:rgba(250,246,241,.95);text-shadow:0 1px 8px rgba(0,0,0,.6)}
.cg-hero__title{font-family:var(--serif);font-weight:300;
  font-size:clamp(2.6rem,7vw,5.6rem);line-height:1.02;margin:14px 0 18px;
  letter-spacing:-.015em;max-width:14ch;text-shadow:0 3px 20px rgba(0,0,0,.7)}
.cg-hero__lede{font-size:clamp(.95rem,1.6vw,1.1rem);max-width:44ch;
  color:rgba(250,246,241,.98);margin:0 0 28px;font-weight:300;text-shadow:0 2px 12px rgba(0,0,0,.65)}
.cg-hero__ctas{display:flex;gap:14px;flex-wrap:wrap}
.cg-scrollcue{position:absolute;left:50%;bottom:18px;transform:translateX(-50%);
  z-index:3;color:rgba(250,246,241,.8);font-size:.62rem;letter-spacing:.3em;
  text-transform:uppercase;display:flex;flex-direction:column;align-items:center;gap:8px;
  transition:opacity .45s var(--ease),transform .45s var(--ease)}
.cg-scrollcue span{display:block;width:1px;height:34px;background:currentColor;
  animation:cue 2.4s ease-in-out infinite;transform-origin:top}
@keyframes cue{0%,100%{transform:scaleY(.4);opacity:.4}50%{transform:scaleY(1);opacity:1}}

/* Trust strip */
.cg-trust{background:var(--ivory);border-bottom:1px solid var(--line)}
.cg-trust__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;
  padding-block:26px}
.cg-trust__item{display:flex;align-items:center;gap:12px;justify-content:center;
  font-size:.74rem;letter-spacing:.06em;color:var(--ink);text-align:left}
.cg-trust__item svg{color:var(--gold);flex:none}

/* Category grid — Find your everyday signature (No overlays, clean image alignment) */
.cg-cat__head{display:flex;justify-content:space-between;align-items:end;
  gap:24px;margin-bottom:36px;flex-wrap:wrap}
.cg-cat__grid{display:grid;gap:24px;
  grid-template-columns:repeat(3,1fr)}
.cg-tile{display:flex;flex-direction:column;background:var(--white);
  border:1px solid var(--line);border-radius:1px;overflow:hidden;
  transition:all .35s var(--ease);text-decoration:none}
.cg-tile:hover{transform:translateY(-4px);border-color:var(--gold);
  box-shadow:0 18px 36px -18px rgba(23,18,15,.12)}
.cg-tile__media{position:relative;width:100%;aspect-ratio:4/5;overflow:hidden;
  background:var(--blush)}
.cg-tile__media img{width:100%;height:100%;object-fit:cover;object-position:center center;
  transition:transform .7s var(--ease);display:block}
.cg-tile:hover .cg-tile__media img{transform:scale(1.05)}
.cg-tile::after{display:none!important;content:none!important}
.cg-tile__info{padding:16px 18px 18px;display:flex;flex-direction:column;
  background:var(--white);border-top:1px solid var(--line);flex:1}
.cg-tile__top{display:flex;justify-content:space-between;align-items:baseline;gap:8px}
.cg-tile__label{color:var(--ink);font-family:var(--serif);font-size:1.35rem;
  letter-spacing:-.01em;font-weight:400;margin:0}
.cg-tile__count{font-size:.66rem;letter-spacing:.14em;text-transform:uppercase;
  color:var(--muted)}
.cg-tile__tagline{font-size:.82rem;color:var(--muted);margin:4px 0 10px;font-weight:300}
.cg-tile__shop{font-size:.7rem;letter-spacing:.16em;text-transform:uppercase;
  color:var(--burgundy);font-weight:500;display:inline-flex;align-items:center;
  gap:4px;transition:gap .25s var(--ease);margin-top:auto}
.cg-tile:hover .cg-tile__shop{gap:8px;color:var(--wine)}

/* Campaign split */
.cg-split{display:grid;grid-template-columns:1fr 1fr;min-height:560px}
.cg-split__img{position:relative;overflow:hidden;min-height:100%}
.cg-split__img img{width:100%;height:100%;object-fit:cover;object-position:50% 35%;
  transition:transform .9s var(--ease)}
.cg-split__img:hover img{transform:scale(1.03)}
.cg-split__copy{background:var(--ivory);display:flex;flex-direction:column;
  justify-content:center;padding:clamp(40px,6vw,96px)}
.cg-split__title{font-family:var(--serif);font-weight:400;
  font-size:clamp(2rem,4.2vw,3.4rem);line-height:1.06;margin:16px 0 18px;
  max-width:16ch}
.cg-split__lede{color:var(--muted);max-width:40ch;margin:0 0 28px;font-size:.98rem}

/* Best sellers */
.cg-tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:28px}
.cg-tab{padding:10px 20px;font-size:.72rem;letter-spacing:.16em;
  text-transform:uppercase;color:var(--muted);border:1px solid var(--line);
  background:var(--ivory);border-radius:1px;transition:all .3s var(--ease);cursor:pointer}
.cg-tab.is-active{color:var(--ivory);background:var(--burgundy);border-color:var(--burgundy)}
.cg-tab:hover{color:var(--ink);border-color:var(--ink)}
.cg-tab.is-active:hover{color:var(--ivory);border-color:var(--burgundy)}

.cg-bs-arrows{display:flex;gap:8px}
.cg-bs-arrow{width:40px;height:40px;display:grid;place-items:center;border-radius:50%;
  border:1px solid var(--line);background:var(--ivory);color:var(--ink);cursor:pointer;
  transition:all .25s var(--ease)}
.cg-bs-arrow:hover{background:var(--burgundy);color:var(--ivory);border-color:var(--burgundy)}

.cg-rail-wrap{position:relative}
.cg-rail{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(240px,1fr);
  gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:8px;
  scrollbar-width:none;-ms-overflow-style:none}
.cg-rail::-webkit-scrollbar{display:none}
.cg-rail > *{scroll-snap-align:start}

.cg-rail-arrow{position:absolute;top:42%;transform:translateY(-50%);z-index:8;
  width:40px;height:40px;border-radius:50%;background:rgba(250,246,241,.94);
  backdrop-filter:blur(6px);border:1px solid var(--line);color:var(--ink);
  display:grid;place-items:center;box-shadow:0 4px 14px rgba(23,18,15,.12);
  cursor:pointer;transition:all .25s var(--ease)}
.cg-rail-arrow:hover{background:var(--burgundy);color:var(--ivory);border-color:var(--burgundy)}
.cg-rail-arrow--prev{left:-14px}
.cg-rail-arrow--next{right:-14px}

.cg-card{position:relative;background:var(--ivory);animation:cgFadeIn .35s ease-out}
@keyframes cgFadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.cg-card__media{position:relative;aspect-ratio:4/5;overflow:hidden;background:var(--blush)}
.cg-card__media img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
  transition:opacity .6s var(--ease),transform .8s var(--ease)}
.cg-card__img--hover{opacity:0}
.cg-card:hover .cg-card__img--hover{opacity:1}
.cg-card:hover .cg-card__img--main{opacity:0}
.cg-card:hover .cg-card__media img{transform:scale(1.04)}
.cg-card__wish{position:absolute;top:10px;right:10px;z-index:3;width:40px;height:40px;
  display:grid;place-items:center;background:rgba(250,246,241,.92);
  border-radius:999px;opacity:0;transform:translateY(-6px);
  transition:all .3s var(--ease);color:var(--ink)}
.cg-card:hover .cg-card__wish,.cg-card__wish.is-saved{opacity:1;transform:none}
.cg-card__wish.is-saved{color:var(--ruby)}
.cg-card__add{position:absolute;left:10px;right:10px;bottom:10px;z-index:3;
  min-height:42px;background:rgba(250,246,241,.96);color:var(--ink);
  font-size:.68rem;letter-spacing:.2em;text-transform:uppercase;
  display:flex;align-items:center;justify-content:center;gap:6px;
  opacity:0;transform:translateY(8px);transition:all .35s var(--ease);
  border:1px solid var(--line)}
.cg-card:hover .cg-card__add{opacity:1;transform:none}
.cg-card__add:hover{background:var(--burgundy);color:var(--ivory);border-color:var(--burgundy)}
.cg-card__body{padding:16px 14px 18px}
.cg-card__name{font-family:var(--serif);font-size:1.08rem;margin:0 0 4px;
  font-weight:500}
.cg-card__spec{font-size:.74rem;color:var(--muted);margin:0 0 4px;
  display:block;border-bottom:none}
.cg-card__enquire-link{display:inline-block;font-size:.72rem;letter-spacing:.12em;
  text-transform:uppercase;color:var(--burgundy);font-weight:600;margin-top:6px;
  transition:color .25s var(--ease)}
.cg-card:hover .cg-card__enquire-link{color:var(--gold)}

/* Limited edition */
.cg-limited__grid{display:grid;grid-auto-flow:column;
  grid-auto-columns:minmax(260px,1fr);gap:20px;overflow-x:auto;
  scroll-snap-type:x mandatory;padding-bottom:8px;
  scrollbar-width:none;-ms-overflow-style:none}
.cg-limited__grid::-webkit-scrollbar{display:none}
.cg-limited__card{position:relative;display:flex;flex-direction:column;border:1px solid var(--line);
  background:var(--white);scroll-snap-align:start;overflow:hidden;text-decoration:none;
  transition:all .35s var(--ease)}
.cg-limited__card:hover{transform:translateY(-4px);border-color:var(--gold);box-shadow:0 18px 36px -18px rgba(23,18,15,.12)}
.cg-limited__media{position:relative;aspect-ratio:3/4;overflow:hidden;background:var(--blush)}
.cg-limited__card img{width:100%;height:100%;object-fit:cover;
  transition:transform .9s var(--ease)}
.cg-limited__card:hover img{transform:scale(1.05)}
.cg-limited__card::after{display:none!important}
.cg-limited__info{padding:14px 16px 16px;background:var(--white);border-top:1px solid var(--line);
  display:flex;flex-direction:column;gap:4px}
.cg-limited__tag{font-size:.62rem;letter-spacing:.16em;
  text-transform:uppercase;color:var(--burgundy);font-weight:600}
.cg-limited__name{color:var(--ink);font-family:var(--serif);font-size:1.18rem;line-height:1.2;font-weight:400;margin:0}

/* Burgundy story */
.cg-story{background:var(--burgundy);color:var(--ivory);position:relative;
  overflow:hidden}
.cg-story__inner{display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(32px,6vw,80px);
  align-items:center;padding-block:clamp(48px,6vw,80px)}
.cg-story__title{font-family:var(--serif);font-weight:400;
  font-size:clamp(2.2rem,4.8vw,4rem);line-height:1.04;margin:18px 0 22px;
  max-width:16ch}
.cg-story__body{color:rgba(250,246,241,.82);max-width:44ch;margin:0 0 30px;
  font-size:1rem;font-weight:300}
.cg-story__imgs{display:grid;grid-template-columns:1fr 1fr;gap:16px;
  align-items:start}
.cg-story__imgs figure{margin:0;overflow:hidden}
.cg-story__imgs img{width:100%;aspect-ratio:3/4;object-fit:cover}
.cg-story__imgs figure:nth-child(2){margin-top:48px}

/* Craft */
.cg-craft__grid{display:grid;grid-template-columns:1.15fr .85fr;gap:clamp(32px,6vw,80px);
  align-items:center}
.cg-craft__media{position:relative;aspect-ratio:16/11;overflow:hidden;
  background:var(--blush)}
.cg-craft__media img{width:100%;height:100%;object-fit:cover}
.cg-craft__play{position:absolute;inset:0;display:grid;place-items:center;
  background:rgba(23,18,15,.18);transition:background .3s var(--ease)}
.cg-craft__play:hover{background:rgba(23,18,15,.3)}
.cg-craft__play span{width:76px;height:76px;border-radius:999px;
  border:1px solid rgba(250,246,241,.85);color:var(--ivory);
  display:grid;place-items:center;font-size:1rem;backdrop-filter:blur(2px)}
.cg-craft__steps{display:grid;gap:0;margin-top:32px}
.cg-craft__step{display:grid;grid-template-columns:44px 1fr;gap:16px;
  padding:18px 0;border-top:1px solid var(--line)}
.cg-craft__step:last-child{border-bottom:1px solid var(--line)}
.cg-craft__num{font-family:var(--serif);font-size:1.1rem;color:var(--gold)}
.cg-craft__step h5{margin:0 0 4px;font-size:.92rem;font-weight:500;
  letter-spacing:.02em}
.cg-craft__step p{margin:0;font-size:.84rem;color:var(--muted)}

/* Bridal */
.cg-bridal{background:var(--ivory)}
.cg-bridal__grid{display:grid;grid-template-columns:1.25fr .75fr 1fr;
  grid-template-rows:auto auto;gap:16px}
.cg-bridal__grid figure{margin:0;overflow:hidden;background:var(--blush)}
.cg-bridal__grid img{width:100%;height:100%;object-fit:cover;
  transition:transform .9s var(--ease)}
.cg-bridal__grid figure:hover img{transform:scale(1.04)}
.cg-bridal__a{grid-row:span 2;aspect-ratio:3/4}
.cg-bridal__b{aspect-ratio:1/1}
.cg-bridal__c{aspect-ratio:4/5}
.cg-bridal__copy{display:flex;flex-direction:column;justify-content:center;
  padding:clamp(24px,4vw,48px);background:var(--white);grid-column:3;
  grid-row:1/3}
.cg-bridal__title{font-family:var(--serif);font-weight:400;
  font-size:clamp(1.8rem,3.4vw,2.8rem);line-height:1.08;margin:14px 0 16px}
.cg-bridal__lede{color:var(--muted);font-size:.92rem;margin:0 0 22px}

/* Why */
.cg-why__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;
  margin-top:44px}
.cg-why__col h5{font-family:var(--serif);font-size:1.15rem;font-weight:500;
  margin:0 0 8px}
.cg-why__col p{color:var(--muted);font-size:.88rem;margin:0}
.cg-why__col .cg-sparkle{font-size:1.1rem}

/* Testimonials — 3 reviews visible simultaneously with smooth scrolling */
.cg-testi{background:var(--ivory);overflow:hidden}
.cg-testi__head{display:flex;justify-content:space-between;align-items:flex-end;
  gap:24px;flex-wrap:wrap;margin-bottom:24px}
.cg-testi__controls{display:flex;gap:10px;align-items:center}
.cg-testi__arrow{width:44px;height:44px;border:1px solid var(--line);
  border-radius:999px;display:grid;place-items:center;color:var(--ink);
  background:var(--white);transition:all .25s var(--ease);cursor:pointer}
.cg-testi__arrow:hover:not(:disabled){background:var(--burgundy);color:var(--ivory);border-color:var(--burgundy)}
.cg-testi__arrow:disabled{opacity:.4;cursor:not-allowed}
.cg-testi__rail{display:flex;gap:24px;overflow-x:auto;scroll-snap-type:x mandatory;
  padding:8px 0 16px;scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch}
.cg-testi__rail::-webkit-scrollbar{display:none}
.cg-testi__card{flex:0 0 calc((100% - 48px) / 3);min-width:0;
  scroll-snap-align:start;background:var(--white);border:1px solid var(--line);
  border-radius:2px;padding:32px 28px;display:flex;flex-direction:column;
  justify-content:space-between;position:relative;box-shadow:0 4px 20px -16px rgba(23,18,15,.1);
  transition:transform .35s var(--ease),box-shadow .35s var(--ease),border-color .35s var(--ease)}
.cg-testi__card:hover{transform:translateY(-4px);border-color:var(--gold);
  box-shadow:0 12px 30px -15px rgba(23,18,15,.18)}
.cg-testi__stars{color:var(--gold);font-size:.85rem;letter-spacing:.25em;margin-bottom:14px}
.cg-testi__card-quote{font-family:var(--serif);font-size:1.14rem;line-height:1.45;
  font-weight:400;color:var(--ink);margin:0 0 20px;flex:1}
.cg-testi__meta{border-top:1px solid var(--line);padding-top:16px;display:flex;
  flex-direction:column;gap:4px}
.cg-testi__card-who{font-size:.76rem;letter-spacing:.12em;text-transform:uppercase;
  font-weight:600;color:var(--ink)}
.cg-testi__card-piece{font-size:.68rem;letter-spacing:.1em;color:var(--burgundy);
  text-transform:uppercase}
.cg-testi__verified{font-size:.66rem;letter-spacing:.08em;color:var(--muted);
  display:inline-flex;align-items:center;gap:4px;margin-top:2px}

/* Instagram */
.cg-insta__grid{display:grid;grid-template-columns:repeat(6,1fr);gap:10px}
.cg-insta__cell{position:relative;aspect-ratio:1/1;overflow:hidden;
  background:var(--blush)}
.cg-insta__cell img{width:100%;height:100%;object-fit:cover;
  transition:transform .8s var(--ease)}
.cg-insta__cell:hover img{transform:scale(1.06)}
.cg-insta__cell::after{content:"＋ View";position:absolute;inset:0;
  display:grid;place-items:center;color:var(--ivory);font-size:.68rem;
  letter-spacing:.24em;text-transform:uppercase;background:rgba(23,18,15,.36);
  opacity:0;transition:opacity .3s var(--ease)}
.cg-insta__cell:hover::after{opacity:1}

/* Visit */
.cg-visit__grid{display:grid;grid-template-columns:1fr 1fr;gap:0;
  border:1px solid var(--line)}
.cg-visit__img{min-height:480px;overflow:hidden;background:var(--blush)}
.cg-visit__img img{width:100%;height:100%;object-fit:cover}
.cg-visit__form{padding:clamp(28px,5vw,64px);background:var(--ivory)}
.cg-field{margin-bottom:22px}
.cg-field label{display:block;font-size:.68rem;letter-spacing:.2em;
  text-transform:uppercase;color:var(--muted);margin-bottom:8px}
.cg-input{width:100%;border:0;border-bottom:1px solid var(--line);
  background:transparent;padding:10px 0;font-family:var(--sans);font-size:1rem;
  color:var(--ink);transition:border-color .3s var(--ease);border-radius:0}
.cg-input:focus{outline:none;border-color:var(--burgundy)}
.cg-wa{display:inline-flex;align-items:center;gap:8px;color:var(--burgundy);
  font-size:.78rem;letter-spacing:.1em;text-transform:uppercase;margin-top:18px}

/* FAQ */
.cg-faq{background:var(--white)}
.cg-faq__list{max-width:880px;margin:0 auto}
.cg-faq__item{border-top:1px solid var(--line)}
.cg-faq__item:last-child{border-bottom:1px solid var(--line)}
.cg-faq__q{width:100%;display:flex;justify-content:space-between;gap:20px;
  align-items:center;padding:24px 0;text-align:left;font-family:var(--serif);
  font-size:clamp(1.05rem,2vw,1.3rem);color:var(--ink);transition:color .3s var(--ease)}
.cg-faq__q:hover{color:var(--burgundy)}
.cg-faq__icon{flex:none;width:22px;height:22px;display:grid;place-items:center;
  color:var(--gold);font-size:1rem;transition:transform .35s var(--ease)}
.cg-faq__item.is-open .cg-faq__icon{transform:rotate(45deg)}
.cg-faq__a{overflow:hidden;max-height:0;transition:max-height .4s var(--ease)}
.cg-faq__a-inner{padding:0 0 26px;color:var(--muted);max-width:60ch;
  font-size:.92rem}

/* Footer */
.cg-footer{background:var(--wine-deep);color:var(--ivory);position:relative}
.cg-footer__top{display:flex;justify-content:space-between;gap:48px;
  padding-block:clamp(42px,5.5vw,68px)}
.cg-footer__brand{max-width:320px}
.cg-footer__brand img{height:52px;margin-bottom:18px}
.cg-footer__brand p{color:rgba(250,246,241,.7);font-size:.86rem;max-width:30ch}
.cg-footer__social{display:flex;gap:10px;margin-top:22px}
.cg-footer__social a{width:40px;height:40px;border:1px solid rgba(250,246,241,.25);
  display:grid;place-items:center;border-radius:999px;color:var(--ivory);
  transition:all .3s var(--ease)}
.cg-footer__social a:hover{background:var(--ivory);color:var(--wine-deep)}
.cg-footer__links-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:36px;flex:1}
.cg-footer h4{font-size:.7rem;letter-spacing:.24em;text-transform:uppercase;
  color:rgba(250,246,241,.6);margin:0 0 18px;font-weight:500}
.cg-footer ul{list-style:none;margin:0;padding:0}
.cg-footer li{padding:6px 0}
.cg-footer li a{font-size:.86rem;color:rgba(250,246,241,.82);
  transition:color .25s var(--ease);text-decoration:none}
.cg-footer li a:hover{color:var(--ivory)}
.cg-footer__bottom{border-top:1px solid rgba(250,246,241,.16);
  display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;
  align-items:center;padding-block:22px;font-size:.72rem;
  color:rgba(250,246,241,.65)}
.cg-footer__credential{color:var(--gold);font-size:.72rem;letter-spacing:.08em;
  text-transform:uppercase}
.cg-backtop{display:inline-flex;align-items:center;gap:6px;
  color:rgba(250,246,241,.8);font-size:.7rem;letter-spacing:.14em;
  text-transform:uppercase}
.cg-backtop:hover{color:var(--ivory)}

/* Mobile menu */
.cg-mobile{position:fixed;inset:0 auto 0 0;width:min(340px,86vw);background:var(--white);z-index:100;
  transform:translateX(-100%);transition:transform .4s var(--ease);
  box-shadow:0 0 40px rgba(23,18,15,.2);
  display:flex;flex-direction:column;overflow-y:auto}
.cg-mobile.is-open{transform:translateX(0)}
.cg-mobile-overlay{position:fixed;inset:0;background:rgba(23,18,15,.45);
  backdrop-filter:blur(2px);z-index:99}
.cg-mobile__head{display:flex;align-items:center;justify-content:space-between;
  padding:20px var(--pad-x);border-bottom:1px solid var(--line)}
.cg-mobile__body{padding:16px var(--pad-x) 40px}
.cg-mobile__group{border-bottom:1px solid var(--line)}
.cg-mobile__trigger{width:100%;display:flex;justify-content:space-between;
  align-items:center;padding:16px 0;font-family:var(--serif);font-size:1.15rem;
  color:var(--ink)}
.cg-mobile__sub{overflow:hidden;max-height:0;transition:max-height .35s var(--ease)}
.cg-mobile__sub a{display:block;padding:8px 0 8px 14px;font-size:.88rem;
  color:var(--muted)}
.cg-mobile__sub a:hover{color:var(--burgundy)}

/* Responsive */
@media (max-width:1024px){
  .cg-header__nav{display:none}
  .cg-header__bar{grid-template-columns:auto 1fr auto}
  .cg-burger{display:grid;width:44px;height:44px;place-items:center}
  .cg-mega{display:none}
  .cg-cat__grid{grid-template-columns:repeat(2,1fr)}
  .cg-tile--wide{grid-column:span 2}
  .cg-split{grid-template-columns:1fr}
  .cg-split__img{min-height:420px;order:-1}
  .cg-story__inner{grid-template-columns:1fr}
  .cg-craft__grid{grid-template-columns:1fr}
  .cg-bridal__grid{grid-template-columns:1fr 1fr}
  .cg-bridal__copy{grid-column:1/3;grid-row:auto}
  .cg-bridal__a{grid-row:auto}
  .cg-testi__card{flex:0 0 calc((100% - 20px) / 2);padding:28px 22px}
  .cg-testi__rail{gap:20px}
  .cg-insta__grid{grid-template-columns:repeat(3,1fr)}
  .cg-visit__grid{grid-template-columns:1fr}
  .cg-visit__img{min-height:320px}
  .cg-footer__top{flex-direction:column;gap:36px}
  .cg-footer__links-grid{grid-template-columns:repeat(2,1fr);gap:32px 24px}
  .cg-trust__grid{grid-template-columns:repeat(2,1fr)}
  .cg-card__wish{opacity:1;transform:none}
  .cg-card__add{opacity:1;transform:none}
  .cg-tile__shop{opacity:1;transform:none}
}
@media (max-width:768px){
  .cg-hero{min-height:92svh}
  .cg-hero__media video{object-position:center center}
  .cg-hero__copy{max-width:none;padding:0 var(--pad-x) 36px}
  .cg-hero__ctas{flex-direction:column;align-items:stretch;gap:10px}
  .cg-hero__ctas .cg-btn{width:100%}
  .cg-bs-arrows{display:none}
  .cg-rail-arrow--prev{left:2px}
  .cg-rail-arrow--next{right:2px}
  .cg-cat__grid{grid-template-columns:repeat(2,1fr);gap:14px;grid-auto-flow:row;overflow-x:visible;padding-bottom:0}
  .cg-tile{min-height:auto}
  .cg-tile__media{aspect-ratio:1/1.18}
  .cg-tile__info{padding:12px 10px 14px}
  .cg-tile__label{font-size:1.05rem}
  .cg-tile__count{display:none}
  .cg-tile__tagline{font-size:.76rem;line-height:1.25;margin:2px 0 6px}
  .cg-tile__shop{font-size:.65rem;letter-spacing:.14em}
  .cg-story__imgs{gap:12px}
  .cg-story__imgs figure:nth-child(2){margin-top:20px}
  .cg-why__grid{grid-template-columns:1fr;gap:22px}
  .cg-bridal__grid{grid-template-columns:1fr}
  .cg-bridal__copy{grid-column:1;padding:32px 20px}
  .cg-bridal__a,.cg-bridal__b,.cg-bridal__c{aspect-ratio:4/5}
  .cg-testi__card{flex:0 0 86%;padding:24px 20px}
  .cg-testi__rail{gap:16px}
  .cg-insta__grid{grid-template-columns:repeat(2,1fr);gap:8px}
  .cg-footer__top{flex-direction:column;gap:32px;padding-block:36px}
  .cg-footer__brand{max-width:none;text-align:center;display:flex;flex-direction:column;align-items:center;padding-bottom:24px;border-bottom:1px solid rgba(250,246,241,.12)}
  .cg-footer__brand p{text-align:center;max-width:32ch;margin:0 auto}
  .cg-footer__links-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:28px 16px;width:100%}
  .cg-footer__bottom{flex-direction:column;text-align:center;gap:14px;padding-block:22px}
  .cg-footer__credential{color:var(--gold);font-size:.72rem;letter-spacing:.08em;text-transform:uppercase}
  .cg-trust__grid{grid-template-columns:1fr 1fr;gap:16px}
  .cg-trust__item{justify-content:flex-start}
  .cg-limited__grid{grid-auto-columns:80%}
  .cg-input{font-size:16px}
}
@media (max-width:480px){
  .cg-wrap{padding-inline:16px}
  .cg-header__bar{min-height:64px;gap:8px}
  .cg-logo{min-width:0}
  .cg-logo img{max-width:118px}
  .cg-rail{grid-auto-columns:82%}
  .cg-limited__grid{grid-auto-columns:86%}
  .cg-testi__card{flex:0 0 90%}
  .cg-header__util{gap:2px}
  .cg-header__util button,.cg-header__util a{width:38px;height:38px}
  .cg-cat__grid{grid-template-columns:repeat(2,1fr);gap:10px}
  .cg-tile__info{padding:10px 8px 12px}
  .cg-tile__label{font-size:.95rem}
  .cg-tile__tagline{display:none}
  .cg-tile__shop{font-size:.62rem;letter-spacing:.12em}
}
`;

/* ===========================================================================
   BRAND ASSETS & PRODUCT DATA (100% sourced from official brand assest)
=========================================================================== */
const IMG = {
  heroVideoDesktop: HERO_ASSETS.videoDesktop,
  heroVideoMobile: HERO_ASSETS.videoMobile,
  logo: "/logo-white-transparent.png",
};

const CATEGORIES = CATEGORIES_LIST;
const PRODUCTS = PRODUCT_ASSETS;
const LIMITED = LIMITED_EDITIONS;

const TESTIMONIALS = [
  { quote: "The kind of piece you never take off. It feels made for me.", who: "Ananya S. · Mumbai", piece: "Aurelia Solitaire" },
  { quote: "Quietly special. My everyday ring that still feels celebratory.", who: "Meera K. · Bengaluru", piece: "Étoile Band" },
  { quote: "Beautifully considered, from the bespoke box to the last prong.", who: "Rhea P. · New Delhi", piece: "Drop Lumière" },
  { quote: "The gold tone is sublime — warm, understated, and impeccably finished.", who: "Tara D. · Hyderabad", piece: "Sculpt Chain" },
  { quote: "Wore it on our anniversary and haven’t removed it since. Pure heirloom quality.", who: "Kavya M. · Chennai", piece: "Ruby Halo Ring" },
  { quote: "The private atelier viewing made choosing our bridal rings unforgettable.", who: "Simran & Dev · Pune", piece: "Bridal Suite" },
];

const FAQS = [
  {
    q: "How do I find my ring size?",
    a: "We offer a complimentary printable size guide, or you may book a personalized video consultation with our gemmologist to accurately determine your exact ring size."
  },
  {
    q: "Are your pieces certified?",
    a: "Yes. Every piece of Carats by Grace fine jewellery is crafted in hallmarked 18K gold (BIS Hallmark 750) and accompanied by individual diamond grading certification from recognized gemmological laboratories (GIA / IGI)."
  },
  {
    q: "What are your shipping timelines?",
    a: "All orders include complimentary insured express delivery across India. In-stock creations dispatch within 48 hours and arrive within 3 to 5 business days. Bespoke and custom-sized creations dispatch within 10 to 14 business days."
  },
  {
    q: "What is your returns policy?",
    a: "We offer a 15-day complimentary return and exchange policy on all unworn creations in their original security packaging. Bespoke engraved or custom-cut pieces are subject to individual consultation terms."
  },
  {
    q: "How should I care for my jewellery?",
    a: "We recommend storing each creation in the velvet-lined pouch provided, avoiding direct contact with perfumes, hand sanitizers, and harsh household chemicals. Wipe gently with a clean microfibre cloth after wearing."
  },
  {
    q: "Can I customise a piece?",
    a: "Yes. Our bespoke atelier welcomes custom carat weights, diamond shapes, metal selections (18K yellow, rose, white gold, or 950 platinum), and personalized inner band engraving."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit/debit cards (Visa, Mastercard, Amex), UPI, Net Banking, and flexible no-cost EMI options on leading credit cards."
  },
];

/* ===========================================================================
   HOOKS
=========================================================================== */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useScrolled(threshold = 80) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

/* ===========================================================================
   SMALL COMPONENTS
=========================================================================== */
const Sparkle = ({ style }) => (
  <span className="cg-sparkle" aria-hidden="true" style={style}>✦</span>
);

function Icon({ name, size = 20, className, style, ...rest }) {
  const common = {
    width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: 1.4,
    strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true,
    className, style, ...rest,
  };
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    bag: <><path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="M6 6l12 12M18 6L6 18" /></>,
    arrowRight: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    arrowLeft: <><path d="M19 12H5M11 18l-6-6 6-6" /></>,
    arrowUp: <><path d="M12 19V5M6 11l6-6 6 6" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    chevron: <path d="m6 9 6 6 6-6" />,
    play: <path d="M8 5v14l11-7L8 5Z" />,
    shield: <><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" /><path d="m9 12 2 2 4-4" /></>,
    "shield-check": <><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" /><path d="m9 12 2 2 4-4" /></>,
    gem: <><path d="M6 3h12l4 6-10 12L2 9z" /><path d="M11 3 8 9l4 12 4-12-3-6" /><path d="M2 9h20" /></>,
    pin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
    calendar: <><rect width="18" height="18" x="3" y="4" rx="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></>,
    refresh: <><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M3 21v-5h5" /></>,
    truck: <><path d="M3 7h11v9H3z" /><path d="M14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" /></>,
    returns: <><path d="M4 12a8 8 0 1 0 3-6.2" /><path d="M4 4v4h4" /></>,
    instagram: <><rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="12" cy="12" r="3.5" /><circle cx="17" cy="7" r=".6" fill="currentColor" /></>,
    whatsapp: <><path d="M4 20l1.5-4A8 8 0 1 1 9 19.4L4 20Z" /><path d="M9 10c.5 2 2 3.5 4 4" /></>,
    pinterest: <><circle cx="12" cy="12" r="8" /><path d="M10 20c1-3 2-6 3-9" /><path d="M9 12a3 3 0 1 1 5 2" /></>,
    chat: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></>,
  };
  return <svg {...common}>{paths[name] || null}</svg>;
}

const INR = (n) => "₹" + n.toLocaleString("en-IN");

/* ===========================================================================
   SECTION COMPONENTS
=========================================================================== */

/* Announcement */
function Announcement({ onDismiss }) {
  const messages = [
    " 100% exchange on diamond value — with no deduction in making charges.",
    " 85% buyback on diamond value — excluding GST and making charges.",
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % messages.length), 4200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="cg-ann" role="region" aria-label="Announcement">
      <div className="cg-ann__inner">
        <Sparkle />
        <span className="cg-ann__msg" aria-live="polite">{messages[idx]}</span>
        <Sparkle />
      </div>
      <button className="cg-ann__x" aria-label="Dismiss announcement" onClick={onDismiss}>
        <Icon name="close" size={14} />
      </button>
    </div>
  );
}

/* Header + Mega + Mobile */
function Header({ cartCount, onOpenCart }) {
  const scrolled = useScrolled();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState(null);
  const onHero = true;

  const { toggleSearch } = useUI();
  const { items: wishlistItems } = useWishlist();
  const wishlistCount = wishlistItems?.length ?? 0;
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const nav = [
    { label: "Rings", href: "/collections/rings", mega: true },
    { label: "Earrings", href: "/collections/earrings", mega: true },
    { label: "Necklaces", href: "/collections/necklaces", mega: true },
    { label: "Bracelets", href: "/collections/bracelets", mega: true },
    { label: "Bridal", href: "/collections/bridal" },
    { label: "Gifting", href: "/collections/gifting" },
    { label: "High Jewellery", href: "/collections/high-jewellery" },
  ];

  const megaData = {
    "By Category": [
      { name: "Rings", href: "/collections/rings" },
      { name: "Earrings", href: "/collections/earrings" },
      { name: "Necklaces", href: "/collections/necklaces" },
      { name: "Bracelets", href: "/collections/bracelets" },
      { name: "Bangles", href: "/collections/bangles" },
      { name: "Pendants", href: "/collections/pendants" },
    ],
    "By Occasion": [
      { name: "Everyday", href: "/collections/everyday" },
      { name: "Gifting", href: "/collections/gifting" },
      { name: "Bridal", href: "/collections/bridal" },
      { name: "Festive", href: "/collections/festive" },
      { name: "Anniversary", href: "/collections/anniversary" },
    ],
    "By Metal": [
      { name: "18K Yellow Gold", href: "/collections/rings" },
      { name: "18K Rose Gold", href: "/collections/earrings" },
      { name: "18K White Gold", href: "/collections/necklaces" },
      { name: "950 Platinum", href: "/collections/bridal" },
    ],
  };

  const cls = ["cg-header", "is-onhero"].filter(Boolean).join(" ");

  return (
    <header className={cls}
      onMouseLeave={() => setMegaOpen(false)}>
      <div className="cg-wrap cg-header__bar">
        <div className="cg-header__nav" aria-hidden={mobileOpen}>
          <button className="cg-burger" aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            style={{ display: "none" }}>
            <Icon name="menu" />
          </button>
          {nav.map((n) => (
            <Link key={n.label} to={n.href}
              onMouseEnter={() => setMegaOpen(!!n.mega)}
              onFocus={() => setMegaOpen(!!n.mega)}>
              {n.label}
            </Link>
          ))}
        </div>

        <button className="cg-burger" aria-label="Open menu"
          onClick={() => setMobileOpen(true)}>
          <Icon name="menu" />
        </button>

        <Link className="cg-logo" to="/" aria-label="Carats by Grace — home">
          <BrandLogo variant="light" height={48} />
        </Link>

        <div className="cg-header__util">
          <button aria-label="Search" type="button" onClick={toggleSearch}>
            <Icon name="search" />
          </button>
          <Link to="/wishlist" aria-label={`Wishlist (${wishlistCount} items)`}>
            <Icon name="heart" />
            {wishlistCount > 0 && <span className="cg-wish-count">{wishlistCount}</span>}
          </Link>
          <button aria-label="Account" type="button" onClick={() => navigate('/account')}>
            <Icon name="user" />
          </button>
          <a
            href="https://wa.me/919120530531?text=Hello%20Carats%20by%20Grace%2C%20I%20would%20like%20to%20enquire%20about%20your%20fine%20jewelry%20collections."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Atelier WhatsApp Concierge"
            title="Chat with Atelier Concierge"
            className="cg-header__wa"
          >
            <Icon name="whatsapp" />
          </a>
        </div>
      </div>

      {/* Mega menu */}
      <div className={`cg-mega ${megaOpen ? "is-open" : ""}`}
        onMouseEnter={() => setMegaOpen(true)}
        onMouseLeave={() => setMegaOpen(false)}>
        <div className="cg-mega__inner">
          {Object.entries(megaData).map(([title, items]) => (
            <div className="cg-mega__col" key={title}>
              <h4>{title}</h4>
              {items.map((i) => (
                <Link key={i.name} to={i.href} onClick={() => setMegaOpen(false)}>
                  {i.name}
                </Link>
              ))}
            </div>
          ))}
          <div className="cg-mega__col">
            <h4>Discover</h4>
            <Link to="/collections/latest" onClick={() => setMegaOpen(false)}>Latest Arrivals</Link>
            <Link to="/collections/bestsellers" onClick={() => setMegaOpen(false)}>Bestsellers</Link>
            <Link to="/collections/bridal" onClick={() => setMegaOpen(false)}>The Bridal Edit</Link>
            <a href="#visit" onClick={() => setMegaOpen(false)}>Book a Consultation</a>
          </div>
          <Link className="cg-mega__img" to="/collections/rings" onClick={() => setMegaOpen(false)}>
            <img src={EDITORIAL_ASSETS.headerMegaMenu}
              alt="Editorial: model wearing Carats by Grace rings" loading="lazy" decoding="async" />
          </Link>
        </div>
      </div>

      {/* Mobile */}
      <div className={`cg-mobile ${mobileOpen ? "is-open" : ""}`}
        role="dialog" aria-modal="true" aria-label="Menu">
        <div className="cg-mobile__head">
          <span className="cg-eyebrow">Menu</span>
          <button aria-label="Close menu" onClick={() => setMobileOpen(false)}>
            <Icon name="close" />
          </button>
        </div>
        <div className="cg-mobile__body">
          {Object.entries(megaData).flatMap(([title, items]) => [
            { key: title, label: title, items }
          ]).map((g) => (
            <div className="cg-mobile__group" key={g.key}>
              <button className="cg-mobile__trigger"
                aria-expanded={mobileGroup === g.key}
                onClick={() => setMobileGroup(mobileGroup === g.key ? null : g.key)}>
                {g.label}
                <Icon name="chevron" size={18} />
              </button>
              <div className="cg-mobile__sub"
                style={{ maxHeight: mobileGroup === g.key ? 400 : 0 }}>
                {g.items.map((i) => (
                  <Link key={i.name} to={i.href} onClick={() => setMobileOpen(false)}>
                    {i.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          {[
            { label: "Bridal", href: "/collections/bridal" },
            { label: "Gifting", href: "/collections/gifting" },
            { label: "High Jewellery", href: "/collections/high-jewellery" },
            { label: "Wishlist", href: "/wishlist" },
            { label: "My Account", href: "/account" },
            { label: "Book a Consultation", href: "#visit" },
          ].map((l) => (
            <div className="cg-mobile__group" key={l.label}>
              {l.href.startsWith("#") ? (
                <a className="cg-mobile__trigger" href={l.href} onClick={() => setMobileOpen(false)}>
                  {l.label}
                </a>
              ) : (
                <Link className="cg-mobile__trigger" to={l.href} onClick={() => setMobileOpen(false)}>
                  {l.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="cg-mobile-overlay"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}

/* Hero — video only, continuous loop (Desktop & Mobile optimized, NO overlays) */
function Hero({ scrolled }) {
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= 768;
    }
    return false;
  });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handleMQ = (e) => setIsMobile(e.matches);
    if (mq.addEventListener) {
      mq.addEventListener("change", handleMQ);
    } else {
      mq.addListener(handleMQ);
    }
    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener("change", handleMQ);
      } else {
        mq.removeListener(handleMQ);
      }
    };
  }, []);

  const currentVideo = isMobile ? HERO_ASSETS.videoMobile : HERO_ASSETS.videoDesktop;
  const currentPoster = isMobile ? HERO_ASSETS.posterMobile : HERO_ASSETS.posterDesktop;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.defaultMuted = true;
    v.loop = true;

    const playVideo = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          const onUserGesture = () => {
            v.play().catch(() => { });
            window.removeEventListener("pointerdown", onUserGesture);
            window.removeEventListener("touchstart", onUserGesture);
            window.removeEventListener("keydown", onUserGesture);
          };
          window.addEventListener("pointerdown", onUserGesture, { once: true });
          window.addEventListener("touchstart", onUserGesture, { once: true });
          window.addEventListener("keydown", onUserGesture, { once: true });
        });
      }
    };

    if (v.readyState >= 2) {
      playVideo();
    } else {
      v.addEventListener("loadeddata", playVideo, { once: true });
      v.addEventListener("canplay", playVideo, { once: true });
    }

    const keepPlaying = () => {
      if (!v.ended && document.visibilityState !== "hidden") {
        v.play().catch(() => { });
      }
    };

    v.addEventListener("pause", keepPlaying);
    v.addEventListener("waiting", keepPlaying);

    return () => {
      v.removeEventListener("loadeddata", playVideo);
      v.removeEventListener("canplay", playVideo);
      v.removeEventListener("pause", keepPlaying);
      v.removeEventListener("waiting", keepPlaying);
    };
  }, [isMobile, currentVideo]);

  return (
    <section className="cg-hero" aria-label="Campaign">
      <div className="cg-hero__media">
        <video
          key={isMobile ? "hero-vid-mobile" : "hero-vid-desktop"}
          ref={videoRef}
          src={currentVideo}
          poster={currentPoster}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          aria-label="Campaign film — model wearing Carats by Grace jewellery"
        >
          <source src={currentVideo} type="video/mp4" />
        </video>
      </div>
      <div className="cg-hero__copy">
        <span className="cg-eyebrow">The Nocturne Edit </span>
        <h1 className="cg-hero__title">Made to be worn, not kept away.</h1>
        <p className="cg-hero__lede">
          Fine jewellery for the everyday and the once-in-a-lifetime.
          Quietly luminous, deliberately yours.
        </p>
        <div className="cg-hero__ctas">
          <Link className="cg-btn cg-btn--solid" to="/collections/all">Shop the Collection</Link>
          <a className="cg-btn cg-btn--ghost-light" href="#visit">Book a Consultation</a>
        </div>
      </div>
      <div
        className="cg-scrollcue"
        aria-hidden="true"
        style={{
          opacity: scrolled ? 0 : 1,
          pointerEvents: scrolled ? "none" : "auto",
        }}
      >
        <span />
        Scroll
      </div>
    </section>
  );
}

/* Trust */
function Trust() {
  const items = [
    { icon: "shield-check", label: "IGI Certified Diamonds" },
    { icon: "gem", label: "Exceptional Craftsmanship" },
    { icon: "heart", label: "Made for Your Story" },
    { icon: "calendar", label: "Personalised Consultations" },
  ];
  return (
    <div className="cg-trust">
      <div className="cg-wrap">
        <div className="cg-trust__grid">
          {items.map((it) => (
            <div className="cg-trust__item" key={it.label}>
              <Icon name={it.icon} size={22} />
              <span>{it.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Categories — Find your everyday signature (No overlays, clean image alignment) */
function Categories() {
  return (
    <section className="cg-section cg-wrap" aria-labelledby="cat-h">
      <div className="cg-cat__head reveal">
        <div>
          <span className="cg-eyebrow">Shop by category</span>
          <h2 id="cat-h" className="cg-display"
            style={{ fontSize: "clamp(1.9rem,3.6vw,2.9rem)", marginTop: 12 }}>
            Find your everyday signature.
          </h2>
        </div>
        <Link className="cg-btn cg-btn--ghost" to="/collections/all">View all</Link>
      </div>
      <div className="cg-cat__grid">
        {CATEGORIES.map((c, i) => (
          <Link key={c.name} to={`/collections/${c.slug || c.name.toLowerCase()}`}
            className="cg-tile reveal"
            style={{ transitionDelay: `${i * 50}ms` }}>
            <div className="cg-tile__media">
              <img src={c.img} alt={`${c.name} — Carats by Grace`} loading="lazy" decoding="async" />
            </div>
            <div className="cg-tile__info">
              <div className="cg-tile__top">
                <h3 className="cg-tile__label">{c.name}</h3>
                <span className="cg-tile__count">{c.count}</span>
              </div>
              <p className="cg-tile__tagline">{c.tagline}</p>
              <span className="cg-tile__shop">Explore {c.name} →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* Signature campaign split */
function CampaignSplit() {
  return (
    <section className="cg-section" style={{ paddingTop: 0 }}>
      <div className="cg-split reveal">
        <div className="cg-split__img">
          <img src={EDITORIAL_ASSETS.campaignSplit}
            alt="Editorial: close-up of a ruby and diamond suite"
            loading="lazy" decoding="async" />
        </div>
        <div className="cg-split__copy">
          <span className="cg-eyebrow">Featured · The Ruby Hours</span>
          <h2 className="cg-split__title">A little fire. A great deal of restraint.</h2>
          <p className="cg-split__lede">
            Our festive edit pairs a single ruby with warm gold — designed
            for evenings that ask for nothing more.
          </p>
          <Link className="cg-btn cg-btn--solid" to="/collections/rings"
            style={{ alignSelf: "flex-start" }}>
            Explore the Edit
          </Link>
        </div>
      </div>
    </section>
  );
}

/* Best Sellers */
function BestSellers() {
  const tabs = ["Rings", "Earrings", "Necklaces", "All"];
  const [tab, setTab] = useState("Rings");
  const railRef = useRef(null);
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { openQuickView } = useUI();

  const list = tab === "All"
    ? [...(PRODUCTS.Rings || []), ...(PRODUCTS.Earrings || []), ...(PRODUCTS.Necklaces || [])]
    : (PRODUCTS[tab] || []);

  const scroll = (dir) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.7), behavior: "smooth" });
  };

  const handleTabChange = (t) => {
    setTab(t);
    if (railRef.current) {
      railRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="cg-section cg-wrap" aria-labelledby="bs-h">
      <div className="reveal" style={{
        display: "flex",
        justifyContent: "space-between", alignItems: "end",
        gap: 20, flexWrap: "wrap", marginBottom: 8
      }}>
        <div>
          <span className="cg-eyebrow">Bestsellers</span>
          <h2 id="bs-h" className="cg-display"
            style={{ fontSize: "clamp(1.9rem,3.6vw,2.9rem)", marginTop: 12 }}>
            The pieces she reaches for.
          </h2>
        </div>
        <div className="cg-bs-arrows">
          <button className="cg-bs-arrow" aria-label="Scroll left"
            onClick={() => scroll(-1)}>
            <Icon name="arrowLeft" size={16} />
          </button>
          <button className="cg-bs-arrow" aria-label="Scroll right"
            onClick={() => scroll(1)}>
            <Icon name="arrowRight" size={16} />
          </button>
        </div>
      </div>

      <div className="cg-tabs" role="tablist" aria-label="Product category">
        {tabs.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`cg-tab ${tab === t ? "is-active" : ""}`}
            onClick={() => handleTabChange(t)}>{t}</button>
        ))}
      </div>

      <div className="cg-rail-wrap">
        <button className="cg-rail-arrow cg-rail-arrow--prev"
          aria-label="Previous pieces"
          onClick={() => scroll(-1)}>
          <Icon name="arrowLeft" size={16} />
        </button>

        <div className="cg-rail" ref={railRef} role="tabpanel" aria-label={tab}>
          {list.map((p, i) => {
            const isSaved = isWishlisted(p.name);
            return (
              <article className="cg-card" key={p.name + "-" + tab + "-" + i}>
                <div className="cg-card__media">
                  <img className="cg-card__img--main" src={p.img}
                    alt={`${p.name} — Carats by Grace`} loading="lazy" decoding="async" />
                  <img className="cg-card__img--hover" src={p.hover}
                    alt="" aria-hidden="true" loading="lazy" decoding="async" />
                  <button
                    className={`cg-card__wish ${isSaved ? "is-saved" : ""}`}
                    aria-label={isSaved ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`}
                    aria-pressed={isSaved}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist({
                        id: p.name.toLowerCase().replace(/\s+/g, '-'),
                        name: p.name,
                        spec: p.spec,
                        price: p.price,
                        img: p.img,
                        hover: p.hover,
                        inStock: true,
                        cat: tab === "All" ? "Jewellery" : tab,
                      });
                    }}>
                    <Icon name="heart" size={18} />
                  </button>
                  <button className="cg-card__add"
                    type="button"
                    onClick={() => openQuickView({ ...p, cat: tab === "All" ? "Jewellery" : tab })}>
                    Enquire <span aria-hidden="true">✦</span>
                  </button>
                </div>
                <div className="cg-card__body"
                  onClick={() => openQuickView({ ...p, cat: tab === "All" ? "Jewellery" : tab })}
                  style={{ cursor: "pointer" }}>
                  <h3 className="cg-card__name">{p.name}</h3>
                  <span className="cg-card__spec">{p.spec}</span>
                  <span className="cg-card__enquire-link">Enquire Piece →</span>
                </div>
              </article>
            );
          })}
        </div>

        <button className="cg-rail-arrow cg-rail-arrow--next"
          aria-label="Next pieces"
          onClick={() => scroll(1)}>
          <Icon name="arrowRight" size={16} />
        </button>
      </div>

      <div style={{ textAlign: "center", marginTop: 36 }}>
        <Link className="cg-btn cg-btn--ghost" to="/collections/bestsellers">Explore More</Link>
      </div>
    </section>
  );
}

/* Limited edition */
function Limited() {
  return (
    <section className="cg-section cg-wrap" aria-labelledby="lim-h">
      <div className="reveal" style={{ marginBottom: 32 }}>
        <span className="cg-eyebrow">Limited edition collections</span>
        <h2 id="lim-h" className="cg-display"
          style={{ fontSize: "clamp(1.9rem,3.6vw,2.9rem)", marginTop: 12 }}>
          Numbered. Never repeated.
        </h2>
      </div>
      <div className="cg-limited__grid">
        {LIMITED.map((c, i) => (
          <Link className="cg-limited__card reveal" key={c.name} to={`/collections/${c.name.toLowerCase().replace(/\s+/g, '-')}`}
            style={{ transitionDelay: `${i * 50}ms` }}>
            <div className="cg-limited__media">
              <img src={c.img} alt={`${c.name} — limited edition`} loading="lazy" decoding="async" />
            </div>
            <div className="cg-limited__info">
              <span className="cg-limited__tag">Limited Edition</span>
              <h3 className="cg-limited__name">{c.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* Story */
function Story() {
  return (
    <section className="cg-story" aria-labelledby="story-h">
      <div className="cg-wrap cg-story__inner">
        <div className="reveal">
          <span className="cg-eyebrow" style={{ color: "rgba(250,246,241,.7)" }}>
            <Sparkle /> The Carats by Grace Story
          </span>

          <h2 id="story-h" className="cg-story__title">
            Luxury, chosen differently.
          </h2>
          <p className="cg-story__body">
            At Carats by Grace, we believe brilliance is more than what meets
            the eye. Our lab-grown diamond jewellery brings together timeless
            elegance, considered craftsmanship, and a modern perspective on
            luxury. Each piece is an expression of individuality — designed
            to be treasured, worn, and made entirely your own.
          </p>

          <a className="cg-btn cg-btn--ghost-light" href="#">Our Story</a>
        </div>
        <div className="cg-story__imgs reveal">
          <figure>
            <img src={EDITORIAL_ASSETS.story1}
              alt="Editorial: model wearing Carats by Grace diamond choker and ring" loading="lazy" decoding="async" />
          </figure>
          <figure>
            <img src={EDITORIAL_ASSETS.story2}
              alt="Editorial: model wearing Carats by Grace diamond earrings and ring" loading="lazy" decoding="async" />
          </figure>
        </div>
      </div>
    </section>
  );
}

/* Craft */
function Craft() {

  const steps = [
    {
      n: "01",
      t: "Choosing your diamond",
      d: "We select each diamond for its sparkle, cut, and clarity, so your jewellery shines beautifully from every angle."
    },
    {
      n: "02",
      t: "Made with care",
      d: "Every piece is carefully crafted, with a setting designed to bring out the beauty of your diamond and keep it looking timeless."
    },
    {
      n: "03",
      t: "Quality you can trust",
      d: "Before your jewellery reaches you, we check every detail to make sure it looks beautiful and meets our quality standards."
    },
  ];

  return (
    <section className="cg-section cg-wrap" aria-labelledby="craft-h">
      <div className="cg-craft__grid">
        <div className="cg-craft__media reveal">
          <img src={EDITORIAL_ASSETS.craft}
            alt="Craft: precision setting and hallmarking of fine jewellery" loading="lazy" decoding="async" />
          <button className="cg-craft__play" aria-label="Play craftsmanship film">
            <span><Icon name="play" size={20} /></span>
          </button>
        </div>
        <div className="reveal">
          <span className="cg-eyebrow">Craftsmanship</span>
          <h2 id="craft-h" className="cg-display"
            style={{ fontSize: "clamp(1.9rem,3.6vw,2.9rem)", margin: "12px 0 14px" }}>
            Considered at every step.
          </h2>
          <p style={{ color: "var(--muted)", maxWidth: "44ch", margin: 0 }}>
            From the deliberate curve of a bezel to the comfortable weight of solid 18K gold — every piece is crafted for heirloom longevity.
          </p>
          <div className="cg-craft__steps">
            {steps.map((s) => (
              <div className="cg-craft__step" key={s.n}>
                <div className="cg-craft__num">{s.n}</div>
                <div>
                  <h5>{s.t}</h5>
                  <p>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Bridal */
function Bridal() {
  return (
    <section className="cg-bridal cg-section" aria-labelledby="bridal-h">
      <div className="cg-wrap">
        <div className="cg-bridal__grid reveal">
          <figure className="cg-bridal__a">
            <img src={EDITORIAL_ASSETS.bridalA}
              alt="Bridal: model in haute joaillerie emerald and diamond suite" loading="lazy" decoding="async" />
          </figure>
          <figure className="cg-bridal__b">
            <img src={EDITORIAL_ASSETS.bridalB}
              alt="Bridal: close-up of diamond chandelier earrings and pendant" loading="lazy" decoding="async" />
          </figure>
          <figure className="cg-bridal__c">
            <img src={EDITORIAL_ASSETS.bridalC}
              alt="Bridal: diamond cocktail ring on hand" loading="lazy" decoding="async" />
          </figure>
          <div className="cg-bridal__copy">
            <span className="cg-eyebrow">The Bridal Edit</span>
            <h2 id="bridal-h" className="cg-bridal__title">
              For the vows. And every day after.
            </h2>
            <p className="cg-bridal__lede">
              Bridal rings and sets, considered in proportion and made to be
              worn far beyond the day itself.
            </p>
            <a className="cg-btn cg-btn--solid" href="#"
              style={{ alignSelf: "flex-start" }}>
              Discover Bridal
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Why */
function Why() {
  const items = [
    { t: "Considered design", d: "Proportions, weight, and silhouette chosen with restraint to celebrate the beauty of solid precious metals." },
    { t: "Everyday fine", d: "Crafted for effortless daily wear with secure low-profile settings that transition seamlessly into the evening." },
    { t: "Heirloom craftsmanship", d: "Individually hallmarked 18K gold and conflict-free natural diamonds, accompanied by lifetime authentication." },
  ];
  return (
    <section className="cg-section cg-wrap" aria-labelledby="why-h">
      <div className="reveal" style={{ textAlign: "center" }}>
        <span className="cg-eyebrow">Why Carats by Grace</span>
        <h2 id="why-h" className="cg-display"
          style={{ fontSize: "clamp(1.9rem,3.6vw,2.9rem)", marginTop: 12 }}>
          Quiet promises, kept.
        </h2>
      </div>
      <div className="cg-why__grid">
        {items.map((it, i) => (
          <div className="cg-why__col reveal" key={it.t}
            style={{ transitionDelay: `${i * 60}ms` }}>
            <Sparkle style={{ fontSize: "1.1rem" }} />
            <h5 style={{ marginTop: 12 }}>{it.t}</h5>
            <p>{it.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* Testimonials */
function Testimonials() {
  const railRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  const scroll = (dir) => {
    const el = railRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild ? el.firstElementChild.clientWidth + 24 : el.clientWidth * 0.33;
    el.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  };

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    updateScrollButtons();
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, [updateScrollButtons]);

  // Subtle auto-scroll every 5.5s
  useEffect(() => {
    const timer = setInterval(() => {
      const el = railRef.current;
      if (!el) return;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scroll(1);
      }
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="cg-testi cg-section" aria-labelledby="testi-h">
      <div className="cg-wrap reveal">
        <div className="cg-testi__head">
          <div>
            <span className="cg-eyebrow">Client words</span>
            <h2 id="testi-h" className="cg-display"
              style={{ fontSize: "clamp(1.9rem,3.6vw,2.9rem)", marginTop: 12 }}>
              Cherished in their own words.
            </h2>
          </div>
          <div className="cg-testi__controls">
            <button
              className="cg-testi__arrow"
              onClick={() => scroll(-1)}
              disabled={!canScrollLeft}
              aria-label="Previous reviews">
              <Icon name="arrowRight" size={16} style={{ transform: "rotate(180deg)" }} />
            </button>
            <button
              className="cg-testi__arrow"
              onClick={() => scroll(1)}
              disabled={!canScrollRight}
              aria-label="Next reviews">
              <Icon name="arrowRight" size={16} />
            </button>
          </div>
        </div>

        <div className="cg-testi__rail" ref={railRef} role="region" aria-label="Customer Reviews">
          {TESTIMONIALS.map((t, i) => (
            <article className="cg-testi__card" key={t.who + i}>
              <div>
                <div className="cg-testi__stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <p className="cg-testi__card-quote">“{t.quote}”</p>
              </div>
              <div className="cg-testi__meta">
                <span className="cg-testi__card-who">{t.who}</span>
                <span className="cg-testi__card-piece">{t.piece}</span>
                <span className="cg-testi__verified">
                  <Sparkle style={{ fontSize: "0.75rem", color: "var(--gold)" }} /> Verified Patron
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Instagram */
function Instagram() {
  return (
    <section className="cg-section cg-wrap" aria-labelledby="ig-h">
      <div className="reveal" style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "end", gap: 24, flexWrap: "wrap", marginBottom: 28
      }}>
        <div>
          <span className="cg-eyebrow">@carats_by_grace</span>
          <h2 id="ig-h" className="cg-display"
            style={{ fontSize: "clamp(1.9rem,3.6vw,2.9rem)", marginTop: 12 }}>
            Seen, worn, shared.
          </h2>
        </div>
        <a className="cg-btn cg-btn--ghost" href="#">Follow @carats_by_grace</a>
      </div>
      <div className="cg-insta__grid">
        {INSTAGRAM_GALLERY.map((it, i) => (
          <a className="cg-insta__cell reveal" key={i} href="#"
            style={{ transitionDelay: `${i * 40}ms` }}>
            <img src={it.src} alt={it.alt} loading="lazy" decoding="async" />
          </a>
        ))}
      </div>
    </section>
  );
}

/* Visit */
function Visit() {
  const [form, setForm] = useState({ name: "", phone: "", date: "" });
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    setSent(true); // PLACEHOLDER: wire to backend
  };
  return (
    <section className="cg-section cg-wrap" aria-labelledby="visit-h">
      <div className="cg-visit__grid reveal">
        <div className="cg-visit__img">
          <img src={EDITORIAL_ASSETS.visitAtelier}
            alt="The Carats by Grace atelier — interior" loading="lazy" decoding="async" />
        </div>
        <div className="cg-visit__form">
          <span className="cg-eyebrow">Visit</span>
          <h2 id="visit-h" className="cg-display"
            style={{ fontSize: "clamp(1.7rem,3vw,2.4rem)", margin: "12px 0 8px" }}>
            Book a private appointment.
          </h2>
          <p style={{ color: "var(--muted)", fontSize: ".9rem", margin: "0 0 26px" }}>
            Experience private jewellery viewings at our boutique in Mahanagar, Lucknow or schedule a high-definition virtual consultation.
          </p>
          <form onSubmit={submit}>
            <div className="cg-field">
              <label htmlFor="v-name">Name</label>
              <input id="v-name" className="cg-input" type="text" required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="cg-field">
              <label htmlFor="v-phone">Phone</label>
              <input id="v-phone" className="cg-input" type="tel" required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="cg-field">
              <label htmlFor="v-date">Preferred date</label>
              <input id="v-date" className="cg-input" type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <button type="submit" className="cg-btn cg-btn--solid">
              {sent ? "Thank you — we'll be in touch" : "Request Appointment"}
            </button>
          </form>
          <a className="cg-wa" href="https://wa.me/919120530531?text=Hello%20Carats%20by%20Grace%2C%20I%20would%20like%20to%20book%20a%20private%20atelier%20consultation." target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
            <Icon name="whatsapp" size={18} /> Chat on WhatsApp
          </a>
          <div className="cg-visit__store" style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid var(--sand-light, #E9E1D8)" }}>
            <span style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold, #C5A059)", fontWeight: 600, marginBottom: 4 }}>
              Offline Store & Boutique
            </span>
            <p style={{ margin: "0 0 8px", fontSize: "0.95rem", color: "var(--charcoal, #17120F)", fontWeight: 500 }}>
              Carats By Grace, Mahanagar, Lucknow
            </p>
            <a
              href="https://share.google/FkH78O9JeWQrn62Ik"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.85rem",
                color: "var(--wine, #7B1E3A)",
                fontWeight: 600,
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              <Icon name="pin" size={15} /> Store Location (Google Maps) ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* FAQ */
function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="cg-faq cg-section" aria-labelledby="faq-h">
      <div className="cg-wrap reveal">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span className="cg-eyebrow">Questions</span>
          <h2 id="faq-h" className="cg-display"
            style={{ fontSize: "clamp(1.9rem,3.6vw,2.9rem)", marginTop: 12 }}>
            A few things, answered.
          </h2>
        </div>
        <div className="cg-faq__list">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div className={`cg-faq__item ${isOpen ? "is-open" : ""}`} key={f.q}>
                <button className="cg-faq__q" aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}>
                  {f.q}
                  <span className="cg-faq__icon" aria-hidden="true">+</span>
                </button>
                <div id={`faq-${i}`} className="cg-faq__a"
                  style={{ maxHeight: isOpen ? 300 : 0 }}>
                  <div className="cg-faq__a-inner">{f.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* Footer */
function Footer() {
  const cols = {
    Jewellery: [
      { label: "Rings", href: "/collections/rings" },
      { label: "Earrings", href: "/collections/earrings" },
      { label: "Necklaces", href: "/collections/necklaces" },
      { label: "Bracelets", href: "/collections/bracelets" },
      { label: "The Bridal Edit", href: "/collections/bridal" },
      { label: "High Jewellery", href: "/collections/high-jewellery" },
    ],
    About: [
      { label: "Our Story", href: "/about" },
      { label: "Craftsmanship", href: "/craftsmanship" },
      { label: "Private Atelier", href: "#visit" },
    ],
    Atelier: [
      { label: "Private Salon Viewing", href: "#visit" },
      { label: "Bespoke Commissions", href: "/bespoke" },
      { label: "Jewelry Care Guide", href: "/policies/care" },
      { label: "Privacy Policy", href: "/policies/privacy" },
      { label: "Terms of Service", href: "/policies/terms" },
    ],
    Concierge: [
      { label: "WhatsApp Concierge", href: "https://wa.me/919120530531" },
      { label: "hello@caratsbygrace.com", href: "mailto:hello@caratsbygrace.com" },
      { label: "+91 91205 30531", href: "tel:+919120530531" },
      { label: "Carats By Grace, Mahanagar, Lucknow", href: "https://share.google/FkH78O9JeWQrn62Ik" },
      { label: "Location: Google Maps ↗", href: "https://share.google/FkH78O9JeWQrn62Ik" },
    ],
  };
  return (
    <footer className="cg-footer" aria-label="Footer">
      <div className="cg-wrap">
        <div className="cg-footer__top">
          <div className="cg-footer__brand">
            <BrandLogo variant="light" height={52} />
            <p>Modern fine jewellery, handcrafted quietly with heirloom precision.</p>
            <div className="cg-footer__social">
              <a href="https://www.instagram.com/caratsbygrace/" target="_blank" rel="noreferrer" aria-label="Instagram"><Icon name="instagram" size={18} /></a>
              <a href="https://wa.me/919120530531" target="_blank" rel="noreferrer" aria-label="WhatsApp"><Icon name="whatsapp" size={18} /></a>
            </div>
          </div>
          <div className="cg-footer__links-grid">
            {Object.entries(cols).map(([title, items]) => (
              <div key={title} className="cg-footer__col">
                <h4>{title}</h4>
                <ul>
                  {items.map((i) => (
                    <li key={i.label}>
                      {i.href.startsWith("http") || i.href.startsWith("mailto") || i.href.startsWith("tel") ? (
                        <a href={i.href} target="_blank" rel="noreferrer">{i.label}</a>
                      ) : i.href.startsWith("#") ? (
                        <a href={i.href}>{i.label}</a>
                      ) : (
                        <Link to={i.href}>{i.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="cg-footer__bottom">
          <span>© {new Date().getFullYear()} Carats by Grace. All rights reserved.</span>
          <div className="cg-footer__credential" aria-label="Atelier Credentials">
            Private Salon Viewing by Appointment · IGI Certified Diamonds
          </div>
          <a className="cg-backtop" href="#top"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <Icon name="arrowUp" size={14} /> Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}


/* ===========================================================================
   PAGE
=========================================================================== */
export default function HomePage() {
  useDocumentTitle('Handcrafted Fine Jewellery');
  const [annVisible, setAnnVisible] = useState(true);
  const { totalItems, toggleCart, addItem } = useCart();
  const scrolled = useScrolled(80);

  useReveal();

  const handleAddToCart = useCallback((p) => {
    addItem({
      id: p.name.toLowerCase().replace(/\s+/g, '-'),
      name: p.name,
      price: p.price,
      spec: p.spec,
      image: p.img,
      img: p.img,
      qty: 1,
    });
  }, [addItem]);

  return (
    <>
      {/* Inject tokens + styles once */}
      <style>{BRAND_CSS}</style>

      {/* Top anchor */}
      <span id="top" />

      {/* Top Header Wrapper: Announcement on top, Header directly beneath it (scrolls up naturally with page) */}
      <div className="cg-header-wrapper">
        {annVisible && <Announcement onDismiss={() => setAnnVisible(false)} />}
        <Header cartCount={totalItems} onOpenCart={toggleCart} />
      </div>

      <main>
        <Hero scrolled={scrolled} />
        <Trust />
        <Categories />
        <CampaignSplit />
        <BestSellers />
        <Limited />
        <Story />
        <Craft />
        <Bridal />
        <Why />
        <Testimonials />
        <Instagram />
        <Visit />
        <FAQ />
      </main>

      <Footer />
    </>
  );
}