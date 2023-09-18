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

export const ManagerDetails = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        getAllNewspapersPublished().then(res => dispatch(setNewspapersPublished(res.data)))
    }, []);

    let listNewspapersPublished = useSelector(s => s.NewspapersPublishedReducer.list)

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        // <div className="mt-5">
        //     <TableOfOrderDetails></TableOfOrderDetails>
        // </div>
        <div className="mt-5">
            {
                listNewspapersPublished.map((newspaper, index) => (
                    <Accordion expanded={expanded === index} onChange={handleChange(index)} key={index}>
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
                        <AccordionDetails>
                            <TableOfOrderDetails></TableOfOrderDetails>
                        </AccordionDetails>
                    </Accordion>
                ))
            }
        </div>
    );
}
