import React, { useState } from 'react';
import { Grid, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const FriendRequestBoxLoading = () => {

    return (
        <>
            <Box
                padding="1rem"
                sx={{
                    marginTop: '10px',
                    marginBottom: '10px',
                    "&:hover": {
                        backgroundColor: "#eee",
                    },
                }}
            >
                <Grid container flexWrap="nowrap">
                    <Grid item sx={{ paddingRight: "1rem" }}>
                        <Skeleton
                            circle
                            height={50}
                            width={50}
                            containerClassName="avatar-skeleton"
                        />
                    </Grid>
                    <Box>
                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            flexWrap="nowrap"
                        >
                            <Grid item>
                                <Box>
                                    <Typography sx={{ fontSize: "15px", color: "#555" }}>
                                        <Skeleton count={1} width={400} />
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
                            <Skeleton
                                width={100}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Box>
        </>
    )
}

export default FriendRequestBoxLoading