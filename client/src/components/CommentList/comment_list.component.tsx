import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Grid, IconButton, Input, Button } from "@mui/material";
import { Box } from "@mui/system";
import { QUERY_COMMENTS } from '../../utils/queries';
import Comment from '../Comment/comment.component';
const Moment = require('moment');
import { ADD_COMMENT } from '../../utils/mutations';
import RefreshIcon from '@mui/icons-material/Refresh';

type postListProps = {
    postId: number,
    userId: string
};

const CommentList = ({ postId, userId }: postListProps) => {

    const [commentText, setCommentText] = useState("");
    const [addComment, { }] = useMutation(ADD_COMMENT);

    const { error, loading, data, refetch: commentsRefetch } = useQuery(QUERY_COMMENTS, {
        variables: { post_id: postId },
    });
    if (data) {
        var { comments } = data;
        var commentArray: Array<{
            id: number,
            post_id: number,
            user_id: string,
            text: string,
            created_at: Date
        }> | undefined = [...comments].sort((a: any, b: any) => new Moment(b.created_at).format('YYYYMMDDHHMMSS') - new Moment(a.created_at).format('YYYYMMDDHHMMSS'));
    }

    const handleAddComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await addComment({
            variables: {
                user_id: userId,
                post_id: postId,
                text: commentText
            }
        }).then(() => {
            commentsRefetch();
        })
        setCommentText("");
    }

    return (
        <>
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
                                textTransform: "capitalize",
                                fontFamily: 'inherit',
                                borderRadius: '12px',
                                fontSize: '12px',
                                mt: "4px",
                                background: "black",
                                "&:hover": {
                                  background: "#333",
                                },
                              }}
                        >
                            COMMENT
                        </Button>
                    </Box>
                </Grid>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }} >
                <IconButton size="medium" onClick={() => commentsRefetch()} >
                    <RefreshIcon fontSize="small" />
                </IconButton>
            </Box>
            <Box marginTop="1rem" width="100%">
                {error && (
                    <div>No Comment</div>
                )}
                {loading && (
                    <div>It is loading</div>
                )}
                {(commentArray) &&
                    commentArray.map((comment) => <Comment key={comment.id} commentId={comment.id} postId={comment.post_id} userId={comment.user_id} commentTime={comment.created_at} text={comment.text} commentsRefetch={commentsRefetch} />)}
            </Box>
        </>
    )
}
export default CommentList;
