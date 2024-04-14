import { useQueryConfig } from "../config/useQuery.config";
import { useGetData } from "../hooks";
import { useStateValue } from "../reducer/state";
import { SimilarVideoCardComponent } from "./similarVideoCardComponent";

const SimilarVideoComponent = () => {
  const { state } = useStateValue();
  const { data, isLoading } = useGetData(
    `${state.videoId}SimilarVideo`,
    `${process.env.NEXT_PUBLIC_URL}/web/api/video/v1/GetSimilarVideos?videoId=${state.videoId}`,
    useQueryConfig
  );
  if (isLoading)
    return (
      <>
        <div className="w-screen h-screen items-center justify-center">
          <p>Loading</p>
        </div>
      </>
    );

  console.log("similar videos", data);

  return (
    <>
      <div className=" w-[30%] flex flex-col space-y-1 ">
        <h3 className="font-semibold">Similar Videos</h3>
        {data?.map((ele, index) => {
          return <SimilarVideoCardComponent video={ele} />;
        })}
      </div>
    </>
  );
};
export { SimilarVideoComponent };
