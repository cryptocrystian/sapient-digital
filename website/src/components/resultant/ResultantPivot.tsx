export default function ResultantPivot() {
  return (
    <section className="rs-pivot rs-theme-light" aria-label="The organizing thesis">
      <div className="rs-pivot__ruler rs-pivot__ruler--top" aria-hidden="true">
        <svg viewBox="0 0 1200 24" preserveAspectRatio="xMidYMin slice">
          <line className="ruler-line" x1="0" y1="20" x2="1200" y2="20" />
          <line className="ruler-tick-major" x1="0" y1="20" x2="0" y2="8" />
          <line className="ruler-tick-minor" x1="150" y1="20" x2="150" y2="14" />
          <line className="ruler-tick-minor" x1="300" y1="20" x2="300" y2="14" />
          <line className="ruler-tick-major" x1="450" y1="20" x2="450" y2="10" />
          <line className="ruler-tick-minor" x1="600" y1="20" x2="600" y2="14" />
          <line className="ruler-tick-major" x1="750" y1="20" x2="750" y2="10" />
          <line className="ruler-tick-minor" x1="900" y1="20" x2="900" y2="14" />
          <line className="ruler-tick-minor" x1="1050" y1="20" x2="1050" y2="14" />
          <line className="ruler-tick-major" x1="1200" y1="20" x2="1200" y2="8" />
          <text className="ruler-code" x="0" y="6" textAnchor="start">T₀</text>
          <text className="ruler-code ruler-code-signal" x="1200" y="6" textAnchor="end">R ↗</text>
        </svg>
      </div>

      <div className="rs-pivot__flanks">
        <svg className="rs-three-stream" viewBox="0 0 36 180" aria-hidden="true">
          <line className="stream-line" x1="2" y1="40" x2="34" y2="90" />
          <line className="stream-line" x1="2" y1="90" x2="34" y2="90" />
          <line className="stream-line" x1="2" y1="140" x2="34" y2="90" />
          <circle className="stream-dot" cx="34" cy="90" r="2" />
        </svg>

        <div className="rs-pivot__inner">
          <div className="rs-pivot__mark-above" aria-hidden="true">
            <svg className="rs-rf-mark" viewBox="0 0 96 44">
              <line className="rf-stream" x1="2" y1="10" x2="40" y2="22" />
              <line className="rf-stream" x1="2" y1="22" x2="40" y2="22" />
              <line className="rf-stream" x1="2" y1="34" x2="40" y2="22" />
              <circle className="rf-ring" cx="50" cy="22" r="10" />
              <circle className="rf-dot" cx="50" cy="22" r="2.8" />
              <line className="rf-beam" x1="60" y1="22" x2="94" y2="22" />
            </svg>
          </div>
          <h2 className="rs-pivot__h2">
            <span className="line1">Fragmentation creates drag.</span>
            <span className="line2">
              Alignment creates <span className="em">force</span>.
            </span>
          </h2>
        </div>

        <svg
          className="rs-three-stream"
          viewBox="0 0 36 180"
          aria-hidden="true"
          style={{ transform: 'scaleX(-1)' }}
        >
          <line className="stream-line" x1="2" y1="40" x2="34" y2="90" />
          <line className="stream-line" x1="2" y1="90" x2="34" y2="90" />
          <line className="stream-line" x1="2" y1="140" x2="34" y2="90" />
          <circle className="stream-dot" cx="34" cy="90" r="2" />
        </svg>
      </div>

      <div className="rs-pivot__ruler rs-pivot__ruler--bottom" aria-hidden="true">
        <svg viewBox="0 0 1200 24" preserveAspectRatio="xMidYMin slice">
          <line className="ruler-line" x1="0" y1="4" x2="1200" y2="4" />
          <line className="ruler-tick-major" x1="0" y1="4" x2="0" y2="16" />
          <line className="ruler-tick-minor" x1="150" y1="4" x2="150" y2="10" />
          <line className="ruler-tick-minor" x1="300" y1="4" x2="300" y2="10" />
          <line className="ruler-tick-major" x1="450" y1="4" x2="450" y2="14" />
          <line className="ruler-tick-minor" x1="600" y1="4" x2="600" y2="10" />
          <line className="ruler-tick-major" x1="750" y1="4" x2="750" y2="14" />
          <line className="ruler-tick-minor" x1="900" y1="4" x2="900" y2="10" />
          <line className="ruler-tick-minor" x1="1050" y1="4" x2="1050" y2="10" />
          <line className="ruler-tick-major" x1="1200" y1="4" x2="1200" y2="16" />
        </svg>
      </div>
    </section>
  );
}
