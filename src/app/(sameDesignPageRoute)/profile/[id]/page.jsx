"use client"
import PrivateRoutes from "@/Routes/PrivateRoutes";
import { useParams } from "next/navigation";

function MyProfile() {
  const params = useParams();
  const id = params.id

  return (
    <div>
      <p>{id}</p>
    </div>
  );
}

export default function PageWrapper() {
  return (
    <PrivateRoutes>
      <MyProfile></MyProfile>
    </PrivateRoutes>
  );
}
