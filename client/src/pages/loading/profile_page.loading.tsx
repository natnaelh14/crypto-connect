import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import { Fade } from "@mui/material";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import PostLoading from '../../components/Post/post_loading.component';
import { RectShape } from 'react-placeholder/lib/placeholders';

const ProfilePageLoading = () => {
    return (
        <>
            <Fade in={true} timeout={1000}>
                <div style={{ padding: '20px' }}>
                    <Box>
                        <Box borderBottom="1px solid #ccc" padding="8px 20px">
                            <Grid container alignItems="center">
                                <Grid item sx={{ mr: "10px" }}>
                                    <Skeleton width={30} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6">
                                        <Skeleton width={70} />
                                    </Typography>
                                    <Typography sx={{ fontSize: "12px", color: "#555" }}>
                                        <Skeleton width={70} />
                                    </Typography>{" "}
                                </Grid>
                            </Grid>
                        </Box>
                        <Box height="90vh" sx={{ overflowY: "scroll" }}>
                            <Box position="relative">
                                <RectShape color='#cccccc' style={{ width: '100%', height: "300px" }} />
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 120,
                                        left: 15,
                                        background: "#eee",
                                        borderRadius: "50%",
                                    }}
                                >
                                    <Skeleton
                                        circle
                                        height="150px"
                                        width="150px"
                                        containerClassName="avatar-skeleton"
                                    />
                                </Box>
                            </Box>
                            <Box textAlign="right" padding="10px 20px">
                                <Skeleton width={70} />
                            </Box>
                            <Box padding="10px 20px">
                                <Typography variant="h6" sx={{ fontWeight: "500" }}>
                                    <Skeleton width={70} />
                                </Typography>
                                <Typography sx={{ fontSize: "14px", color: "#555" }}>
                                    <Skeleton width={70} />
                                </Typography>
                                <Typography fontSize="16px" color="#333" padding="10px 0">
                                    <Skeleton count={3} />
                                </Typography>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    padding="6px 0"
                                    flexWrap="wrap"
                                >
                                    <Box display="flex">
                                        <Skeleton width={20} />
                                        <Typography sx={{ ml: "6px", color: "#555" }}>
                                            <Skeleton width={200} />
                                        </Typography>
                                    </Box>
                                    <Box display="flex" marginLeft="1rem">
                                        <Skeleton width={20} />
                                        <Typography sx={{ ml: "6px", color: "#555" }}>
                                            <Skeleton width={70} />
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box display="flex" marginTop='1rem'>
                                    <Skeleton width={70} />
                                    <Skeleton width={70} />
                                </Box>
                                <Box display="flex" marginTop='1rem'>
                                    <Typography color="#555">
                                        <Skeleton width={70} />
                                    </Typography>
                                </Box>
                            </Box>
                            <Box borderBottom="1px solid #ccc" marginLeft='1.25rem'>
                                <Skeleton width={40} />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <PostLoading />
                                <PostLoading />
                                <PostLoading />
                                <PostLoading />
                                <PostLoading />
                            </Box>
                        </Box>
                    </Box>
                </div>
            </Fade>
        </>
    );
}

export default ProfilePageLoading;