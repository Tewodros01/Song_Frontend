import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { selectError, selectGenres, selectLoading } from "../slice/genresSlice";
import { useAppSelector } from "../../../../store/store";
import Loading from "../../../components/Loading";
import { Genre } from "../../../../types/genre";
import { GenresSort } from "../../../../types/sortby";

const GenresComponent: React.FC = () => {
  const genres = useAppSelector(selectGenres);
  const isLoading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const [searchInput, setSearchInput] = useState<string>("");
  const [sortBy, setSortBy] = useState<GenresSort>("genre"); // Initial sort by genre
  const [currentPage, setCurrentPage] = useState<number>(1);
  const genresPerPage = 10;

  const filteredGenres = useMemo(() => {
    const filtered = genres.filter((genre: Genre) =>
      genre.genre.toUpperCase().includes(searchInput.toUpperCase())
    );

    // Sorting
    filtered.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));

    // Pagination
    const indexOfLastGenre = currentPage * genresPerPage;
    const indexOfFirstGenre = indexOfLastGenre - genresPerPage;
    return filtered.slice(indexOfFirstGenre, indexOfLastGenre);
  }, [genres, searchInput, sortBy, currentPage]);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as GenresSort);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Container>
        <NoGenresContainer>
          <h1>{error}</h1>
        </NoGenresContainer>
      </Container>
    );
  }

  return (
    <Container>
      <SearchContainer>
        <Description>
          Explore and search through the collection of Genres.
        </Description>
        <SearchInput
          type="text"
          id="topbar-search"
          value={searchInput}
          onChange={handleSearchInput}
          placeholder="Search genres..."
        />
      </SearchContainer>

      <SortSelectContainer>
        <SortLabel htmlFor="sort-select">Sort by:</SortLabel>
        <SortSelect
          id="sort-select"
          value={sortBy}
          onChange={handleSortByChange}
        >
          <option value="genre">Genre</option>
          <option value="songs">Songs</option>
          <option value="numberOfAlbums">Number Of Albums</option>
          <option value="numberOfArtists">Number Of Artists</option>
        </SortSelect>
      </SortSelectContainer>
      {filteredGenres.length === 0 ? (
        <NoGenresContainer>No Genres Found</NoGenresContainer>
      ) : (
        <GenresGrid>
          {filteredGenres.map((item: Genre, index: number) => (
            <GenresCard key={index}>
              <Title>{item.genre}</Title>
              <Details>Songs: {item.songs}</Details>
              <Details>Artists: {item.numberOfArtists}</Details>
              <Details>Albums: {item.numberOfAlbums}</Details>
            </GenresCard>
          ))}
        </GenresGrid>
      )}

      <Pagination>
        {Array.from(
          { length: Math.ceil(genres.length / genresPerPage) },
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

const GenresGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const GenresCard = styled.div`
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

const NoGenresContainer = styled.div`
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

export default GenresComponent;
