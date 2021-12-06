import React, { useEffect } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import IosShareIcon from "@mui/icons-material/IosShare";

const TwitterPost: React.FC<{ text: string }> = ({ text }) => {

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
                                <IconButton size="small">
                                    <IosShareIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default TwitterPost