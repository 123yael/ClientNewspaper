import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrderDetails } from '../Axios/orderDetailsAxios';
import { setAllDetails } from '../redux/actions/OrderDetailsActions';
import { getAllAdSizes } from '../Axios/adSizesAxios';
import { setAllAdSizes } from '../redux/actions/AdSizeActions';
import { SERVER_NAME } from '../config';

const createData = (adDuration, placeId, sizeId, adFile, categoryId) => {
  return { adDuration, placeId, sizeId, adFile, categoryId };
}

// מערך של שורות
let rows = [
  // createData('Cupcake', 305, 3.7, 67, 4.3),
  // createData('Donut', 452, 25.0, 51, 4.9),
  // createData('Eclair', 262, 16.0, 24, 6.0),
  // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  // createData('Gingerbread', 356, 16.0, 49, 3.9),
  // createData('Honeycomb', 408, 3.2, 87, 6.5),
  // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  // createData('Jelly Bean', 375, 0.0, 94, 0.0),
  // createData('KitKat', 518, 26.0, 65, 7.0),
  // createData('Lollipop', 392, 0.2, 98, 0.0),
  // createData('Marshmallow', 318, 0, 81, 2.0),
  // createData('Nougat', 360, 19.0, 9, 37.0),
  // createData('Oreo', 437, 18.0, 63, 4.0),
];

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// מערך של כותרות לטבלה
const headCells = [
  {
    id: 'adDuration',
    numeric: false,
    disablePadding: false,
    label: 'AdDuration',
  },
  {
    id: 'placeId',
    numeric: false,
    disablePadding: false,
    label: 'PlaceId',
  },
  {
    id: 'sizeId',
    numeric: false,
    disablePadding: false,
    label: 'SizeId',
  },
  {
    id: 'adFile',
    numeric: false,
    disablePadding: false,
    label: 'AdFile',
  },
  {
    id: 'categoryId',
    numeric: false,
    disablePadding: false,
    label: 'CategoryId',
  },
];

// כותרת של טבלה
const EnhancedTableHead = (props) => {

  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// הכותרת הראשית בטבלה שמסבירה על מה הטבלה הולכת להסביר
const EnhancedTableToolbar = () => {
  return (
    <Toolbar>
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        List of order details
      </Typography>
    </Toolbar>
  );
}

export const TableOfOrderDetails = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    getAllOrderDetails().then(x => dispatch(setAllDetails(x.data)))
    getAllAdSizes().then(x => dispatch(setAllAdSizes(x.data)))
  }, [])
  let sizes = useSelector(d => d.AdSizeReducer.list)
  let dl = useSelector(d => d.OrderDetailsReducer.allOrderDetails)
  rows = []
  for (let i = 0; i < dl.length; i++) {
    rows.push(createData(dl[i].adDuration, dl[i].placeId, dl[i].sizeId, dl[i].adFile, dl[i].categoryId))
  }
  for (let i = 0; i < dl.length; i++) {
    rows.push(createData(dl[i].adDuration, dl[i].placeId, dl[i].sizeId, dl[i].adFile, dl[i].categoryId))
  }

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('adDuration');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map(row => (
                <TableRow hover tabIndex={-1} key={row.name} sx={{ cursor: 'pointer' }} >
                  <TableCell align="center">{row.adDuration}</TableCell>
                  <TableCell align="center">{row.placeId}</TableCell>
                  <TableCell align="center">{row.sizeId}</TableCell>
                  <TableCell align="center">
                    <img src={`${SERVER_NAME}/Upload/${row.adFile}`} alt={`${SERVER_NAME}/Upload/${row.adFile}`} height={40}></img>
                  </TableCell>
                  <TableCell align="center">{row.categoryId}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}


