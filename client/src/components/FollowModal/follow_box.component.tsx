import React, { useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { REMOVE_FOLLOWING, REMOVE_FOLLOWER } from '../../utils/mutations';
import { useAppSelector } from '../../app/hooks';
import { userProps } from '../../index.types';
import Avatar from "@material-ui/core/Avatar";

type followProps = {
    id: string,
    handle: string,
    avatar: string,
    buttonText: string
}

const FollowBox = ({ id, handle, avatar, buttonText }: followProps) => {

    const [removeFollowing, { }] = useMutation(REMOVE_FOLLOWING);
    const [removeFollower, { }] = useMutation(REMOVE_FOLLOWER);
    const [showButton, setShowButton] = useState(true);

    const currentUser = useAppSelector(state => state.currentUser)
    const { user } = currentUser
    const userInfo: userProps = user

    const handleRemoveFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const Button: HTMLButtonElement = e.currentTarget;
        if (Button.name === "Following") {
            await removeFollowing({
                variables: {
                    follower_user_id: userInfo.id,
                    followed_user_id: id
                }
            });
        }
        if (Button.name === "Remove") {
            await removeFollower({
                variables: {
                    follower_user_id: id,
                    followed_user_id: userInfo.id
                }
            });
        }
        setShowButton(false);
    }

    return (
        <Box
            padding="0.5rem"
            margin="0.1rem"
            sx={{
                "&:hover": {
                    backgroundColor: "#eee",
                },
            }}
        >
            <Grid sx={{ display: "flex", flexDirection: "row", paddingRight: "1rem" }}>
                <Link to={`/home/profile/${id}`}>
                    <Avatar style={{ width: "30px", height: "30px" }} alt="follow-user-image" src={avatar} />
                </Link>
                <Typography
                    sx={{ ml: '50px', mt: '10px', fontSize: "16px", fontWeight: 500, textAlign: "center" }}
                >
                    {handle}
                </Typography>
                {showButton && (
                    <Button
                        variant="outlined"
                        onClick={handleRemoveFollow}
                        name={buttonText}
                        sx={{ marginLeft: 'auto', color: '#000' }}
                    >{buttonText}</Button>
                )}

            </Grid>
        </Box>
    )
}

export default FollowBox
