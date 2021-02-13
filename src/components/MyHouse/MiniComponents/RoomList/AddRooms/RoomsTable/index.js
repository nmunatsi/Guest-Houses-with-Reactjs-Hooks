import React, {useEffect} from 'react';
import {
    Checkbox,
    makeStyles,
    Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow
} from "@material-ui/core";
import firebase from "../../../../../firebase";
import Room from "../../../../../Models/Room"
import AnnouncementIcon from '@material-ui/icons/Announcement';
import ClearIcon from '@material-ui/icons/Clear';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    table: {
        minWidth: 550,
    },
    body: {
        fontSize: 14,
    },
});


export default function RoomsTable(props) {
    const classes = useStyles();
    const [rooms, setRooms] = React.useState([]);

    let newRoom = [];
    let roomColle = [];

    let userId;
    userId = firebase.getCurrentUserId();

    //retriving data
    useEffect(() => {
        firebase.db.ref('guesthouses').child("Rooms Details").child("Rooms").on('value', (snapshot) => {
            snapshot.forEach(data => {
                const dataVal = data.val()
                if (dataVal.houseId === userId) {
                    firebase.db.ref('guesthouses').child("Rooms Details").child("RoomTypes").on('value', (snapshot) => {
                        snapshot.forEach(child => {
                            const roomTypeVal = child.val()
                            if (dataVal.roomType === roomTypeVal.typeName) {
                                let roomObj = new Room(dataVal.roomNo, dataVal.houseId, roomTypeVal.maxPerson,
                                    roomTypeVal.price, dataVal.roomType, dataVal.roomStatus, roomTypeVal.hasSingleUse)
                                newRoom.push({
                                    roomObj
                                })
                            }
                        })

                    })
                }
            })
            console.log(newRoom)
            roomColle = newRoom;
        })
        console.log(roomColle)

        setRooms(roomColle)
    }, [])


    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Room No.</TableCell>
                            <TableCell align="left">Room Type</TableCell>
                            <TableCell align="left">Maximum Person</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="center">Has Single Use</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rooms.map((val) => (
                                <TableRow>
                                    <TableCell align="left">{val.roomObj.roomNo}</TableCell>
                                    <TableCell align="left">{val.roomObj.roomType}</TableCell>
                                    <TableCell align="left">{val.roomObj.maxPerson}</TableCell>
                                    <TableCell align="left">{val.roomObj.price}</TableCell>
                                    <TableCell align="center">
                                        <Checkbox
                                            checked={val.roomObj.hasSingleUse}
                                            inputProps={{'aria-label': 'primary checkbox'}}/>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button>
                                            <AnnouncementIcon
                                                className={classes.icon}/>
                                        </Button>
                                        <Button>
                                            <ClearIcon className={classes.icon}/>
                                        </Button>

                                    </TableCell>
                                </TableRow>
                            )
                        )
                        }

                    </TableBody>
                </Table>

            </TableContainer>

        </div>
    );
}