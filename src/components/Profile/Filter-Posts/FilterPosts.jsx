import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const FilterPosts = () => {
  return (
    <Tabs className="flex flex-col justify-center items-center my-6">
      <TabList className="bg-white border border-gray-300 rounded-lg flex w-85 justify-evenly cursor-pointer py-2">
       <Tab className="px-8 py-1 rounded-md cursor-pointer" selectedClassName="bg-indigo-500 text-white" >
          Posts
        </Tab>

        <Tab className="px-8 py-1 rounded-md cursor-pointer" selectedClassName="bg-indigo-500 text-white" >
          Photos
        </Tab>

        <Tab className="px-8 py-1 rounded-md cursor-pointer" selectedClassName="bg-indigo-500 text-white" >
          Text
        </Tab>
      </TabList>

      <section className="mt-6">
        <TabPanel>
          <h2>All Post</h2>
        </TabPanel>

        <TabPanel>
          <h2>Photos</h2>
        </TabPanel>

        <TabPanel>
          <h2>text</h2>
        </TabPanel>
      </section>
    </Tabs>
  );
};

export default FilterPosts;
