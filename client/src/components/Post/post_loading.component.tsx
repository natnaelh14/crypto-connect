import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostLoading = () => {
    return (
        <>
            <Box
                padding="1rem"
                width='100%'
            >
                <Grid container flexWrap="nowrap" width='100%'>
                    <Grid item sx={{ paddingRight: "1rem" }}>
                        <Skeleton
                            circle
                            height={50}
                            width={50}
                            containerClassName="avatar-skeleton"
                        />
                    </Grid>
                    <Grid item >
                        <Box width='100%'>
                            <Grid
                                container
                                justifyContent="space-between"
                                alignItems="center"
                                flexWrap="nowrap"
                            >
                                <Grid item width='100%'>
                                    <Box display="flex">
                                        <Skeleton count={3} width={800} />
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
                                    width={200}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default PostLoading;
