import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import { Dialog, Transition } from "@headlessui/react";
import { DotsHorizontalIcon, HeartIcon } from "@heroicons/react/solid";

import {
  AnnotationIcon,
  HeartIcon as HeartOutline,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

import Avatar from "../UI/Avatar";

const GET_POST = gql`
  query GetPost($postId: ID!) {
    post(id: $postId) {
      id
      caption
      comments {
        id
        body
        likeCount
        commentedBy {
          id
          username
          avatar
        }
      }
    }
  }
`;

const GalleryModal = ({ showPost, setShowPost, post, user }) => {
  const { data } = useQuery(GET_POST, {
    variables: { postId: post.id },
  });

  const info = { ...user, ...post, ...data?.post };
  console.log(info);

  return (
    <>
      {data?.post && (
        // Tailwind UI
        <Transition.Root show={showPost} as={Fragment}>
          <Dialog
            as="div"
            className="fixed z-10 inset-0 overflow-y-auto"
            onClose={setShowPost}
          >
            <div className="flex items-center justify-center min-h-screen mx-auto py-8 px-16 text-center">
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-70" />
              <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden max-w-2xl">
                {/* Content goes here */}

                {/* Header */}
                <div className="p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar src={info.avatar} />
                    <Link
                      to={`/${user.username}`}
                      onClick={() => setShowPost(false)}
                      className="text-sm font-medium focus:outline-none"
                    >
                      {info.username}
                    </Link>
                    <button className="text-sm font-medium text-blue-500 focus:outline-none">
                      {info.alreadyFollowing ? "Unfollow" : "Follow"}
                    </button>
                  </div>

                  <DotsHorizontalIcon className="w-5 h-5 cursor-pointer text-gray-800" />
                </div>

                {/* Image */}
                <img
                  src={info.url}
                  alt={`${info.username}'s post`}
                  className="aspect-square object-cover"
                />

                {/* Details */}
                <div className="p-3">
                  {/* Interactive buttons */}
                  <div className=" flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {info.alreadyLiked ? (
                        <HeartIcon className="w-7 h-7 text-red-500 cursor-pointer" />
                      ) : (
                        <HeartOutline className="w-7 h-7 cursor-pointer text-gray-800 hover:text-gray-400" />
                      )}
                      <AnnotationIcon className="h-7 w-7 cursor-pointer text-gray-800 hover:text-gray-400" />
                    </div>
                    <PaperAirplaneIcon className="w-7 h-7 cursor-pointer rotate-45 text-gray-800 hover:text-gray-400" />
                  </div>

                  {/* Like count */}
                  <div className="text-sm font-semibold cursor-pointer mb-2">
                    {info.likeCount} likes
                  </div>

                  {/* Caption*/}
                  <div>
                    {/* When clicking on username, the user profile does not fetch data. same bug as before. it's apollo cache */}
                    <Link
                      to={`/${user.username}`}
                      onClick={() => setShowPost(false)}
                      className="text-sm font-medium focus:outline-none hover:underline"
                    >
                      {info.username}{" "}
                    </Link>
                    <span className="text-sm">{info.caption}</span>
                  </div>

                  {/* Comments */}
                  <section className="max-h-24 overflow-y-scroll">
                    {info.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="flex justify-between items-start"
                      >
                        <div className="w-11/12 ">
                          <Link
                            to={`/${comment.commentedBy.username}`}
                            onClick={() => setShowPost(false)}
                            className="text-sm font-medium focus:outline-none hover:underline"
                          >
                            {comment.commentedBy.username}{" "}
                          </Link>
                          <span className="text-sm">{comment.body}</span>
                        </div>
                        <button className="pr-2">
                          <HeartOutline className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </section>

                  <hr className="opacity-60 my-3" />

                  {/* Add a comment */}
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
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
};

export default GalleryModal;
