import React from "react";
import { HeartIcon } from "@heroicons/react/outline";

import Comment from "./Caption";

const Comments = ({ comments, setOpen }) => {
  const token = localStorage.getItem("token");

  return (
    <section className="max-h-24 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      {comments.map((comment) => (
        <div key={comment.id} className="flex justify-between items-start">
          <div className="w-11/12 ">
            <Comment
              username={comment.commentedBy.username}
              setOpen={setOpen}
              body={comment.body}
            />
          </div>
          <button className="pr-4">
            {token && <HeartIcon className="w-4 h-4" />}
          </button>
        </div>
      ))}
    </section>
  );
};

export default Comments;
