import * as React from "react";

function Facebook(props) {
  return (
    <svg height={512} viewBox="0 0 24 24" width={512} {...props}>
      <path
        d="M21 0H3C1.345 0 0 1.345 0 3v18c0 1.654 1.345 3 3 3h18c1.654 0 3-1.346 3-3V3c0-1.655-1.346-3-3-3z"
        fill="#3b5999"
      />
      <path
        d="M16.5 12V9c0-.828.672-.75 1.5-.75h1.5V4.5h-3A4.5 4.5 0 0012 9v3H9v3.75h3V24h4.5v-8.25h2.25l1.5-3.75z"
        fill="#fff"
      />
    </svg>
  );
}

export default Facebook;
