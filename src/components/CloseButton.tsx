import React from 'react';

type CloseButtonProps = {
    onClick: () => void
}

function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <button
      aria-label="Close"
      type="button"
      onClick={onClick}
      className="float-right p-2 focus:outline-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}

export default CloseButton;