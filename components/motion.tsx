'use client';

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

export { motion };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } }
};

export const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09
    }
  }
};
