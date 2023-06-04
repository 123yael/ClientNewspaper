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



const defaultTheme = createTheme();

export const BoardAd = () => {

    const navigate = useNavigate()

    // משתנה שדרכו ניתן לשגר לרדוסר
    const dispatch = useDispatch()

    // מיד בעת טעינת הקומפוננטה תשוגר רשימת תתי הפרסומות לרדוסר
    useEffect(() => {
        getAllWordAdSubCategories().then(w => dispatch(setWordAdSubCategories(w.data)))
    }, [])

    // חילןץ רשימת תתי מודעות לוח מהרדוסר
    const boardAdTopics = useSelector(w => w.WordAdSubCategoryReducer.list)

    const [title, setTitle] = useState('');

    const handleChange = (event) => {
        setTitle(event.target.value);
    };

    // פונקצית מעבר לתשלום
    const beyondPayment = () => {
        navigate('/payment')
    }

    return (
        <div className="mt-5">
            {/* <h2 className="float-start my-3">Choose a category for a board ad</h2>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Title</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={title}
                    label="Title"
                    onChange={handleChange}
                >
                    {
                        boardAdTopics.map(b => (
                            <MenuItem key={b.wordCategoryId} value={b.wordCategoryId}>{b.wordCategoryName}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <h2 className="float-start my-3">Enter the content of the ad</h2>
            <textarea className="form-control" rows="5" id="comment" name="text"></textarea>

            <Alert severity="info" className="my-3">
                <AlertTitle style={{ textAlign: "left" }}>Info</AlertTitle>
                minimum amount of words 10, each word 1 shekel
            </Alert>

            <Button fullWidth variant="contained" endIcon={<SellRoundedIcon />} onClick={beyondPayment}>
                beyond payment
            </Button> */}
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
                                <Grid item xs={12}>
                                    <h5 className="float-start my-3">Choose a category for a board ad</h5>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Title</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={title}
                                            label="Title"
                                            onChange={handleChange}
                                        >
                                            {
                                                boardAdTopics.map(b => (
                                                    <MenuItem key={b.wordCategoryId} value={b.wordCategoryId}>{b.wordCategoryName}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <h5 className="float-start my-3">Enter the content of the ad</h5>
                                    <textarea className="form-control" rows="5" id="comment" name="text"></textarea>
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
                                sx={{ mt: 3, mb: 2 }}
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