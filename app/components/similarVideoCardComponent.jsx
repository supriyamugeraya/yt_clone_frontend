import Image from "next/image";
import { useStateValue } from "../reducer/state";
import { useRouter } from "next/navigation";

const SimilarVideoCardComponent = ({ video }) => {
  const { dispatch } = useStateValue();
  const router = useRouter();

  const setVideoId = (videoId) => {
    dispatch({
      type: "SET_VIDEO_ID",
      payload: videoId,
    });
    router.push("/home/video");
  };

  return (
    <>
      <div
        className="flex flex-row  h-[80px]  space-x-2"
        onClick={() => setVideoId(video?.videoId)}
      >
        <div className="w-[40%] object-cover h-full overflow-hidden ">
          <Image
            src={video.thumbnail}
            alt="Card image cap"
            height={80}
            width={80}
            className=" rounded-md object-cover w-[10rem]"
          />
        </div>
        <div className="flex flex-col  w-full justify-evenly">
          <h3 className="line-clamp-2 overflow-ellipsis text-[14px] font-medium">
            {video?.title}
          </h3>
          <p className="line-clamp-1 overflow-ellipsis text-gray-500 text-[12px]">
            {video?.description}
          </p>
        </div>
      </div>
    </>
  );
};
export { SimilarVideoCardComponent };
