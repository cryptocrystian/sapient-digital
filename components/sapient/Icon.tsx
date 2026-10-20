// Minimal line-icon set — 17 glyphs at 1.5–1.8px strokes.
// Agency-themed. Zero dependencies. Pattern inherited from Saipien Labs.

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
});

export const ArrowIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.6} {...p}>
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

export const CheckIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.8} {...p}>
    <path d="M3 8.5l3.2 3L13 4.5" />
  </svg>
);

export const SparkIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.5} {...p}>
    <path d="M8 1.5v3M8 11.5v3M1.5 8h3M11.5 8h3M3.5 3.5l2 2M10.5 10.5l2 2M3.5 12.5l2-2M10.5 5.5l2-2" />
  </svg>
);

export const PenIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.5} {...p}>
    <path d="M1.8 14.2L5 11l-1-1-3.2 3.2v1zM5 11l5.5-5.5 1 1L6 12l-1-1zM10.5 5.5l1.6-1.6a1 1 0 0 1 1.4 0l.6.6a1 1 0 0 1 0 1.4L12.5 7.5l-2-2z" />
  </svg>
);

export const QuoteIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.4} {...p}>
    <path d="M3 5.5c0-1.4 1-2.5 2.5-2.5v2c-.5 0-1 .5-1 1v.5h1v3H3v-4zM9 5.5C9 4.1 10 3 11.5 3v2c-.5 0-1 .5-1 1v.5h1v3H9v-4z" />
  </svg>
);

export const MegaphoneIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.5} {...p}>
    <path d="M2 7v2a1 1 0 0 0 1 1h2l5 3V3L5 6H3a1 1 0 0 0-1 1zM12 5a4 4 0 0 1 0 6M13.5 3a7 7 0 0 1 0 10" />
  </svg>
);

export const ChartIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.5} {...p}>
    <path d="M2 2v12h12" />
    <path d="M4 11l3-3 2 2 5-6" />
  </svg>
);

export const TrendIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.5} {...p}>
    <path d="M2 12l4-4 3 3 5-6" />
    <path d="M10 5h4v4" />
  </svg>
);

export const FlowIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.5} {...p}>
    <rect x="1.5" y="2.5" width="4" height="3" rx="1" />
    <rect x="10.5" y="2.5" width="4" height="3" rx="1" />
    <rect x="6" y="10.5" width="4" height="3" rx="1" />
    <path d="M3.5 5.5v2a1 1 0 0 0 1 1H8M12.5 5.5v2a1 1 0 0 1-1 1H8M8 8.5v2" />
  </svg>
);

export const UserIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.5} {...p}>
    <circle cx="8" cy="5" r="2.5" />
    <path d="M2.5 14c.5-3 2.7-4.5 5.5-4.5S13 11 13.5 14" />
  </svg>
);

export const MailIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.5} {...p}>
    <rect x="1.5" y="3" width="13" height="10" rx="1.5" />
    <path d="M1.5 4.5l6.5 4 6.5-4" />
  </svg>
);

export const DocIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.5} {...p}>
    <path d="M3.5 1.5h6L13 5v9.5H3.5z" />
    <path d="M9.5 1.5V5H13M5.5 8h5M5.5 11h5" />
  </svg>
);

export const GridIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.5} {...p}>
    <rect x="2" y="2" width="5" height="5" rx="1" />
    <rect x="9" y="2" width="5" height="5" rx="1" />
    <rect x="2" y="9" width="5" height="5" rx="1" />
    <rect x="9" y="9" width="5" height="5" rx="1" />
  </svg>
);

export const LoopIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.5} {...p}>
    <path d="M2 8a6 6 0 0 1 10.5-4M14 8a6 6 0 0 1-10.5 4" />
    <path d="M12.5 1.5v3h-3M3.5 14.5v-3h3" />
  </svg>
);

export const SearchIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.5} {...p}>
    <circle cx="7" cy="7" r="4.5" />
    <path d="M10.5 10.5L14 14" />
  </svg>
);

export const BotIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.5} {...p}>
    <rect x="3" y="5" width="10" height="8" rx="2" />
    <path d="M8 2.5v2.5M5.5 9h.01M10.5 9h.01M6 12h4" />
  </svg>
);

export const PlayIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.5} {...p}>
    <path d="M4 2.5v11l9-5.5-9-5.5z" />
  </svg>
);
