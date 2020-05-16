import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LoginForm from "./LoginForm";
import SignUp from './RegisterForm';
import {withRouter} from 'react-router-dom'
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import propTypes from 'prop-types';


const useStyles = (theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://restaurantengine.com/wp-content/uploads/2015/05/startup-restaurants-typically-overspend.jpg)',
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


class SignInSide extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            form: 'Login',
        }
    }

    login = (username, password) => {
        fetch('http://127.0.0.1:5000/api/u/login', {
            method: 'POST',
            body: JSON.stringify({
                password, username
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(result => {
            if(result.Token){
                localStorage.setItem('jwtToken', result.Token);
                this.props.history.push('/')
            }
        }).catch(error => console.log(error))
    };

    register = (username, password, email)  => {
        fetch('http://127.0.0.1:5000/api/u/', {
            method: 'POST',
            body: JSON.stringify({
                username, password, email
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(response.status === 400){
                //window.location.reload();
                console.log(response.body);
            }
            response.json()
        }).then(result => {
              if(result !== null) {
                  //window.location.reload();
              }
              console.log(result);
        }).catch(err => { console.log(err); })
    };

    signUp = () => {
        this.setState({ form: 'SignUp' })
    };

    signIn = () => {
        this.setState({ form: 'Login' })
    };

    render(){
        const { classes } = this.props;
        return(
            <>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elecation={6} square>
                    <div className={classes.paper}>
                        {this.state.form === 'Login' ? <LoginForm submit={this.login} register={this.signUp}  /> : <SignUp submit={this.register} login={this.signIn} /> }
                    </div>
                </Grid>
            </>
        );
    }
}

SignInSide.propTypes = {
    classes: propTypes.object.isRequired,
};

export default withRouter(connect()(withStyles(useStyles)(SignInSide)))


