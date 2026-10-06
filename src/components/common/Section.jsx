import styled from "styled-components";
import { theme } from "@/theme";
import { breakpoints } from "@/constants";

/** Shared section primitives for a consistent dark design system. */

export const Section = styled.section`
  padding: 110px 20px;
  background: ${(p) => (p.$alt ? theme.bgAlt : theme.bg)};
  position: relative;
  overflow: hidden;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 80px 15px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 64px 12px;
  }
`;

export const SectionInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  text-align: center;
`;

export const SectionTitle = styled.h2`
  font-family: var(--font-heading), inherit;
  font-size: 2.6rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
  color: ${theme.textColor};
  text-align: center;
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    bottom: -14px;
    left: 50%;
    transform: translateX(-50%);
    width: 72px;
    height: 3px;
    background: ${theme.glowGradient};
    border-radius: 2px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 2.1rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.8rem;
  }
`;

export const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${theme.textMuted};
  text-align: center;
  max-width: 620px;
  margin: 1.75rem auto 3.5rem;
  line-height: 1.7;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1rem;
    margin-bottom: 2.5rem;
  }
`;

export const GlassCard = styled.div`
  background: ${theme.surface};
  border: 1px solid ${theme.border};
  border-radius: 16px;
  backdrop-filter: blur(8px);
  transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(129, 140, 248, 0.45);
    background: ${theme.surfaceHover};
  }
`;

export const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.85rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: ${theme.accent2};
  background: rgba(34, 211, 238, 0.08);
  border: 1px solid rgba(34, 211, 238, 0.2);
  border-radius: 999px;
`;
