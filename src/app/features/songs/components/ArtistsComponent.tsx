import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { selectArtist, selectError, selectLoading } from "../slice/artistSlice";
import { useAppSelector } from "../../../../store/store";
import Loading from "../../../components/Loading";
import { Artist } from "../../../../types/artist";
import { ArtistsSort } from "../../../../types/sortby";

const ArtistsComponent: React.FC = () => {
  const artists = useAppSelector(selectArtist);
  const isLoading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const [searchInput, setSearchInput] = useState<string>("");
  const [sortBy, setSortBy] = useState<ArtistsSort>("artist"); // Initial sort by artist
  const [currentPage, setCurrentPage] = useState<number>(1);
  const artistsPerPage = 10;

  const filteredArtists = useMemo(() => {
    const filtered = artists.filter((artist: Artist) =>
      artist.artist.toUpperCase().includes(searchInput.toUpperCase())
    );

    // Sorting
    filtered.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));

    // Pagination
    const indexOfLastArtist = currentPage * artistsPerPage;
    const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
    return filtered.slice(indexOfFirstArtist, indexOfLastArtist);
  }, [artists, searchInput, sortBy, currentPage]);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as ArtistsSort);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
      <SearchContainer>
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
      </SearchContainer>
      <SortSelectContainer>
        <SortLabel htmlFor="sort-select">Sort by:</SortLabel>
        <SortSelect
          id="sort-select"
          value={sortBy}
          onChange={handleSortByChange}
        >
          <option value="artist">Artist</option>
          <option value="songs">Songs</option>
          <option value="albums">Albums</option>
        </SortSelect>
      </SortSelectContainer>

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

      <Pagination>
        {Array.from(
          { length: Math.ceil(artists.length / artistsPerPage) },
          (_, i) => (
            <PaginationItem
              key={i}
              onClick={() => paginate(i + 1)}
              active={i + 1 === currentPage}
            >
              {i + 1}
            </PaginationItem>
          )
        )}
      </Pagination>
    </Container>
  );
};

// Styles and other components remain the same as provided in your code snippet

const Container = styled.div`
  width: 100%;
  padding: 1rem 8rem 8rem;

  @media (min-width: 768px) {
    padding: 1rem 2rem 2rem;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SortSelectContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SortLabel = styled.label`
  margin-right: 0.5rem;
  margin-bottom: 1rem;
`;

const SortSelect = styled.select`
  height: 2.5rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

const ArtistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const ArtistCard = styled.div`
  padding: 1.5rem;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #1e40af;
  border-radius: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    background-color: #f0f0f0;
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
  margin-bottom: 1rem;
  color: #555;
  text-align: center;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 500px;
  height: 2.5rem;
  padding: 0.5rem;
  border-radius: 1rem;
  border: 1px solid #ccc;
  font-size: 1rem;
  margin-bottom: 1rem;
  outline: none;
`;

const NoArtistContainer = styled.div`
  display: flex;
  width: 30rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  font-size: 0.5rem;
  color: #555;
  padding: 1rem;
  border: 2px dashed #ccc;
  border-radius: 0.5rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const PaginationItem = styled.div<{ active: boolean }>`
  cursor: pointer;
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: ${(props) => (props.active ? "#1e40af" : "#ccc")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
`;

export default ArtistsComponent;
