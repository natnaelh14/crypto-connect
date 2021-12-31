import { Grid, FormControl } from "@mui/material";
import { Box } from "@mui/system";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AddPostLoading = () => {
    return (
        <>
            <Box padding="1rem 1rem 0 1rem" borderBottom="1px solid #ccc">
                <Grid >
                    <Grid item sx={{ paddingRight: "1rem" }}>
                        <Skeleton
                            circle
                            height={50}
                            width={50}
                            containerClassName="avatar-skeleton"
                        />
                    </Grid>
                    <Grid item >
                        <Box padding=".5rem 0">
                            <Skeleton count={3} width={400} />
                        </Box>
                        <Box
                            paddingBottom=".5rem"
                            paddingTop=".8rem"
                            borderTop="1px solid #ccc"
                        >
                            <Box textAlign="left">
                                <FormControl style={{ minWidth: 120 }} >
                                    <Skeleton
                                        width={100}
                                    />
                                </FormControl>
                            </Box>
                            <Box textAlign="right">
                                <Skeleton
                                    width={100}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default AddPostLoading;