import React from 'react';

import './Button.scss';

interface IButton {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  title: string;
  style?: React.CSSProperties | undefined;
  className?: string;
}

const defaultStyleButton = {
  padding: '7px 35px',
  fontFamily: 'Roboto',
  textTranform: 'upperCase',
  fontWeight: 500,
  cursor: 'pointer',
  border: 'none',
  color: '#fff',
  fontSize: '16px',
  transition: '0.5s',
  background: '#1C1C1C',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '6px',
};

export default function Button({
  title,
  onClick,
  style = { ...defaultStyleButton },
  className = 'button',
}: IButton) {
  return (
    <button
      style={style}
      className={className}
      onClick={(e) => onClick && onClick(e)}
    >
      {title}
    </button>
  );
}
