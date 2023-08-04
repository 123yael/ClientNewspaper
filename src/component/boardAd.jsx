import { Alert, AlertTitle, Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Select, Typography, createTheme } from "@mui/material"

import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllWordAdSubCategories } from "../Axios/wordAdSubCategoriesAxios";
import { setWordAdSubCategories } from "../redux/actions/WordAdSubCategoryActions";
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { setDatesOfAd, setOrderDetailsOfAds } from "../redux/actions/OrderDetailsActions";



const defaultTheme = createTheme();

export const BoardAd = () => {

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

    const [category, setCategory] = useState('')
    const [myData, setMyDate] = useState('')
    const [content, setContent] = useState('')
    const [isValid1, setIsValid1] = useState(true)
    const [isValid2, setIsValid2] = useState(true)
    const [arrDates, setArrDates] = useState([])

    const changeIsValid1 = () => {
        setIsValid1(false)
    }

    const changeIsValid2 = () => {
        setIsValid2(false)
    }


    const handleChangeCategory = (event) => {
        setCategory(event.target.value)
    }

    const handleChangeDate = (event) => {
        setMyDate(event.target.value)
    }

    const addContent = (event) => {
        setContent(event.target.value)
        if (event.target.value === '')
            event.target.style.border = "1px solid red"
        else
            event.target.style.border = "none"
    }

    // פונקציה להוספת אפס עבור מספר בודד
    const appendLeadingZeros = (int) => {
        return (int < 10) ? '0' + int : int
    }

    // פונקציה להצגת קלטים של תאריכים
    const setInputs = () => {
        let today = new Date()
        let currentDay = today.getDay()
        let daysUntilNextDay = (2 + 7 - currentDay) % 7
        let dt = new Date(today.getTime() + daysUntilNextDay * 24 * 60 * 60 * 1000)
        let formatedTime
        let arr = []
        for (let i = 0; i < 5; i++) {
            formatedTime = dt.getFullYear() + '-' + appendLeadingZeros((dt.getMonth() + 1)) + '-' + appendLeadingZeros(dt.getDate())
            arr.push(formatedTime)
            dt = new Date(dt.getTime() + 7 * 24 * 60 * 60 * 1000)
        }
        setArrDates(arr)
    }

    // פונקצית מעבר לתשלום
    const beyondPayment = (event) => {
        event.preventDefault()
        debugger
        if (category !== '' && content !== '' && myData !== '') {
            let obj = { wordCategoryId: category, adContent: content, placeId: 1 }
            dispatch(setOrderDetailsOfAds([obj]))
            dispatch(setDatesOfAd([myData]))
            navigate('/payment')
        }
    }

    return (
        <div className="mt-5">
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
                            <DashboardCustomizeIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            board ad
                        </Typography>
                        <Box component="form" noValidate onSubmit={beyondPayment} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <FormControl fullWidth error={!isValid1 && category === ''} onClick={() => changeIsValid1()}>
                                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="category"
                                            value={category}
                                            label="Category"
                                            onChange={handleChangeCategory}
                                        >
                                            {
                                                boardAdTopics.map(b => (
                                                    <MenuItem key={b.wordCategoryId} value={b.wordCategoryId}>{b.wordCategoryName}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth error={!isValid2 && myData === ''} onClick={() => changeIsValid2()}>
                                        <InputLabel id="demo-simple-select-label">Date</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="myData"
                                            value={myData}
                                            label="Date"
                                            onChange={handleChangeDate}
                                        >
                                            {
                                                arrDates.map((d, i) => (
                                                    <MenuItem key={i} value={d}>{d}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <h5 className="float-start my-3">Enter the content of the ad</h5>
                                    <textarea className="form-control" rows="5" id="content" name="text" onChange={addContent}></textarea>
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
            </ThemeProvider>
        </div>
    )
}