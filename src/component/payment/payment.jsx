import { Alert, AlertTitle, Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography, createTheme } from '@mui/material'
import './payment.css'
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllAdSizes } from '../../Axios/adSizesAxios';
import { setAllAdSizes } from '../../redux/actions/AdSizeActions';
import { finishOrderAxios } from '../../Axios/orderAxios';
import { handleImageUpload } from '../../Axios/uploadImageAxios';
import { ThemeProvider } from 'styled-components';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import { useNavigate } from 'react-router-dom';


const defaultTheme = createTheme();

export const Payment = () => {

    let localNavigate = useNavigate()

    let dispatch = useDispatch()

    // מיד בעת טעינת הקומפוננטה תשוגר רשימת גדלי הפרסומות לרדוסר
    useEffect(() => {
        getAllAdSizes().then(s => dispatch(setAllAdSizes(s.data)))
    }, [])

    // חילוץ רשימת פרטי הזמנות מהרדוסר
    let listOrderDetailsFromRedux = useSelector(o => o.OrderDetailsReducer.list)

    // חילוץ רשימת תאריכים הזמנות מהרדוסר
    let listDatesFromRedux = useSelector(o => o.OrderDetailsReducer.listDates)

    let customer = useSelector(u => u.CustomersReducer.customer)

    // פונקציה לסיום הזמנה
    const finishOrder = (e) => {               
        e.preventDefault()
        debugger

        
        
        /*let user = {
            CustFirstName: e.target.firstName.value,
            CustLastName: e.target.lastName.value,
            CustEmail: e.target.email.value,
            CustPhone: e.target.phone.value
        }
    */

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
            customer: customer,
            listDates: listDatesFromRedux,
            listOrderDetails: listTempOD
        }

        finishOrderAxios(finishOrder).then(res => {
            debugger
            console.log(res);
        })
    
}

    return (
        <div>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar className='bg-primary p-4'>
                            <CreditScoreIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Payment
                        </Typography>
                        <Box component="form" noValidate onSubmit={finishOrder} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <h5 className="float-start my-3">Enter name on card</h5>
                                    <TextField id="outlined-multiline-flexible" label="Name" fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <h5 className="float-start my-3">Enter num of card</h5>
                                    <TextField id="outlined-multiline-flexible" label="1111-2222-3333-4444" fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <h5 className="float-start my-3">Enter exp date</h5>
                                    <TextField id="outlined-multiline-flexible" type={"month"} views={['month', 'year']} fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <h5 className="float-start my-3">Enter CVV</h5>
                                    <TextField id="outlined-multiline-flexible" type={"number"} label="CVV" fullWidth />
                                </Grid>
                                <Grid item xs={12} textAlign='left'>
                                    <Alert severity="info" className="my-3">
                                        <AlertTitle>Info</AlertTitle>
                                        If the system does not accept your order, you will be sent an acknowledgment by email, you will be available!
                                    </Alert>
                                </Grid>
                            </Grid>
                            <Button
                                endIcon={<DoneAllRoundedIcon />}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Ending an order
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div >
    )
}