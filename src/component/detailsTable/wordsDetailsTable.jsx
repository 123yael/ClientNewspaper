import * as React from 'react';
import { PALLETE } from '../../config';
import { useEffect } from 'react';
import { useState } from 'react';
import { GlobalTable } from '../globalTable';
import { Boldheader, Content, Embed, FullName, Status } from './smallComponents';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderDetailsOfAds } from '../../redux/actions/OrderDetailsActions';
import { getAllDetailsWordsTableByDate } from '../../Axios/tableAxios';


export const WordsDetailsTable = (props) => {

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
            field: 'wordCategoryName',
            headerName: 'Category',
            width: 150,
            renderCell: FullName,
            headerAlign: 'center',
            renderHeader: Boldheader,
            align: 'center',
        },
        {
            field: 'adContent',
            headerName: 'Content',
            width: 150,
            renderCell: Content,
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
            renderCell: (params) => <Embed type={"words"} date={props.date} data={params} page={paginationModel.page + 1} itemsPerPage={itemsPerPage}></Embed>,
            align: 'center',
        },
    ];

    const itemsPerPage = 5

    const dispatch = useDispatch()
    const rows = useSelector(y => y.OrderDetailsReducer.list)
    const [totalCount, setTotalCount] = useState()
    const [page, setPage] = useState(1);


    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: itemsPerPage,
    });


    const getOrderDetails = () => {
        getAllDetailsWordsTableByDate(props.date, paginationModel.page + 1, itemsPerPage).then(res => {
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
            getRowId={(row) => row.sizeId + '-' + row.placeId} 
        ></GlobalTable>
    );
}
