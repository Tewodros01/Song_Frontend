import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { selectArtist, selectError, selectLoading } from "../slice/artistSlice";
import { useAppSelector } from "../../../../store/store";
import Loading from "../../../components/Loading";
import { Artist } from "../../../../types/artist";

const ArtistsComponent: React.FC = () => {
  const artists = useAppSelector(selectArtist);
  const isLoading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const [searchInput, setSearchInput] = useState<string>("");

  const filteredArtists = useMemo(() => {
    return artists.filter((artist: Artist) =>
      artist.artist.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [artists, searchInput]);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Container>
        <NoArtistContainer>
          <h1>{error}</h1>
        </NoArtistContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Description>
        Explore and search through the collection of Artist.
      </Description>
      <SearchInput
        type="text"
        id="topbar-search"
        value={searchInput}
        onChange={handleSearchInput}
        placeholder="Search Artists..."
      />
      {filteredArtists.length === 0 ? (
        <NoArtistContainer>No Artist Found</NoArtistContainer>
      ) : (
        <ArtistGrid>
          {filteredArtists.map((item: Artist, index: number) => (
            <ArtistCard key={index}>
              <Title>{item.artist}</Title>
              <Details>Artist: {item.artist}</Details>
              <Details>Songs: {item.songs}</Details>
              <Details>Albums: {item.albums}</Details>
            </ArtistCard>
          ))}
        </ArtistGrid>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 4rem 4rem;
`;

const ArtistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  width: 80%;
  max-width: 1200px;
  margin-bottom: 2rem;
`;

const ArtistCard = styled.div`
  padding: 1.5rem;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #1e40af;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  text-decoration: none;
  color: #000;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    background-color: #f0f0f0; /* Lighter color on hover */
    color: #000; /* Text color on hover */
  }
`;

const Title = styled.h4`
  font-size: 1rem;
  font-weight: bold;
  margin: 1rem 0 0.5rem;
`;

const Details = styled.p`
  font-size: 0.87rem;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-top: 2rem;
  color: #555;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
    margin-top: 1rem;
  }
`;

const SearchInput = styled.input`
  margin-top: 1rem;
  margin-bottom: 2rem;
  height: 2.5rem;
  width: 30rem;
  padding-left: 2.5rem;
  border-radius: 1.25rem;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;

  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;

const NoArtistContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  color: #555;
  padding: 1rem;
  border: 2px dashed #ccc;
  border-radius: 0.5rem;
`;

export default ArtistsComponent;
