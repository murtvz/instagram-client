import React from "react";

import Avatar from "../UI/Avatar";
import Followers from "./Followers";
import BioButtons from "./BioButtons";
import BioCaption from "./BioCaption";

const Bio = ({ user }) => {
  return (
    <>
      <div className="p-4">
        <div className="flex items-center space-x-6 md:grid md:grid-cols-3 md:items-start">
          <div className="col-span-1 md:flex md:justify-center md:pb-10 md:pt-4">
            <Avatar size="w-20 h-20 md:w-40 md:h-40" src={user.avatar} />
          </div>
          <div className="md:relative md:col-span-2 md:space-y-7 md:pt-4">
            <div className="md:flex md:w-full">
              <p className="relative -top-2  text-[27px] font-extralight md:top-0 md:mr-8">
                {user.username}
              </p>
              <BioButtons user={user} />
            </div>
            <Followers desktop={true} user={user} />
            <BioCaption desktop={true} user={user} />
          </div>
        </div>
        <hr className="hidden md:block" />
        <BioCaption mobile={true} user={user} />
      </div>
      <Followers mobile={true} user={user} />
    </>
  );
};

export default Bio;
