import React from 'react';
import { Typography, Grid, Box } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import feature from './feature.jpg';
import { ImageContainer, AboutUsContainer, FeatureContainer } from './about-us.styles';
import './about.css';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(2, 6)
    },
    featureTitle: {
        fontSize: '3rem !important',
        color: '#222060',
        marginBottom: '1rem',
        fontFamily: 'Prompt !important',
        textAlign: 'center',
        "@media (max-width: 800px)": {
            fontSize: '2rem !important'
        }
    },
    featureText: {
        lineHeight: 2,
        textIndent: '-2.5em',
        padding: '10px',
        fontFamily: 'inherit',
        textAlign: 'left',
        "&::before": {
            content: '▹',
            paddingRight: '1em',
            marginLeft: '1em',
            color: 'red'
        },
        "@media (max-width: 1300px)": {
            fontSize: '1rem !important'
        },
        "@media (max-width: 800px)": {
            fontSize: '0.8rem !important'
        }
    },
    image : {
        width: '500px', 
        height: '500px',
        "@media (max-width: 1200px)": {
            width: '300px', 
            height: '300px',
        },
        "@media (max-width: 800px)": {
            width: '250px', 
            height: '250px',
        }
    }
}))

const AboutUsPage = () => {
    const classes = useStyles();
    return (
        <AboutUsContainer>
            <FeatureContainer>
                <Box>
                    <Grid container component="main">
                        <Box
                            sx={{ margin: '20px' }}
                        >
                            <Grid
                                item
                                component={Paper}
                                elevation={3}
                                square
                                sx={{ margin: '20px', padding: '20px', minWidth: '400px', maxWidth: '600px', width: 'auto', display: "flex", flexDirection: "column" }}
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
            </FeatureContainer>
            <ImageContainer>
                <img src={feature} className={classes.image} alt='feature-image' />
            </ImageContainer>
        </AboutUsContainer>
    )
}

export default AboutUsPage;