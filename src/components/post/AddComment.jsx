import React from "react";

const AddComment = () => {
  return (
    <form className="flex">
      <div className="w-full">
        <input
          type="text"
          className="w-full border-0 focus:ring-0 placeholder:text-sm"
          placeholder="Add a comment"
        />
      </div>
      <button
        type="submit"
        className="text-sm font-medium text-blue-500 disabled:text-blue-300"
        disabled
      >
        Post
      </button>
    </form>
  );
};

export default AddComment;
