import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from "@material-ui/core/Button";
import TopBar from "../../components/TopBar";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

const {REACT_APP_API_URL} = process.env;

const columns = [
    {id: 'item', label: 'Item Name', align: 'left'},
    {id: 'comments', label: 'Comments', align: 'left'},
    {id: 'status', label: 'Orders Status', align: 'left'},
    {id: 'tableId', label: 'Table Id', align: 'left'},
];

const useStyles = makeStyles({
    root: {
        width: '100%',
        margin: '4em 4em'
    },
    container: {
        maxHeight: 1000,
    },
    btn: {
        margin: '0 1em'
    },
    align: {
        textAlign: 'center'
    },
    btnUpdate: {
        backgroundColor: 'green'
    }
});

export default function StickyHeadTable() {
    const classes = useStyles();
    const [count, setCount] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [state, setState] = React.useState({
        rows: [],
        edit: null
    })

    useEffect(() => {
        setCount(0);
        fetch(REACT_APP_API_URL + '/api/o/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('jwtToken'),
            }
        }).then(response => response.json()).then(result => {
            fetch(REACT_APP_API_URL + '/api/m/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('jwtToken')
                }
            }).then(response => response.json()).then(allItems => {
                //console.log(allItems.items);
                console.log('rows: ', result);
                result.map((order) => {
                    const pendingOrder = allItems.items.filter(item => item.id === order.id);
                    console.log('mhm', pendingOrder)
                    order.item = pendingOrder[0].item;
                })
                setState({...state, rows: result.filter(items => items.status === 'pending')});
            }).catch(e => console.log(e));
        }).catch(e => console.log(e))
    }, [count])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const updateOrder = (id, status) => {
        fetch(REACT_APP_API_URL + '/api/o', {
            method: 'PUT',
            body: JSON.stringify({id, status}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('jwtToken')
            }
        }).then(response => response.json()).then(result => {
            if(result) {
                window.location.reload();
            }
        }).catch(e => console.log(e))
    }

    return (
        <>
            <TopBar/>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={row.id} align={column.align}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell className={classes.align}>
                                            <Button variant="contained" color="primary" className={classes.btn} onClick={() => updateOrder(row.id, 'ready')}>Send Order</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={state.rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </>

    );
}