import React, {useEffect} from 'react';
import {
    Checkbox, makeStyles,
    Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow
} from "@material-ui/core";
import firebase from "../../../../../../Backend/firebase";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    body: {
        fontSize: 14,
    },
});


export default function RoomTypesTable(props) {
    const classes = useStyles();
    const [roomType, setRoomType] = React.useState([]);

    let newRoomType = [];
    let roomTypeColle = [];

    let userId;
    userId = firebase.getCurrentUserId();

    //retriving data
    useEffect(() => {
        firebase.db.ref('guesthouses').child("Rooms Details").child("RoomTypes").on('value', (snapshot) => {
            snapshot.forEach(data => {
                const dataVal = data.val()
                if (dataVal.houseId===userId) {
                    newRoomType.push({
                        typeName: dataVal.typeName,
                        maxPerson: dataVal.maxPerson,
                        price: dataVal.price,
                        hasSingleUse: dataVal.hasSingleUse,
                    })
                }

            })
            // eslint-disable-next-line react-hooks/exhaustive-deps
            roomTypeColle = newRoomType;

        })

        setRoomType(roomTypeColle)

    }, [])


    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Type</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="left">Maximum Person</TableCell>
                            <TableCell align="center">Has Single Use</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {roomType.map((val) => (
                                <TableRow>
                                    <TableCell align="left">{val.typeName}</TableCell>
                                    <TableCell align="left">{val.price}</TableCell>
                                    <TableCell align="left">{val.maxPerson}</TableCell>
                                    <TableCell align="center">
                                        <Checkbox
                                            checked={val.hasSingleUse}
                                            inputProps={{'aria-label': 'primary checkbox'}}/>
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