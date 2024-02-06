import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import Home from "./features/Home/components/Home";
import AddSongForm from "./features/songs/components/AddSongForm";
import EditSongForm from "./features/songs/components/EditSong";
import ArtistsComponentWrapper from "./features/songs/components/ArtistsComponentWrapper";
import AlbumsComponentWrapper from "./features/songs/components/AlbumsComponentWrapper";
import GenresComponentWrapper from "./features/songs/components/GenresComponentWrapper";
import SongListsComponentWrapper from "./features/songs/components/SongListsComponentWrapper";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/songs" element={<SongListsComponentWrapper />} />
        <Route path="/edit/:id" element={<EditSongForm />} />
        <Route path="/newsong" element={<AddSongForm />} />
        <Route path="/artists" element={<ArtistsComponentWrapper />} />
        <Route path="/albums" element={<AlbumsComponentWrapper />} />
        <Route path="/genres" element={<GenresComponentWrapper />} />
      </Route>
    </Routes>
  );
}

export default App;
