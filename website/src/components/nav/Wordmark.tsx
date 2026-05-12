import Image from 'next/image';

/**
 * Brand wordmark — renders the Sapient Digital logo PNG.
 *
 * The asset lives at `public/sapient-digital-logo.png`. Asset has notable
 * whitespace padding around the visible glyphs, so the container is fixed
 * by display height and width is auto.
 *
 * Width/height props are passed to next/image for layout-shift prevention.
 * The numbers correspond to the natural dimensions of the source PNG
 * (1096 × 344, aspect ratio ~3.19 : 1, RGBA with transparent background).
 */
interface WordmarkProps {
  /** Rendered height in CSS pixels. Width scales to preserve aspect. */
  height?: number;
  /** Pass `true` for the above-the-fold instance (nav) to bypass lazy load. */
  priority?: boolean;
  /** Optional padding adjustment if the asset's internal whitespace is excessive. */
  style?: React.CSSProperties;
}

export default function Wordmark({
  height = 40,
  priority = false,
  style,
}: WordmarkProps) {
  return (
    <Image
      src="/sapient-digital-logo.png"
      alt="Sapient Digital"
      width={1096}
      height={344}
      priority={priority}
      style={{
        height: `${height}px`,
        width: 'auto',
        display: 'block',
        ...style,
      }}
    />
  );
}
