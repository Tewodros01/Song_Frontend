import React, { Suspense, lazy, ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import NotFoundPage from "./components/NotFoundPage";
import Loading from "./components/Loading";

const Home = lazy(() => import("./features/Home/components/Home"));
const AddSongForm = lazy(
  () => import("./features/songs/components/AddSongForm")
);
const EditSongForm = lazy(
  () => import("./features/songs/components/EditSongForm")
);
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

interface SuspenseFallbackProps {
  children: ReactNode;
}

const SuspenseFallback: React.FC<SuspenseFallbackProps> = ({ children }) => (
  <Suspense fallback={<Loading />}>{children}</Suspense>
);

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <SuspenseFallback>
              <Home />
            </SuspenseFallback>
          }
        />
        <Route
          path="/songs"
          element={
            <SuspenseFallback>
              <SongListsComponentWrapper />
            </SuspenseFallback>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <SuspenseFallback>
              <EditSongForm />
            </SuspenseFallback>
          }
        />
        <Route
          path="/newsong"
          element={
            <SuspenseFallback>
              <AddSongForm />
            </SuspenseFallback>
          }
        />
        <Route
          path="/artists"
          element={
            <SuspenseFallback>
              <ArtistsComponentWrapper />
            </SuspenseFallback>
          }
        />
        <Route
          path="/albums"
          element={
            <SuspenseFallback>
              <AlbumsComponentWrapper />
            </SuspenseFallback>
          }
        />
        <Route
          path="/genres"
          element={
            <SuspenseFallback>
              <GenresComponentWrapper />
            </SuspenseFallback>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
