import React, { useEffect } from 'react';
import Post from '../Post/Post.component';
import AddPost from '../AddPost/add-post.component';
import { Fade, IconButton } from "@mui/material";
import { useAppSelector } from '../../app/hooks';
import { Box } from "@mui/material";
const Moment = require('moment');
import { PostListContainer } from './post_list.styles';
import PostLoading from '../Post/post_loading.component';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS_BY_FOLLOWING } from '../../utils/queries';
import { userProps } from '../../index.types';
import RefreshIcon from '@mui/icons-material/Refresh';

const PostList: React.FC = () => {
  const currentUser = useAppSelector(state => state.currentUser)
  const { error: currentUserError, loading: currentUserLoading, user } = currentUser
  const userInfo: userProps = user
  const { error: postsError, loading: postsLoading, data, refetch } = useQuery(QUERY_POSTS_BY_FOLLOWING, {
    variables: {
      user_id: userInfo.id
    }
  });

  if (data) {
    var { postsByFollowing } = data;
    var postsArray: Array<{
      id: number,
      user_id: string,
      text: string,
      created_at: Date
    }> | undefined = [...postsByFollowing].sort((a: any, b: any) => new Moment(b.created_at).format('YYYYMMDDHHMMSS') - new Moment(a.created_at).format('YYYYMMDDHHMMSS'));
  }

  useEffect(() => {
    refetch();
  }, [])

  return (
    <PostListContainer>
      <Fade in={true} timeout={1000}>
        <div style={{ border: '1px solid #cdcdcd', padding: '20px' }}>
          <>
            <AddPost refetchPosts={refetch} />
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
              {postsArray && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }} >
                  <IconButton size="medium" onClick={() => refetch()} >
                    <RefreshIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
              {postsArray && (
                postsArray.map((post: any) => <Post key={post.id} postId={post.id} userId={post.user_id} postTime={post.created_at} text={post.text} refetchPosts={refetch} />
                ))}
            </Box>
          </>
        </div>
      </Fade>
    </PostListContainer>
  )
}

export default PostList;
