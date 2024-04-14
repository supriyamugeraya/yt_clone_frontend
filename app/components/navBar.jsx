"use client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store";
import { toast } from "react-toastify";

const NavBar = () => {
  const { logout } = useAuthStore();
  const router = useRouter();
  return (
    <>
      <div className="flex flex-row w-full  py-4 justify-between items-center ">
        {" "}
        <h3 className="text-[20px] font-semibold">YOU TUBE CLONE</h3>
        <div
          className="w-10 h-10 rounded-full bg-red-900"
          onClick={() => {
            toast.info("Logging out");
            setTimeout(() => {
              logout();
              router.push("/login");
            }, 1000);
          }}
        ></div>
      </div>
    </>
  );
};
export { NavBar };
