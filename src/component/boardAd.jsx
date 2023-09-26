import * as React from 'react';
import { Alert, AlertTitle, Avatar, Box, Button, Container, CssBaseline, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography, createTheme } from "@mui/material"
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllWordAdSubCategories } from "../Axios/wordAdSubCategoriesAxios";
import { setWordAdSubCategories } from "../redux/actions/WordAdSubCategoryActions";
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import { useNavigate } from "react-router-dom";
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { setDatesOfAd, setOrderDetailsOfAds } from "../redux/actions/OrderDetailsActions";
import * as yup from 'yup';
import { useFormik } from 'formik';
import { PALLETE } from '../config';
import { getNextTuesdays } from '../shared-functions/shared-functions';

const validationSchema = yup.object({
    category: yup
        .string('Enter your category')
        .required('Category is required'),
    date: yup
        .string('Enter your date')
        .required('Date is required'),
    content: yup
        .string('Enter your content')
        .min(30, 'Content must be at least 30 characters')
        .required('Content is required'),
    duration: yup
        .number('Enter your duration')
        .required('Duration is required'),
});

export const BoardAd = () => {

    const formik = useFormik({
        initialValues: { category: '', date: '', content: '', duration: '' },
        validationSchema: validationSchema,
        onSubmit: (values) => { handleBeyondPayment(values) },
    });

    const navigate = useNavigate()

    // משתנה שדרכו ניתן לשגר לרדוסר
    const dispatch = useDispatch()

    // מיד בעת טעינת הקומפוננטה תשוגר רשימת תתי הפרסומות לרדוסר
    useEffect(() => {
        getAllWordAdSubCategories().then(w => dispatch(setWordAdSubCategories(w.data)))
        setInputs()
    }, [])

    // חילןץ רשימת תתי מודעות לוח מהרדוסר
    const boardAdTopics = useSelector(w => w.WordAdSubCategoryReducer.list)

    const [arrDates, setArrDates] = useState([])

    const setInputs = () => {
        let arr = getNextTuesdays(5)
        setArrDates(arr)
    }

    const handleBeyondPayment = (values) => {
        let obj = { wordCategoryId: values.category, adContent: values.content, placeId: 1, adDuration: values.duration }
        dispatch(setOrderDetailsOfAds([obj]))
        dispatch(setDatesOfAd([values.date]))
        navigate('/payment')
    }

    return (
        <div className='py-5 container'>
            <div className="mt-5">
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
                        <Avatar className='p-4' sx={{ backgroundColor: PALLETE.PURPLE }}>
                            <DashboardCustomizeIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            board ad
                        </Typography>
                        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <TextField
                                        select
                                        labelId="select-category"
                                        id="category"
                                        name="category"
                                        label="Category"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        helperText={formik.touched.category && formik.errors.category}
                                        fullWidth
                                        error={formik.touched.category && Boolean(formik.errors.category)}
                                        value={formik.values.category}
                                    >
                                        {boardAdTopics.map((b) => (
                                            <MenuItem key={b.wordCategoryId} value={b.wordCategoryId}>
                                                {b.wordCategoryName}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        select
                                        fullWidth
                                        error={formik.touched.date && Boolean(formik.errors.date)}
                                        value={formik.values.date}
                                        helperText={formik.touched.date && formik.errors.date}
                                        labelId="select-date"
                                        id="date"
                                        name="date"
                                        label="Date"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    >
                                        {arrDates.map((d, i) => (
                                            <MenuItem key={i} value={d}>{d}</MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        select
                                        fullWidth
                                        error={formik.touched.duration && Boolean(formik.errors.duration)}
                                        value={formik.values.duration}
                                        helperText={formik.touched.duration && formik.errors.duration}
                                        labelId="select-duration"
                                        id="duration"
                                        name="duration"
                                        label="Duration"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    >
                                        {[1, 2, 3, 4, 5].map((d) => (
                                            <MenuItem key={d} value={d}>{d}</MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <h5 className="float-start my-3">Enter the content of the ad</h5>
                                    <TextField
                                        fullWidth
                                        error={formik.touched.content && Boolean(formik.errors.content)}
                                        helperText={formik.touched.content && formik.errors.content}
                                        value={formik.values.content}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        id="content"
                                        label="Content"
                                        multiline
                                        rows={4}
                                        defaultValue="Default Value"
                                        name="content"
                                        aria-describedby='helper-content'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Alert severity="info" className="my-3">
                                        <AlertTitle style={{ textAlign: "left" }}>Info</AlertTitle>
                                        minimum amount of words 10, each word 1 shekel
                                    </Alert>
                                </Grid>
                            </Grid>
                            <Button
                                endIcon={<SellRoundedIcon />}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 2 }}
                            >
                                beyond payment
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </div>
        </div>
    )
}