import React, { Suspense } from "react";
import Loading from "./Loading";

const LazyGenresComponent = React.lazy(() => import("./GenresComponent"));

const GenresComponentWrapper: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <LazyGenresComponent />
    </Suspense>
  );
};

export default GenresComponentWrapper;
