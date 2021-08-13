import React, { Component, useEffect, useState,useRef } from "react";
import "./post.css";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Card, CardHeader } from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';
import { Container } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import AddPost from "./actions/add_post";
import Icon from '@material-ui/core/Icon';
import { useHistory, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  grid: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  Comment: {
    minWidth: 100,
    maxHeight:510,
    minHeight:510,
    maxWidth:500 ,
    
  },
  Comment2:{
    minWidth: 450,
    maxHeight:450,
    minHeight:450,
    maxWidth:500 ,
  }
  
}));



export default function SpecificPost(){
  var hst=useHistory()
console.log(hst)
    const {id}  = useParams();
    const classes = useStyles();
    const messagesEndRef = useRef(null)

    const x=localStorage.getItem('token');
    const [post,setpost]=useState();
    const [Likes,setLikes]=useState();
    const [Comments,setComments]=useState();
    const[isLiked,setisLiked]=useState();
    const[likedCount,setlikedCount]=useState();
    const likeDislike=()=>{
      if(isLiked==1){
        axios.delete(`http://127.0.0.1:8000/posts/like_dislike`, {
          headers: {
            'Authorization': `token ${x}`,
          },
          data: {
            post_id:id,
          }
        }).then((res)=>{
          console.log('donzo');
          console.log(res);
          
          setisLiked(0);
          setlikedCount(likedCount-1);
      },(error)=>{console.log(error.message,error.response)})
      
      }
      else{
        axios.post(`http://127.0.0.1:8000/posts/like_dislike`,{post_id:id}, {
          headers: {
            'Authorization': `token ${x}`,
          },
         
        }).then((res)=>{
          console.log('donzo');
          console.log(res);
          
          setisLiked(1);
          setlikedCount(likedCount+1);
      },(error)=>{console.log(error.message,error.response)})
      
      }
    }
    useEffect(() => {
          axios.get(`http://127.0.0.1:8000/posts/${id}`,{
              headers: {
                  'Authorization': `token ${x}`,
                  
                },
               
              }).then((res)=>{
              console.log('donzo');
              console.log(res);
              setpost(res.data.post_data);
              setLikes(res.data.likes);
              setComments(res.data.comments);
              setisLiked(res.data.isLiked);
              setlikedCount(res.data.post_data.likes)
          }
          ,(error)=>{console.log(error.message,error.response)})
            
  
          }, []);
         

          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })


          return(
            
              <div  style={{display:'flex'}} >
              {post&&<Card display='flex' className={classes.Comment} flexGrow={1} style={{marginLeft:80,minWidth: 450,overflow:'auto',
    minHeight:510,
    maxWidth:750 ,maxHeight:710,}}>
              
                

                <div className="Post-user">

                  <div className="Post-user-profilepicture">

                    <img src="https://i.pinimg.com/originals/2f/e0/6c/2fe06c3acec7d5a78c1706ad7a96a821.jpg" alt="Preet Modh" />

                  </div>

                  <div className="Post-user-nickname">

                    <span>Preet Modh</span>

                  </div>

                </div>


              <CardContent>
              <div className="Post-image">

                  <div className="Post-image-bg">

                    <img alt="Icon Living" src={post.Image} />

                  </div>
                  
                  <div className="Post-caption">

                  <IconButton onClick={()=>likeDislike(post.id)} color={isLiked==1? "secondary":""} className={classes.button} aria-label="Add an alarm">
                  <Icon><FavoriteIcon /></Icon>
                  </IconButton>
                  {likedCount}&nbsp;

                  <strong>Preet Modh </strong> 
                  <div>{post.caption}</div>
                  </div>
              </div>
              </CardContent>
              
</Card>}
<div className={classes.Comment2}  style={{ border:'ridge  ',  
maxHeight:610,
maxWidth:900,
 
}}>
<h3 style={{margin:'5px'}}>USER</h3>  
<div className={classes.Comment2}  style={{
  
  overflow:'auto',
  // width:'10%',
}}>

  {/* <div className={classes.Comment} style={{
    overflow:'auto',
    marginBottom:'10px',
    width:'100%',
    height:'100%'
    }}> */}
      
      
    <CardContent >
    
      {Comments&& Comments.map((Comment)=>{
     return(
       <>
      <Paper style={{
        marginTop:'5px',
        
        position:'relative',
        
        maxWidth:'51%',
        }}>
        <header>{Comment.username}</header>
        <div style={{
        padding:'4px',
        fontSize:'14px',
        whiteSpace: 'pre-wrap',
        overflowWrap: 'break-word',
        width:'100%',
        }}>{Comment.body}
        <br/><br/>
        {Comment.date}
        </div>
        
      </Paper>
      </>
     )
   })}


    </CardContent>
    
    <div ref={messagesEndRef} />
    
  
  
  </div>
  <br/>
  <Container  maxWidth="xs" style={{position: 'relative',bottom:'25px' }}>
<TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="type here"
            name="message"
            autoComplete="email"
            autoFocus
            
    />
   <NavLink to='notifications'> <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            
    >
    GO
    </Button>
    </NavLink>
    </Container >
</div>
               
              </div>
          )
};