import React, { Suspense, useEffect } from "react";
import { useAppDispatch } from "../../../../store/store";
import { getGenresStart } from "../slice/genresSlice";
import Loading from "./Loading";

const LazyGenresComponent = React.lazy(() => import("./GenresComponent"));

const GenresComponentWrapper: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getGenresStart());
  }, [dispatch]);

  return (
    <Suspense fallback={<Loading />}>
      <LazyGenresComponent />
    </Suspense>
  );
};

export default GenresComponentWrapper;
