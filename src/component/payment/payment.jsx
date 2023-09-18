import { Alert, AlertTitle, Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography, createTheme } from '@mui/material'
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllAdSizes } from '../../Axios/adSizesAxios';
import { setAllAdSizes } from '../../redux/actions/AdSizeActions';
import { finishOrderAdWordsAxios, finishOrderAxios, finishOrderAxiosBoardAd } from '../../Axios/orderAxios';
import { handleImageUpload } from '../../Axios/uploadImageAxios';
import { ThemeProvider } from 'styled-components';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import { useNavigate } from 'react-router-dom';
import { getFromCookies } from '../../cookiesUtils';
import * as yup from 'yup';
import { useFormik } from 'formik';

const defaultTheme = createTheme();

const validationSchema = yup.object({
    name: yup
        .string('Enter your name')
        .required('Name is required'),
    card: yup
        .string('Enter your card number')
        .min(16, 'Number of card must 16 numbers')
        .max(16, 'Number of card must 16 numbers')
        .required('Card number is required'),
    expireOn: yup
        .date('Enter your expireOn')
        .min(new Date(), 'The card has expired')
        .required('ExpireOn is required'),
    cvv: yup
        .string('Enter your cvv')
        .min(3, 'Cvv must 3 characters')
        .max(3, 'Cvv must 3 characters')
        .required('Cvv is required'),
});

export const Payment = () => {

    const formik = useFormik({
        initialValues: { name: '', card: '', expireOn: '', cvv: '' },
        validationSchema: validationSchema,
        onSubmit: (values) => { finishOrder(values) },
    });

    let navigate = useNavigate()

    let dispatch = useDispatch()

    // מיד בעת טעינת הקומפוננטה תשוגר רשימת גדלי הפרסומות לרדוסר
    useEffect(() => {
        getAllAdSizes().then(s => dispatch(setAllAdSizes(s.data)))
    }, [])

    // חילוץ רשימת פרטי הזמנות מהרדוסר
    let listOrderDetailsFromRedux = useSelector(o => o.OrderDetailsReducer.list)

    // חילוץ רשימת תאריכים הזמנות מהרדוסר
    let listDatesFromRedux = useSelector(o => o.OrderDetailsReducer.listDates)

    let customer = getFromCookies("currentUser")

    // פונקציה לסיום הזמנה
    const finishOrder = (values) => {

        let listTempOD = []

        if (listOrderDetailsFromRedux[0].wordCategoryId !== undefined)
            listTempOD.push({ ...listOrderDetailsFromRedux[0] })
        else
            for (let i = 0; i < listOrderDetailsFromRedux.length; i++) {
                let temp = listOrderDetailsFromRedux[i].adFile
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

        if (listOrderDetailsFromRedux[0].wordCategoryId === undefined)
            finishOrderAxios(finishOrder).then(res => {
                navigate('/')
            }).catch(err => {
                console.error(err);
            })
        else
            finishOrderAdWordsAxios(finishOrder).then(res => {
                navigate('/')
            }).catch(err => {
                console.error(err);
            })

        window.alert("The order was successfully placed")

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
                        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <h5 className="float-start my-3">Enter name on card</h5>
                                    <TextField id="name" type={"text"} label="Name" fullWidth
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        helperText={formik.touched.name && formik.errors.name}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        value={formik.values.name}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <h5 className="float-start my-3">Enter number of card</h5>
                                    <TextField id="card" type={"text"} label="Number of card" fullWidth
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        helperText={formik.touched.card && formik.errors.card}
                                        error={formik.touched.card && Boolean(formik.errors.card)}
                                        value={formik.values.card}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <h5 className="float-start my-3">Enter expireOn date</h5>
                                    <TextField id="expireOn" type={"month"} fullWidth
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        helperText={formik.touched.expireOn && formik.errors.expireOn}
                                        error={formik.touched.expireOn && Boolean(formik.errors.expireOn)}
                                        value={formik.values.expireOn}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <h5 className="float-start my-3">Enter CVV</h5>
                                    <TextField id="cvv" type={"number"} label="CVV" fullWidth
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        helperText={formik.touched.cvv && formik.errors.cvv}
                                        error={formik.touched.cvv && Boolean(formik.errors.cvv)}
                                        value={formik.values.cvv}
                                    />
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