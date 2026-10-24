import React, { useEffect, useState } from 'react';
export function ScrollTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y > 360 && y < last - 4);
      last = y;
    };
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <button id="scroll-top" className={`scroll-top ${visible ? 'visible' : ''}`} aria-label="Sahifa boshiga qaytish" aria-hidden={!visible} tabIndex={visible ? 0 : -1} onClick={() => window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })}>↑</button>;
}
