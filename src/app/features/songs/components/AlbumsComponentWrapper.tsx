import React, { Suspense, useEffect } from "react";
import { useAppDispatch } from "../../../../store/store";
import { getAlbumStart } from "../slice/albumSlice";
import Loading from "./Loading";

const LazyAlbumsComponent = React.lazy(() => import("./AlbumsComponent"));

const AlbumsComponentWrapper: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAlbumStart());
  }, [dispatch]);

  return (
    <Suspense fallback={<Loading />}>
      <LazyAlbumsComponent />
    </Suspense>
  );
};

export default AlbumsComponentWrapper;
