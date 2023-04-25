import React from 'react';

import ButtonClassNames from './Button.module.scss';

interface IButton {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
  style?: React.CSSProperties | undefined;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, IButton>(
  ({ children, onClick, style, className = '' }, ref) => {
    return (
      <button
        style={style}
        className={className ? className : ButtonClassNames.button}
        ref={ref}
        onClick={(e) => onClick && onClick(e)}
      >
        {children}
      </button>
    );
  }
);

export default Button;
