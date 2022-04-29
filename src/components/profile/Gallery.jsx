import React, { useState } from "react";
import Post from "./GalleryItem";
import GalleryModal from "./GalleryModal";

const Gallery = ({ user }) => {
  const [showPost, setShowPost] = useState(false);
  const [post, setPost] = useState();

  return (
    <>
      {/* Post Modal */}
      {showPost && (
        <GalleryModal
          showPost={showPost}
          post={post}
          setShowPost={setShowPost}
          user={{
            avatar: user.avatar,
            username: user.username,
            alreadyFollowing: user.alreadyFollowing,
            followsMe: user.followsMe,
          }}
        />
      )}
      {/* Posts gallery */}
      <ul className="grid w-full grid-cols-3 gap-1 md:gap-7 md:px-4">
        {user.posts.map((post) => (
          <Post
            url={post.url}
            likes={post.likeCount}
            alreadyLiked={post.alreadyLiked}
            comments={post.commentCount}
            key={post.id}
            onClick={() => {
              setShowPost(true);
              setPost(post);
            }}
          />
        ))}
      </ul>
    </>
  );
};

export default Gallery;
