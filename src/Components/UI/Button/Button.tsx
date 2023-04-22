import React from 'react';

import './Button.scss';

interface IButton {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
  style?: React.CSSProperties | undefined;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, IButton>(
  ({ children, onClick, style, className = 'button' }, ref) => {
    return (
      <button
        style={style}
        className={className}
        ref={ref}
        onClick={(e) => onClick && onClick(e)}
      >
        {children}
      </button>
    );
  }
);

export default Button;
