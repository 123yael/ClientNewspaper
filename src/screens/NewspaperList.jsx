import React, { useEffect, useState } from "react";
import NewspaperThumbnail from "../shared-components/NewspaperThumbnail";
import './NewspaperList.css';
import { Box, Button, Grid, InputLabel, Pagination, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllNewspapersPublished } from "../Axios/newspapersPublishedAxios";
import { setNewspapersPublished } from "../redux/actions/NewspapersPublishedActions";

const NewspaperList = () => {

    const itemsPerPage = 8

    const [newspapersData, setNewspapersData] = useState([]);
    const [date, setDate] = useState("");
    const [sheet, setSheet] = useState("");
    const [totalPages, setTotalPages] = useState()
    const [page, setPage] = useState(1);
    let requestTimeout = null

    const dispatch = useDispatch()

    const getAllNewspaper = (page) => {
        let num = 2000
        if (sheet === "" && date === "")
            num = 0
        if (requestTimeout) {
            clearTimeout(requestTimeout);
        }
        requestTimeout = setTimeout(() => {
            getAllNewspapersPublished(page, itemsPerPage, sheet, date).then(res => {
                dispatch(setNewspapersPublished(res.data.list))
                setNewspapersData(res.data.list)
                setTotalPages(res.data.paginationMetadata.totalPages)
                setPage(res.data.paginationMetadata.curentPage)
            })
        }, num)
    }

    const hendleChangePage = (event, page) => {
        getAllNewspaper(page)
    }

    useEffect(() => {
        getAllNewspaper(1)
    }, [sheet, date]);

    let listNewspapersPublished = useSelector(s => s.NewspapersPublishedReducer.list)

    const selectedData = (data) => {
        setNewspapersData(data);
    }

    const onHandelInputChangeDate = (e) => {
        setDate(e.target.value.toLowerCase())
    }

    const onHandelInputChangeSheet = (e) => {
        setSheet(e.target.value)
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
            setNewspapersData(tempData);
        } else {
            setNewspapersData([]);
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

            <NewspaperThumbnail listNewspapersPublished={newspapersData} selectedData={selectedData} />

            <Box display={"inline-block"} mt={5}>
                <Pagination
                    count={totalPages}
                    color="primary"
                    size="large"
                    sx={{ mt: 2 }}
                    onChange={hendleChangePage}
                />
            </Box>
        </div>

    )
}

export default NewspaperList