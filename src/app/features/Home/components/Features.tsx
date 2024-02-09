import React from "react";
import styled from "styled-components";
import { data } from "../../../../types/homeData";

const Features: React.FC = () => {
  return (
    <FeatureSection>
      <section>
        <Container>
          <Content>
            <Title>Music for Every Mood</Title>
            <Description>
              Essential Music Collections: A handpicked selection of timeless
              classics, chart-topping hits, and hidden gems, curated for the
              ultimate music aficionado's listening pleasure.
            </Description>
          </Content>
        </Container>
      </section>
      <section>
        <DataWrapper>
          {data.map((icon, index) => (
            <DataContainer key={index}>
              <DataTitle>{icon.label}</DataTitle>
              <DataText>{icon.body}</DataText>
            </DataContainer>
          ))}
        </DataWrapper>
      </section>
    </FeatureSection>
  );
};

export const FeatureSection = styled.section`
  padding-top: 20px;
  background-color: #fff;
  margin-bottom: 2rem;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 10vh;
  padding: 2rem 0;
  background-color: #fff;
`;

const Content = styled.div`
  text-align: center;
  max-width: 800px;
  margin: auto;
  color: #333;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.5;
`;

const DataWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const DataContainer = styled.div`
  flex: 1 1 100%;
  max-width: 300px;
  margin: 1rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const DataTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
`;

const DataText = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
`;

export default Features;
