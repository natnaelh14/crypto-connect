import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TwitterPostLoading = () => {

    return (
        <>
            <Box
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
                                    <Skeleton
                                        width={75}
                                    />
                                    </Box>
                                    <Box>
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
                                        width={75}
                                    />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default TwitterPostLoading;