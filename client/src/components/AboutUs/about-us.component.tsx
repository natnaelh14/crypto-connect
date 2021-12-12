import React from 'react';
import { Fade, Typography, Grid, Box } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import feature from './feature.jpg';
import { ImageContainer } from './about-us.styles';
import './about.css';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '100px',
        marginTop: '3rem',
        display: "flex",
        justifyContent: "center"
    },
    paper: {
        margin: theme.spacing(2, 6),
    },
    featureTitle: {
        fontSize: '3rem !Important',
        fontWeight: 900,
        color: '#222060',
        marginBottom: '1rem',
        fontFamily: 'inherit',
        textAlign: 'center',
        "@media (max-width: 800px)": {
            fontSize: '1.9rem !Important'
        }
    },
    featureText: {
        lineHeight: 2,
        textIndent: '-1.4em', 
        padding: '10px',
        fontFamily: 'inherit',
        textAlign: 'left',
        "&::before": {
            content: '▹',
            paddingRight: '1em',
            color: 'red'
        },
        "@media (max-width: 800px)": {
            fontSize: '0.8rem'
        }
    },
    featureContainer: {
        "@media (max-width: 1200px)": {
            marginBottom: '6rem'
        }
    },
}))

const AboutUsPage = () => {
    const classes = useStyles();
    return (
        <section style={{ marginTop: '400px' }}>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around" }}>
                <Box className={classes.featureContainer}>
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
                                <Typography className={classes.featureTitle}>FEATURES</Typography>
                                <Typography id='bulletin' className={classes.featureText}>USER AUTHENTICATION USING GOOGLE, GITHUB, TWITTER</Typography>
                                <Typography id='bulletin' className={classes.featureText}>PERSONALIZED USER PROFILE</Typography>
                                <Typography id='bulletin' className={classes.featureText}>POSTS / COMMENTS / LIKES / DISLIKES</Typography>
                                <Typography id='bulletin' className={classes.featureText}>SHARE POSTS AND TWEETS</Typography>
                                <Typography id='bulletin' className={classes.featureText}>SEND MESSAGES</Typography>
                                <Typography id='bulletin' className={classes.featureText}>FOLLOW USERS</Typography>
                                <Typography id='bulletin' className={classes.featureText}>CREATE PERSONALIZED CRYPTOCURRENCY PORTFOLIO</Typography>
                                <Typography id='bulletin' className={classes.featureText}>REAL-TIME CRYPTO PRICING, TWEETS ABOUT CRYPTO HOLDING AND OTHER CRYPTO INFO</Typography>
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