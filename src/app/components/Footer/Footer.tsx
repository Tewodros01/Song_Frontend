import React from "react";
import { styled } from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 60vh;
`;

const ContentContainer = styled.div`
  flex: 1;
`;

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 2rem 0;
  text-align: center;
`;

const FooterText = styled.p`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: underline;
  margin-left: 0.5rem;
`;

const Footer: React.FC = () => {
  return (
    <PageContainer>
      <ContentContainer></ContentContainer>
      <FooterContainer>
        <FooterText>&copy; 2024 Song App | All Rights Reserved</FooterText>
        <FooterText>
          Built with love by
          <FooterLink href="https://song-frontend.vercel.app">
            Song App
          </FooterLink>
        </FooterText>
      </FooterContainer>
    </PageContainer>
  );
};

export default Footer;
