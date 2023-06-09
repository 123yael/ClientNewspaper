import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react";


export const Dates = (props) => {

    // מערך של תאריכים
    const [arrDates, setArrDates] = useState([])

    // כמות של תאריכים
    const [count, setCount] = useState('');

    // פונקציה להוספת אפס עבור מספר בודד
    const appendLeadingZeros = (int) => {
        return (int < 10) ? '0' + int : int
    }

    // פונקציה להצגת קלטים של תאריכים
    const setInputs = (event) => {
        let num = event.target.value
        setCount(num)
        let today = new Date()
        let currentDay = today.getDay()
        let daysUntilNextDay = (2 + 7 - currentDay) % 7
        let dt = new Date(today.getTime() + daysUntilNextDay * 24 * 60 * 60 * 1000)
        let formatedTime
        let arr = []
        for (let i = 0; i < num; i++) {
            formatedTime = dt.getFullYear() + '-' + appendLeadingZeros((dt.getMonth() + 1)) + '-' + appendLeadingZeros(dt.getDate())
            arr.push(formatedTime)
            dt = new Date(dt.getTime() + 7 * 24 * 60 * 60 * 1000)
        }
        setArrDates(arr)
        props.chooseDates(arr)
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