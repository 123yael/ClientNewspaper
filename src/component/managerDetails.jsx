import * as React from 'react';
import { TableOfOrderDetails } from "./tableOfOrderDetails";
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
import { Box } from '@mui/material';
import { PaginationNewspaper } from './paginationNewspaper';
import { OrderDetailsTable } from './orderDetailsTable';

export const ManagerDetails = () => {

    const itemsPerPage = 16

    const [listNewspapersPublished, setListNewspapersPublished] = useState([]);
    const [date, setDate] = useState("");
    const [sheet, setSheet] = useState("");
    const [totalPages, setTotalPages] = useState()
    const [page, setPage] = useState(1);

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

    return (
        <div className='py-5 container'>
            <div className="mt-5">
                <NewspaperFilter getAll={getAll} onHandelInputChangeDate={onHandelInputChangeDate} onHandelInputChangeSheet={onHandelInputChangeSheet}></NewspaperFilter>

                <Box marginTop={5}>
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
                </Box>
                <PaginationNewspaper totalPages={totalPages} hendleChangePage={hendleChangePage} page={page}></PaginationNewspaper>
            </div>
        </div>
    );
}
