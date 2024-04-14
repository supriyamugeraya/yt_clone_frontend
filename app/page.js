"use client";
import Image from "next/image";
import LoginPage from "./login/page";
import { CustomButton } from "./components/customButton";
import { QueryClientProvider, QueryClient, useQueryClient } from "react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [queryClient] = useState(() => new QueryClient());

  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex w-screen h-screen justify-center items-center">
        <div className="w-[20%]">
          <CustomButton
            buttonName={"Sign In"}
            onClick={() => router.push("/login")}
          />
        </div>
      </div>
    </QueryClientProvider>
  );
}
