import React, { Suspense } from "react";
import Loading from "./Loading";

const LazyArtistsComponent = React.lazy(() => import("./ArtistsComponent"));

const ArtistsComponentWrapper: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <LazyArtistsComponent />
    </Suspense>
  );
};

export default ArtistsComponentWrapper;
