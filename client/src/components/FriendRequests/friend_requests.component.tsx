import React from "react";
import { Fade, Typography, IconButton } from "@mui/material";
import FriendRequestBox from "../FriendRequestBox/friend_request_box.component";
import { useQuery } from "@apollo/client";
import { QUERY_FRIEND_REQUESTS } from "../../utils/queries";
import { useAppSelector } from "../../app/hooks";
import FriendRequestBoxLoading from "../FriendRequestBox/friend_request_box_loading.component";
import { FriendRequestsContainer } from "./friend_request.styles";
import { Box } from "@mui/system";
import RefreshIcon from "@mui/icons-material/Refresh";

type userProps = {
    id: string,
    handle: string,
    avatar: string
}

const FriendRequests = () => {
    const currentUser = useAppSelector(state => state.currentUser)
    const { user, loading: userLoading }: {
        user: userProps,
        loading: boolean
    } = currentUser
    // ! TEST WORLD
    // if (currentUser) {
        // @ts-ignore
        const { loading, error, data, refetch } = useQuery(QUERY_FRIEND_REQUESTS, {
            variables: {
                id: user?.id
            }
        });
    // }
    // if (data) {
        const friendRequestsData = data?.friendRequests
    // }
    const getRequests = () => {
        refetch();
    }

    return (
        <FriendRequestsContainer>
            <Fade in={true} timeout={1000}>
                <div style={{ border: "1px solid #cdcdcd", height: "90vh", padding: "20px" }}>
                    <Typography variant='h5' textAlign='center' >Friend Requests</Typography>
                    <Box
                        paddingBottom=".5rem"
                        paddingTop=".5rem"
                        marginTop='0.5rem'
                        borderTop="1px solid #ccc"
                    >
                        {(loading || !data || userLoading || error) && (
                            <>
                                <FriendRequestBoxLoading />
                                <FriendRequestBoxLoading />
                                <FriendRequestBoxLoading />
                                <FriendRequestBoxLoading />
                                <FriendRequestBoxLoading />
                            </>
                        )}
                        {friendRequestsData && (
                            <Box sx={{ display: "flex", justifyContent: "center" }} >
                                <IconButton size="medium" onClick={getRequests} >
                                    <RefreshIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        )}
                        {friendRequestsData && (
                            friendRequestsData.map((user: any) => {
                                return <FriendRequestBox key={user.id} userId={user.id} userHandle={user.handle} userAvatar={user.avatar} updateRequest={refetch} />
                            })
                        )}
                    </Box>
                </div>
            </Fade>
        </FriendRequestsContainer>
    )
}

export default FriendRequests;
