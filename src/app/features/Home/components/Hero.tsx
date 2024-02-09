import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import musicBackground from "../../../../assets/image/bg.jpg";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import {
  selectStatistics,
  selectLoadingState,
  selectErrorState,
  getStatisticsStart,
} from "../slice/statisticsSlice";

const Hero: React.FC = () => {
  const dispatch = useAppDispatch();
  const statistics = useAppSelector(selectStatistics);
  const isLoading = useAppSelector(selectLoadingState);
  const isError = useAppSelector(selectErrorState);

  useEffect(() => {
    dispatch(getStatisticsStart());
  }, [dispatch]);

  let statisticsContent;
  if (isLoading) {
    statisticsContent = <Spinner />;
  } else if (isError) {
    statisticsContent = <h1>Error occurred. Please try again.</h1>;
  } else if (statistics != null) {
    statisticsContent = (
      <Grid>
        <Stat>
          <StatNumber>{statistics.totalArtists}</StatNumber>
          <StatLabel>Artist</StatLabel>
        </Stat>
        <Stat>
          <StatNumber>{statistics.totalSongs}</StatNumber>
          <StatLabel>Music</StatLabel>
        </Stat>
        <Stat>
          <StatNumber>{statistics.totalAlbums}</StatNumber>
          <StatLabel>Albums</StatLabel>
        </Stat>
        <Stat>
          <StatNumber>{statistics.totalGenres}</StatNumber>
          <StatLabel>Genres</StatLabel>
        </Stat>
      </Grid>
    );
  }
  return (
    <Container>
      <HeroSection>
        <Wrapper>
          <Title>
            Discover New Music - Exploring <Highlight>Music</Highlight> for
            Every Mood
          </Title>
          <Paragraph>
            Dive into a world of endless melodies as we bring you the latest
            hits and timeless classics. Our curated playlists, meticulously
            crafted by music enthusiasts, promise to take your auditory
            experience to new heights.
          </Paragraph>
          {statisticsContent}
        </Wrapper>
      </HeroSection>
    </Container>
  );
};

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spinAnimation} 0.8s linear infinite;
  margin: 0 auto;
`;

const Container = styled.div`
  font-family: Arial, sans-serif;
  color: #fff;
`;

const HeroSection = styled.div`
  background-image: url(${musicBackground});
  background-size: cover;
  background-position: center;
  padding: 6rem 0;
  text-align: center;
`;

const Wrapper = styled.div`
  max-width: 42rem; /* 2xl */
  margin: auto;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Highlight = styled.span`
  color: #3182ce; /* text-blue-600 */
`;

const Paragraph = styled.p`
  margin-top: 1.5rem;
  font-size: 1rem;
  line-height: 1.5;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;
  align-items: center;
  margin-top: 3.5rem;
  @media (max-width: 30rem) {
    grid-template-columns: repeat(1, minmax(0, 1fr)); /* max-sm:flex-col */
  }
`;

const Stat = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  padding: 1.5rem;
  border-radius: 0.5rem;
  text-align: center;
`;

const StatNumber = styled.h5`
  font-weight: 700;
  font-size: 1.25rem;
  color: #3182ce;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.p`
  font-weight: 600;
  font-size: 1rem;
`;

export default Hero;
