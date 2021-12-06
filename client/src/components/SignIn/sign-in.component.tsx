import { Button } from "@mui/material";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { signInWithGoogle } from '../../firebase/firebase.utils';
import coinImage from './coin.jpeg';

function Copyright() {
  return (
    <Typography style={{fontFamily: 'inherit'}} variant="body2" color="textSecondary" align="center">
      {"Copyright © Crypto Connect Natnael Haile "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '40px',
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
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
    color: '#55595C'
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
  }
}));

const SignIn = () => {

  const classes = useStyles();

  return (
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
          <Typography className={classes.textFont} style={{ marginTop: '0.5rem', fontSize: '1rem' }}>
            A cryptocurrency based social media application
          </Typography>
          <form className={classes.form} noValidate>
            <Button
              onClick={signInWithGoogle}
              disableElevation
              size="small"
              sx={{
                textTransform: "capitalize",
                padding: "6px 20px",
                marginBottom: '20px',
                background: "black",
                "&:hover": {
                  background: "#333",
                },
              }}
              variant="contained"
            >
              SIGN IN WITH GOOGLE
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default SignIn;