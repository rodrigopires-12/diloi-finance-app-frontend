"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import api from "@/utils/api";
import { login, isAuthenticated } from "@/utils/auth";
import { Toast } from "@/components";

const LoginPage = () => {
  const { push } = useRouter();
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);

  const [loginData, setLoginData] = useState<any>({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    isAuthenticated().then((response) => {
      if (response) {
        push("/dashboard");
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitLoading(true);
    try {
      const bodyFormData = new FormData();
      bodyFormData.append("username", loginData.username);
      bodyFormData.append("password", loginData.password);
      const response: any = await api.post("/login/", bodyFormData);

      login(response.data.access_token);
      const previousPathName = sessionStorage.getItem("previousPathName");
      if (previousPathName && previousPathName !== "/") {
        const path = previousPathName;
        sessionStorage.removeItem("previousPathName");
        push(path);
      } else {
        const path = "/dashboard";
        push(path);
      }
    } catch (error: any) {
      setIsSubmitLoading(false);
      if (error.response?.status === 401) {
        setErrorMessage(error.response.data.detail);
        setIsSubmitLoading(false);
        return;
      }
      console.error("Unexpected error on login:", error);
      Toast({
        type: "error",
        message:
          "Aconteceu um erro ao realizar o login. Porfavor, tente novamente.",
        position: "bottom-right",
        open: true,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100 px-4">
      <div className="w-full max-w-sm bg-gray-800 shadow-md rounded-lg p-6">
        <div className="flex flex-col justify-between items-center ">
          <Image
            src="/diloi-finance-logo.png" // Path to your image
            alt="Diloi Finance Logo"
            width={80} // Adjust width and height as needed
            height={80}
            className="mb-4"
          />
          <h2 className="text-2xl font-bold text-center text-gray-100">
            Diloi Finance App
          </h2>
        </div>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-gray-300">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="input input-bordered w-full bg-gray-700 text-gray-100 placeholder-gray-400"
              data-placeholder="Username"
              autoCapitalize="none"
              value={loginData.username}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setLoginData({ ...loginData, username: event.target.value });
              }}
            />
          </div>
          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text text-gray-300">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full bg-gray-700 text-gray-100 placeholder-gray-400"
              data-placeholder="Password"
              autoCapitalize="none"
              value={loginData.password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setLoginData({ ...loginData, password: event.target.value });
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
            disabled={
              !(loginData.username && loginData.password) || isSubmitLoading
            }
          >
            Login
          </button>
          {errorMessage && (
            <span className="text-[16px] text-center text-red-700 mt-4">
              {errorMessage}
            </span>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
