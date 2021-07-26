import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter} from 'react-router-dom'
import Grid from "@material-ui/core/Grid";
import {
    ButtonGroup,
    ClickAwayListener,
    Grow,
    MenuItem,
    MenuList,
    Paper,
    Popper
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AddIcon from '@material-ui/icons/Add';
import AddTypeDialog from '../RoomList/AddTypeDialog'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import AddDialog from "./AddRooms";
import RoomTypesTable from "./AddTypeDialog/RoomTypesTable";
import RoomsTable from "./AddRooms/RoomsTable";


const styles = theme => ({
    root: {
        display: 'flex',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        '& > *': {
            margin: theme.spacing(1),
        },
        paddingLeft: theme.spacing(35),
    },
    fixedHeight: {
        height: 240,
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    addRoomBtn: {
        marginLeft: 10,
    }, dialogContent: {
        marginTop: -20,
    },tables:{
        marginTop: 10,
    },
});

const options = ['Rooms', 'Room Type'];


function RoomList(props) {
    const {classes} = props
    const [open, setOpen] = React.useState(false);
    const [openDia, setOpenDia] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);



    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };


    const handleAdd = () => {
        setOpenDia(true);
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <main className={classes.content}>
                <Grid container direction="column">
                    <Grid item xs={12}>
                        <ButtonGroup variant="contained" color="secondary" ref={anchorRef} aria-label="split button">
                            <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                            <Button
                                color="secondary"
                                size="small"
                                aria-controls={open ? 'split-button-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-label="select merge strategy"
                                aria-haspopup="menu"
                                onClick={event => (setOpen((prevOpen) => !prevOpen))}
                            >
                                <ArrowDropDownIcon/>
                            </Button>
                        </ButtonGroup>
                        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                            {({TransitionProps, placement}) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{
                                        transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                                    }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList id="split-button-menu">
                                                {options.map((option, index) => (
                                                    <MenuItem
                                                        key={option}
                                                        disabled={index === 2}
                                                        selected={index === selectedIndex}
                                                        onClick={(event) => handleMenuItemClick(event, index)}
                                                    >
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                        <Button className={classes.addRoomBtn} onClick={handleAdd} variant="contained"
                                color="secondary">
                            <AddIcon/>
                            Add {options[selectedIndex]}
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={3} className={classes.tables}>
                    <Grid item xs={12}>
                        {options[selectedIndex] === 'Room Type' && <RoomTypesTable/>}
                        {options[selectedIndex] === 'Rooms' &&<RoomsTable/>}

                    </Grid>
                </Grid>

            </main>
            <div>
                <Dialog
                    open={openDia}
                    onClose={event => (setOpenDia(false))}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="add-dialog-box">Add {options[selectedIndex]}</DialogTitle>

                    <DialogContent className={classes.dialogContent}>
                        {options[selectedIndex] === 'Rooms' &&<AddDialog/>}

                        {options[selectedIndex] === 'Room Type' &&<AddTypeDialog/>}
                    </DialogContent>

                </Dialog>
            </div>
        </div>
    );
}

export default withRouter(withStyles(styles)(RoomList))