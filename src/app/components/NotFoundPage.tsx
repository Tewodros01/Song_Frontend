import React from "react";
import styled from "styled-components";

const NotFoundPage: React.FC = () => {
  return (
    <Container>
      <Content>
        <Title>404 - Page Not Found</Title>
        <Description>
          Sorry, the page you are looking for does not exist.
        </Description>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Content = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.2rem;
`;

export default NotFoundPage;
