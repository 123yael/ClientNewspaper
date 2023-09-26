import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react";
import { getNextTuesdays } from "../../shared-functions/shared-functions";


export const Dates = (props) => {

    // מערך של תאריכים
    const [arrDates, setArrDates] = useState([])

    // כמות של תאריכים
    const [count, setCount] = useState('');

    // פונקציה להוספת אפס עבור מספר בודד
    const appendLeadingZeros = (int) => {
        return (int < 10) ? '0' + int : int
    }

    // const getNextTuesdays = (num) => {
    //     var nextTuesdays = [];
    //     var currentDate = new Date();
    //     while (nextTuesdays.length < num) {
    //         currentDate.setDate(currentDate.getDate() + 1);
    //         if (currentDate.getDay() === 2)
    //             nextTuesdays.push(new Date(currentDate).toLocaleDateString('en-CA'));
    //     }
    //     return nextTuesdays;
    // }

    const setInputs = (event) => {
        let num = event.target.value
        setCount(num)
        let arr = getNextTuesdays(num)
        setArrDates(arr)
        props.chooseFirstDateAndDuration(arr[0], num)
    }

    return (
        <div>
            <Typography component="div" variant="h5" sx={{ textAlign: "left" }}>
                How many times to publish the ad?
            </Typography>
            <FormControl size="small" className="mt-3" fullWidth>
                <InputLabel id="demo-select-small">Count</InputLabel>
                <Select labelId="demo-select-small" id="demo-select-small" value={count} label="Count" onChange={setInputs} >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                </Select>
            </FormControl>

            <Box className="mt-5">
                {
                    arrDates.map((d, i) => (
                        <span type={"date"} key={i} width={100} className="m-2 border p-3 rounded-3">{d}</span>
                    ))
                }
            </Box>
        </div>
    )
}