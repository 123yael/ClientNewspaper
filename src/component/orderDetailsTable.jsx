import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { MANAGER_EMAIL, PALLETE, SERVER_NAME } from '../config';
import { useEffect } from 'react';
import { getOrderDetailsByDate } from '../Axios/orderDetailsAxios';
import { useState } from 'react';
import { Button, Dialog, DialogContent } from '@mui/material';


export const OrderDetailsTable = (props) => {



    const Image = (params) => {

        const [showImage, setShowImage] = useState(false)

        return (
            <div>
                <Button fullWidth variant="text" onClick={() => setShowImage(true)}>
                    <img src={`${SERVER_NAME}/Upload/${params.value}`} alt={`${params.value}`} height={70} />
                </Button>

                <Dialog
                    fullWidth
                    maxWidth={'md'}
                    open={showImage}
                    onClose={() => setShowImage(false)}
                >
                    <DialogContent sx={{ textAlign: "center" }}>
                        <img src={`${SERVER_NAME}/Upload/${params.value}`} alt={`${params.value}`} height={500} />
                    </DialogContent>
                </Dialog>
            </div>
        );
    }


    const Boldheader = (params) => {
        return <strong>{params.colDef.headerName}</strong>;
    }

    const Price = (params) => {
        return <div>{params.value}₪</div>;
    }

    const FullName = (params) => {
        return <div>
            {(params.row.custEmail === MANAGER_EMAIL) ? "Manager" : params.value}
        </div>;
    }

    const Embed = (params) => {
        const parts = props.date.split('.');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1] - 1, 10);
        const year = parseInt(parts[2], 10);

        const parsedDate = new Date(year, month, day);
        debugger
        return <Button disabled={parsedDate < new Date()} fullWidth variant="contained" >
            Don't embed
        </Button>;
    }

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 50,
            headerAlign: 'center',
            cellAlign: 'center',
            renderHeader: Boldheader,
            align: 'center',
        },
        {
            field: 'adFile',
            headerName: 'Image',
            width: 180,
            renderCell: Image,
            headerAlign: 'center',
            renderHeader: Boldheader,
            align: 'center',
        },
        {
            field: 'sizeName',
            headerName: 'Size',
            width: 150,
            headerAlign: 'center',
            renderHeader: Boldheader,
            align: 'center',
        },
        {
            field: 'custFullName',
            headerName: 'Customer',
            width: 180,
            headerAlign: 'center',
            cellClassName: (params) => (params.row.custEmail === MANAGER_EMAIL ? "manager-name" : "customer-name"),
            renderHeader: Boldheader,
            renderCell: FullName,
            align: 'center',
        },
        {
            field: 'custEmail',
            headerName: 'Email',
            width: 200,
            headerAlign: 'center',
            renderHeader: Boldheader,
            align: 'center',
        },
        {
            field: 'custPhone',
            headerName: 'Phone',
            width: 150,
            headerAlign: 'center',
            renderHeader: Boldheader,
            align: 'center',
        },
        {
            field: 'orderFinalPrice',
            headerName: 'Final Price',
            width: 120,
            headerAlign: 'center',
            renderHeader: Boldheader,
            renderCell: Price,
            align: 'center',
        },
        {
            field: 'embedOrNot',
            headerName: 'Embed or not',
            width: 150,
            headerAlign: 'center',
            renderHeader: Boldheader,
            renderCell: Embed,
            align: 'center',
        },
    ];

    const itemsPerPage = 5

    const [rows, setRows] = useState([])
    const [totalCount, setTotalCount] = useState()
    const [totalPages, setTotalPages] = useState()
    const [page, setPage] = useState(1);


    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: itemsPerPage,
    });


    const getOrderDetails = () => {
        getOrderDetailsByDate(props.date, paginationModel.page + 1, itemsPerPage).then(res => {
            setRows(res.data.list);
            setTotalPages(res.data.paginationMetadata.totalPages)
            setPage(res.data.paginationMetadata.currentPage)
            setTotalCount(res.data.paginationMetadata.totalCount)
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getOrderDetails()
    }, [paginationModel.page])

    return (
        <Box sx={{ width: '100%', backgroundColor: PALLETE.WHITE, textAlign: "center" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                rowCount={totalCount}
                paginationModel={paginationModel}
                paginationMode="server"
                onPaginationModelChange={setPaginationModel}
                currentPage={paginationModel.page}
                page={page}
                sx={{
                    '& .manager-name': {
                        backgroundColor: PALLETE.PINK,
                        textAlign: "center"
                    },
                    '& .customer-name': {
                        backgroundColor: PALLETE.YELLOW,
                    },
                    '& .manager': {
                        borderLeft: `5px solid ${PALLETE.PINK} `,
                    },
                    '& .customer': {
                        borderLeft: `5px solid ${PALLETE.YELLOW} `,
                    },

                }}
                getRowHeight={() => 70}
                getRowClassName={(params) => (params.row.custEmail === MANAGER_EMAIL) ? "manager" : "customer"}
            />
        </Box>
    );
}
