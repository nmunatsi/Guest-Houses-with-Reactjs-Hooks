import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Divider, Table, TableBody, TableCell, TableRow} from "@material-ui/core";
import firebase from "../../Backend/firebase";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppDrawer from "../../components/AppDrawer";
import {withRouter} from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import {FormControl, InputGroup, Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import BathtubIcon from '@material-ui/icons/Bathtub';
import TvIcon from '@material-ui/icons/Tv';
import WifiIcon from '@material-ui/icons/Wifi';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const styles = theme => ({
    root: {
        display: 'flex',
        backgroundColor: theme.palette.background.paper,
    }, appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 2,
        height: '230vh',
        padding: 20,
    }, fixedHeight: {
        height: 240,
    }, roomImages: {
        height: '60vh',
        width: '90vh',
        marginTop: 10,
    }, container: {
        paddingTop: theme.spacing(4),
    }, dividerCss: {
        marginTop: 10,
        marginBottom: 10,
    }, paper: {
        width: '100vh',
    }, table: {
        width: '100vh',
    }
});

function RoomMaintanance(props) {
    const {classes} = props

    const [roomNo, setRoomNo] = useState(props.location.state.roomNo);
    const [maxPerson, setMaxPerson] = useState("");
    const [roomPrice, setRoomPrice] = useState("");
    const [roomType, setRoomType] = useState("");
    const [roomStatus, setRoomStatus] = useState("");
    const [hasSingleUse, setHasSingleUse] = useState("");
    const [roomImage, setRoonImage] = useState("default");
    const [roonSize, setRoomSize] = useState("");
    const [entertainment, setEntertainment] = useState(false);
    const [breakfast, setBreakfast] = useState(false);
    const [wifi, setWifi] = useState(false);
    const [shower, setShower] = useState(false);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);


    //multiple images expirement
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState(0);


    const types = ["image/png", "image/jpeg", "image/jpg"];

    var imageName = require('../../components/Modules/ImageHolder')


    const handleChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const selectedFile = e.target.files[0];
            selectedFile["id"] = Math.random()
            if (types.includes(selectedFile.type)) {
                setError(null);
                setImages((prevState) => [...prevState, selectedFile])
            } else {
                setFile(null);
                setError("Please select an image file (png or jpg)");
            }

        }


    };

    let userId;
    userId = firebase.getCurrentUserId();

    const getImageUrls = async () => {
        images.map((image) => {
            return firebase.storageRef
                .ref(`images/${userId}/${roomNo}`)
                .getDownloadURL()
                .then((url) => {
                    let path = firebase.db.ref('guesthouses').child("Rooms Details").child("Rooms").child(userId).child("images").child(roomNo);
                    path.set({
                        roomImage: url
                    })
                });
        })
    }

    //uploading multiple images
    const handleUpload = () => {
        const promises = [];
        // eslint-disable-next-line array-callback-return
        images.map((image) => {
            const uploadTask = firebase.storageRef.ref(`images/${userId}/${roomNo}`).put(image);
            promises.push(uploadTask)
        });

        getImageUrls();

        Promise.all(promises)
            .then(() => alert("All images uploaded"))
            .catch((err) => console.log(err));

    }

    //retriving data
    useEffect(() => {
        let imageUrl

        firebase.db.ref('guesthouses').child("Rooms Details").child("Rooms").child(userId).child("images").child(roomNo).on('value', (dataSnapshot) => {
            imageUrl = dataSnapshot.child("roomImage").val()
        })

        firebase.db.ref('guesthouses').child("Rooms Details").child("Rooms").child(userId).on('value', (snapshot) => {
            snapshot.forEach(data => {
                const dataVal = data.val()
                if (roomNo === dataVal.roomNo) {
                    firebase.db.ref('guesthouses').child("Rooms Details").child("RoomTypes").on('value', (snapshot) => {
                        snapshot.forEach(child => {
                            const roomTypeVal = child.val()
                            if (dataVal.roomType === roomTypeVal.typeName) {
                                setMaxPerson(roomTypeVal.maxPerson);
                                setRoomPrice(roomTypeVal.price);
                                setRoomType(dataVal.roomType);
                                setRoomStatus(dataVal.roomStatus);
                                setRoomSize(dataVal.roomSize);
                                setHasSingleUse(roomTypeVal.hasSingleUse);
                                setRoonImage(imageUrl);
                                setWifi(dataVal.wifi);
                                setShower(dataVal.shower);
                                setBreakfast(dataVal.breakfast);
                                setEntertainment(dataVal.entertainment);
                            }
                        })
                    })
                }

            })
        })

    }, [roomNo, userId])


    function saveRoomInfor() {

        let obj = firebase.db.ref('guesthouses').child("Rooms Details").child("Rooms").child(userId);
        obj.on('value', (snapshot) => {
            snapshot.forEach(data => {
                const dataVal = data.val()
                if (dataVal.houseId === userId) {
                    if (roomNo === dataVal.roomNo && roomType === dataVal.roomType) {
                        obj.child(data.key).update({
                            breakfast: breakfast, entertainment: entertainment,
                            roomNo: roomNo,
                            roomSize: roonSize,
                            roomStatus: roomStatus,
                            roomType: roomType,
                            shower: shower,
                            wifi: wifi,
                        }).then(r => {
                            window.location.reload(false);
                        }).catch(function (error) {
                            console.log("Remove failed: " + error.message)
                        });
                    }
                }
            })
        })

    }

    function handleDeleteRoom() {

        let obj = firebase.db.ref('guesthouses').child("Rooms Details").child("Rooms").child(userId);
        obj.on('value', (snapshot) => {
            snapshot.forEach(data => {
                const dataVal = data.val()
                if (dataVal.houseId === userId) {
                    if (roomNo === dataVal.roomNo && roomType === dataVal.roomType) {
                        obj.child(data.key).update({
                            roomNo: "",
                            roomSize: "",
                            roomStatus: "",
                            roomType: "",
                            houseId: "",
                            shower: "",
                            breakfast: "",
                            entertainment: "",
                            wifi: "",
                        }).then(r => {
                            props.history.push({
                                pathname: '/rooms',
                            });
                        }).catch(function (error) {
                            console.log("Remove failed: " + error.message)
                        });
                    }
                }
            })
        })

    }

    const handleOnBack = (e) => {
        setShow(true)
    }

    const handleDialogClose = () => {
        setShow(false)
    }

    const handleOnChangesDischarge =(e)=>{
        props.history.push({
            pathname: '/rooms',
        });
    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppDrawer/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                {/*Dialog*/}
                <div>
                    <Modal show={show} onHide={()=> {
                        handleDialogClose()
                    }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Changes Not Saved</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>All Changes made will not be saved</Modal.Body>
                        <Modal.Footer>
                            <Button variant="outlined"
                                    color="secondary"
                                    style={
                                        {
                                            'marginRight': 20,
                                        }

                                    }
                                    onClick={() => {handleOnChangesDischarge()}}
                            >
                                Discharge changes
                            </Button>
                            <Button variant="outlined"
                                    color="primary"
                                    style={
                                        {
                                            'marginRight': 20,
                                        }

                                    }
                                    onClick={() => {handleDialogClose()}}
                            >
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <Container className={classes.container}>
                    <Grid container justify="center" spacing={3}>
                        <h1>
                            {roomNo} Details
                        </h1>

                    </Grid>
                    <Divider className={classes.dividerCss}/>
                    <Grid container justify="center" spacing={3}>
                        <div className="img-container">
                            {roomImage === null && <img
                                src={imageName}
                                alt="First slide"
                            />}
                            {roomImage !== null && <img
                                className="img-preview"
                                src={roomImage}
                                alt="First slide"
                            />}

                            <div className="upload-Img">
                                <input type="file" onChange={handleChange}/>
                                <Button variant="outlined" color="secondary" onClick={() => {
                                    handleUpload()
                                }}>
                                    <span> <CloudUploadIcon/> Upload</span>
                                </Button>
                                <div className="loading">
                                    {progress !== 0 && <p>{progress}</p>}
                                </div>

                            </div>


                        </div>
                    </Grid>
                    <Divider className={classes.dividerCss}/>
                    <Grid container justify="center" spacing={3}>
                        <Table aria-label="simple table">
                            <TableBody className={classes.table}>
                                <TableRow>
                                    <TableCell align="center">Room Number</TableCell>
                                    <TableCell align="left">
                                        <InputGroup className="mb-3">
                                            <FormControl aria-label="room number"
                                                         value={roomNo}
                                                         onChange={e => (setRoomNo(e.target.value))}/>
                                        </InputGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Room Status</TableCell>
                                    <TableCell align="left">
                                        <InputGroup className="mb-3">
                                            <FormControl aria-label="room type"
                                                         value={roomStatus}
                                                         onChange={e => (roomStatus(e.target.value))}/>
                                        </InputGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Room Type</TableCell>
                                    <TableCell align="left">
                                        <InputGroup className="mb-3">
                                            <FormControl aria-label="room type"
                                                         value={roomType}
                                                         onChange={e => (setRoomType(e.target.value))}/>
                                        </InputGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Size</TableCell>
                                    <TableCell align="left">
                                        <InputGroup className="mb-3">
                                            <FormControl aria-label="size in meter square"
                                                         value={roonSize}
                                                         onChange={e => (setRoomSize(e.target.value))}/>
                                            <InputGroup.Append>
                                                <InputGroup.Text>.m2</InputGroup.Text>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Price</TableCell>
                                    <TableCell align="left">
                                        <FormControl aria-label="Price of the room"
                                                     value={roomPrice}
                                                     onChange={e => (setRoomPrice(e.target.value))}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Maximum Person</TableCell>
                                    <TableCell align="left">
                                        <FormControl aria-label="maximum number of people allowed in the room"
                                                     value={maxPerson}
                                                     onChange={e => (setMaxPerson(e.target.value))}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center"><BathtubIcon/> Shower </TableCell>
                                    <TableCell align="left">
                                        <Checkbox inputProps={{'aria-label': 'uncontrolled-checkbox'}}
                                                  checked={JSON.parse(shower)}
                                                  onChange={e => (setShower(!shower))}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center"><FreeBreakfastIcon/> Breakfast </TableCell>
                                    <TableCell align="left">
                                        <Checkbox inputProps={{'aria-label': 'uncontrolled-checkbox'}}
                                                  checked={JSON.parse(breakfast)}
                                                  onChange={e => (setBreakfast(!breakfast))}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center"><TvIcon/> Entertainment </TableCell>
                                    <TableCell align="left">
                                        <Checkbox inputProps={{'aria-label': 'uncontrolled-checkbox'}}
                                                  checked={JSON.parse(entertainment)}
                                                  onChange={e => (setEntertainment(!entertainment))}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center"><WifiIcon/> Wifi </TableCell>
                                    <TableCell align="left">
                                        <Checkbox inputProps={{'aria-label': 'uncontrolled-checkbox'}}
                                                  checked={JSON.parse(wifi)}
                                                  onChange={e => (setWifi(!wifi))}/>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Button
                            variant="outlined"
                            color="secondary"
                            style={
                                {
                                    'marginRight': 20,
                                    'marginTop': 20
                                }

                            }
                            onClick={() => {
                                handleOnBack()
                            }}
                        >
                            Back
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            style={
                                {
                                    'marginRight': 20,
                                    'marginTop': 20
                                }

                            }
                            onClick={() => {
                                saveRoomInfor()
                            }}>
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            style={
                                {
                                    'marginRight': 20,
                                    'marginTop': 20
                                }

                            }
                            onClick={() => {
                                handleDeleteRoom()
                            }}
                        >
                            <DeleteForeverIcon
                                color="secondary"
                            />
                            Delete Room
                        </Button>
                    </Grid>
                </Container>
            </main>
        </div>
    );
}

export default withRouter(withStyles(styles)(RoomMaintanance))