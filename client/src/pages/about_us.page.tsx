import React from 'react'
import { Typography, Grid, Box } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(2, 6),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }
}))


const AboutUsPage = () => {

    const classes = useStyles();

    return (
        <Box
            sx={{ margin: '20px', width: '400px' }}
        >
            <Grid
                item
                // xs={12}
                // sm={8}
                // md={5}
                component={Paper}
                elevation={3}
                square
                sx={{ padding: '20px', width: '400px' }}
            >
                <Typography fontSize='25px' fontFamily='inherit' textAlign='center'>FEATURES</Typography>
                <Typography fontFamily='inherit' sx={{ padding: '10px' }} >USER AUTHENTICATION USING GOOGLE</Typography>
                <Typography fontFamily='inherit' sx={{ padding: '10px' }} >USER PROFILE</Typography>
                <Typography fontFamily='inherit' sx={{ padding: '10px' }} >POST / COMMENT / LIKES / DISLIKES</Typography>
                <Typography fontFamily='inherit' sx={{ padding: '10px' }} >FOLLOW USERS</Typography>
                <Typography fontFamily='inherit' sx={{ padding: '10px' }} >TRACK CRYPTOCURRENY HOLDING</Typography>
            </Grid>
        </Box>
    )
}

export default AboutUsPage;
