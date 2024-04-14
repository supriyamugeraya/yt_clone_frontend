"use client";
import { useEffect } from "react";
import { CardComponet } from "../components/cardComponet";
import { useQueryConfig } from "../config/useQuery.config";
import { useCached, useGetData } from "../hooks";
import { useStateValue } from "../reducer/state";

const Home = () => {
  const { state, dispatch } = useStateValue();

  const { cached } = useCached("isAuthenticated");

  const { data: videoList, isLoading: isVideoLoading } = useGetData(
    "videoList",
    `${process.env.NEXT_PUBLIC_URL}/web/api/video/v1/GetAllVideo`,
    useQueryConfig
  );

  useEffect(() => {
    dispatch({
      type: "SET_VIDEO_LIST",
      payload: videoList,
    });
  }, [videoList]);

  return (
    <>
      <div className="grid grid-cols-4 gap-x-4 min-h-screen gap-y-5">
        {state.videoList?.map((ele, index) => {
          return (
            <>
              <CardComponet
                title={ele?.title}
                description={ele?.description}
                image={ele?.thumbnail}
                views={ele?.views}
                likeCount={ele?.likedby?.length}
                videoId={ele?.videoId}
                key={index}
              />
            </>
          );
        })}
      </div>
    </>
  );
};
export default Home;
