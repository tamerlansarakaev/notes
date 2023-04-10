import React from 'react';

import './Button.scss';

interface IButton {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
  style?: React.CSSProperties | undefined;
  className?: string;
}

export default function Button({
  children,
  onClick,
  style,
  className = 'button',
}: IButton) {
  return (
    <button
      style={style}
      className={className}
      onClick={(e) => onClick && onClick(e)}
    >
      {children}
    </button>
  );
}
