import axios from "axios";
import React, { Component,useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';


//components
import Followers from "./user/followers";
import Following from "./user/following";
import PostLayout from "./Post/post_layout";
import AddPost from "./Post/actions/add_post";

const useStyles = makeStyles((theme) => ({
    follow_following_div:{
        display: 'flex',
        columnGap: 20,
        // justifyContent: 'space-between',
    }
  }));

export default function Profile(){
    
    const x=localStorage.getItem('token')
    //hooks 
    const[followState,setfollowState]=useState(0);
    const changeFollowState=(val)=>{setfollowState(val)};


    const [open, setOpen] = React.useState(false);
    

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        
        setfollowState(0);
    };
    const [OpenAddPost,setOpenAddPost]=useState(false);
    const handleCloseAddPost = () => {
        setOpenAddPost(false);
      
    };
    
      const classes = useStyles();
      const parameters={
        type: 'profile',
      }
    return(
        <div style={{marginLeft:100}}>

            <h1 >Profile</h1>
            <div className={classes.follow_following_div}>
        
                <button onClick={()=>{changeFollowState(1);setOpen(true)}}>Followers</button>
                <button onClick={()=>{changeFollowState(2);setOpen(true)}}>Following</button>
                
            </div>
            { followState!=0&&(followState===1?<Followers  open={open} onClose={handleClose}/>:<Following  open={open} onClose={handleClose}/>)}

            <div className="Post">
      
              <button onClick={()=>{setOpenAddPost(true)}}>Add Post</button>
            
            
            </div>
            { OpenAddPost && <AddPost  open={OpenAddPost} onClose={handleCloseAddPost}/>}
           
            <div className={classes.profilePosts}>
                <PostLayout params={parameters}/>
            </div>
        </div>
    )
}