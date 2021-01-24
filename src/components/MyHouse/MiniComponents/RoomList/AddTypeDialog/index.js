import React from 'react';
import {Button, Checkbox, FormControl, FormControlLabel, Input, InputLabel} from "@material-ui/core";
import firebase from "../../../../firebase";
import RoomList from "../index";


export default function AddTypeDialog(props) {
    const {classes} = props

    const [typeName, setTypeName] = React.useState("");
    const [maxPerson, setMaxPerson] = React.useState(1);
    const [price, setPrice] = React.useState(50);
    const [hasSingleUse, setHasSingleUse] = React.useState(false);

    function addRoomType(){
        try {
            firebase.addRoomType(typeName,maxPerson,price,hasSingleUse)
        } catch(error) {
            alert(error.message)
        }
        window.location.reload(false);
    }


    return (
        <div>
            <FormControl margin="normal" required fullWidth>
                <InputLabel>Name</InputLabel>
                <Input id="typeName" name="typeName" autoComplete="off" autoFocus value={typeName}
                       onChange={e => setTypeName(e.target.value)}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
                <InputLabel>Maximum Persons</InputLabel>
                <Input id="maxPerson" type="number" name="maxPerson" autoComplete="off" autoFocus
                       value={maxPerson} onChange={e => setMaxPerson(e.target.value)}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
                <InputLabel>Price</InputLabel>
                <Input id="price" type="number" name="price" autoComplete="off" autoFocus value={price}
                       onChange={e => setPrice(e.target.value)}/>
            </FormControl>
            <FormControlLabel
                control={<Checkbox checked={hasSingleUse} onChange={event => (setHasSingleUse(true))} name="hasSingleUse"/>}
                label="Has Single Use"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={addRoomType}>
                Add Type
            </Button>

        </div>
    );
}