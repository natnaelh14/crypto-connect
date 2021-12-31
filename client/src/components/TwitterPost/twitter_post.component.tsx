import React, { useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import IosShareIcon from "@mui/icons-material/IosShare";
import ShareModal from "../ShareModal/share-modal.component";
import { useAppSelector } from "../../app/hooks";
import { userProps } from "../../index.types";

const TwitterPost: React.FC<{ text: string }> = ({ text }) => {
    const currentUser = useAppSelector(state => state.currentUser)
    const { error: currentUserError, loading: currentUserLoading, user } = currentUser
    const userInfo: userProps = user
    const [openShareModal, setOpenShareModal] = useState(false);
    const handleModalClose = () => {
        setOpenShareModal(false)
    };

    return (
        <>
            <Box
                // width='auto'
                padding="1rem"
                sx={{
                    "&:hover": {
                        backgroundColor: "#eee",
                    },
                }}
            >
                <Grid container flexWrap="nowrap">
                    <Grid item >
                        <Box>
                            <Grid
                                container
                                justifyContent="space-between"
                                alignItems="center"
                                flexWrap="nowrap"
                            >
                                <Grid item>
                                    <Box display="flex">
                                        <Typography fontFamily='inherit'
                                            sx={{ fontSize: "15px", mr: "10px", color: "#555" }}
                                        >
                                            @twitter-user
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography fontFamily='inherit' sx={{ fontSize: "15px", color: "#555" }}>
                                            {text}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                marginRight="5rem"
                                marginTop=".8rem"
                            >
                                <IconButton size="small" onClick={() => setOpenShareModal(!openShareModal)}>
                                    <IosShareIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            {openShareModal && (
                <ShareModal
                    open={openShareModal}
                    handleClose={handleModalClose}
                    shareText={text}
                    textAuthor={`Twitter User`}
                    currentUserId={userInfo?.id}
                    currentUserName={userInfo?.handle}
                    currentUserAvatar={userInfo?.avatar}
                />
            )}
        </>
    )
}

export default TwitterPost