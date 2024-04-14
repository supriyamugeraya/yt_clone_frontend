import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStateValue } from "../reducer/state";

const CardComponet = ({
  title,
  description,
  image,
  views,
  likeCount,
  videoId,
}) => {
  const router = useRouter();
  const { dispatch } = useStateValue();

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
        className=" flex flex-col space-y-6 border p-2 border-black h-min rounded-lg cursor-pointer "
        onClick={() => setVideoId(videoId)}
      >
        <div className="w-full rounded-lg h-[60%] overflow-hidden ">
          <Image
            src={image}
            alt="Card image cap"
            height={120}
            width={120}
            className="w-full rounded-md h-[12rem]"
          />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-[16px] line-clamp-2 overflow-ellipsis">
            {title}
          </h3>
          <p className="text-[12px]  line-clamp-2 overflow-ellipsis">
            {description}
          </p>
        </div>
        <div className="flex flex-row  justify-between">
          <div>
            <p className="font-serif ">Likes : {likeCount}</p>
          </div>
          <div>
            <p className="font-serif ">Views :{views}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export { CardComponet };
