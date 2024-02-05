import React from "react";
import styled, { keyframes } from "styled-components";

const progress = keyframes`
  0% { width: 0%; }
  100% { width: 100%; }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 12px;
  background-color: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: 0%;
  background-color: #007bff;
  animation: ${progress} 2s linear infinite;
`;

const Loading: React.FC = () => (
  <Container>
    <ProgressBar>
      <ProgressFill />
    </ProgressBar>
  </Container>
);

export default Loading;
