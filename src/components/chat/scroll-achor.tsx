import * as React from 'react';
import { useInView } from 'react-intersection-observer';

export function ScrollAnchor() {
  const isAtBottom = useAtBottom();
  const { ref, entry, inView } = useInView({
    delay: 100,
    rootMargin: '0px 0px -50px 0px',
  });

  React.useEffect(() => {
    if (isAtBottom && !inView) {
      entry?.target.scrollIntoView({
        block: 'start',
      });
    }
  }, [inView, entry, isAtBottom]);

  React.useEffect(() => {
    setTimeout(() => entry?.target.scrollIntoView({
      block: 'start',
    }), 50);
  }, []);

  return <div ref={ref} className="h-px w-full" />;
}

function useAtBottom(offset = 0) {
    const [isAtBottom, setIsAtBottom] = React.useState(false);
  
    React.useEffect(() => {
      const handleScroll = () => {
        setIsAtBottom(
          window.innerHeight + window.scrollY >=
            document.body.offsetHeight - offset,
        );
      };
  
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [offset]);
  
    return isAtBottom;
  }