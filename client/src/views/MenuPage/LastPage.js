import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Payment from '../CheckoutPage/PaymentForm';


class LastPage extends React.Component {
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
        this.setState({open: false})
    };


    render() {
        return (
            <>
                <Button variant="outlined" color="primary" style={{margin: '1em'}} onClick={this.handleClickOpen}>
                    Checkout Table
                </Button>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClickOpen}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    style={{width: '100%'}}
                >
                    <DialogContent>
                        <Payment close={this.handleClose} tableId={this.props.tableId}/>
                    </DialogContent>
                </Dialog>
            </>
        );
    }
}

export default LastPage;