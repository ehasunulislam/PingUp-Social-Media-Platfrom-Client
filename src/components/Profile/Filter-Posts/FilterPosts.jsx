import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import AllPostTabs from "./AllPostTabs";
import AllPhotos from "./AllPhotos";

const FilterPosts = () => {
  return (
    <Tabs className="flex flex-col justify-center items-center my-6">
      <TabList className="bg-white border border-gray-300 rounded-lg flex w-45 md:w-65 justify-evenly cursor-pointer py-2">
       <Tab className="text-[0.8rem] md:text[0.9rem] px-5 md:px-9 py-1 rounded-md cursor-pointer" selectedClassName="bg-indigo-500 text-white" >
          Posts
        </Tab> 

        <Tab className="text-[0.8rem] md:text[0.9rem] px-5 md:px-9 py-1 rounded-md cursor-pointer" selectedClassName="bg-indigo-500 text-white" >
          Photos
        </Tab>
      </TabList>

      <section className="mt-6">
        <TabPanel>
          <AllPostTabs />
        </TabPanel>

        <TabPanel>
          <AllPhotos />
        </TabPanel>
      </section>
    </Tabs>
  );
};

export default FilterPosts;
