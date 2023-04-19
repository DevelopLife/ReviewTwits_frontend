import { RefObject, useEffect } from 'react';

interface useIntersectionObserverProps {
  containerTarget: RefObject<Element>;
  onIntersect: () => void;
}

const useIntersectionObserver = ({
  containerTarget,
  onIntersect,
}: useIntersectionObserverProps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleIntersect = (target: IntersectionObserverEntry[]) => {
    if (!target[0].isIntersecting) return;

    onIntersect();
  };

  useEffect(() => {
    if (!containerTarget.current) return;

    const lastNode = containerTarget.current.lastElementChild;
    if (!lastNode) return;

    const options = {
      rootMargin: '25%',
      threshold: 0.7,
    };

    const intersectionObserver = new IntersectionObserver(
      handleIntersect,
      options
    );
    intersectionObserver.observe(lastNode);
    return () => {
      intersectionObserver.disconnect();
    };
  }, [containerTarget, handleIntersect]);
};

export default useIntersectionObserver;
