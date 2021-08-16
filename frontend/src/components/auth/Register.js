import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
<<<<<<< HEAD

=======
import { ReactComponent as Svg } from '../assests/svg/PeopleConnect2.svg';
>>>>>>> dd49ae9ab51db3c47598ea51a373a979fccb53c1

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
<<<<<<< HEAD
=======
  svg:{
    position:'relative',
    minHeight:300,
    minWidth:300,
    maxWidth: '30%',
     maxHeight: '30%',
     marginTop:80,
     marginLeft:80
  },
  container:{
    position:'relative',
    maxWidth: '30%',
     maxHeight: '30%',
     marginTop:40,
     marginLeft:80
  },
>>>>>>> dd49ae9ab51db3c47598ea51a373a979fccb53c1
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));




export default function Register() {
  const classes = useStyles();

  const [username, setUname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');

  
  function signUp() {

    axios.post('http://127.0.0.1:8000/user/register', {
        user_name: username,
        email:email,
<<<<<<< HEAD
        password:'AAA@#123',
        // password:password,
=======
        // password:'AAA@#123',
        password:password,
>>>>>>> dd49ae9ab51db3c47598ea51a373a979fccb53c1
      })
      .then((response) => {
        if (response.status===201){
          alert("User created!")
          window.location.replace('/login')
        }
        else{
          alert("Username/Email already taken")
        }
        console.log(response);
      }, (error) => {
        if (error.response){

          alert("Username/Email already taken")
          
          }else if(error.request){
          
            alert("Username/Email already taken")
          
          }else if(error.message){
          
            alert("Username/Email already taken")
          
          }
      });

}
  return (
<<<<<<< HEAD
    <Container component="main" maxWidth="xs">
=======
    <div  style={{display:'flex'}} >
     <Svg className={classes.svg} />
    <Container component="main" maxWidth="xs" className={classes.container} >
>>>>>>> dd49ae9ab51db3c47598ea51a373a979fccb53c1
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="Uname"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="UserName"
                label="User Name"
                autoFocus
                onChange={event => setUname(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={event => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={event => setPass(event.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=>signUp()}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
<<<<<<< HEAD
=======
    </div>
>>>>>>> dd49ae9ab51db3c47598ea51a373a979fccb53c1
  );
}