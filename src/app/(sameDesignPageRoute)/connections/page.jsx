"use client"
import AcceptedFriends from "@/components/Friend-Request/AcceptedFriends";
import PendingRequest from "@/components/Friend-Request/PendingRequest";
import PrivateRoutes from "@/Routes/PrivateRoutes";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

function Connections() {
  
  return (
    <div className="text-black">
      <div className="mt-3 space-y-1">
        <h2 className="text-2xl md:text-3xl font-bold">Connections</h2>
        <p className="text-[0.9rem]">
          Manage your network and discover new connections
        </p>
      </div>

      <Tabs>
        <TabList className="flex gap-3 mt-4">
            <Tab className="px-3 py-2 text-[0.9rem] bg-white border border-purple-600 rounded-[3px] cursor-pointer shadow">
                Pending
            </Tab>

            <Tab className="px-3 py-2 text-[0.9rem] bg-white border border-purple-600 rounded-[3px] cursor-pointer shadow">
                Connects
            </Tab>
        </TabList>

        <TabPanel>
            <PendingRequest />
        </TabPanel>

        <TabPanel>
            <AcceptedFriends />
        </TabPanel>
      </Tabs>
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
