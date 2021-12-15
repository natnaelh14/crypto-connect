import { Button, Fade } from "@mui/material";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { signInWithGoogle } from '../../firebase/firebase.utils';
import { signInWithGithub } from '../../firebase/firebase.utils';
import { signInWithTwitter } from '../../firebase/firebase.utils';
import { GoogleLoginButton, GithubLoginButton, TwitterLoginButton } from 'react-social-login-buttons';
import coinImage from './coin.jpeg';
import AboutUsPage from '../AboutUs/about-us.component';
import Footer from '../Footer/footer.component';
import ScrollArrow from "../ScrollArrow/scroll-arrow.component";
function Copyright() {
  return (
    <Typography style={{ fontFamily: 'inherit' }} variant="body2" color="textSecondary" align="center">
      {"Copyright © Crypto Connect "}
      {new Date().getFullYear()}
      {". All Rights Reserved."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '120px',
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    "@media (max-width: 1000px)": {
      marginTop: "40px"
    }
  },
  paper: {
    margin: theme.spacing(2, 6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: '0.5rem',
    display: "flex",
    alignItems: "center",
    flexDirection: 'column'
  },
  textFont: {
    fontFamily: "inherit",
    color: '#55595C',
    textAlign: 'center'
  },
  image: {
    "@media (max-width: 1300px)": {
      height: "400px",
      width: "500px",
      marginBottom: '40px'
    },
    "@media (max-width: 800px)": {
      height: "200px",
      width: "300px",
      marginBottom: '40px'
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  aboutUs: {
    background: "linear-gradient(to bottom,rgba(255,255,255), rgba(212	234	248))!important",
    backgroundImage: "linear-gradient(to bottom, transparent, rgba(212 234 248))!important",
  }
}));

const SignIn = () => {

  const classes = useStyles();

  return (
    <>
      <div>
        <Fade in={true} timeout={1000}>
          <Grid container component="main" className={classes.root}>
            <div>
              <img className={classes.image} src={coinImage} alt='crypto_image' />
            </div>
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={1}
              square
            >
              <div className={classes.paper}>
                <Logo className='logo' />
                <Typography className={classes.textFont} style={{ marginTop: '0.5rem', fontSize: '1.5rem' }} >
                  WELCOME TO CRYPTO CONNECT
                </Typography>
                <Typography className={classes.textFont} style={{ marginTop: '0.5rem', fontSize: '1.2rem' }}>
                  A cryptocurrency based social media application
                </Typography>
                <form className={classes.form} noValidate>
                  <GoogleLoginButton style={{ width: '300px' }} onClick={signInWithGoogle} />
                  <GithubLoginButton style={{ width: '300px' }} onClick={signInWithGithub} />
                  <TwitterLoginButton style={{ width: '300px' }} onClick={signInWithTwitter} />
                  <Box mt={5}>
                    <Copyright />
                  </Box>
                </form>
              </div>
            </Grid>
          </Grid>
        </Fade>
        <ScrollArrow />
      </div>
      <div className={classes.aboutUs}>
        <AboutUsPage />
      </div>
      <Footer />
    </>
  );
}

export default SignIn;