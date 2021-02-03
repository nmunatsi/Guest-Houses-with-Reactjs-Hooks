import React from 'react'
import {Typography, Paper, Avatar, Button} from '@material-ui/core'
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom'
import homepagepic from '../Asserts/Images/homepagepic.jpg'

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        paddingTop: theme.spacing.unit * 20,
    },
    paper: {
        marginTop:-100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    pageHeader: {
        minHeight: "100vh",
        height: "auto",
        display: "inherit",
        position: "relative",
        border: "0",
        marginTop: "-100",
        alignItems: "center",
        "&:before": {
            background: "rgba(0, 0, 0, 0.5)"
        },
    },

})

function HomePage(props) {
    const {classes} = props

    return (

        <div className={classes.pageHeader}
             style={{
                 backgroundImage: "url(" + homepagepic + ")",
                 backgroundSize: "cover",
                 backgroundPosition: "top center"
             }}>
            <main className={classes.main}>
                <Paper className={classes.main}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <VerifiedUserOutlined/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Wellcome To Bw Guest Houses
                        </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            component={Link}
                            to="/register"
                            className={classes.submit}>
                            Register
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            component={Link}
                            to="/login"
                            className={classes.submit}>
                            Login
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            component={Link}
                            to="/dashboard"
                            className={classes.submit}>
                            Dashboard
                        </Button>
                    </Paper>
                </Paper>
            </main>
        </div>
    )
}

export default withStyles(styles)(HomePage)