import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import VisibilityIcon from '@material-ui/icons/Visibility';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CBPiContext } from '../data';
import { actorapi } from '../data/actorapi';
import ActorButton from '../util/ActorButton';
import ActorSwitch from '../util/ActorSwitch';
import DeleteDialog from '../util/DeleteDialog';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const ActorTable = () => {
    const classes = useStyles();
    const history = useHistory();
    const { state, actions } = useContext(CBPiContext);

    
    
    const remove_callback = (id) => {
        actorapi.remove(id)
        actions.delete_actor(id)
    }
    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} dense={true} table size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right" className="hidden-xs">Type</TableCell>
                            <TableCell align="right" className="hidden-xs">GPIO</TableCell>
                            <TableCell align="right" className="hidden-xs">State</TableCell>
                            <TableCell align="right" className="hidden-xs">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.actors.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    
                                        {row.name}
                                
                                </TableCell>
                                <TableCell align="right" className="hidden-xs">{row.type}</TableCell>
                                <TableCell align="right" className="hidden-xs">{row.props["GPIO"]}</TableCell>
                                <TableCell align="right" className="hidden-xs"><ActorSwitch id={row.id}/></TableCell>
                                <TableCell align="right" className="hidden-xs">
                                    <DeleteDialog title="Delete Actor" message="Do you want to delete the Actor" id={row.id} callback={remove_callback} />
                                    <IconButton aria-label="delete" size="small" onClick={() => { history.push("/actor/"+row.id) }} >
                                      <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default  ActorTable