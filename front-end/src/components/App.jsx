import React from 'react';
import {Accordion, Input} from 'chayns-components';
import {Fetch} from '../actions/fetch.js';
import Square from './Square.js'
import UserView from './UserView.js'
import AdminView from './AdminView.js'
import './AdminView.css'
import Point from './Point.js'

const App = () => {
    
    if (chayns.env.user.adminMode)
        return <AdminView />
    else
        return <UserView />
    
    

};

export default App;
