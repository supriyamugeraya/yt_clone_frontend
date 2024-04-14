"use client";
import { useState } from "react";
import { NavBar } from "../components/navBar";
import { QueryClient, QueryClientProvider } from "react-query";

const HomeLayout = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col space-y-3 px-4 bg-white pb-4">
          <NavBar />
          {children}
        </div>
      </QueryClientProvider>
    </>
  );
};
export default HomeLayout;
