"use client";
import Link from "next/link";
import { FaEnvelope, FaLock, FaPhone, FaPerson } from "react-icons/fa6";
import { CustomTextField } from "../components/customTextField";
import { CustomButton } from "../components/customButton";
import { useSubmit } from "../hooks";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAuthStore } from "../store";
const SignUpPage = () => {
  const { submitData, isLoading: isSigningUp } = useSubmit();
  const router = useRouter();
  const [initialData, setInitialData] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
    phoneNumber: "",
  });

  const { signup } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();
    toast.info("Creating account please wait");
    try {
      const data = await signup(
        initialData.name,
        initialData.username,
        initialData.email,
        initialData.password,
        initialData.phoneNumber
      );
      if (data) {
        toast.success("Accound created");
        router.push("/login");
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex  h-screen  background-color justify-center items-center ">
        <div className="flex flex-col space-y-4 border border-white  text-white px-[24px] w-[30%] py-[20px] rounded-lg  items-center  bg-white bg-opacity-20 backdrop-blur-lg">
          <h5 className="text-[30px] font-semibold">Sign up</h5>

          <form className="w-full space-y-3" onSubmit={handleSignUp}>
            <CustomTextField
              onValueChange={(e) =>
                setInitialData({
                  ...initialData,
                  name: e.target.value,
                })
              }
              label={"Name"}
              type={"text"}
              value={initialData?.name}
              placeholder={"Enter Your Name"}
              icon={<FaPerson />}
              isRequired={true}
            />
            <CustomTextField
              onValueChange={(e) =>
                setInitialData({
                  ...initialData,
                  username: e.target.value,
                })
              }
              label={"User Name"}
              type={"text"}
              value={initialData?.username}
              placeholder={"Enter Your userName"}
              icon={<FaPerson />}
              isRequired={true}
            />
            <CustomTextField
              onValueChange={(e) =>
                setInitialData({
                  ...initialData,
                  email: e.target.value,
                })
              }
              label={"Email"}
              type={"email"}
              value={initialData?.email}
              placeholder={"Enter Your Email"}
              icon={<FaEnvelope />}
              isRequired={true}
            />
            <CustomTextField
              onValueChange={(e) =>
                setInitialData({
                  ...initialData,
                  password: e.target.value,
                })
              }
              label={"Password"}
              type={"password"}
              value={initialData?.password}
              placeholder={"Enter Your Password"}
              icon={<FaLock />}
              isRequired={true}
            />
            <CustomTextField
              onValueChange={(e) =>
                setInitialData({
                  ...initialData,
                  phoneNumber: e.target.value,
                })
              }
              label={"Phone No"}
              type={"number"}
              value={initialData?.phoneNumber}
              placeholder={"Enter Your Phone Number"}
              icon={<FaPhone />}
              isRequired={true}
            />
            <CustomButton buttonName="Sign up" type="submit" />
          </form>

          <p>
            Already have an account? <Link href={"/"}>Signin</Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default SignUpPage;
