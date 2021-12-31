import React from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const WhoToFollowLoading = () => {
    return (
        <Box margin="1rem 0">
            <Grid container alignItems="center">
                <Grid item sx={{ paddingRight: "12px" }}>
                    <SkeletonTheme highlightColor="#fff">
                        <section>
                            <Skeleton
                                circle
                                height={50}
                                width={50}
                                containerClassName="avatar-skeleton"
                            />
                        </section>
                    </SkeletonTheme>

                </Grid>
                <Grid item>
                    <Grid container alignItems="center">
                        <Grid item>
                            <Skeleton
                                width={50}
                            />
                            <Skeleton
                                width={50}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default WhoToFollowLoading;
