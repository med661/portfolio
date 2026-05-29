import { useEffect, useState } from 'react';

export const CursorSpotlight = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed pointer-events-none z-0"
      style={{
        left: pos.x - 300,
        top: pos.y - 300,
        width: 600,
        height: 600,
        background:
          'radial-gradient(circle, rgba(6,182,212,0.07) 0%, rgba(59,130,246,0.04) 40%, transparent 70%)',
        borderRadius: '50%',
      }}
    />
  );
};
