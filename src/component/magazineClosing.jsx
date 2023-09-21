import { Box, Button, Checkbox, FormControlLabel, MenuItem, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { closingNewspaper, shabetz } from "../Axios/closingNewspaperAxios"
import { useEffect } from "react"
import { MagazineModel } from "../shared-components/magazineModel"

export const MagazineClosing = () => {

    const [numPages, setNumPages] = useState(0)
    const [arrDates, setArrDates] = useState([])
    const [date, setDate] = useState("")

    const [show, setShow] = useState(false);
    const [productDetail, setProductdetail] = useState({})
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [isChecked, setIsChecked] = useState(false)

    const handleChangeChecked = (event) => {
        setIsChecked(event.target.checked)
    }

    const getNextTuesdays = (num) => {
        var nextTuesdays = [];
        var currentDate = new Date();
        while (nextTuesdays.length < num) {
            currentDate.setDate(currentDate.getDate() + 1);
            if (currentDate.getDay() === 2)
                nextTuesdays.push(new Date(currentDate).toLocaleDateString('en-CA'));
        }
        return nextTuesdays;
    }

    const setInputs = () => {
        let arr = getNextTuesdays(5)
        setArrDates(arr)
        setDate(arr[0])
    }

    const changeDate = (event) => {
        setDate(event.target.value)
    }

    const createMagazine = () => {
        shabetz(date).then(res => {
            setNumPages(res?.data.countPages)
            setProductdetail(res?.data)
        }).catch(err => {
            console.error(`Error: ${JSON.stringify({ err })}`)
        })
    }

    const publishMagazine = () => {
        closingNewspaper(date, numPages).then(res => {
            alert("The newspaper has been successfully added!")
        }).catch(err => {
            if (err.response?.status === 409)
                alert("Date of newspaper already exists in the system!")
            if (err.response?.status === 408)
                alert("Newspaper not generated in the files!")
        })
    }

    const viewingMagazine = () => {
        handleShow()
    }

    useEffect(() => {
        setInputs()
    }, [])

    return (
        <div className='py-5 container'>
            <Box sx={{ mt: 5, textAlign: "left" }}>
                <Typography variant={"h4"}>
                    Hello manager!
                </Typography>
                <Typography variant={"h6"} sx={{ mt: 3 }}>
                    Please note that the publication day of the newspaper is Tuesday, please check the correctness of the magazine before publication.
                </Typography>
                <Typography variant={"h6"} sx={{ mt: 1 }}>
                    Select a date for posting the newspaper
                </Typography>
                <TextField
                    sx={{ mt: 3, width: 150 }}
                    select
                    id="date"
                    name="date"
                    label="Date"
                    onChange={changeDate}
                    value={date}
                >
                    {arrDates.map((d, i) => (
                        <MenuItem key={i} value={d}>{d}</MenuItem>
                    ))}
                </TextField>
                <Typography>
                    <Button
                        onClick={createMagazine}
                        type="button"
                        variant="contained"
                        sx={{ mt: 3 }}
                    >
                        Create a magazine
                    </Button>
                    <Button
                        onClick={viewingMagazine}
                        type="button"
                        variant="outlined"
                        sx={{ ml: 3, mt: 3 }}
                        disabled={numPages === 0}
                    >
                        Viewing the magazine  before publication
                    </Button>
                    <FormControlLabel
                        onChange={handleChangeChecked}
                        sx={{ ml: 1, mt: 3 }}
                        control={<Checkbox />}
                        label="The magazine is ready for publication"
                        disabled={numPages === 0}
                    />
                </Typography>
                <Typography>
                    <Button
                        onClick={publishMagazine}
                        disabled={!isChecked}
                        type="button"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Publish the magazine
                    </Button>
                </Typography>
            </Box>

            <MagazineModel show={show} handleClose={handleClose} productDetail={productDetail} isFromCache={false}></MagazineModel>
        </div>
    )
}