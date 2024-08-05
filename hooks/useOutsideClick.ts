import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type UseOutsideClickType = (
  el: React.RefObject<HTMLDivElement>, 
  initialState: boolean
) => [boolean, Dispatch<SetStateAction<boolean>>];

export const useOutsideClick: UseOutsideClickType = (el, initialState) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (el.current && typeof el.current.contains === 'function') {
        if (!el.current.contains(e.target as Node)) {
          setIsActive(false);
        }
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isActive, el]);

  return [isActive, setIsActive];
};
