import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { GlobalTable } from '../globalTable';
import { Boldheader, Embed, FullName, Image, S, Status } from './smallComponents';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderDetailsOfAds } from '../../redux/actions/OrderDetailsActions';
import { getAllOrderDetailsTableByDate } from '../../Axios/tableAxios';


export const OrderDetailsTable = (props) => {

    const dispatch = useDispatch()
    const rows = useSelector(y => y.OrderDetailsReducer.list)
    const itemsPerPage = 5
    const [totalCount, setTotalCount] = useState()
    const [page, setPage] = useState(1);


    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: itemsPerPage,
    });


    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 20,
            headerAlign: 'center',
            cellAlign: 'center',
            renderHeader: Boldheader,
            align: 'center',
        },
        {
            field: 'adFile',
            headerName: 'Image',
            width: 150,
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
            field: 'approvalStatus',
            headerName: 'Status',
            width: 120,
            cellClassName: (params) => (params.row.approvalStatus ? "approved" : "failed"),
            renderCell: Status,
            headerAlign: 'center',
            renderHeader: Boldheader,
            align: 'center',
        },
        {
            field: 'weekNumber',
            headerName: 'Week Number',
            width: 110,
            headerAlign: 'center',
            renderHeader: Boldheader,
            align: 'center',
        },
        {
            field: 'embedOrNot',
            headerName: 'Embed or not',
            width: 150,
            headerAlign: 'center',
            renderHeader: Boldheader,
            renderCell: (params) => <Embed type={"files"} date={props.date} data={params} page={paginationModel.page + 1} itemsPerPage={itemsPerPage}></Embed>,
            align: 'center',
        },
    ];

    const getOrderDetails = () => {
        getAllOrderDetailsTableByDate(props.date, paginationModel.page + 1, itemsPerPage).then(res => {
            dispatch(setOrderDetailsOfAds(res.data.list))
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
        <GlobalTable
            rows={rows}
            columns={columns}
            totalCount={totalCount}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            page={page}
        ></GlobalTable>
    );
}
