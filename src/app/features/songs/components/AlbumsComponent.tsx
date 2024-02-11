import React, { useState } from "react";
import styled from "styled-components";
import {
  selectAlbumsSort,
  selectError,
  selectFilteredAlbums,
  selectLoading,
  setAlbumsSort,
  setSearchInput,
} from "../slice/albumSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { Album } from "../../../../types/album";
import Loading from "../../../components/Loading";
import { AlbumsSort } from "../../../../types/sortby";

const AlbumsComponent = () => {
  const dispatch = useAppDispatch();

  const albums = useAppSelector(selectFilteredAlbums);
  const isLoading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const currentAlbumsSort = useAppSelector(selectAlbumsSort);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const albumsPerPage = 10;

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchInput(event.target.value));
    setCurrentPage(1);
  };

  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setAlbumsSort(event.target.value as AlbumsSort));
    setCurrentPage(1);
  };

  const indexOfLastAlbums = currentPage * albumsPerPage;
  const indexOfFirstAlbums = indexOfLastAlbums - albumsPerPage;
  const currentAlbums = albums.slice(indexOfFirstAlbums, indexOfLastAlbums);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) {
    return <Loading />;
  }

  const renderContent = () => {
    if (error) {
      return (
        <NoAlbumContainer>
          <h1>{error}</h1>
        </NoAlbumContainer>
      );
    } else if (currentAlbums.length === 0) {
      return (
        <NoAlbumContainer>
          <h1>No Albums Found</h1>
        </NoAlbumContainer>
      );
    } else {
      return (
        <>
          <SortSelectContainer>
            <SortLabel htmlFor="sort-select">Sort by:</SortLabel>
            <SortSelect
              id="sort-select"
              value={currentAlbumsSort}
              onChange={handleSortByChange}
            >
              <option value="artist">Artist</option>
              <option value="songs">Songs</option>
              <option value="album">Album</option>
            </SortSelect>
          </SortSelectContainer>
          <AlbumGrid>
            {currentAlbums.map((item: Album, index: number) => (
              <AlbumCard key={index}>
                <Title>{item.album}</Title>
                <Details>Artist: {item.artist}</Details>
                <Details>Songs: {item.songs}</Details>
                <Details>Album: {item.album}</Details>
              </AlbumCard>
            ))}
          </AlbumGrid>
          <Pagination>
            {Array.from(
              { length: Math.ceil(albums.length / albumsPerPage) },
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
          Explore and search through the collection of albums.
        </Description>
        <SearchInput
          type="text"
          id="topbar-search"
          onChange={handleSearchInput}
          placeholder="Search Albums..."
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

const AlbumGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const AlbumCard = styled.div`
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

const NoAlbumContainer = styled.div`
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

export default AlbumsComponent;
