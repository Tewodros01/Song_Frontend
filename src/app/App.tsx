import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import NotFoundPage from "./components/NotFoundPage";

const Home = lazy(() => import("./features/Home/components/Home"));
const AddSongForm = lazy(
  () => import("./features/songs/components/AddSongForm")
);
const EditSongForm = lazy(() => import("./features/songs/components/EditSong"));
const ArtistsComponentWrapper = lazy(
  () => import("./features/songs/components/ArtistsComponentWrapper")
);
const AlbumsComponentWrapper = lazy(
  () => import("./features/songs/components/AlbumsComponentWrapper")
);
const GenresComponentWrapper = lazy(
  () => import("./features/songs/components/GenresComponentWrapper")
);
const SongListsComponentWrapper = lazy(
  () => import("./features/songs/components/SongListsComponentWrapper")
);

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/songs"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SongListsComponentWrapper />
            </Suspense>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <EditSongForm />
            </Suspense>
          }
        />
        <Route
          path="/newsong"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AddSongForm />
            </Suspense>
          }
        />
        <Route
          path="/artists"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ArtistsComponentWrapper />
            </Suspense>
          }
        />
        <Route
          path="/albums"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AlbumsComponentWrapper />
            </Suspense>
          }
        />
        <Route
          path="/genres"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <GenresComponentWrapper />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
