import React, {useEffect} from 'react';
import {
    Button,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    NativeSelect
} from "@material-ui/core";
import firebase from "../../../../firebase";



export default function AddDialog(props) {
    const [roomTypeSelector, setRoomTypeSelector] = React.useState("");
    const [noRooms, setNoRooms] = React.useState(1);
    const [roomType, setRoomType] = React.useState([]);
    const [roomNo, setRoomNo] = React.useState(1);

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
                        houseId: dataVal.houseId,
                    })
                }
            })
            roomTypeColle = newRoomType;
        })

        setRoomType(roomTypeColle)

    }, [])


    function addRoom() {
        var temp=roomNo;
        for (var i = 0; i < noRooms; i++) {
            temp += i
            try {
                console.log(roomTypeSelector)
                firebase.addRooms(roomTypeSelector,temp)

            } catch (error) {
                alert(error.message)
            }

        }
        //window.location.reload(false);
    }


    return (
        <div>
            <FormControl >
                <NativeSelect
                    value={roomTypeSelector}
                    onChange={event => (setRoomTypeSelector(event.target.value))}
                    inputProps={{
                        name: 'roomType',
                        id: 'room-type',
                    }}
                >
                    <option aria-label="None" value="" />
                    {roomType.map((val)=>(
                    <option value={val.typeName}>{val.typeName}</option>
                    ))}
                </NativeSelect>
                <FormHelperText>Select The type of room</FormHelperText>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
                <InputLabel>Room Number</InputLabel>
                <Input id="roomNo" type="number" name="roomNo" autoComplete="off" autoFocus
                       value={roomNo} onChange={e => setRoomNo(e.target.value)}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
                <InputLabel>Number of Rooms</InputLabel>
                <Input id="maxPerson" type="number" name="maxPerson" autoComplete="off" autoFocus
                       value={noRooms} onChange={e => setNoRooms(e.target.value)}/>
            </FormControl>


            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={addRoom}>
                Add Room
            </Button>

        </div>
    );
}