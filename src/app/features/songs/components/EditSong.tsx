import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import {
  updateSongStart,
  deleteSongStart,
  selectLoading,
  selectSongById,
} from "../slice/songSlice";
import styled from "styled-components";

const Container = styled.section`
  padding: 1rem;
  background-color: #f3f4f6;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 2rem auto;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const Title = styled.h6`
  font-size: 1.2rem;
  font-weight: bold;
  color: #374151;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: bold;
  color: #4b5563;
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
`;

const ErrorMessageStyled = styled.div`
  font-size: 0.875rem;
  color: #ef4444;
  margin-top: 0.25rem;
`;

const ButtonBase = styled.button`
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const SubmitButton = styled(ButtonBase)`
  background-color: #4b0082;

  &:hover {
    background-color: #36414f;
    color: #fff;
  }
`;

const DeleteButton = styled(ButtonBase)`
  background-color: #d9534f;

  &:hover {
    background-color: #c9302c;
    color: #fff;
  }
`;

const BackButton = styled(Link)`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  align-items: center;
  background-color: #d1d5db;
  color: #4b5563;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #9ca3af;
  }
`;

const ArrowIcon = styled.svg`
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

// Validation schema
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  artist: Yup.string().required("Artist is required"),
  album: Yup.string().required("Album is required"),
  genre: Yup.string().required("Genre is required"),
});

const EditSongForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const song = useAppSelector(selectSongById(id!));
  const isLoading = useAppSelector(selectLoading);

  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
  });

  useEffect(() => {
    if (song) {
      setFormData({
        title: song.title,
        artist: song.artist,
        album: song.album,
        genre: song.genre,
      });
    }
  }, [song]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      if (!song) return;
      const updatedSong = { ...song, ...formData };
      dispatch(updateSongStart(updatedSong));
      toast.success("Song updated successfully");
      navigate("/songs");
    } catch (error: any) {
      error.inner.forEach((e: any) => {
        toast.error(e.message);
      });
    }
  };

  const handleDelete = async () => {
    try {
      if (!id) return;
      dispatch(deleteSongStart(id!));
      toast.success("Song deleted successfully");
      navigate("/songs");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  let content = null;
  if (isLoading) {
    content = <h1>Loading</h1>;
  } else if (song) {
    content = (
      <form>
        <FormGroup>
          <Label htmlFor="title">Song Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />
          <ErrorMessageStyled>
            {formData.title === "" && "Title is required"}
          </ErrorMessageStyled>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="artist">Artist</Label>
          <Input
            type="text"
            id="artist"
            name="artist"
            placeholder="Artist"
            value={formData.artist}
            onChange={handleChange}
          />
          <ErrorMessageStyled>
            {formData.artist === "" && "Artist is required"}
          </ErrorMessageStyled>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="album">Album</Label>
          <Input
            type="text"
            id="album"
            name="album"
            placeholder="Album"
            value={formData.album}
            onChange={handleChange}
          />
          <ErrorMessageStyled>
            {formData.album === "" && "Album is required"}
          </ErrorMessageStyled>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="genre">Genre</Label>
          <Input
            type="text"
            id="genre"
            name="genre"
            placeholder="Genre"
            value={formData.genre}
            onChange={handleChange}
          />
          <ErrorMessageStyled>
            {formData.genre === "" && "Genre is required"}
          </ErrorMessageStyled>
        </FormGroup>
        <ButtonGroup>
          <SubmitButton type="button" onClick={handleUpdate}>
            Update
          </SubmitButton>
          <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
        </ButtonGroup>
      </form>
    );
  }

  return (
    <Container>
      <FormContainer>
        <BackButton to="/songs">
          <ArrowIcon
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6.293 7.293a1 1 0 011.414 0L12 11.586V4a1 1 0 012 0v7.586l4.293-4.293a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </ArrowIcon>{" "}
          Back
        </BackButton>
        <Title>Edit Song</Title>
        {content}
      </FormContainer>
    </Container>
  );
};

export default EditSongForm;
