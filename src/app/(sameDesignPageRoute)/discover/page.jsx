"use client";
import DiscoverUserCardDesign from "@/components/Design/Card-Design/DiscoverUserCardDesign";
import useAuthInfo from "@/Hooks/useAuthInfo";
import useAxios from "@/Hooks/useAxios";
import PrivateRoutes from "@/Routes/PrivateRoutes";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

function Discover() {
  const axiosSecure = useAxios();
  const [search, setSearch] = useState("");

  const { data: userAll = [], isLoading } = useQuery({
    queryKey: ["allUser", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-user?search=${search}`);
      return res.data;
    },
  });

  return (
    <div className="text-black mb-5">
      <div className="mt-3 space-y-1">
        <h2 className="text-2xl md:text-3xl font-bold">Discover People</h2>
        <p className="text-[0.9rem]">
          Connect with amazing people and grow your network
        </p>

        <div className="search-section mt-4">
          <section className="search-input p-3 bg-white shadow rounded-lg">
            <label className="input bg-transparent  border border-gray-300 w-full">
              <IoSearchSharp />
              <input
                type="search"
                className="grow outline-0"
                placeholder="Search by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </section>

          {isLoading ? (
            <div className="flex justify-center items-center">
              <span className="loading loading-spinner text-primary text-2xl"></span>
            </div>
          ) : (
            <section className="mt-4 grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
              {userAll.length === 0 ? (
                <p>No users found</p>
              ) : (
                userAll.map((item) => (
                  <DiscoverUserCardDesign
                    key={item._id}
                    img={item.img}
                    name={item.name}
                    email={item.email}
                  />
                ))
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PageWrapper() {
  return (
    <PrivateRoutes>
      <Discover />
    </PrivateRoutes>
  );
}
