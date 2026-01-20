import Link from 'next/link';
import React from 'react'
import { FaBriefcase, FaLink, FaSchool } from 'react-icons/fa6';
import { IoIosSchool } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";

const EditProfileDesign = ({about, college, school, currentCity, country, website, workplace}) => {
  return (
    <div className='mt-3'>
        {about && (
            <p className="text-[0.7rem] md:text-[0.8rem] text-justify">
                {about}
            </p>
        )}

        <section className='flex flex-col md:flex-row justify-between mt-3'>
            <div>
                {college && (
                    <p className="flex items-center gap-2 text-[0.6963rem] md:text-[0.9rem]">
                     <IoIosSchool /> {college}
                    </p>
                )}

                {school && (
                    <p className="flex items-center gap-2 text-[0.6963rem] md:text-[0.9rem]">
                    <FaSchool /> {school}
                    </p>
                )}

                {(currentCity || country) && (
                    <p className="flex items-center gap-2 text-[0.6963rem] md:text-[0.9rem]">
                    <MdLocationOn />
                    {[currentCity, country].filter(Boolean).join(", ")}
                    </p>
                )}
            </div>

            <div>
                {website && (
                    <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[0.6963rem] md:text-[0.9rem] text-blue-500"
                    >
                        <FaLink /> {website}
                    </a>
                )}

                {workplace && (
                    <p className="flex items-center gap-2 text-[0.6963rem] md:text-[0.9rem]">
                    <FaBriefcase /> {workplace}
                    </p>
                )}
            </div>
        </section>
    </div>
  )
}

export default EditProfileDesign