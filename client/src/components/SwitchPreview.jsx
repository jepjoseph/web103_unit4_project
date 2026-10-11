import { useId } from "react";

const FINISH_STYLES = {
  Black: {
    faceplate: "#25272b",
    button: "#586674",
    border: "#94a3b8",
    highlight: "#d1d9e3",
  },

  White: {
    faceplate: "#e5e7eb",
    button: "#aebdcd",
    border: "#64748b",
    highlight: "#ffffff",
  },

  Silver: {
    faceplate: "#aab2bd",
    button: "#596e84",
    border: "#45576b",
    highlight: "#f1f5f9",
  },

  Blue: {
    faceplate: "#305b91",
    button: "#17375f",
    border: "#8ad8ff",
    highlight: "#c5eaff",
  },

  Amber: {
    faceplate: "#ba7840",
    button: "#71421f",
    border: "#f7c98e",
    highlight: "#ffe5c2",
  },

  "Clear Glass": {
    faceplate: "#c6e2e8",
    button: "#54788b",
    border: "#537d91",
    highlight: "#ffffff",
  },

  Gold: {
    faceplate: "#c7a252",
    button: "#73551f",
    border: "#f5df9c",
    highlight: "#fff1bf",
  },

  "Dark Gray": {
    faceplate: "#555c64",
    button: "#9cabbc",
    border: "#d0dce8",
    highlight: "#eef4fa",
  },
};

function SwitchPreview({ finish = "Black", channels = 2 }) {
  const id = useId();

  const faceplateGradientId = `${id}-faceplate-shine`;
  const buttonGradientId = `${id}-button-shine`;

  const style = FINISH_STYLES[finish] ?? FINISH_STYLES.Black;

  const count = Number(channels);

  const columns = count === 1 ? 1 : 2;
  const rows = Math.ceil(count / columns);

  const buttonWidth = columns === 1 ? 70 : 48;
  const buttonHeight = Math.min(56, 150 / rows - 8);

  const gapX = 7;
  const gapY = 7;

  const totalWidth = columns * buttonWidth + (columns - 1) * gapX;

  const totalHeight = rows * buttonHeight + (rows - 1) * gapY;

  const startX = (200 - totalWidth) / 2;
  const startY = (260 - totalHeight) / 2;

  return (
    <div className="switch-preview">
      <svg
        viewBox="0 0 200 260"
        role="img"
        aria-label={`${finish} smart wall switch with ${count} channels`}
        style={{
          width: "100%",
          maxWidth: "240px",
          height: "auto",
        }}
      >
        <defs>
          {/* Soft highlight on the faceplate */}
          <linearGradient id={faceplateGradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
          </linearGradient>

          {/* Subtle button depth */}
          <linearGradient id={buttonGradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
          </linearGradient>
        </defs>

        {/* Main faceplate */}
        <rect
          x="15"
          y="10"
          width="170"
          height="240"
          rx="22"
          fill={style.faceplate}
          stroke={style.border}
          strokeWidth="2.5"
        />

        {/* Faceplate reflection */}
        <rect
          x="15"
          y="10"
          width="170"
          height="240"
          rx="22"
          fill={`url(#${faceplateGradientId})`}
        />

        {/* Inner decorative border */}
        <rect
          x="24"
          y="19"
          width="152"
          height="222"
          rx="16"
          fill="none"
          stroke={style.highlight}
          strokeOpacity="0.55"
          strokeWidth="1.2"
        />

        {/* Switch buttons */}
        {Array.from({ length: count }, (_, index) => {
          const column = index % columns;
          const row = Math.floor(index / columns);

          const x = startX + column * (buttonWidth + gapX);
          const y = startY + row * (buttonHeight + gapY);

          return (
            <g key={index}>
              {/* Button shadow */}
              <rect
                x={x + 1.5}
                y={y + 2.5}
                width={buttonWidth}
                height={buttonHeight}
                rx="7"
                fill="#000000"
                fillOpacity="0.25"
              />

              {/* Solid contrasting button */}
              <rect
                x={x}
                y={y}
                width={buttonWidth}
                height={buttonHeight}
                rx="7"
                fill={style.button}
                stroke={style.border}
                strokeWidth="1.5"
              />

              {/* Button highlight */}
              <rect
                x={x}
                y={y}
                width={buttonWidth}
                height={buttonHeight}
                rx="7"
                fill={`url(#${buttonGradientId})`}
              />

              {/* Small top reflection */}
              <line
                x1={x + 7}
                y1={y + 5}
                x2={x + buttonWidth - 7}
                y2={y + 5}
                stroke={style.highlight}
                strokeOpacity="0.75"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </g>
          );
        })}

        {/* Power/status LED */}
        <circle cx="100" cy="229" r="6" fill="#48d6ac" fillOpacity="0.18" />

        <circle cx="100" cy="229" r="3" fill="#48d6ac" />
      </svg>

      <p>
        {finish} Finish · {count} {count === 1 ? "Channel" : "Channels"}
      </p>
    </div>
  );
}

export default SwitchPreview;
