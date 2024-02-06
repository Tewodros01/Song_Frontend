import React, { Suspense } from "react";
import Loading from "./Loading";

const LazyAlbumsComponent = React.lazy(() => import("./AlbumsComponent"));

const AlbumsComponentWrapper: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <LazyAlbumsComponent />
    </Suspense>
  );
};

export default AlbumsComponentWrapper;
