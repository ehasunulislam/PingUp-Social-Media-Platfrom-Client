import PrivateRoutes from "@/Routes/PrivateRoutes";

function Connections() {
  return (
    <div className="text-black">
      <div className="mt-3 space-y-1">
        <h2 className="text-2xl md:text-3xl font-bold">Connections</h2>
        <p className="text-[0.9rem]">
          Manage your network and discover new connections
        </p>
      </div>
    </div>
  );
}

export default function PageWrapper() {
  return (
    <PrivateRoutes>
      <Connections />
    </PrivateRoutes>
  );
}
