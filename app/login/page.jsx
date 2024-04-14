"use client";
import { FaPerson, FaLock } from "react-icons/fa6";
import { CustomTextField } from "../components/customTextField";
import { CustomButton } from "../components/customButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store";
import validator from "email-validator";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  let router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { token } = useAuthStore();

  useEffect(() => {
    if (token) {
      if (token !== "") {
        router.push("/home");
      }
    }
  }, [token]);

  const { login, user } = useAuthStore();
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const rememberMeStatus = localStorage.getItem("rememberMe") === "true";
    setRememberMe(rememberMeStatus);
  }, []);

  const handleRememberMe = (e) => {
    const isChecked = e.target.checked;
    setRememberMe(isChecked);
    localStorage.setItem("rememberMe", isChecked ? "true" : "false");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password.length < 6) {
      toast.info("Password must be at least 6 characters");
      return;
    }
    if (rememberMe) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      localStorage.removeItem("rememberMe");
    }
    try {
      const userType = await login(username, password);
      toast.success("Login Succesful");
      router.push("/home");
      // if (userType === "user") {
      //   await router.push({ pathname: "/home" });
      // } else {
      //   await router.push("error");
      // }
    } catch (err) {
      console.log("error", err);
      toast.error("Login Failed");
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center background-color h-screen w-screen">
        <div className="flex flex-col space-y-10 px-[24px] w-[30%] py-[20px] border border-white text-white rounded-xl justify-center items-center bg-white bg-opacity-20 backdrop-blur-lg">
          <h5 className="text-[30px] font-semibold">Login</h5>

          <form className="w-full space-y-3" onSubmit={handleLogin}>
            <CustomTextField
              label={"User Name"}
              name="username"
              onValueChange={(e) => setUsername(e.target.value)}
              value={username}
              type={"text"}
              placeholder={"Enter Your User Name"}
              icon={<FaPerson />}
              isRequired={true}
            />
            <CustomTextField
              label={"Password"}
              type={"password"}
              value={password}
              name="password"
              onValueChange={(e) => setPassword(e.target.value)}
              placeholder={"Enter Your Password"}
              icon={<FaLock />}
              isRequired={true}
            />
            <CustomButton buttonName="Login" type="submit" />
          </form>

          <p>
            Do not have an account? <Link href={"/signup"}>Register</Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
