import React, { use } from "react";
import Victory from "@/assets/victory.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoginSignupLottieFile from "@/assets/LoginSignupLottieFile.json";
import Lottie from "lottie-react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setUserInfo,
  useUserLoginMutation,
  useUserSignUpMutation,
} from "@/features/user.slice";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const dispatch = useDispatch();
  const [userSignUp] = useUserSignUpMutation();
  const [userLogin] = useUserLoginMutation();

  const validateSignup = () => {
    if (!name.trim()) {
      toast.error("name is required");
      return false;
    }
    if (!password.trim()) {
      toast.error("password is required");
      return false;
    }
    if (!email.trim()) {
      toast.error("email is required");
      return false;
    }
    if (!confirmPassword.trim()) {
      toast.error("confirm password is required");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("password and confirm password do not match");
      return false;
    }
    return true;
  };

  const validateLogin = () => {
    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!password.trim()) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      const result = await userLogin({ email, password });
      if (result.error) {
        toast.error(result.error.data.message || "Something went wrong!");
      }
      if (result.data.user) {
        dispatch(setUserInfo(result.data.user));
        console.log(result.data.user);
        toast.success(result.data?.message || "Login Successful");
        const token = result.data?.jwt;
        if (token) {
          localStorage.setItem("token", token);
        }
        console.log("token",token)
        navigate("/");
        setEmail("");
        setPassword("");
      }
    }
  };
  const handleSignup = async () => {
    if (validateSignup()) {
      try {
        const result = await userSignUp({ name, email, password });
        if (result.error) {
          toast.error(result.error.data?.message || "Signup failed");
        } else {
          // dispatch(setUserInfo(result.data.user));
          toast.success(result.data?.message || "Signup successful");
          // navigate("/profile");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        }
      } catch (error) {
        toast.error(error.data.message);
      }
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center ">
      <div
        className="h-[90vh] bg-white w-[80vw] shadow-2xl text-opacity-90 border-2 border-white md:w-[90vw] lg:w-[70vw] xl:w-[60-vw]
        rounded-3xl grid xl:grid-cols-2
        "
      >
        <div className="flex flex-col gap-10 justify-center items-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl"> welcome</h1>
              <img className="h-[100px]" src={Victory} alt="victory emoji" />
            </div>
            <p className="font-medium text-center">
              Fill in the details to get started with the App
            </p>
          </div>
          <div className="flex items-center justify-center  w-full ">
            <Tabs className="w-3/4  " defaultValue="login">
              <TabsList className="bg-transparent rounded-none w-full flex justify-center">
                <TabsTrigger
                  value="login"
                  className="px-20  data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none data-[state=active]:font-semibold data-[state=active]:text-black data-[state=active]:border-b-purple-500 p3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className=" px-20 data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none data-[state=active]:font-semibold data-[state=active]:text-black data-[state=active]:border-b-purple-500 p3 transition-all duration-300"
                >
                  SignUp
                </TabsTrigger>
              </TabsList>
              <TabsContent className=" flex flex-col gap-5 mt-10" value="login">
                <Input
                  type={"text"}
                  placeholder="Email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type={"password"}
                  placeholder="Password"
                  className="rounded-full p-6 mt-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className={"rounded-full p-6 "} onClick={handleLogin}>
                  Login
                </Button>
              </TabsContent>
              <TabsContent className="flex flex-col  mt-2 " value="signup">
                <Input
                  type={"text"}
                  placeholder="Name"
                  className="rounded-full p-6"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type={"text"}
                  placeholder="Email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type={"password"}
                  placeholder="Password"
                  className="rounded-full p-6 mt-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  type={"password"}
                  placeholder="Confirm Password"
                  className="rounded-full p-6 mt-4"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  className={"rounded-full p-6 mt-4 "}
                  onClick={handleSignup}
                >
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
          <Lottie animationData={LoginSignupLottieFile} loop autoplay />
        </div>
      </div>
    </div>
  );
};

export default Auth;
