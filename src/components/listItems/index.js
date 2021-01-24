import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import HomeIcon from '@material-ui/icons/Home';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import {Link} from "react-router-dom";

export const mainListItems = (
    <div>
        <ListItem button component={Link} to="/dashboard">
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="Dashboard"/>
        </ListItem>
        <ListItem button component={Link} to="/myHouse">
            <ListItemIcon>
                <HomeWorkIcon/>
            </ListItemIcon>
            <ListItemText primary="My House"/>
        </ListItem>
        <ListItem button component={Link} to="/rooms">
            <ListItemIcon>
                <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary="Rooms"/>
        </ListItem>
        <ListItem button component={Link} to="/bookings">
            <ListItemIcon>
                <EventAvailableIcon/>
            </ListItemIcon>
            <ListItemText primary="Bookings"/>
        </ListItem>
    </div>
);

