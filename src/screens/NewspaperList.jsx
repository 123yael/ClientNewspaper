import React, { useEffect, useState } from "react";
import NewspaperThumbnail from "../shared-components/NewspaperThumbnail";
import ProductDetails from "../shared-components/ProductDetails";
import './NewspaperList.css';
import { Box, Button, Grid, InputLabel, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllNewspapersPublished } from "../Axios/newspapersPublishedAxios";
import { setNewspapersPublished } from "../redux/actions/NewspapersPublishedActions";
import { Loading } from "../component/loading/loading";

const NewspaperList = () => {

    const [productData, setProductData] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState();
    const [date, setDate] = useState("");
    const [sheet, setSheet] = useState("");

    const dispatch = useDispatch()

    useEffect(() => {
        getAllNewspapersPublished().then(res => {
            console.log(res.data)
            dispatch(setNewspapersPublished(res.data))
            setProductData(res.data)
        })
    }, []);

    let listNewspapersPublished = useSelector(s => s.NewspapersPublishedReducer.list)

    const selectedData = (data) => {
        setSelectedProduct(data);
    }

    const onHandelInputChangeDate = (e) => {
        let tempData = [];
        setDate(e.target.value.toLowerCase())
        listNewspapersPublished.map((element) => {
            if (element.publicationDate.toLowerCase().includes(e.target.value.toLowerCase()) &&
                element.newspaperId.toString().includes(sheet)) {
                tempData.push(element);
            }
        })

        if (tempData[0]) {
            setProductData(tempData);
            setSelectedProduct([]);
        } else {
            setProductData([]);
            setSelectedProduct([]);
        }

    }

    const onHandelInputChangeSheet = (e) => {
        let tempData = [];
        setSheet(e.target.value)
        listNewspapersPublished.map((element) => {
            if (element.newspaperId.toString().includes(e.target.value) &&
                element.publicationDate.toLowerCase().includes(date)) {
                tempData.push(element);
            }
        })

        if (tempData[0]) {
            setProductData(tempData);
            setSelectedProduct([]);
        } else {
            setProductData([]);
            setSelectedProduct([]);
        }

    }

    const getAll = (e) => {
        e.preventDefault()
        e.target.date.value = ""
        e.target.sheet.value = ""

        let tempData = [];
        setSheet("")
        setDate("")
        listNewspapersPublished.map((element) => {
            tempData.push(element);
        })

        if (tempData[0]) {
            setProductData(tempData);
            setSelectedProduct([]);
        } else {
            setProductData([]);
            setSelectedProduct([]);
        }
    }

    return (
        <div className="h-100 rounded" style={{ marginTop: 50 }}>
            <form onSubmit={getAll}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={5} >
                        <Box display="flex"
                            marginBottom={1}
                            justifyContent="flex-start">
                            <InputLabel htmlFor="search-input-date">
                                Search by date
                            </InputLabel>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <Box display="flex"
                            marginBottom={1}
                            justifyContent="flex-start">
                            <InputLabel htmlFor="search-input-sheet">
                                Search by sheet
                            </InputLabel>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={5} >
                        <TextField
                            fullWidth
                            type="search"
                            id="search-input-date"
                            label="Date"
                            name="date"
                            variant="outlined"
                            onChange={(e) => { onHandelInputChangeDate(e) }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <TextField
                            fullWidth
                            type="number"
                            id="search-input-sheet"
                            label="Sheet"
                            name="sheet"
                            variant="outlined"
                            onChange={(e) => { onHandelInputChangeSheet(e) }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button sx={{ height: 55 }} fullWidth variant="contained" type="submit">All</Button>
                    </Grid>
                </Grid>
            </form>


            {
                productData && productData.length ? <NewspaperThumbnail listNewspapersPublished={productData} selectedData={selectedData} />
                : <Typography variant="h5" marginTop={5}>
                    <Loading></Loading>
                </Typography>
            }

        </div>

    )
}

export default NewspaperList