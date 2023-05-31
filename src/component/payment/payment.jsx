import { Alert, AlertTitle, Button, TextField } from '@mui/material'
import './payment.css'
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllAdSizes } from '../../Axios/adSizesAxios';
import { setAllAdSizes } from '../../redux/actions/AdSizeActions';
import { finishOrderAxios } from '../../Axios/orderAxios';
import { handleImageUpload } from '../../Axios/uploadImageAxios';

export const Payment = () => {


    let dispatch = useDispatch()

    // מיד בעת טעינת הקומפוננטה תשוגר רשימת גדלי הפרסומות לרדוסר
    useEffect(() => {
        getAllAdSizes().then(s => dispatch(setAllAdSizes(s.data)))
    }, [])

    // חילוץ רשימת פרטי הזמנות מהרדוסר
    let listOrderDetailsFromRedux = useSelector(o => o.OrderDetailsReducer.list)

    // חילוץ רשימת תאריכים הזמנות מהרדוסר
    let listDatesFromRedux = useSelector(o => o.OrderDetailsReducer.listDates)


    // פונקציה לסיום הזמנה
    const finishOrder = (e) => {
        debugger
        e.preventDefault()
        let user = {
            CustFirstName: e.target.firstName.value,
            CustLastName: e.target.lastName.value,
            CustEmail: e.target.email.value,
            CustPhone: e.target.phone.value
        }

        let listTempOD = []
        for (let i = 0; i < listOrderDetailsFromRedux.length; i++) {
            let temp = listOrderDetailsFromRedux[i].adFile
            console.log(temp);
            handleImageUpload(temp)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
            listTempOD.push({ ...listOrderDetailsFromRedux[i], adFile: temp.name })
        }


        let finishOrder = {
            customer: user,
            listDates: listDatesFromRedux,
            listOrderDetails: listTempOD
        }

        finishOrderAxios(finishOrder).then(res => {
            debugger
            console.log(res);
        })
    }

    return (
        <form className="mt-5 pb-5" onSubmit={finishOrder}>
            <div className='row border pb-3 my-3'>
                <h4 className='float-start border p-2' style={{ textAlign: "left" }}>Costumer Details</h4>
                <div className='col-lg-3 col-md-6'>
                    <h5 className="float-start my-3">Enter first name</h5>
                    <TextField id="firstName" label="First Name" fullWidth />
                </div>
                <div className='col-lg-3 col-md-6'>
                    <h5 className="float-start my-3">Enter last name</h5>
                    <TextField id="lastName" label="Last Name" fullWidth />
                </div>
                <div className='col-lg-3 col-md-6'>
                    <h5 className="float-start my-3">Enter email</h5>
                    <TextField id="email" label="Email" fullWidth />
                </div>
                <div className='col-lg-3 col-md-6'>
                    <h5 className="float-start my-3">Enter phone</h5>
                    <TextField id="phone" label="Phone" fullWidth />
                </div>
            </div>

            <div className='row border pb-3 mt-3'>
                <h4 className='float-start border p-2' style={{ textAlign: "left" }}>Credit Card Details</h4>
                <div className='col-lg-3 col-md-6'>
                    <h5 className="float-start my-3">Enter name on card</h5>
                    <TextField id="outlined-multiline-flexible" label="Name" fullWidth />
                </div>
                <div className='col-lg-3 col-md-6'>
                    <h5 className="float-start my-3">Enter num of card</h5>
                    <TextField id="outlined-multiline-flexible" label="1111-2222-3333-4444" fullWidth />
                </div>
                <div className='col-lg-3 col-md-6'>
                    <h5 className="float-start my-3">Enter exp date</h5>
                    <TextField id="outlined-multiline-flexible" type={"month"} views={['month', 'year']} fullWidth />
                </div>
                <div className='col-lg-3 col-md-6'>
                    <h5 className="float-start my-3">Enter CVV</h5>
                    <TextField id="outlined-multiline-flexible" type={"number"} label="CVV" fullWidth />
                </div>
            </div>

            <div className='row border px-3 mt-3 pb-3'>
                <Alert severity="info" className="my-3">
                    <AlertTitle style={{ textAlign: "left" }}>Info</AlertTitle>
                    If the system does not accept your order, you will be sent an acknowledgment by email, you will be available!
                </Alert>

                <Button type='submit' fullWidth variant="contained" endIcon={<DoneAllRoundedIcon />} >
                    Ending an order
                </Button>
            </div>
        </form>
    )
}