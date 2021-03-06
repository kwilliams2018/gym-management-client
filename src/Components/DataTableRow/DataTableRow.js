import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell';

import Style from './DataTableRow.module.css';

const StyledTableCell = withStyles({
    head: {
        backgroundColor: '#2087FB',
        color: '#000000',
        fontSize: '18px',
    }
})(TableCell);

class DataTableRow extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        if(this.props.onClick) {
            this.props.onClick(event, this.props.data);
        }
    }

    createCells() {

        return this.props.columns.map((column, i) => {

            let property = column.property
                ? column.property.split('.')
                : null;

            let propertyMap = this.props.data && property
                ? 
                    {
                        1: this.props.data[property[0]],
                        2: this.props.data[property[0]][property[1]]
                    }
                : null;
            
            let propertyValue = property && propertyMap
                ? propertyMap[property.length]
                : null;

                return this.props.styledHeader
                ? this.props.data !== undefined
                    ? column.method === undefined
                        ? <StyledTableCell key={i}>{propertyValue}</StyledTableCell>
                        : <StyledTableCell key={i}>{column.method(this.props.data)}</StyledTableCell>
                    : <StyledTableCell key={i}>{column.label}</StyledTableCell>
                : this.props.data !== undefined
                    ? column.method === undefined
                        ? <TableCell key={i}>{propertyValue}</TableCell>
                        : <TableCell key={i}>{column.method(this.props.data)}</TableCell>
                    : <TableCell key={i}>{column.label}</TableCell>
        });
    }

    render() {

        let cells = this.createCells();

        // TODO: Highlight on hover
        return (
            <TableRow className={Style.base} onClick={this.handleClick}>
                {cells}
            </TableRow>
        )
    }
}

DataTableRow.defaultProps = {
    columns: [],//data: [],
}

export default DataTableRow;