import React, { Component, useEffect, useState } from "react";
import "./post.css";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import AddPost from "./actions/add_post";
import Icon from '@material-ui/core/Icon';

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
  }));

  





  export default function PostLayout(props)  {
    const params=props.params
    const classes = useStyles();
    const [Posts,setPosts]=useState();
    const [isLiked,setisLiked]=useState({});
    const [likedCount,setlikedCount]=useState({});

    const x=localStorage.getItem('token');


    const likeDislike=(id)=>{
      if(isLiked[id]==1){
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
          
          setisLiked({...isLiked,[id]:0});
          setlikedCount({...likedCount,[id]:likedCount[id]-1});
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
          
          setisLiked({...isLiked,[id]:1});
          setlikedCount({...likedCount,[id]:likedCount[id]+1});
      },(error)=>{console.log(error.message,error.response)})
      
      }
    }
    useEffect(() => {
      
        axios.get(`http://127.0.0.1:8000/posts/profile_post`,{
            headers: {
                'Authorization': `token ${x}`,
                
              },
                params:{
                  type:params.type,
                }
            }).then((res)=>{
              setPosts(res.data.posts_data);
              setisLiked(res.data.likeDict);
              setlikedCount(res.data.likeCount);
            console.log(res);
            
        }
        ,(error)=>{console.log(error.message,error.response)})
      
    }, [])
    const [Open,setOpen]=useState(false);
    const handleClose = () => {
      setOpen(false);
      
    };

    return (
      <>
      <div className="Post">
      
        <button onClick={()=>{setOpen(true)}}>Add Post</button>
        
        
    </div>
    
    { Open && <AddPost  open={Open} onClose={handleClose}/>}
      { Posts&& Posts.map((post)=>{return(
        <>
          
          <article className="Post" >

            <header>

              <div className="Post-user">

                <div className="Post-user-profilepicture">

                  <img src="https://i.pinimg.com/originals/2f/e0/6c/2fe06c3acec7d5a78c1706ad7a96a821.jpg" alt="Preet Modh" />

                </div>

                <div className="Post-user-nickname">

                  <span>Preet Modh</span>

                </div>

              </div>

            </header>
            <NavLink to={`post/${post.id}`}>
              <div className="Post-image">

                <div className="Post-image-bg">

                  <img alt="Icon Living" src={post.Image} />

                </div>

              </div>
            </NavLink>
            <div className="Post-caption">
            
            <IconButton onClick={()=>likeDislike(post.id)} color={isLiked[post.id]==1? "secondary":""} className={classes.button} aria-label="Add an alarm">
        <Icon><FavoriteIcon /></Icon>
      </IconButton>
            {likedCount[post.id]}&nbsp;
            
            <strong>Preet Modh </strong> 
            <div>{post.caption}</div>
            </div>
            <TextField
              style={{marginBottom:'7px',marginLeft:'10px'}}
              id="standard-textarea"
              label="comment here"

              multiline
              variant="outlined"
              size="small"
            />

          </article>
          
        </>
        
      )})
    
      }
      
      </>
    )

}