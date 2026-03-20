export const MOTION_EASE = {
  primary: [0.22, 1, 0.36, 1] as const,
  emphasis: [0.16, 1, 0.3, 1] as const,
};

export const MOTION_DURATION = {
  micro: 0.16,
  ui: 0.28,
  reveal: 0.72,
  hero: 0.86,
};

export const MOTION_STAGGER = {
  tight: 0.06,
  medium: 0.1,
  relaxed: 0.14,
};

export const MOTION_TRANSITIONS = {
  micro: {
    duration: MOTION_DURATION.micro,
    ease: MOTION_EASE.primary,
  },
  ui: {
    duration: MOTION_DURATION.ui,
    ease: MOTION_EASE.primary,
  },
  emphasis: {
    duration: MOTION_DURATION.ui,
    ease: MOTION_EASE.emphasis,
  },
  reveal: {
    duration: MOTION_DURATION.reveal,
    ease: MOTION_EASE.primary,
  },
};

export const CSS_EASE = {
  primary: "cubic-bezier(0.22, 1, 0.36, 1)",
  emphasis: "cubic-bezier(0.16, 1, 0.3, 1)",
};
