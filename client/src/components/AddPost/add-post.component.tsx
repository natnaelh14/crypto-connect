
import React, { useState } from "react";
import { Button, Grid, Input, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Box } from "@mui/system";
import { useAppSelector } from '../../app/hooks';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_POST, UPDATE_USER_PROFILE } from "../../utils/mutations";
import { userProps } from '../../index.types';
import AddPostLoading from './add_post_loading.component';
import noAvatar from '../../img/no-avatar.png';
import Avatar from '@material-ui/core/Avatar';

type postProps = {
  refetchPosts: () => void
}

const AddPost = ({ refetchPosts }: postProps) => {
  const currentUser = useAppSelector((state) => state.currentUser);
  const { user, loading: userLoading } = currentUser
  const userInfo: userProps = user

  const [postText, setPostText] = useState("");
  const [mood, setMood] = useState<string>(userInfo?.status)
  const [addPost, { }] = useMutation(ADD_POST);
  const [updateProfile, { }] = useMutation(UPDATE_USER_PROFILE)

  const handleAddPost = async () => {
    try {
      await addPost({
        variables: {
          user_id: userInfo.id,
          text: postText
        }
      }).then(() => {
        refetchPosts();
      })
        setPostText("");

    } catch (e) {
      return e;
    }

  }

  const handleChangeMood = async (event: SelectChangeEvent<any>) => {
    event.preventDefault();
    try {
      setMood(event.target.value)
      const updatedUser = await updateProfile({
        variables: {
          ...userInfo,
          status: event.target.value
        }
      })
      // await dispatch(setCurrentUser(updatedUser))
    } catch (e) {
      throw new Error('Unable to Update Profile')
    }
  }

  return (
    <>
      {(userLoading) ? (
        <AddPostLoading />
      ) : (
        <Box padding="1rem 1rem 0 1rem" borderBottom="1px solid #ccc">
          <Grid >
            <Grid item sx={{ paddingRight: "1rem" }}>
              <Avatar alt="user-image" style={{ width: "50px", height: "50px" }} src={userInfo.avatar ? userInfo.avatar : noAvatar} />
            </Grid>
            <Grid item >
              <Box padding=".5rem 0">
                <Input
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  multiline
                  rows="2"
                  disableUnderline
                  type="text"
                  placeholder="What's new in Crypto World?"
                  sx={{ width: "100%", fontFamily: 'inherit' }}
                />
              </Box>
              <Box
                paddingBottom=".5rem"
                paddingTop=".8rem"
                borderTop="1px solid #ccc"
              >
                <Box textAlign="left">
                  <FormControl style={{ minWidth: 120 }} >
                    <InputLabel id="demo-simple-select-label">Mood</InputLabel>
                    <Select
                      id="demo-simple-select"
                      value={mood ? mood : ""}
                      defaultValue={mood}
                      variant="standard"
                      onChange={handleChangeMood}
                      sx={{ fontFamily: 'inherit' }}
                    >
                      <MenuItem value='HAPPY'>HAPPY 😀</MenuItem>
                      <MenuItem value='SAD'>SAD 😔</MenuItem>
                      <MenuItem value='EXCITED'>EXCITED 😃</MenuItem>
                      <MenuItem value='AMUSED'>AMUSED 🙂</MenuItem>
                      <MenuItem value='OPTIMISTIC'>OPTIMISTIC 😊</MenuItem>
                      <MenuItem value='FRUSTRATED'>FRUSTRATED 😩</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box textAlign="right">
                  <Button
                    onClick={handleAddPost}
                    disabled={postText.length === 0}
                    variant="contained"
                    color="primary"
                    sx={{
                      fontSize: "12px",
                      fontFamily: 'inherit'
                    }}
                  >
                    POST
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default AddPost;