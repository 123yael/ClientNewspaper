import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import { OrderDetailsTable } from './detailsTable/orderDetailsTable';
import { WordsDetailsTable } from './detailsTable/wordsDetailsTable';
import { PALLETE } from '../config';

export const WordAndFilesTabs = (props) => {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value} sx={{ border: "1px solid red" }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList variant="fullWidth" sx={{ backgroundColor: PALLETE.WHITE }} onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Advertisements" value="1" fullWidth />
                        <Tab label="Word awareness" value="2" fullWidth />
                    </TabList>
                </Box>
                <TabPanel value="1" sx={{ p: 0, pt: 1 }}>
                    <OrderDetailsTable date={props.publicationDate}></OrderDetailsTable>
                </TabPanel>
                <TabPanel value="2" sx={{ p: 0, pt: 1 }}>
                    <WordsDetailsTable date={props.publicationDate}></WordsDetailsTable>
                </TabPanel>
            </TabContext>
        </Box>
    );
}