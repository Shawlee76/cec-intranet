import { useState, useEffect } from 'react';

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState('lg');

  useEffect(() => {
    const updateBreakpoint = () => {
      if (window.innerWidth < 576) setBreakpoint('xs');
      else if (window.innerWidth < 768) setBreakpoint('sm');
      else if (window.innerWidth < 992) setBreakpoint('md');
      else if (window.innerWidth < 1200) setBreakpoint('lg');
      else setBreakpoint('xl');
    };

    window.addEventListener('resize', updateBreakpoint);
    updateBreakpoint(); // Set initial breakpoint on mount

    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
};

export default useBreakpoint;
