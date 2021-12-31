import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SingleMessageLoading = () => {

    return (
        <Box
            padding="1rem"
            width='100%'
            sx={{
                marginTop: "10px",
                marginBottom: "10px",
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
                <Box width='100%'>
                    <Grid width='100%'>
                        <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
                            <Typography sx={{ fontSize: "15px", color: "#555" }}>
                                <Skeleton
                                    width={100}
                                />
                            </Typography>
                            <Typography sx={{ marginLeft: "auto", fontSize: "15px", color: "#555" }}>
                                <Skeleton
                                    width={100}
                                />
                            </Typography>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: "15px", color: "#555" }}>
                                <Skeleton count={3} width={600} />
                            </Typography>
                        </Box>
                    </Grid>
                </Box>
            </Grid>
        </Box>
    )
}

export default SingleMessageLoading;