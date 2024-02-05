import React from "react";
import styled from "styled-components";

type Data = {
  label: string;
  body: string;
};

const data: Data[] = [
  {
    label: "Top Hits",
    body: "Discover the latest chart-topping hits and timeless classics. Dive into a world of music where every beat resonates with your soul.",
  },
  {
    label: "Music Genres",

    body: "Explore a diverse range of music genres, from jazz to hip-hop, classical to rock. Find your rhythm and immerse yourself in the melodies of each genre.",
  },
  {
    label: "Music Events",

    body: "Stay updated on upcoming music events and concerts happening near you. Experience the thrill of live performances and connect with fellow music enthusiasts.",
  },
];

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

export default Features;
