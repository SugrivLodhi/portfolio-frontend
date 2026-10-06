import React from "react";
import styled from "styled-components";
import { FaMicrophone } from "react-icons/fa";
import { theme } from "@/theme";
import { breakpoints } from "@/constants";
import { useAIAssistant } from "@/components/ai/AIAssistantProvider";
import Reveal from "@/components/common/Reveal";

const Container = styled.section`
  padding: 100px 20px;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: white;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 80px 15px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.15rem;
  color: ${theme.textMuted};
  max-width: 560px;
  margin: 0 auto 3.5rem;
  line-height: 1.7;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 3.5rem;
`;

const Card = styled.div`
  background: ${theme.surface};
  border: 1px solid ${theme.border};
  border-radius: 16px;
  padding: 1.5rem;
  text-align: left;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.surfaceHover};
    border-color: rgba(129, 140, 248, 0.45);
    transform: translateY(-3px);
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.4rem;
    color: ${theme.accent2};
  }

  p {
    font-size: 0.9rem;
    color: ${theme.textMuted};
    line-height: 1.55;
  }
`;

const Pipeline = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 3rem;
  color: ${theme.textMuted};
  font-size: 0.85rem;

  span {
    color: ${theme.textColor};
    font-weight: 500;
  }
`;

const Arrow = styled.span`
  color: ${theme.accent};
  font-weight: 700;
`;

const TalkButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem 2.2rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: ${theme.accentGradient};
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 14px 36px rgba(99, 102, 241, 0.45);
  }
`;

const CAPABILITIES = [
  {
    title: "Voice-first assistants",
    desc: "Natural, real-time voice interfaces built for browsers.",
  },
  {
    title: "Conversational UX",
    desc: "AI helpers that answer from your product’s real data.",
  },
  {
    title: "Intelligent search",
    desc: "Semantic search, recommendations and smart filtering.",
  },
  {
    title: "LLM integration",
    desc: "OpenAI APIs wired cleanly into frontend and backend apps.",
  },
];

const AIEngineeringSection = () => {
  const { open } = useAIAssistant();

  return (
    <Container id="ai-engineering">
      <ContentWrapper>
        <Reveal>
          <Title>AI Engineering</Title>
          <Subtitle>
            I build practical AI into real products — not demos. Clean
            architecture, your own data, and interfaces people actually want to
            use.
          </Subtitle>
        </Reveal>

        <Reveal delay="0.1s">
          <Grid>
            {CAPABILITIES.map((c) => (
              <Card key={c.title}>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </Card>
            ))}
          </Grid>
        </Reveal>

        <Reveal delay="0.2s">
          <Pipeline>
            <span>Voice / Chat</span> <Arrow>→</Arrow>
            <span>AI Model</span> <Arrow>→</Arrow>
            <span>Knowledge</span> <Arrow>→</Arrow>
            <span>Product</span>
          </Pipeline>
        </Reveal>

        <Reveal delay="0.25s">
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              marginBottom: "1rem",
            }}
          >
            Meet My AI Assistant
          </h3>
          <p
            style={{
              color: theme.textMuted,
              maxWidth: 460,
              margin: "0 auto 1.75rem",
              lineHeight: 1.7,
            }}
          >
            Ask it anything about my work, skills or projects.
          </p>
          <TalkButton onClick={open}>
            <FaMicrophone /> Talk to My AI
          </TalkButton>
        </Reveal>
      </ContentWrapper>
    </Container>
  );
};

export default AIEngineeringSection;
