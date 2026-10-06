import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s ease, transform 0.7s ease;
  transition-delay: ${(p) => p.$delay || "0s"};
  will-change: opacity, transform;

  &.is-visible {
    opacity: 1;
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    transition: none;
  }
`;

/**
 * Scroll-triggered reveal wrapper. Children fade/slide in when the
 * element enters the viewport.
 */
export default function Reveal({ children, delay, className, style }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Wrapper
      ref={ref}
      $delay={delay}
      className={`${className || ""} ${visible ? "is-visible" : ""}`}
      style={style}
    >
      {children}
    </Wrapper>
  );
}
