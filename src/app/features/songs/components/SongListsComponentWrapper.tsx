import React, { Suspense, useEffect } from "react";
import Loading from "../../../components/Loading";
import { useAppDispatch } from "../../../../store/store";
import { fetchSongsStart } from "../slice/songSlice";

const LazySongLists = React.lazy(() => import("./SongLists"));

const SongListsComponentWrapper: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSongsStart());
  }, [dispatch]);

  return (
    <Suspense fallback={<Loading />}>
      <LazySongLists />
    </Suspense>
  );
};

export default SongListsComponentWrapper;
