"use client";

import { Fragment } from "react";
import { motion } from "motion/react";

type WordRevealProps = {
  text: string;
  /** Seconds to wait before the first word. */
  delay?: number;
  /** How many of the last words get the cyan gradient, e.g. 2 for "actually use.". */
  accentWordCount?: number;
};

const wordStagger = 0.06;
const wordDuration = 0.7;
const easeOutSoft: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Headline text whose words rise one by one out of an invisible line, the first time it's seen. */
export function WordReveal({ text, delay = 0, accentWordCount = 0 }: WordRevealProps) {
  const words = text.split(" ");
  const firstAccentIndex = words.length - accentWordCount;

  return (
    <>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          {/* The clip hides each word until it rises into place; pb keeps descenders (g, y) whole. */}
          <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className={`inline-block ${index >= firstAccentIndex ? "text-gradient" : ""}`}
              initial={{ y: "105%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: wordDuration, delay: delay + index * wordStagger, ease: easeOutSoft }}
            >
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 && " "}
        </Fragment>
      ))}
    </>
  );
}
