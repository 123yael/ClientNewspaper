import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllNewspapersPublished } from '../Axios/newspapersPublishedAxios';
import { setNewspapersPublished } from '../redux/actions/NewspapersPublishedActions';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { PALLETE } from '../config';
import NewspaperFilter from './newspaperFilter';
import { Box, Button } from '@mui/material';
import { PaginationNewspaper } from './paginationNewspaper';
import { OrderDetailsTable } from './orderDetailsTable';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import { getNextTuesdays } from '../shared-functions/shared-functions';

export const ManagerDetails = () => {

    const itemsPerPage = 10

    const [listNewspapersPublished, setListNewspapersPublished] = useState([]);
    const [date, setDate] = useState("");
    const [sheet, setSheet] = useState("");
    const [totalPages, setTotalPages] = useState()
    const [page, setPage] = useState(1);
    // for diraction of buttens: newspapers pablished and Future newspapers.
    const [dirNP, setDirNP] = useState(false)
    const [dirFN, setDirFN] = useState(true)

    const getAllNewspaper = (page) => {
        let num = 2000
        if (sheet === "" && date === "")
            num = 0
        setTimeout(() => {
            getAllNewspapersPublished(page, itemsPerPage, sheet, date).then(res => {
                setListNewspapersPublished(res.data.list)
                setTotalPages(res.data.paginationMetadata.totalPages)
                setPage(res.data.paginationMetadata.currentPage)
            })
        }, num)
    }

    const hendleChangePage = (event, page) => {
        getAllNewspaper(page)
    }

    useEffect(() => {
        getAllNewspaper(1)
        setInputs()
    }, [sheet, date]);

    const [expanded, setExpanded] = useState(false);

    // const handleChange = (panel) => (event, isExpanded) => {
    //     setExpanded(isExpanded ? panel : false);
    // };

    const [dateNewspaper, setDateNewspaper] = useState("");

    const handleChange = (date) => {
        setDateNewspaper(date);
    };

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
        setSheet("")
        setDate("")
    }


    //---------------------------------//
    const [arrDates, setArrDates] = useState([])


    const setInputs = () => {
        let arr = getNextTuesdays(5)
        setArrDates(arr)
    }

    return (
        <div className='py-5 container'>
            <div className="mt-5">

                <Box marginTop={5} sx={{ textAlign: "left" }}>
                    <Button sx={{ mb: 1 }} startIcon={dirFN ? <ArrowCircleUpOutlinedIcon /> : <ArrowCircleDownOutlinedIcon />} onClick={() => setDirFN(!dirFN)}>
                        Future newspapers
                    </Button>
                    {
                        dirFN ?
                            arrDates.map((date, index) => (
                                <Accordion
                                    // expanded={expanded === index}
                                    onChange={() => handleChange(date)}
                                    key={index}
                                    sx={{ border: `1px solid ${PALLETE.PURPLE}`, backgroundColor: PALLETE.PURPLEA }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                            Date: {date}
                                        </Typography>
                                    </AccordionSummary>
                                    {
                                        dateNewspaper === date &&
                                        <AccordionDetails>
                                            <OrderDetailsTable date={date}></OrderDetailsTable>
                                        </AccordionDetails>
                                    }
                                </Accordion>
                            )) : <></>
                    }
                </Box>

                <Box marginTop={5} sx={{ textAlign: "left" }}>
                    <Button sx={{ mb: 1 }} startIcon={dirNP ? <ArrowCircleUpOutlinedIcon /> : <ArrowCircleDownOutlinedIcon />} onClick={() => setDirNP(!dirNP)}>
                        Newspapers published
                    </Button>
                    {dirNP ?
                        <div>
                            <Box sx={{ mb: 5 }}>
                                <NewspaperFilter getAll={getAll} onHandelInputChangeDate={onHandelInputChangeDate} onHandelInputChangeSheet={onHandelInputChangeSheet}></NewspaperFilter>
                            </Box>
                            {
                                listNewspapersPublished.map((newspaper, index) => (
                                    <Accordion
                                        // expanded={expanded === index}
                                        onChange={() => handleChange(newspaper.publicationDate)}
                                        key={index}
                                        sx={{ border: `1px solid ${PALLETE.PURPLE}`, backgroundColor: PALLETE.PURPLEA }}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                                Date: {newspaper.publicationDate}
                                            </Typography>
                                            <Typography sx={{ color: 'text.secondary' }}>
                                                Sheet: {newspaper.newspaperId}
                                            </Typography>
                                        </AccordionSummary>
                                        {
                                            dateNewspaper === newspaper.publicationDate &&
                                            <AccordionDetails>
                                                <OrderDetailsTable date={newspaper.publicationDate}></OrderDetailsTable>
                                            </AccordionDetails>
                                        }
                                    </Accordion>
                                ))
                            }
                            <Box sx={{ textAlign: "center" }}>
                                <PaginationNewspaper totalPages={totalPages} hendleChangePage={hendleChangePage} page={page}></PaginationNewspaper>
                            </Box>
                        </div> : <></>}
                </Box>
            </div>
        </div>
    );
}
