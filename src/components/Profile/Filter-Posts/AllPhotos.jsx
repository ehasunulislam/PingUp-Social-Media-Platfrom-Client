"use client"
import AllPhotosDesign from '@/components/Design/Profile-Design/AllPhotosDesign';
import useAxios from '@/Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';

const AllPhotos = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  
  const { data: posts = [] } = useQuery({
    queryKey: ["photos", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/getAll-posts/${id}`);
      return res.data;
    }
  });

  console.log(posts)


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-4">
      {posts.length === 0 ? (
        <p>No photos found</p>
      ) : (
        posts.map((item) => 
          <AllPhotosDesign key={item._id} img={item.img} />
        )
      )}
    </div>
  );
};

export default AllPhotos;
