import React, {useState, useEffect} from 'react'
import './styles.css'
import HomePage from '../../Pages/HomePage'
import Login from '../../Pages/Login'
import Register from '../../Pages/Register'
import Dashboard from '../../Pages/Dashboard'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import {CssBaseline, CircularProgress} from '@material-ui/core'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import firebase from '../../Backend/firebase'
import Bookings from "../Bookings";
import Rooms from "../../Pages/Rooms";
import MyHouse from "../MyHouse";
import AddHouseImages from "../MyHouse/Settings/AddHouseImages";
import RoomMaintanance from "../../Pages/RoomMaintanance";

const theme = createMuiTheme()

export default function App() {

    const [firebaseInitialized, setFirebaseInitialized] = useState(false)

    useEffect(() => {
        firebase.isInitialized().then(val => {
            setFirebaseInitialized(val)
        })
    })

    return firebaseInitialized !== false ? (
        <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route exact path="/bookings" component={Bookings}/>
                    <Route exact path="/rooms" component={Rooms}/>
                    <Route exact path="/myHouse" component={MyHouse}/>
                    <Route exact path="/addHouseImages" component={AddHouseImages}/>
                    <Route exact path="/rooms/roomMaintanance" component={RoomMaintanance}/>
                </Switch>
            </Router>
        </MuiThemeProvider>
    ) : <div id="loader"><CircularProgress/></div>
}