import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import { withRouter} from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Button, FormControl, FormHelperText } from '@material-ui/core';
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Copyright from "../../components/copyRight";
import { withStyles } from "@material-ui/core/Styles";
import {connect} from "react-redux";
import propTypes from "prop-types";

const useStyles = (theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class LoginForm extends Component{
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            errors: {},
        }
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        const { username, password } = this.state;
        const errors = this.validate(username, password);
        this.setState({ errors });
        if(Object.keys(this.state.errors).length === 0) {
            this.props.submit(username, password);
        }
    };

    validate = (username, password) => {
        const errors = {};
        if(!username) errors.username = "Can't be blank";
        if(!password) errors.password = "Can't be blank";
        return errors;
    };

    render() {
        const { classes } = this.props;

        return (
            <>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form style={{width: '100', marginTop: '1em'}} noValidate onSubmit={e => this.onSubmit(e)}>
                    <FormControl fullWidth error={!!this.state.errors.username} required>
                        {this.state.errors.username ?
                            <>
                                <TextField
                                    error
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.handleInputChange}
                                    autoComplete="username"
                                    autoFocus
                                />
                                <FormHelperText>Username is required</FormHelperText>
                            </>
                            :
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleInputChange}
                                autoComplete="username"
                                autoFocus
                            />
                        }
                    </FormControl>
                    <FormControl fullWidth error={!!this.state.errors.password} required>
                        {this.state.errors.username ?
                            <>
                                <TextField
                                    error
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <FormHelperText>Password is required</FormHelperText>
                            </>

                        :
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                id="password"
                                autoComplete="current-password"
                            />
                        }
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ margin: '1em 0' }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2" >
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item >
                            <Link onClick={this.props.register} variant="body2" >
                                {"Dont have an account? Sign up"}
                            </Link>
                        </Grid>
                    </Grid>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </form>
            </>

        )
    }
}

LoginForm.propTypes = {
    classes: propTypes.object.isRequired,
};

export default withRouter(connect()(withStyles(useStyles)(LoginForm)))
