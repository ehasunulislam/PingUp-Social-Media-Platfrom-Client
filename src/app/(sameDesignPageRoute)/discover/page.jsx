import PrivateRoutes from "@/Routes/PrivateRoutes";
import Image from "next/image";
import { IoSearchSharp } from "react-icons/io5";

function Discover() {
  return (
    <div className="text-black">
      <div className="mt-3 space-y-1">
        <h2 className="text-3xl font-bold">Discover People</h2>
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
                placeholder="Search people by name"
              />
            </label>
          </section>

          <section className="mt-4">
            <div className="card shadow-sm border border-gray-300 w-70 flex justify-center items-center py-3">
              <figure className="relative w-20 h-20 rounded-full overflow-hidden border border-gray-400">
                <Image
                  src="/assets/default-user.jpg"
                  alt="user image"
                  fill
                  className="object-cover rounded-full"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Card Title</h2>
                <p>
                  A card component has a figure, a body part, and inside body
                  there are title and actions parts
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </section>
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
