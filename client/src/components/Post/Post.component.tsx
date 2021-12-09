import React, { useState, useEffect } from "react";
import { Grid, IconButton, Typography, Input, Button } from "@mui/material";
import { Box } from "@mui/system";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IosShareIcon from "@mui/icons-material/IosShare";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { userProps } from '../../index.types';
import { QUERY_USER, QUERY_REACTIONS_BY_POST, QUERY_REACTIONS_BY_USER_POST } from '../../utils/queries';
import { ADD_REACTION_POST, DELETE_REACTION_POST } from '../../utils/mutations';
import { DELETE_POST, ADD_COMMENT } from '../../utils/mutations'
import { useQuery, useMutation } from '@apollo/client';
import CommentList from "../CommentList/comment_list.component";
import PostLoading from "./post_loading.component";
import noAvatar from '../../img/no-avatar.png';

type postProps = {
    postId: number,
    text: string,
    userId: string,
    postTime: Date
};

const Post = ({ postId, text, userId, postTime }: postProps) => {
    const { loading: userLoading, error: userError, data } = useQuery(QUERY_USER, {
        variables: {
            id: userId
        },
    });
    if (data) {
        var { userProfile } = data;
    }
    const { data: likeData, loading: likesLoading, error: likesError } = useQuery(QUERY_REACTIONS_BY_POST, {
        variables: {
            reaction_type: 'LIKE',
            post_id: postId
        },
    });
    if (likeData) {
        var { reactionsByPost: likeList } = likeData;
    }
    const { data: dislikeData, loading: dislikesLoading, error: dislikesError } = useQuery(QUERY_REACTIONS_BY_POST, {
        variables: {
            reaction_type: 'DISLIKE',
            post_id: postId
        },
    });
    if (dislikeData) {
        var { reactionsByPost: dislikeList } = dislikeData;
    }

    const currentUser = useAppSelector(state => state.currentUser)
    const { user } = currentUser
    const userInfo: userProps = user

    const { data: userPostData } = useQuery(QUERY_REACTIONS_BY_USER_POST, {
        variables: {
            user_id: userInfo.id,
            post_id: postId
        },
    });
    if (userPostData) {
        var { reactionsByUserAndPost } = userPostData;
    }

    const [deletePost, { }] = useMutation(DELETE_POST);
    const [addComment, { }] = useMutation(ADD_COMMENT);
    const [displayComment, setDisplayComment] = useState(false);
    const [commentText, setCommentText] = useState("");

    const handleDeletePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await deletePost({ variables: { id: postId } });
    }
    const handleAddComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await addComment({
            variables: {
                user_id: userInfo?.id,
                post_id: postId,
                text: commentText
            }
        });
        setCommentText("");
    }
    const [addReactionOnPost, { }] = useMutation(ADD_REACTION_POST);
    const [deleteReactionOnPost, { }] = useMutation(DELETE_REACTION_POST);
    const handleAddReaction = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const Button: HTMLButtonElement = e.currentTarget;
        try {
            addReactionOnPost({
                variables: {
                    user_id: userInfo?.id,
                    post_id: postId,
                    reaction_type: Button.value
                }
            })
        } catch (e) {
            return e;
        }
    }
    const handleDeleteReaction = (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            deleteReactionOnPost({
                variables: {
                    user_id: userInfo?.id,
                    post_id: postId
                }
            })
        } catch (e) {
            return e;
        }
    }

    let pending = !postId || !text || !userId || !postTime || userLoading || userError || likesLoading || likesError || dislikesLoading || dislikesError

    return (
        <>
            {(pending) ? (
                <PostLoading />
            ) : (
                <Box
                    padding="1rem"
                    width='100%'
                    sx={{
                        "&:hover": {
                            backgroundColor: "#eee",
                        },
                    }}
                >
                    <Grid container flexWrap="nowrap">
                        <Grid item sx={{ paddingRight: "1rem" }}>
                            <Link to={`/home/profile/${userProfile.id}`}>
                                <img src={userProfile.avatar ? userProfile.avatar : noAvatar} alt="logo" width="50px" />
                            </Link>
                        </Grid>
                        <Box width='100%' >
                            <Grid
                                container
                                justifyContent="space-between"
                                alignItems="center"
                                flexWrap="nowrap"

                            >
                                <Grid width='100%' item>
                                    <Box display="flex">
                                        <Typography fontFamily='inherit'
                                            sx={{ fontSize: "16px", fontWeight: 500, mr: "10px" }}
                                        >
                                            {userProfile.handle}
                                        </Typography>
                                        <Typography fontFamily='inherit'
                                            sx={{ fontSize: "15px", mr: "10px", color: "#555" }}
                                        >
                                            @{userProfile.handle.trim().toLowerCase()}
                                        </Typography>
                                        <Typography fontFamily='inherit'
                                            sx={{ fontSize: "15px", ml: "auto", color: "#555" }}
                                        >
                                            {moment(postTime).format('MMM DD YY')}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography fontFamily='inherit' sx={{ fontSize: "15px", color: "#555" }}>
                                            {text}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                        <Typography fontFamily='inherit' sx={{ fontSize: "15px", color: "#555", marginRight: '1rem' }}>
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
                                width='100%'
                                marginRight="5rem"
                                marginTop=".8rem"
                            >
                                <IconButton
                                    onClick={() => setDisplayComment(!displayComment)}
                                    size="small"
                                >
                                    <ChatBubbleOutlineIcon fontSize="small" />
                                </IconButton>
                                {(reactionsByUserAndPost && reactionsByUserAndPost?.reaction_type === 'LIKE') ? (
                                    <IconButton onClick={handleDeleteReaction} size="small">
                                        <FavoriteIcon style={{ color: "#e25349" }} fontSize="small" />
                                    </IconButton>
                                ) : (
                                    <IconButton value='LIKE' size="small" onClick={handleAddReaction} >
                                        <FavoriteBorderIcon fontSize="small" />
                                    </IconButton>
                                )}
                                {(reactionsByUserAndPost && reactionsByUserAndPost?.reaction_type === 'DISLIKE') ? (
                                    <IconButton size="small" onClick={handleDeleteReaction}>
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
                                {(userId === userInfo.id) && (
                                    <IconButton
                                        size="small"
                                        onClick={handleDeletePost}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                )}
                            </Box>
                            {displayComment && (
                                <Box >
                                    <Grid item padding="1rem 1rem 0 1rem" borderBottom="1px solid #ccc">
                                        <Box padding=".5rem 0">
                                            <Input
                                                onChange={(e) => setCommentText(e.target.value)}
                                                value={commentText}
                                                multiline
                                                rows="2"
                                                disableUnderline
                                                type="text"
                                                placeholder="Post your comment"
                                                sx={{ width: "100%" }}
                                            />
                                        </Box>
                                        <Box textAlign="right" paddingBottom=".5rem">
                                            <Button
                                                onClick={handleAddComment}
                                                variant="contained"
                                                disabled={commentText.length === 0}
                                                color="primary"
                                                size="small"
                                                sx={{
                                                    fontSize: "12px",
                                                    fontFamily: 'inherit'
                                                }}
                                            >
                                                Comment
                                            </Button>
                                        </Box>
                                    </Grid>
                                    <Box marginTop="1rem" width="100%">
                                        <CommentList postId={postId} />
                                    </Box>
                                </Box>)}
                        </Box>
                    </Grid>
                </Box>
            )}



        </>
    )
}

export default Post
