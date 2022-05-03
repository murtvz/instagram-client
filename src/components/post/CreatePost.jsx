import React, { useRef } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { XIcon } from "@heroicons/react/solid";

import Avatar from "../UI/Avatar";
import Modal from "../UI/Modal";
import { GET_FEED } from "../../pages/Feed";
import { GET_USER } from "../../pages/Profile";

const GET_AVATAR = gql`
  query GetUser($username: String!) {
    user(username: $username) {
      id
      avatar
    }
  }
`;

const CREATE_POST = gql`
  mutation Post($url: String!, $caption: String) {
    post(url: $url, caption: $caption) {
      id
      url
      caption
      postedBy {
        id
      }
    }
  }
`;

const CreatePost = ({ open, setOpen }) => {
  const captionRef = useRef();
  const urlRef = useRef();

  const me = localStorage.getItem("me");
  const { data } = useQuery(GET_AVATAR, {
    variables: {
      username: me,
    },
  });

  const [createPost] = useMutation(CREATE_POST, {
    update: (cache, { data: { post } }) => {
      const feed = cache.readQuery({ query: GET_FEED });
      const gallery = cache.readQuery({
        query: GET_USER,
        variables: { username: me },
      });

      // Update feed cache
      if (feed) {
        cache.writeQuery({
          query: GET_FEED,
          data: {
            feed: [
              {
                ...post,
                comments: [],
                likeCount: 0,
                alreadyLiked: false,
                postedBy: {
                  ...post.postedBy,
                  username: me,
                  avatar: data.user.avatar,
                },
              },
              ...feed.feed,
            ],
          },
        });
      }

      // Update user profile gallery cache
      if (gallery) {
        cache.writeQuery({
          query: GET_USER,
          data: {
            user: {
              ...gallery.user,
              postCount: gallery.user.postCount + 1,
              posts: [
                { ...post, commentCount: 0, likeCount: 0, alreadyLiked: false },
                ...gallery.user.posts,
              ],
            },
          },
        });
      }
    },
    onCompleted: () => {
      setOpen(false);
    },
  });

  const handleShare = (e) => {
    e.preventDefault();

    const caption = captionRef.current.value;
    const url = urlRef.current.value;

    if (url) {
      createPost({
        variables: {
          caption,
          url,
        },
      });
    }
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="bg-white rounded-lg">
        <div className="w-full flex justify-between items-center p-3">
          <XIcon
            className="w-5 h-5 cursor-pointer"
            onClick={() => setOpen(false)}
          />
          <h1 className="font-medium ">Create new Post</h1>
          <button
            className="text-sm font-medium text-blue-500 disabled:text-blue-300 focus:outline-none"
            onClick={handleShare}
          >
            Share
          </button>
        </div>

        <hr className="w-full" />

        <div className="p-3 space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <Avatar src={data?.user?.avatar} />
            <div className="font-medium">{me}</div>
          </div>
          <form onSubmit={handleShare} className="flex flex-col space-y-2">
            <input
              type="text"
              required
              placeholder="Image url"
              className="border-0 border-b-[1px] border-b-gray-300 focus:border-b-gray-400 focus:ring-0 placeholder:text-sm w-80 sm:w-96"
              ref={urlRef}
            />
            <input
              type="text"
              placeholder="Write a caption"
              className="border-0 border-b-[1px] border-b-gray-300 focus:border-b-gray-400 focus:ring-0 placeholder:text-sm"
              ref={captionRef}
            />
            {/* Button below is just a placeholder so that the form submits upon enter */}
            <button type="submit" className="hidden"></button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CreatePost;
