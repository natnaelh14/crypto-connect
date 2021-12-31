import React from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import IosShareIcon from "@mui/icons-material/IosShare";
const Moment = require("moment");
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_REACTIONS_BY_COMMENT, QUERY_REACTIONS_BY_USER_COMMENT } from "../../utils/queries";
import { DELETE_COMMENT, ADD_REACTION_COMMENT, DELETE_REACTION_COMMENT } from "../../utils/mutations";
import { useAppSelector } from "../../app/hooks";
import { userProps } from "../../index.types";
import Avatar from "@material-ui/core/Avatar";
import noAvatar from "../../img/no-avatar.png";
import { Link } from "react-router-dom";

type commentProps = {
  commentId: number,
  postId: number,
  userId: string,
  text: string,
  commentTime: Date,
  commentsRefetch: () => void
};

const Comment = ({ commentId, postId, userId, text, commentTime, commentsRefetch }: commentProps) => {

  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: {
      id: userId
    },
  });
  const { userProfile } = data;
  const { data: likeData, refetch: likesRefetch } = useQuery(QUERY_REACTIONS_BY_COMMENT, {
    variables: {
      reaction_type: "LIKE",
      comment_id: commentId
    },
  });
  if (likeData) {
    var { reactionsByComment: likeList } = likeData;
  }
  const { data: dislikeData, refetch: dislikesRefetch } = useQuery(QUERY_REACTIONS_BY_COMMENT, {
    variables: {
      reaction_type: "DISLIKE",
      comment_id: commentId
    },
  });
  if (dislikeData) {
    var { reactionsByComment: dislikeList } = dislikeData;
  }
  const currentUser = useAppSelector(state => state.currentUser)
  const { user } = currentUser
  const userInfo: userProps = user
  const { data: userPostData, refetch: userReactionsRefetch } = useQuery(QUERY_REACTIONS_BY_USER_COMMENT, {
    variables: {
      user_id: userInfo.id,
      comment_id: commentId
    },
  });
  if (userPostData) {
    var { reactionsByUserAndComment } = userPostData;
  }

  const [deleteComment, { }] = useMutation(DELETE_COMMENT);
  const handleDeleteComment = async () => {
    try {
      await deleteComment({
        variables: { id: commentId }
      }).then(() => {
        commentsRefetch();
      })
    } catch (e) {
      throw new Error("Unable to delete comment")
    }
  }

  const [addReactionOnComment, { }] = useMutation(ADD_REACTION_COMMENT);
  const [deleteReactionOnComment, { }] = useMutation(DELETE_REACTION_COMMENT);
  const handleAddReaction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const Button: HTMLButtonElement = e.currentTarget;
    try {
      addReactionOnComment({
        variables: {
          user_id: userId,
          comment_id: commentId,
          reaction_type: Button.value
        }
      }).then(() => {
        userReactionsRefetch();
        dislikesRefetch();
        likesRefetch();
      })
    } catch (e) {
      throw new Error("Unable to Add a Reaction")
    }
  }
  const handleDeleteReaction = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      deleteReactionOnComment({
        variables: {
          user_id: userId,
          comment_id: commentId
        }
      }).then(() => {
        userReactionsRefetch();
        dislikesRefetch();
        likesRefetch();
      })
    } catch (e) {
      throw new Error("Unable to Delete a Reaction")
    }
  }

  return (
    <Box
      padding="1rem"
      sx={{
        "&:hover": {
          backgroundColor: "#eee",
        },
      }}
    >
      <Grid container flexWrap="nowrap">
        <Grid item sx={{ paddingRight: "1rem" }}>
          <Link to={`/home/profile/${userProfile?.id}`}>
            <Avatar src={userProfile?.avatar ? userProfile?.avatar : noAvatar} alt='user-logo' style={{ width: "50px", height: "50px" }} />
          </Link>
        </Grid>
        <Box width="100%"
        >
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            flexWrap="nowrap"
          >
            <Grid width='100%' item>
              <Box display="flex">
                <Typography fontFamily='inherit'
                  sx={{ fontSize: "16px", fontWeight: 500, mr: "6px" }}
                >
                  {userProfile.handle}
                </Typography>
                <Typography fontFamily='inherit'
                  sx={{ fontSize: "12px", mr: "8px", color: "#555" }}
                >
                  @{userProfile.handle.toLowerCase().trim()}
                </Typography>
                <Typography fontFamily='inherit'
                  sx={{ fontSize: "15px", ml: "auto", color: "#555" }}
                >
                  {Moment(commentTime).format("MMM DD YY")}
                </Typography>
              </Box>
              <Box>
                <Typography fontFamily='inherit' sx={{ fontSize: "15px", color: "#555", textAlign: "left" }}>
                  {text}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography fontFamily='inherit' sx={{ fontSize: "15px", color: "#555", marginRight: "1rem" }}>
                  {likeList ? likeList.length : 0}
                  <FavoriteIcon style={{ color: "#e25349" }} fontSize="small" />
                </Typography>
                <Typography fontFamily='inherit' sx={{ fontSize: "15px", color: "#555" }}>
                  {dislikeList ? dislikeList.length : 0}
                  <ThumbDownIcon style={{ color: "#e25349" }} fontSize="small" />
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box
            display="flex"
            justifyContent="space-between"
            marginRight="5rem"
            marginTop=".8rem"
            width="100%"
          >
            {(reactionsByUserAndComment && reactionsByUserAndComment.reaction_type === "LIKE") ? (
              <IconButton size="small" onClick={handleDeleteReaction} >
                <FavoriteIcon style={{ color: "#e25349" }} fontSize="small" />
              </IconButton>
            ) : (
              <IconButton value='LIKE' size="small" onClick={handleAddReaction} >
                <FavoriteBorderIcon fontSize="small" />
              </IconButton>
            )}
            {(reactionsByUserAndComment && reactionsByUserAndComment.reaction_type === "DISLIKE") ? (
              <IconButton size="small" onClick={handleDeleteReaction} >
                <ThumbDownIcon style={{ color: "#e25349" }} fontSize="small" />
              </IconButton>
            ) : (
              <IconButton value='DISLIKE' size="small" onClick={handleAddReaction} >
                <ThumbDownAltOutlinedIcon fontSize="small" />
              </IconButton>
            )}
            {!(userId === userInfo.id) && (
              <IconButton size="small">
                <IosShareIcon fontSize="small" />
              </IconButton>
            )}
            <IconButton size="small" onClick={handleDeleteComment} >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Grid>
    </Box>
  )
};

export default Comment;