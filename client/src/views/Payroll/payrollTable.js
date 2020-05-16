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
const { REACT_APP_API_URL } = process.env;

const columns = [
    {id: 'userId', label: 'Username', align: 'left'},
    {id: 'clockInTime', label: 'Clock In Time', align: 'left'},
    {id: 'clockOutTime', label: 'Clock Out Time', align: 'left'},
    {id: 'hoursWorked', label: 'Total Hours Worked', align: 'left'},
    {id: 'totalWage', label: 'Total Pay', align: 'left'},
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
        fetch(REACT_APP_API_URL + '/api/p/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('jwtToken')
            }
        }).then(response => response.json()).then(payrollRecords => {

            fetch(REACT_APP_API_URL + '/api/u/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('jwtToken')
                }
            }).then(response => response.json()).then(allUsers => {
                payrollRecords.map((payrollRecord) => {
                    const user = allUsers.filter(user => user.id === payrollRecord.userId);
                    payrollRecord.clockInTime = formatDate(payrollRecord.clockInTime);
                    payrollRecord.clockOutTime = formatDate(payrollRecord.clockOutTime);
                    payrollRecord.userId = user[0].username;
                });
                setState({...state, rows: payrollRecords});
            }).catch(e => console.log(e))
        }).catch(e => console.log(e))
    }, [count])

    // const getUsername = (userId) => {
    //     console.log("user id" + userId);
    //     fetch(REACT_APP_API_URL+'/api/u/', {
    //         method: 'DELETE',
    //         body: JSON.stringify({ userId }),
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': localStorage.getItem('jwtToken')
    //         }
    //     }).then(response => response.json()).then(result => {
    //
    //     }).catch(error => console.log(error))
    // }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const editable = (id) => {
        setState({...state, edit: id});
    }

    const cancelEditable = () => {
        setState({...state, edit: false})
    }

    const deleteRecord = (id) => {
        fetch(REACT_APP_API_URL+'/api/p/', {
            method: 'DELETE',
            body: JSON.stringify({
                id
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('jwtToken')
            }
        }).then(response => response.json()).then(result => {
            if(result) {
                window.location.reload();
            }
        }).catch(error => console.log(error))
    }

    // const updateRecord = ( id, username, email, role, phoneNumber) => {
    //     const userinfo = { id, username, email, role, phoneNumber };
    //     console.log(userinfo);
    //     fetch(REACT_APP_API_URL+'/api/p/', {
    //         method: 'PUT',
    //         body: JSON.stringify({
    //             userinfo
    //         }),
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': localStorage.getItem('jwtToken')
    //         }
    //     }).then(response => response.json()).then(result => {
    //         if(result) {
    //             window.location.reload();
    //         }
    //     }).catch(error => console.log(error))
    // }

    const updateValue = (id, columnId, e) => {
        let tempRow = null;
        state.rows.map(row => {
            if(row.id === id) {
                tempRow = row;
                tempRow[columnId] = e.target.value;
            }
        })

        let newRows = [];
        state.rows.map(row => {
            if(row.id === id) {
                newRows.push(tempRow);
            } else {
                newRows.push(row);
            }
        })

        setState({
            ...state, rows: newRows
        })
    }

    const formatDate = dateTime => {
        const date = dateTime.substring(0, 10);
        const time = checkTime(dateTime.substring(11, 19));

        dateTime = date + '  ' + time;
        return dateTime;
    }

    const checkTime = time => {
        if(parseInt(time.substring(0, 2)) > 12) {
            time = parseInt(time) - 12 + 'pm'
        } else if (parseInt(time.substring(0, 2)) < 12) {
            time = time + 'am'
        }
        return time;
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
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <>
                                                    {state.edit === row.id ?
                                                        <TableCell key={row.id} align={column.align}>
                                                            <FormControl style={{width: '100%'}}>
                                                                <TextField id={row.username} label={column.id} value={value} onChange={ (e) => updateValue(row.id, column.id, e) } />
                                                            </FormControl>
                                                        </TableCell>
                                                        :
                                                        <TableCell key={row.id} align={column.align}>
                                                            {value}
                                                        </TableCell>
                                                    }
                                                </>
                                            );
                                        })}
                                        <TableCell className={classes.align}>
                                            {state.edit === row.id ?
                                                <>
                                                    <Button variant="contained" color="primary" className={classes.btnUpdate}>Update</Button>
                                                    <Button variant="contained" color="secondary" className={classes.btn} onClick={cancelEditable}>Cancel</Button>
                                                </>
                                                :
                                                <>
                                                    <Button variant="contained" color="secondary" className={classes.btn} onClick={() => deleteRecord(row.id)}>Delete</Button>
                                                </>
                                            }
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