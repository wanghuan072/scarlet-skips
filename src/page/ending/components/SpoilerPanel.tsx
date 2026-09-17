"use client";

import { useState } from "react";
import { Icon } from "@/components/common/Icon";
import styles from "@/style/page/content/content.module.css";

export function SpoilerPanel() {
  const [open, setOpen] = useState(false);

  return (
    <section className={styles.spoilerPanel} data-open={open}>
      <div>
        <span className={styles.spoilerIcon}><Icon name={open ? "info" : "shield"} size={24}/></span>
        <div>
          <p className={styles.kicker}>OPTIONAL SPOILERS</p>
          <h2>{open ? "What the footage shows" : "Keep the final sequence hidden"}</h2>
          <p>{open ? "A long-form playthrough and an independent ending breakdown corroborate the visible final sequence. The route and exact threshold are still community-documented rather than official." : "The route above is enough to build toward the ending. Reveal this only if you want the final location and credits scene described."}</p>
        </div>
      </div>
      {open && (
        <div className={styles.spoilerReveal}>
          <p>The player guide describes <strong>Super Rocket Shoes</strong> as the endgame signal. In the recorded completion, Scarlet continues climbing beyond the park, reaches space with Earth below, and eventually arrives at the Moon.</p>
          <p>Scarlet settles on the Moon and the credits begin. That visual outcome is corroborated; any claim about its emotional meaning is interpretation, and no official numeric height requirement or exact formula has been published.</p>
          <div className={styles.spoilerVideo}>
            <iframe
              src="https://www.youtube-nocookie.com/embed/FIMs9bPh8Lg"
              title="Scarlet Skips ending gameplay footage on YouTube"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <p>Video playback is provided by YouTube after you reveal this panel. If the player does not load, <a href="https://www.youtube.com/watch?v=FIMs9bPh8Lg" target="_blank" rel="noopener noreferrer">open the ending footage on YouTube</a>.</p>
        </div>
      )}
      <button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {open ? "Hide ending details" : "Reveal the Moon ending"}
        <Icon name={open ? "minus" : "plus"} size={18}/>
      </button>
    </section>
  );
}
