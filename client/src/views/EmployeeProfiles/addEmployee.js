import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import AddForm from './addForm';


class AlertDialog extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        }
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({ open: false })
    };

    register = (username, password, email)  => {
        fetch('http://127.0.0.1:5000/api/u/', {
            method: 'POST',
            body: JSON.stringify({
                username, password, email
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('jwtToken')
            }
        }).then(response => {
            if(response.status === 400){
                window.location.reload();
                console.log(response.body);
            }
            response.json()
        }).then(result => {
            if(result !== null) {
                window.location.reload();
            }
            console.log(result);
        }).catch(err => { console.log(err); })
    };


    render() {
        return (
            <div>
                <Button variant="contained" color="primary" style={{margin: '1em'}} onClick={this.handleClickOpen}>
                    Add An Employee
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClickOpen}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <AddForm close={this.handleClose} submit={this.register} />
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default AlertDialog;







// export default function AlertDialog(props) {
//     // const [open, setOpen] = React.useState(false);
//     // const [state, setState] = React.useState({
//     //     username: '',
//     //     email: '',
//     //     password: '',
//     //     errors: ''
//     // })
//     //
//     const handleClickOpen = () => {
//         setOpen(true);
//     };
//
//     const handleClose = () => {
//         setOpen(false);
//     };

//     // const handleInputChange = (event) => {
//     //     const { value, name } = event.target;
//     //     setState({...state, [name]: value});
//     // };
//     //
//     // const onSubmit = (event) => {
//     //     event.preventDefault();
//     //     const { username, email, password } = state;
//     //     const errors = validate(username, email, password);
//     //     setState({ ...state, errors });
//     //     if(Object.keys(this.state.errors).length === 0) {
//     //         this.props.submit(username, password, email)
//     //     }
//     // };
//     //
//     // const validate = (username, email, password) => {
//     //     const errors = {};
//     //     if(!username) errors.username = "Username can't be blank";
//     //     if(!email) errors.email = "Email can't be blank";
//     //     if(!password) errors.password = "Password cannot be blank";
//     //     return errors;
//     // };
//
//     return (
//         <div>
//             <Button variant="contained" color="primary" style={{margin: '1em'}} onClick={handleClickOpen}>
//                 Add An Employee
//             </Button>
//             <Dialog
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="alert-dialog-title"
//                 aria-describedby="alert-dialog-description"
//             >
//                 <DialogTitle id="alert-dialog-title"><strong>{"Add a new employee"}</strong></DialogTitle>
//                 <DialogContent>
//                     <DialogContentText id="alert-dialog-description">
//                         <strong>Please provide a username, email, and password</strong>
//                     </DialogContentText>
//                     <form>
//                         <Grid container>
//                             <Grid item xs={12} md={12} lg={12} style={{margin: '.5em 0' }}>
//                                 <TextField
//                                     variant="outlined"
//                                     required
//                                     fullWidth
//                                     name="username"
//                                     label="Username"
//                                     id="username"
//                                 />
//                             </Grid>
//                             <Grid item xs={12} md={12} lg={12} style={{margin: '.5em 0' }}>
//                                 <TextField
//                                     variant="outlined"
//                                     required
//                                     fullWidth
//                                     name="email"
//                                     label="Email"
//                                     id="email"
//                                 />
//                             </Grid>
//                             <Grid item xs={12} md={12} lg={12} style={{margin: '.5em 0' }}>
//                                 <TextField
//                                     variant="outlined"
//                                     required
//                                     fullWidth
//                                     name="password"
//                                     label="Password"
//                                     id="password"
//                                     type="password"
//                                 />
//                             </Grid>
//                             <Grid item xs={12} md={12} lg={12} style={{margin: '.5em 0' }}>
//                                 <Button onClick={handleClose} variant="contained" color="primary" autoFocus style={{ width: '100%' }}>
//                                     Submit
//                                 </Button>
//                             </Grid>
//                             <Grid item xs={12} md={12} lg={12} style={{margin: '.5em 0' }}>
//                                 <Button onClick={handleClose} variant="contained" color="secondary" style={{ width: '100%' }}>
//                                     Cancel
//                                 </Button>
//                             </Grid>
//                         </Grid>
//                     </form>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// }