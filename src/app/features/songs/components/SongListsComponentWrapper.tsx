import React, { Suspense } from "react";
import Loading from "./Loading";

const LazySongLists = React.lazy(() => import("./SongLists"));

const SongListsComponentWrapper: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <LazySongLists />
    </Suspense>
  );
};

export default SongListsComponentWrapper;
