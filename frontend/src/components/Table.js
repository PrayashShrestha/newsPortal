import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function DynamicTable({ rows, columns, button, buttonText, onClick }) {
     const theme = useTheme();
   return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="dynamic table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} style={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>
                {column.label}</TableCell>
            ))}
            {button && <TableCell  style={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.id}>{row[column.id]}</TableCell>
              ))}
              {button && (
                <TableCell >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onClick(row)}
                  >
                    {buttonText}
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DynamicTable;