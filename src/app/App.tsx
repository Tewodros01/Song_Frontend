import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import Home from "./features/Home/components/Home";
import SongLists from "./features/songs/components/SongLists";
import AddSongForm from "./features/songs/components/AddSongForm";
import EditSongForm from "./features/songs/components/EditSong";
import ArtistsComponent from "./features/songs/components/ArtistsComponent";
import AlbumsComponent from "./features/songs/components/AlbumsComponent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/songs" element={<SongLists />} />
        <Route path="/edit/:id" element={<EditSongForm />} />
        <Route path="/newsong" element={<AddSongForm />} />
        <Route path="/artists" element={<ArtistsComponent />} />
        <Route path="/albums" element={<AlbumsComponent />} />
      </Route>
    </Routes>
  );
}

export default App;
