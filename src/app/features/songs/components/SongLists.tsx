import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import Loading from "../../../components/Loading";
import {
  selectSortedSongs,
  selectLoading,
  selectError,
  selectSongsSort,
  setSongsSort,
} from "../slice/songSlice";
import { SongsSort } from "../../../../types/sortby";

const SongList: React.FC = () => {
  const dispatch = useAppDispatch();

  // Redux state selectors
  const songs = useAppSelector(selectSortedSongs);
  const isLoading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const currentSongsSort = useAppSelector(selectSongsSort);

  // Component state
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 10;

  // Event handlers
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
    setCurrentPage(1);
  };

  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSongsSort(event.target.value as SongsSort));
    setCurrentPage(1); // Reset page number when sorting changes
  };

  // Paginate the sorted songs
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);

  //filter songs with search input
  const filteredSongs = currentSongs.filter((song) =>
    song.title?.toUpperCase().includes(searchInput.toUpperCase())
  );
  // Pagination controls
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) {
    return <Loading />;
  }
  // Render content based on state
  const renderContent = () => {
    if (error) {
      return (
        <NoSongContainer>
          <h1>{error}</h1>
        </NoSongContainer>
      );
    } else if (songs.length === 0) {
      return (
        <NoSongContainer>
          <h1>No Songs Found</h1>
        </NoSongContainer>
      );
    } else {
      return (
        <>
          <SortSelectContainer>
            <SortLabel htmlFor="sort-select">Sort by:</SortLabel>
            <SortSelect
              id="sort-select"
              value={currentSongsSort}
              onChange={handleSortByChange}
            >
              <option value="title">Title</option>
              <option value="artist">Artist</option>
              <option value="album">Album</option>
              <option value="genre">Genre</option>
              <option value="createdAt">CreatedAt</option>
            </SortSelect>
          </SortSelectContainer>
          <SongGrid>
            {filteredSongs.map((song, index) => (
              <SongCard key={index}>
                <Title>{song.title}</Title>
                <Details>Artist: {song.artist}</Details>
                <Details>Album: {song.album}</Details>
                <Details>Genre: {song.genre}</Details>
                <EditButton to={`/edit/${song.id}`}>Edit Song</EditButton>
              </SongCard>
            ))}
          </SongGrid>
          <Pagination>
            {Array.from(
              { length: Math.ceil(songs.length / songsPerPage) },
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
      <TopBar>
        <AddNewSong to="/newsong">Add New Song</AddNewSong>
      </TopBar>
      <SearchContainer>
        <Description>
          Explore and search through the collection of Songs
        </Description>
        <SearchInput
          type="text"
          id="topbar-search"
          value={searchInput}
          onChange={handleSearchInput}
          placeholder="Search Songs..."
        />
      </SearchContainer>

      {renderContent()}
    </Container>
  );
};

// Styled components
const Container = styled.div`
  width: 100%;
  padding: 1rem 8rem 8rem;

  @media (min-width: 768px) {
    padding: 1rem 2rem 2rem;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 2rem;
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

const SongGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const SongCard = styled.div`
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

const EditButton = styled(Link)`
  display: block;
  margin-top: 1rem;
  height: 2rem;
  width: 7rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 0.87rem;
  text-decoration: none;
  text-align: center;
  line-height: 2rem;
  background: #4b0082;
  color: #fff;
`;

const AddNewSong = styled(Link)`
  height: 3.5rem;
  width: 15rem;
  border-radius: 1rem;
  border: none;
  font-size: 1rem;
  text-decoration: none;
  text-align: center;
  line-height: 3.5rem;
  background: #4b0082;
  color: #fff;
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

const NoSongContainer = styled.div`
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

export default SongList;
