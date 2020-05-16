import React, {useEffect, Fragment} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Entrees from "./entrees";
import Drinks from "./drinks";
import Appetizers from "./appetizers";
import Soups from "./soups";
import Desserts from "./desserts";
import Cart from "./cart";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import TablePagination from "@material-ui/core/TablePagination";
import LastPage from './LastPage';

const {REACT_APP_API_URL} = process.env;

const useStyles = makeStyles(theme => ({
    appBar: {
        position: "relative"
    },
    layout: {
        width: "auto",
        marginTop: '1.5em',
        marginBottom: '1.5em',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 1200,
            marginLeft: "auto",
            marginRight: "auto"
        }
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3)
        }
    },
    stepper: {
        padding: theme.spacing(3, 0, 5)
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end"
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1)
    },
    btn: {
        margin: '0 .25em'
    },
    btnUpdate: {
        backgroundColor: 'green'
    }
}));

const steps = [
    "Beverages",
    "Appetizers",
    "Soups & Salads",
    "Entrees",
    "Desserts",
];

export default function Checkout(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [count, setCount] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [state, setState] = React.useState({
        tableOrder: [],
        tableTotal: 0,
        edit: null,
        tableId: props.match.params.tableId,
    });

    const columns = [
        {id: 'item', label: 'Item', align: 'center'},
        {id: 'comments', label: 'Comments', align: 'center'},
        {id: 'status', label: 'Status', align: 'center'},
        {id: 'price', label: 'Item Price', align: 'center'},
    ];


    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <Drinks tableId={state.tableId}/>;
            case 1:
                return <Appetizers tableId={state.tableId}/>;
            case 2:
                return <Soups tableId={state.tableId}/>;
            case 3:
                return <Entrees tableId={state.tableId}/>;
            case 4:
                return <Desserts tableId={state.tableId}/>;
            case 5:
                return <Cart tableId={state.tableId}/>;
            default:
                return "Unknown step";
        }
    }

    useEffect(() => {
        setCount(0);
        const tableId = props.match.params.tableId;
        fetch(REACT_APP_API_URL + `/api/t/Table/${tableId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('jwtToken')
            }
        }).then(response => response.json()).then(table => {
            console.log(table);
            fetch(REACT_APP_API_URL + '/api/m/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('jwtToken')
                }
            }).then(response => response.json()).then(allItems => {
                //console.log(allItems.items);
                table.tableOrders.map((tableOrder) => {
                    const order = allItems.items.filter(order => order.id === tableOrder.item);
                    tableOrder.item = order[0].item;
                    tableOrder.price = order[0].price;
                })
                setState({...state, tableOrder: table.tableOrders, tableTotal: table.tableTotal, tableId});
            }).catch(e => console.log(e));
        }).catch(e => console.log(e))
    }, [count])

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const checkout = () => {
        setActiveStep(5);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const editable = (id) => {
        setState({...state, edit: id});
    };

    const cancelEditable = () => {
        setState({...state, edit: false})
    };

    const updateValue = (id, columnId, e) => {
        let tempRow = null;
        state.tableOrder.map(order => {
            if (order.id === id) {
                tempRow = order;
                tempRow[columnId] = e.target.value;
            }
        })

        let newRows = [];
        state.tableOrder.map(order => {
            if (order.id === id) {
                newRows.push(tempRow);
            } else {
                newRows.push(order);
            }
        })

        setState({
            ...state, rows: newRows
        })
    };

    const updateOrder = (id, comments, price, status) => {
        const tableId = props.match.params.tableId;
        const orderInfo = {id, comments, price, status, tableId};
        console.log(orderInfo);
        fetch(REACT_APP_API_URL + '/api/o/', {
            method: 'PUT',
            body: JSON.stringify(orderInfo),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('jwtToken')
            }
        }).then(response => response.json()).then(result => {
            if (result) {
                window.location.reload();
            }
        }).catch(error => console.log(error))
    };

    const deleteOrder = (id) => {
        console.log(id);
        fetch(REACT_APP_API_URL + '/api/o/', {
            method: 'DELETE',
            body: JSON.stringify({id}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('jwtToken')
            }
        }).then(response => response.json()).then(result => {
            if (result) {
                window.location.reload();
            }
        }).catch(error => console.log(error))
    }

    const cleanTable = (id, waiterId, orderId, status, total) => {
        fetch(REACT_APP_API_URL + '/api/t/', {
            method: 'PUT',
            body: JSON.stringify({id, waiterId, orderId, status, total}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('jwtToken')
            }
        }).then(response => {
            if (response.status === 200) {
                window.location.reload();
            }
        }).catch(e => console.log(e))
    }


    return (
        <Fragment>
            <main className={classes.layout}>
                <Typography component="h1" variant="h4" align="center">
                    Table Order
                </Typography>
                <div className={classes.root}>
                    <Stepper
                        activeStep={activeStep}
                        className={classes.stepper}
                        alternativeLabel
                    >
                        {steps.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        <Typography className={classes.instructions}>
                            {getStepContent(activeStep)}
                        </Typography>
                        <div className={classes.buttons}>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.button}
                            >
                                Back
                            </Button>
                            {activeStep === steps.length - 1 ? '' :
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                >
                                    Next
                                </Button>
                            }
                        </div>
                    </div>
                </div>
                <Grid container>
                    {state.tableOrder.length > 0 ?
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography component="h1" variant="h4" align="center">
                                Table Orders
                            </Typography>
                        </Grid>
                        :
                        ''
                    }
                    <Grid item style={{width: '100%'}}>
                        <Paper className={classes.root} style={{margin: '2em 0'}}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                            >
                                                <strong>{column.label}</strong>
                                            </TableCell>
                                        ))}
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {state.tableOrder.length > 0 ? state.tableOrder.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={order.id}>
                                                    {columns.map((column) => {
                                                        const value = order[column.id];
                                                        return (
                                                            <>
                                                                {state.edit === order.id ?
                                                                    <TableCell key={order.id} align={column.align}>
                                                                        <FormControl style={{width: '100%'}}>
                                                                            {column.id === 'price' || column.id === 'item' ?
                                                                                <TextField disabled id={order.username}
                                                                                           label={column.id} value={value}
                                                                                           onChange={(e) => updateValue(order.id, column.id, e)}/>
                                                                                :
                                                                                <TextField id={order.username}
                                                                                           label={column.id} value={value}
                                                                                           onChange={(e) => updateValue(order.id, column.id, e)}/>
                                                                            }
                                                                        </FormControl>
                                                                    </TableCell>
                                                                    :
                                                                    <TableCell key={order.id} align={column.align}>
                                                                        {column.id === 'price' ?
                                                                            <>
                                                                                {`$` + value}
                                                                            </>
                                                                            :
                                                                            <>
                                                                                {value}
                                                                            </>
                                                                        }
                                                                    </TableCell>
                                                                }
                                                            </>
                                                        )
                                                    })}
                                                    <TableCell></TableCell>
                                                    <TableCell className={classes.align} align="center">
                                                        {state.edit === order.id ?
                                                            <>
                                                                <Button variant="contained" color="primary"
                                                                        className={classes.btnUpdate}
                                                                        onClick={() => updateOrder(order.id, order.comments, order.price, order.status)}>Update</Button>
                                                                <Button variant="contained" color="secondary"
                                                                        className={classes.btn}
                                                                        onClick={cancelEditable}>Cancel</Button>
                                                            </>
                                                            :
                                                            <>
                                                                <Button variant="contained" color="primary"
                                                                        className={classes.btn}
                                                                        onClick={() => editable(order.id)}>Edit</Button>
                                                                <Button variant="contained" color="secondary"
                                                                        className={classes.btn}
                                                                        onClick={() => deleteOrder(order.id)}>Delete</Button>
                                                            </>
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                        :

                                        <TableRow style={{textAlign: 'center'}}>
                                            <Typography style={{margin: '.5em'}}><strong>There are no orders for table
                                                #{state.tableId}</strong></Typography>
                                        </TableRow>
                                    }

                                    <TableRow style={{width: '100%'}}>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>
                                            <Grid container alignItems='center' spacing={3}>
                                                <Grid item md={6} style={{textAlign: 'right'}}>
                                                    {state.tableTotal > 0
                                                        ?
                                                        <LastPage tableId={state.tableId}/>
                                                        :
                                                        <Button variant="outlined" color="secondary"
                                                                onClick={() => cleanTable(state.tableId, state.tableOrder.waiterId, state.tableOrder.id,'clean', state.tableOrder.total)}>Cleaned</Button>
                                                    }

                                                </Grid>
                                                <Grid item md={6}>
                                                    <Typography
                                                        style={{margin: '0 .25em'}}><strong>Total:</strong> ${state.tableTotal}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15]}
                                component="div"
                                count={state.tableOrder.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </main>
        </Fragment>
    );
}
