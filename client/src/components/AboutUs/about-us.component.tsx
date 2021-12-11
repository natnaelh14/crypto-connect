import React from 'react';
import { Fade, Typography, Grid, Box } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import feature from './feature.jpg';
import { ImageContainer } from './about-us.styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '200px',
        marginTop: '3rem',
        display: "flex",
        justifyContent: "center"
    },
    paper: {
        margin: theme.spacing(2, 6),
    },
}))

const AboutUsPage = () => {
    const classes = useStyles();
    return (
        <section style={{ marginTop: '500px' }}>
            <Typography sx={{ fontSize: '3rem !Important', fontWeight: 800 }} mb='2rem' fontFamily='inherit' textAlign='center'>FEATURES</Typography>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around" }}>
                <Box>
                    <Grid container component="main" className={classes.root}>
                        <Box
                            sx={{ margin: '20px', width: '500px' }}
                        >
                            <Grid
                                item
                                component={Paper}
                                elevation={3}
                                square
                                sx={{ margin: '20px', padding: '20px', width: '500px', display: "flex", flexDirection: "column" }}
                            >
                                <Typography fontFamily='inherit' textAlign='left' sx={{ padding: '10px' }} >▹ USER AUTHENTICATION USING GOOGLE</Typography>
                                <Typography fontFamily='inherit' textAlign='left' sx={{ padding: '10px' }} >▹ PERSONALIZED USER PROFILE</Typography>
                                <Typography fontFamily='inherit' textAlign='left' sx={{ padding: '10px' }} >▹ POST / COMMENT / LIKES / DISLIKES</Typography>
                                <Typography fontFamily='inherit' textAlign='left' sx={{ padding: '10px' }} >▹ SHARE POSTS AND TWEETS</Typography>
                                <Typography fontFamily='inherit' textAlign='left' sx={{ padding: '10px' }} >▹ SEND MESSAGES</Typography>
                                <Typography fontFamily='inherit' textAlign='left' sx={{ padding: '10px' }} >▹ FOLLOW USERS</Typography>
                                <Typography fontFamily='inherit' textAlign='left' sx={{ padding: '10px', lineHeight: '2rem' }} >▹ CREATE PERSONALIZED CRYPTOCURRENCY PORTFOLIO</Typography>
                                <Typography fontFamily='inherit' textAlign='left' sx={{ padding: '10px' }} >▹ REAL-TIME CRYPTO PRICING, TWEETS ABOUT CRYPTO HOLDING AND OTHER CRYPTO INFO</Typography>
                            </Grid>
                        </Box>
                    </Grid>
                </Box>
                <ImageContainer>
                    <img src={feature} style={{ width: '500px', height: '500px' }} alt='feature-image' />
                </ImageContainer>
            </Box>
        </section>




    )
}

export default AboutUsPage;