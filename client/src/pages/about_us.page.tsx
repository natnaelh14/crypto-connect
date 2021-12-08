import React from 'react';
import { Typography, Grid, Box } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '40px',
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
                    <Typography fontSize='25px' fontFamily='inherit' fontWeight='bold' textAlign='center'>FEATURES</Typography>
                    <Typography fontFamily='inherit' textAlign='left' sx={{ padding: '10px' }} >▹ USER AUTHENTICATION USING GOOGLE</Typography>
                    <Typography fontFamily='inherit' textAlign='left' sx={{ padding: '10px' }} >▹ PERSONALIZED USER PROFILE</Typography>
                    <Typography fontFamily='inherit' textAlign='left' sx={{ padding: '10px' }} >▹ POST / COMMENT / LIKES / DISLIKES</Typography>
                    <Typography fontFamily='inherit' textAlign='left' sx={{ padding: '10px' }} >▹ SEND MESSAGES</Typography>
                    <Typography fontFamily='inherit' textAlign='left' sx={{ padding: '10px' }} >▹ FOLLOW USERS</Typography>
                    <Typography fontFamily='inherit' textAlign='left' sx={{ padding: '10px' }} >▹ TRACK CRYPTOCURRENY HOLDING</Typography>
                </Grid>
            </Box>
        </Grid>

    )
}

export default AboutUsPage;
