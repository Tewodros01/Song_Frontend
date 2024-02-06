import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../../store/store";
import { addSongStart } from "../slice/songSlice";
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

const AddSongForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // on submit handler
  const onSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
    try {
      dispatch(addSongStart(values));
      setSubmitting(false);
      navigate("/songs");
      toast.success("Success! Your new song have been saved");
    } catch (error: any) {
      toast.error(`${error.message}`);
      setSubmitting(false);
      setErrors(error);
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>New Song</Title>
        <Formik
          initialValues={{
            title: "",
            artist: "",
            album: "",
            genre: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <FormGroup>
              <Label htmlFor="title">Song Title</Label>
              <Input type="text" id="title" name="title" placeholder="Title" />
              <ErrorMessageStyled name="title" component="div" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="artist">Artist</Label>
              <Input
                type="text"
                id="artist"
                name="artist"
                placeholder="Artist"
              />
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
              <SubmitButton type="submit">Submit</SubmitButton>
            </ButtonGroup>
          </Form>
        </Formik>
      </FormContainer>
    </Container>
  );
};

export default AddSongForm;
