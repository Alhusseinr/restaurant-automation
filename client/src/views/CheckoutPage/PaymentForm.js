import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
import {withRouter} from 'react-router-dom';
const { REACT_APP_API_URL } = process.env;

class PaymentForm extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            payment: false
        }
    }

    handlePayment = (id) => {
        console.log('react: ', id);
        const waiterId = this.props.tableId;
        fetch(REACT_APP_API_URL+'/api/o/deleteAll', {
            method: 'DELETE',
            body: JSON.stringify({id}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('jwtToken')
            }
        }).then(deletedItems => {
            if(deletedItems.status === 200) {
                this.props.history.push('/tables');
            }
        }).catch(e => console.log(e))
    }

    render() {
        return (
            <Fragment>
                <Typography variant="h6" gutterBottom>
                    Payment
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField required id="cardName" label="Name on card" fullWidth/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField required id="cardNumber" label="Card number" fullWidth/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField required id="expDate" label="Expiry date" fullWidth/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="cvv"
                            label="CVV"
                            helperText="Last three digits on signature strip"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => this.handlePayment(this.props.tableId)}
                            style={{margin: '1em 0'}}
                        >
                            Checkout
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={this.props.close}
                            style={{margin: '1em 0'}}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Fragment>
        );
    }
}

export default withRouter(PaymentForm);
