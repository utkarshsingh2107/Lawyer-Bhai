export const VerifiedStamp = ({ className = '' }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`stamp ${className}`}
    style={{ transform: 'rotate(1deg)' }}
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
      strokeDasharray="2 2"
      fill="none"
      opacity="0.3"
    />
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M8 12L11 15L16 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <text
      x="12"
      y="20"
      fontSize="4"
      fill="currentColor"
      textAnchor="middle"
      fontFamily="monospace"
    >
      VERIFIED
    </text>
  </svg>
);

export const LicensedStamp = ({ className = '' }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`stamp ${className}`}
    style={{ transform: 'rotate(-1deg)' }}
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="2"
      strokeDasharray="1 1"
      fill="none"
      opacity="0.3"
    />
    <rect
      x="4"
      y="4"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M12 7L13.5 10.5L17 11L14.5 13.5L15 17L12 15L9 17L9.5 13.5L7 11L10.5 10.5L12 7Z"
      fill="currentColor"
      opacity="0.8"
    />
    <text
      x="12"
      y="22"
      fontSize="3.5"
      fill="currentColor"
      textAnchor="middle"
      fontFamily="monospace"
    >
      LICENSED
    </text>
  </svg>
);

export const ConfidentialStamp = ({ className = '' }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`stamp ${className}`}
    style={{ transform: 'rotate(1.5deg)' }}
  >
    <path
      d="M12 2L4 6V11C4 16 7 20 12 22C17 20 20 16 20 11V6L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeDasharray="3 2"
      fill="none"
      opacity="0.3"
    />
    <path
      d="M12 3L5 6.5V11C5 15.5 7.5 19 12 21C16.5 19 19 15.5 19 11V6.5L12 3Z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M9 12L11 14L15 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <text
      x="12"
      y="26"
      fontSize="3"
      fill="currentColor"
      textAnchor="middle"
      fontFamily="monospace"
      letterSpacing="0.5"
    >
      CONFIDENTIAL
    </text>
  </svg>
);
