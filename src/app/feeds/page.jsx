import MyDay from "@/components/Fedds-com/MyDay";
import PrivateRoutes from "@/Routes/PrivateRoutes";

function FeedPage() {
  return (
    <div className="mt-4 px-4">
      <div className="myDay-section">
        <MyDay />
      </div>
    </div>
  );
}

export default function PageWrapper() {
  return(
    <PrivateRoutes>
      <FeedPage></FeedPage>
    </PrivateRoutes>
  )
}
