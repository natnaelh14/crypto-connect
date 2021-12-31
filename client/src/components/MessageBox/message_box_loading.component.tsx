import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const MessageBoxLoading = () => {

    return (
        <>
            <Box
                padding="1rem"
                width='100%'
                sx={{
                    marginTop: "10px",
                    marginBottom: "10px",
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
                    <Box width='100%' >
                        <Grid
                            container
                        >
                            <Grid width='100%'
                            >
                                <Box sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                                    <Typography>
                                        <Skeleton
                                            width={100}
                                        />
                                    </Typography>
                                    <Typography sx={{ marginLeft: "auto"}}>
                                        <Skeleton
                                            width={25}
                                        />
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        sx={{
                                            display: "-webkit-box",
                                            overflow: "hidden",
                                            WebkitBoxOrient: "vertical",
                                            WebkitLineClamp: 1,
                                        }}
                                    >
                                        <Skeleton count={2} width={600} />
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Box>
        </>
    )
}

export default MessageBoxLoading