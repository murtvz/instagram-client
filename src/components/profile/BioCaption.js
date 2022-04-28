import React from "react";

const BioCaption = ({ mobile, desktop, user }) => {
  return (
    <>
      {desktop && (
        <div className="mt-6 hidden md:block md:pb-10">
          <p className="text-sm font-medium">{user.name}</p>
          {user.bioText && <p className="text-sm">{user.bioText}</p>}
          {user.bioLink && (
            <a
              className="text-sm font-medium text-blue-800"
              href={user.bioLink}
              target="_blank"
              rel="noreferrer"
            >
              {user.bioLink}
            </a>
          )}
        </div>
      )}

      {mobile && (
        <div className="mt-6 md:hidden">
          <p className="text-sm font-medium">{user.name}</p>
          {user.bioText && <p className="text-sm">{user.bioText}</p>}
          {user.bioLink && (
            <a
              className="text-sm font-medium text-blue-800"
              href={user.bioLink}
              target="_blank"
              rel="noreferrer"
            >
              {user.bioLink}
            </a>
          )}
        </div>
      )}
    </>
  );
};

export default BioCaption;
