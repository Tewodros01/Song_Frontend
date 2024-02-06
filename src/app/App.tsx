import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import NotFoundPage from "./components/NotFoundPage";
import Loading from "./features/songs/components/Loading";

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
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/songs"
          element={
            <Suspense fallback={<Loading />}>
              <SongListsComponentWrapper />
            </Suspense>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <Suspense fallback={<Loading />}>
              <EditSongForm />
            </Suspense>
          }
        />
        <Route
          path="/newsong"
          element={
            <Suspense fallback={<Loading />}>
              <AddSongForm />
            </Suspense>
          }
        />
        <Route
          path="/artists"
          element={
            <Suspense fallback={<Loading />}>
              <ArtistsComponentWrapper />
            </Suspense>
          }
        />
        <Route
          path="/albums"
          element={
            <Suspense fallback={<Loading />}>
              <AlbumsComponentWrapper />
            </Suspense>
          }
        />
        <Route
          path="/genres"
          element={
            <Suspense fallback={<Loading />}>
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
