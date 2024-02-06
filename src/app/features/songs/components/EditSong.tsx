import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import {
  updateSongStart,
  deleteSongStart,
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

const Input = styled(Field)`
  width: 100%;
  padding: 0.7rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
`;

const ErrorMessageStyled = styled(ErrorMessage)`
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
  background-color: #d1d5db;
  color: #4b5563;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #9ca3af;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be at most 50 characters"),
  artist: Yup.string()
    .required("Artist is required")
    .min(2, "Artist must be at least 2 characters")
    .max(50, "Artist must be at most 50 characters"),
  album: Yup.string()
    .required("Album is required")
    .min(2, "Album must be at least 2 characters")
    .max(50, "Album must be at most 50 characters"),
  genre: Yup.string()
    .required("Genre is required")
    .min(2, "Genre must be at least 2 characters")
    .max(50, "Genre must be at most 50 characters"),
});

const EditSongForm: React.FC = () => {
  const { id } = useParams<{ id: any }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const song = useAppSelector(selectSongById(id!));

  const handleUpdate = async (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => any }
  ) => {
    try {
      if (!song) return;
      const updatedSong = { ...song, ...values };
      dispatch(updateSongStart(updatedSong));
      toast.update("Your changes have been saved successfully");
      navigate("/songs");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (!id) return;
      dispatch(deleteSongStart(id));
      toast.success("Success: The song has been deleted.");
      navigate("/songs");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  let content;
  if (!id) {
    content = <h1>Song Not Found</h1>;
  } else if (song) {
    content = (
      <Formik
        initialValues={{
          title: song.title,
          artist: song.artist,
          album: song.album,
          genre: song.genre,
        }}
        validationSchema={validationSchema}
        onSubmit={handleUpdate}
      >
        <Form>
          <FormGroup>
            <Label htmlFor="title">Song Title</Label>
            <Input type="text" id="title" name="title" placeholder="Title" />
            <ErrorMessageStyled name="title" component="div" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="artist">Artist</Label>
            <Input type="text" id="artist" name="artist" placeholder="Artist" />
            <ErrorMessageStyled name="artist" component="div" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="album">Album</Label>
            <Input type="text" id="album" name="album" placeholder="Album" />
            <ErrorMessageStyled name="album" component="div" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="genre">Genre</Label>
            <Input type="text" id="genre" name="genre" placeholder="Genre" />
            <ErrorMessageStyled name="genre" component="div" />
          </FormGroup>
          <ButtonGroup>
            <BackButton to="/songs">Back</BackButton>
            <SubmitButton type="submit">Update</SubmitButton>
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
          </ButtonGroup>
        </Form>
      </Formik>
    );
  }

  return (
    <Container>
      <FormContainer>
        <Title>Edit Song</Title>
        {content}
      </FormContainer>
    </Container>
  );
};

export default EditSongForm;
