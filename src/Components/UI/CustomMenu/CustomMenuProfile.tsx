// Global
import React from 'react';

// Styles
import CustomMenuProfileStyles from './CustomMenuProfile.module.scss';

import { ReactSVG } from 'react-svg';
import Button from '../Button/Button';

// Icon
import ProfileIcon from '../../../assets/headerIcons/profileIcon.svg';

type CustomMenu = {
  children: React.ReactNode;
};

const CustomMenuProfile: React.FC<CustomMenu> = ({ children }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const menuRef = React.useRef<any>(null);
  const signOutButtonRef = React.useRef<any>();

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const validate =
        open &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !signOutButtonRef.current.contains(event.target);

      if (validate) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [open, menuRef]);

  return (
    <div className={CustomMenuProfileStyles.customMenu}>
      <Button
        className={CustomMenuProfileStyles.button}
        onClick={() => setOpen((prevOpen) => !prevOpen && true)}
        ref={signOutButtonRef}
      >
        <ReactSVG
          src={ProfileIcon}
          className={CustomMenuProfileStyles.profileIcon}
        />
      </Button>
      {open && (
        <div
          className={CustomMenuProfileStyles.menu}
          tabIndex={0}
          ref={menuRef}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default CustomMenuProfile;
