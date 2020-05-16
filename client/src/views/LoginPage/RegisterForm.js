import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Button, FormControl, FormHelperText } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from "@material-ui/core/styles";
import propTypes from 'prop-types';
import Copyright from "../../components/copyRight";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const useStyles = (theme) => ({
    paper: {
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class SignUp extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            errors: {}
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
        const { username, email, password } = this.state;
        const errors = this.validate(username, email, password);
        this.setState({ errors });
        if(Object.keys(this.state.errors).length === 0) {
            this.props.submit(username, password, email)
        }
    };

    validate = (username, email, password) => {
        const errors = {};
        if(!username) errors.username = "Username can't be blank";
        if(!email) errors.email = "Email can't be blank";
        if(!password) errors.password = "Password cannot be blank";
        return errors;
    };

    render() {
        const { classes } = this.props;

        return (
            <Container maxWidth="xs" style={{ padding: '0' }}>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={this.onSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={!!this.state.errors.username} required>
                                    {this.state.errors.username ?
                                        <>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="username"
                                                label="Username"
                                                id="username"
                                                value={this.state.username}
                                                onChange={this.handleInputChange}
                                                autoComplete="username"
                                            />
                                            <FormHelperText>{this.state.errors.username}</FormHelperText>
                                        </>
                                        :
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="username"
                                            label="Username"
                                            id="username"
                                            autoComplete="username"
                                            value={this.state.username}
                                            onChange={this.handleInputChange}
                                        />
                                    }
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={!!this.state.errors.email} required>
                                    {this.state.errors.email ?
                                        <>
                                            <TextField
                                                error
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                                value={this.state.email}
                                                onChange={this.handleInputChange}
                                            />
                                            <FormHelperText>{this.state.errors.email}</FormHelperText>
                                        </>
                                        :
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            value={this.state.email}
                                            onChange={this.handleInputChange}
                                        />
                                    }
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={!!this.state.errors.password} required>
                                    {this.state.errors.password ?
                                        <>
                                            <TextField
                                                error
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                autoComplete="current-password"
                                                value={this.state.password}
                                                onChange={this.handleInputChange}
                                            />
                                            <FormHelperText>{this.state.errors.password}</FormHelperText>
                                        </>
                                        :
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            value={this.state.password}
                                            onChange={this.handleInputChange}
                                        />
                                    }
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link onClick={this.props.login} variant="body2" >
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        );
    }
}

SignUp.propTypes = {
    classes: propTypes.object.isRequired,
};

export default withRouter(connect()(withStyles(useStyles)(SignUp)))

