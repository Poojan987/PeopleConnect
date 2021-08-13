import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/home';
import Notification from './components/notification';
import Messages from './components/messages';
import Chat from './components/chats/chat';
import ChatsRecent from './components/chats/chatrecent';
import Post from './components/post';
import People from './components/people';
import Profile from './components/profile';
import SpecificPost from './components/Post/specific_post';
import { ShowHome } from './showHome';
import { NotshowHome } from './notshowHome';
const App2=()=>{
    return (
    <div>    
        <BrowserRouter>
        
            <Switch>
                    <Route exact path='/' component={Login} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
            
            
            
                <div>
                    <Home >
                        <Route exact path='/notifications'  render={() => <Notification   key={uuidv4()}/>} />
                        <Route exact path='/messages' component={Messages} />
                        <Route exact path='/chat/recent' component={ChatsRecent} />
                        <Route exact path='/chat/inbox/:id' component={Chat} />
                        <Route exact path='/peoples' component={People} />
                        <Route exact path='/profile' component={Profile} />
                        <Route exact path='/home' component={Post} />
                        <Route exact path='/post/:id' component={SpecificPost} />
                    </Home>

                </div>
            </Switch>
            
        </BrowserRouter>
    </div>
    )
};

export default App2;