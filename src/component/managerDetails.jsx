import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllOrderDetails} from '../Axios/orderDetailsAxios'
import {setAllDetails} from '../redux/actions/OrderDetailsActions'
import * as React from 'react'


export const ManagerDetails = () => {

    let detailsList = []
    detailsList = useSelector(d => d.OrderDetailsReducer.allOrderDetails)

    let dispatch = useDispatch()

    useEffect(() => {
        getAllOrderDetails().then(x=> dispatch(setAllDetails(x.data)))
    },[])


// AdDuration PlaceId SizeId AdFile AdContent WordCategoryId WordCategoryId CategoryId OrderId DetailsId
    return <>
    {detailsList.map((x, i)=>{
        <p key={i}>{x}</p>
    })}
    </>
}
