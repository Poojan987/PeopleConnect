import React, { useState, useEffect } from 'react';
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
import { ReactComponent as Svg } from '../assests/svg/PeopleConnect2.svg';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));





export default function Login() {
  const token =localStorage.getItem('token');
  const [condition, setCondition] = useState();
  var l =0
  if(token===null){
    l=0
  }
  else{
    l=token.length
  }
  
  useEffect(() =>{
    
   if (l===0){
    setCondition(false)
   }
  else{
    setCondition(true)
  }
  if (condition){
      window.location.replace('/home')  
  } }, [token, condition, l]); 
  



  const classes = useStyles();
  const[email,setEmail]=useState('');
  const [password, setPass] = useState('');

  

  function signIn() {
    

    axios.post('https://peopletoconnectdjango.herokuapp.com/user/token', {
        username: email,
        password:password,
        headers: { 
          xsrfCookieName: 'XSRF-TOKEN',
          xsrfHeaderName: 'X-XSRF-TOKEN',
        }
      })
      .then((response) => {
        if (response.data){
          localStorage.setItem('token', response.data.token);
             window.location.replace('/home') 
        }
        else{
            alert("Invalid username or password")
        }
      },(error) => {
        if (error.response){

          alert("Invalid username or password")
          
          }else if(error.request){
          
            alert("Invalid username or password")
          
          }else if(error.message){
          
            alert("Invalid username or password")
          
          }
      });

}

  return (
    <div  style={{display:'flex'}} >
    <Svg className={classes.svg}/>
    <Container className={classes.container} component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoFocus
            onChange={event => setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={event => setPass(event.target.value)}
          />
        
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=>signIn()}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </div>
  );
}