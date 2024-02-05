import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  selectSongs,
  selectLoading,
  selectError,
  fetchSongsStart,
} from "../slice/songSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import Loading from "./Loading";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 0;
`;

const SongGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  width: 80%;
  max-width: 1200px;
  margin-bottom: 2rem;
  overflow-x: hidden;
`;

const SongCard = styled.div`
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

const EditButton = styled(Link)`
  margin-top: 1rem;
  height: 2rem;
  width: 7rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  font-size: 0.87rem;
  outline: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4b0082;
  color: #fff;
`;

const AddNewSong = styled(Link)`
  position: absolute;
  top: 6rem;
  right: 1rem;
  height: 3.5rem;
  width: 15rem;
  border-radius: 1rem;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4b0082;
  color: #fff;
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

const NoSongContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-size: 0.5rem;
  color: #555;
  padding: 1rem;
  border: 2px dashed #ccc;
  border-radius: 0.5rem;
`;

const SongList = () => {
  const dispatch = useAppDispatch();
  const songs = useAppSelector(selectSongs);
  const isLoading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    dispatch(fetchSongsStart());
  }, [dispatch]);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  let content;

  if (isLoading) {
    return (content = <Loading />);
  } else if (error) {
    content = (
      <NoSongContainer>
        <h1>{error}</h1>
      </NoSongContainer>
    );
  } else if (songs.length === 0) {
    content = (
      <NoSongContainer>
        <h1>No Music Found</h1>
      </NoSongContainer>
    );
  } else {
    const filteredSongs = songs.filter((song) =>
      song.title?.toUpperCase().includes(searchInput.toLocaleUpperCase())
    );

    content = (
      <SongGrid>
        {filteredSongs.length === 0 ? (
          <NoSongContainer>
            <h1>No Songs Found</h1>
          </NoSongContainer>
        ) : (
          filteredSongs.map((song, index) => (
            <SongCard key={index}>
              <Title>{song.title}</Title>
              <Details>Artist: {song.artist}</Details>
              <Details>Album: {song.album}</Details>
              <Details>Genre: {song.genre}</Details>
              <EditButton to={`/edit/${song.id}`}>Edit Song</EditButton>
            </SongCard>
          ))
        )}
      </SongGrid>
    );
  }

  return (
    <Container>
      <AddNewSong to="/newsong">Add new Song</AddNewSong>
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
      {content}
    </Container>
  );
};

export default SongList;
