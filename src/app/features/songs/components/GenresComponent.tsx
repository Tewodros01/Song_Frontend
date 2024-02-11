import React, { useState } from "react";
import styled from "styled-components";
import {
  selectError,
  selectFilteredGenres,
  selectLoading,
  setGenresSort,
  setSearchInput,
  selectGenresSort,
} from "../slice/genresSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import Loading from "../../../components/Loading";
import { Genre } from "../../../../types/genre";
import { GenresSort } from "../../../../types/sortby";

const GenresComponent: React.FC = () => {
  const dispatch = useAppDispatch();

  const genres = useAppSelector(selectFilteredGenres);
  const isLoading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const currentGenresSort = useAppSelector(selectGenresSort);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const genresPerPage = 10;

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchInput(event.target.value));
    setCurrentPage(1);
  };

  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setGenresSort(event.target.value as GenresSort));
    setCurrentPage(1);
  };

  const indexOfLastGenres = currentPage * genresPerPage;
  const indexOfFirstGenres = indexOfLastGenres - genresPerPage;
  const currentGenres = genres.slice(indexOfFirstGenres, indexOfLastGenres);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) {
    return <Loading />;
  }

  const renderContent = () => {
    if (error) {
      return (
        <Container>
          <NoGenresContainer>
            <h1>{error}</h1>
          </NoGenresContainer>
        </Container>
      );
    } else if (currentGenres.length === 0) {
      return <NoGenresContainer>No Genres Found</NoGenresContainer>;
    } else {
      return (
        <>
          <SortSelectContainer>
            <SortLabel htmlFor="sort-select">Sort by:</SortLabel>
            <SortSelect
              id="sort-select"
              value={currentGenresSort}
              onChange={handleSortByChange}
            >
              <option value="genre">Genre</option>
              <option value="songs">Songs</option>
              <option value="numberOfAlbums">Number Of Albums</option>
              <option value="numberOfArtists">Number Of Artists</option>
            </SortSelect>
          </SortSelectContainer>

          <GenresGrid>
            {currentGenres.map((item: Genre, index: number) => (
              <GenresCard key={index}>
                <Title>{item.genre}</Title>
                <Details>Songs: {item.songs}</Details>
                <Details>Artists: {item.numberOfArtists}</Details>
                <Details>Albums: {item.numberOfAlbums}</Details>
              </GenresCard>
            ))}
          </GenresGrid>

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
        </>
      );
    }
  };

  return (
    <Container>
      <SearchContainer>
        <Description>
          Explore and search through the collection of Genres.
        </Description>
        <SearchInput
          type="text"
          id="topbar-search"
          onChange={handleSearchInput}
          placeholder="Search genres..."
        />
      </SearchContainer>
      {renderContent()}
    </Container>
  );
};

// Styled components
const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 1rem;

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
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SortLabel = styled.label`
  margin-right: 0.5rem;
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
