"use client";

import { SimilarVideoComponent } from "@/app/components/similarVideoComponent";
import { useQueryConfig } from "@/app/config/useQuery.config";
import { useGetData } from "@/app/hooks";
import { useStateValue } from "@/app/reducer/state";
import React, { useState } from "react";
import YouTube from "react-youtube";

const VideoPage = () => {
  const { state } = useStateValue();
  const [options, setOption] = useState({
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  });

  const { data, isLoading } = useGetData(
    `${state.videoId}Videodata`,
    `${process.env.NEXT_PUBLIC_URL}/web/api/video/v1/GetVideoById?videoId=${state.videoId}`,
    useQueryConfig
  );

  const onReady = (event) => {
    event.target.pauseVideo();
  };

  const getVideoEmbed = (url) => {
    const domain = "https://www.youtube.com/watch?v=";
    const newUrl = url?.replace(domain, "");
    return newUrl;
  };
  if (isLoading)
    return (
      <>
        <div className="w-screen h-screen items-center justify-center">
          <p>Loading</p>
        </div>
      </>
    );

  return (
    <>
      <div className="min-h-screen flex flex-row space-x-3 ">
        {/* Display video componet */}
        <div className="flex flex-col space-y-6 w-[70%]">
          <YouTube
            videoId={getVideoEmbed(data?.url)}
            opts={options}
            onReady={onReady}
          />
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-[20px]">{data?.title}</h3>
            <p className="text-[16px] text-gray-500 line-clamp-2 overflow-ellipsis">
              {data?.description}
            </p>
          </div>
        </div>

        {/* Related video section */}
        <SimilarVideoComponent />
      </div>
    </>
  );
};
export default VideoPage;
