import { Box } from "@mui/system";
import { Grid, Typography, Fade } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { GuestDataContainer, CryptoCarouselContainer, GuestUserInfoContainer, UserBioContainer } from "./guest_profile.styles"
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { RectShape } from "react-placeholder/lib/placeholders";
import PostLoading from "../Post/post_loading.component";

const GuestProfileLoading = () => {
    return (
        <>
            <Fade in={true} timeout={1000}>
                <div style={{ padding: "20px" }}>
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
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <GuestDataContainer>
                        <GuestUserInfoContainer>
                            <Box padding="10px 20px" display="flex" alignItems="center" sx={{ flexDirection: "column" }}>
                                <Skeleton
                                    circle
                                    height="150px"
                                    width="150px"
                                    containerClassName="avatar-skeleton"
                                />
                                <Skeleton width={70} />
                                <Typography textAlign='center' variant="h6" sx={{ fontWeight: "500" }}>
                                    <Skeleton width={70} />
                                </Typography>
                                <Typography textAlign='center' sx={{ fontSize: "14px", color: "#555" }}>
                                    <Skeleton width={70} />
                                </Typography>
                                <Box display="flex">
                                    <LocationOnIcon htmlColor="#555" />
                                    <Typography textAlign='center' sx={{ ml: "6px", color: "#555" }}>
                                        <Skeleton width={210} />
                                    </Typography>
                                </Box>
                                <Box display="flex">
                                    <DateRangeIcon htmlColor="#555" />
                                    <Typography sx={{ ml: "6px", color: "#555" }}>
                                        <Skeleton width={70} />
                                    </Typography>
                                </Box>
                            </Box>
                            <UserBioContainer>
                                <Typography fontSize="16px" color="#333" padding="10px 0">
                                    <Skeleton width={70} />
                                </Typography>
                                <Box display="flex" marginTop='0.25rem'>
                                    <Typography color="#555" marginRight="1rem">
                                        <Skeleton width={70} />
                                    </Typography>
                                    <Typography color="#555" marginRight="1rem">
                                        <Skeleton width={70} />
                                    </Typography>
                                </Box>
                                <Box display="flex" marginTop='0.25rem'>
                                    <Typography color="#555">
                                        <Skeleton width={70} />
                                    </Typography>
                                </Box>
                            </UserBioContainer>
                        </GuestUserInfoContainer>
                        <CryptoCarouselContainer>
                            <RectShape color='#cccccc' style={{ width: "400px", height: "400px" }} />
                        </CryptoCarouselContainer>
                    </GuestDataContainer>
                    <Box sx={{ overflowY: "scroll" }} >
                        <Box borderBottom="1px solid #ccc">
                            <Typography
                                display="inline-block"
                                variant="caption"
                                fontSize="16px"
                                marginX="1rem"
                                padding="6px 0"
                                fontWeight="500"
                                borderBottom={`4px solid black`}
                            >
                                <Skeleton width={70} />
                            </Typography>
                        </Box >
                        <Box sx={{ width: "auto" }}>
                            <PostLoading />
                            <PostLoading />
                            <PostLoading />
                            <PostLoading />
                            <PostLoading />
                        </Box>
                    </Box>
                </div>
            </Fade>
        </>
    );
}

export default GuestProfileLoading;