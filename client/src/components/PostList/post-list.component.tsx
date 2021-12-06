import React, { useEffect } from 'react';
import Post from '../Post/Post.component';
import AddPost from '../AddPost/add-post.component';
import { Fade } from "@mui/material";
import { useAppSelector } from '../../app/hooks';
import { CircularProgress, Box } from "@mui/material";
const Moment = require('moment');
import { PostListContainer } from './post_list.styles';
import PostLoading from '../Post/post_loading.component';

const PostList: React.FC = () => {

  const postListByFollowing = useAppSelector((state) => state.postListByFollowing)
  const { posts, loading: postsLoading, error: postsError } = postListByFollowing
  let postData: Array<{
    id: number,
    user_id: string,
    text: string,
    created_at: Date
  }> = posts
  let postsData = [...postData].sort((a: any, b: any) => new Moment(b.created_at).format('YYYYMMDDHHMMSS') - new Moment(a.created_at).format('YYYYMMDDHHMMSS'));

  return (
    <PostListContainer>
      <Fade in={true} timeout={1000}>
        <div style={{ border: '1px solid #cdcdcd', padding: '20px' }}>
          {postsData && (
            <>
              <AddPost />
              <Box height="90vh" sx={{ overflowY: "scroll" }}>
                {(postsLoading || postsError) && (
                  <>
                    <PostLoading />
                    <PostLoading />
                    <PostLoading />
                    <PostLoading />
                    <PostLoading />
                  </>
                )}
                {postsData && (
                  postsData.map((post) => <Post key={post.id} postId={post.id} userId={post.user_id} postTime={post.created_at} text={post.text} />
                  ))}
              </Box>
            </>
          )}
        </div>
      </Fade>
    </PostListContainer>
  )
}

export default PostList;
