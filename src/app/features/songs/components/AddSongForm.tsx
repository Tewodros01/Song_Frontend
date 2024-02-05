import React, { useState } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../../store/store";
import { addSongStart } from "../slice/songSlice";
import styled from "styled-components";

interface FormData {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

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

// validation schema
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  artist: Yup.string().required("Artist is required"),
  album: Yup.string().required("Album is required"),
  genre: Yup.string().required("Genre is required"),
});

const AddSongForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    artist: "",
    album: "",
    genre: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // on submit handler
  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      dispatch(addSongStart(formData));
      toast.success("Successfully added new song");
      navigate("/songs");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};
        error.inner.forEach((e) => {
          newErrors[e.path!] = e.message;
        });
        setErrors(newErrors);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>New Song</Title>
        <form onSubmit={onSubmit}>
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
            <ErrorMessageStyled>{errors.title}</ErrorMessageStyled>
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
            <ErrorMessageStyled>{errors.artist}</ErrorMessageStyled>
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
            <ErrorMessageStyled>{errors.album}</ErrorMessageStyled>
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
            <ErrorMessageStyled>{errors.genre}</ErrorMessageStyled>
          </FormGroup>
          <ButtonGroup>
            <BackButton to="/songs">Back</BackButton>
            <SubmitButton type="submit">Submit</SubmitButton>
          </ButtonGroup>
        </form>
      </FormContainer>
    </Container>
  );
};

export default AddSongForm;
