import React, { Suspense, useEffect } from "react";
import { useAppDispatch } from "../../../../store/store";
import { getArtistStart } from "../slice/artistSlice";
import Loading from "../../../components/Loading";

const LazyArtistsComponent = React.lazy(() => import("./ArtistsComponent"));

const ArtistsComponentWrapper: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getArtistStart());
  }, [dispatch]);

  return (
    <Suspense fallback={<Loading />}>
      <LazyArtistsComponent />
    </Suspense>
  );
};

export default ArtistsComponentWrapper;
