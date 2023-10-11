import { Alert, Avatar, Box, Button, Checkbox, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { closingNewspaper, shabetz } from "../Axios/closingNewspaperAxios"
import { useEffect } from "react"
import { MagazineModel } from "../shared-components/magazineModel"
import { getNextTuesdays } from "../shared-functions/shared-functions"



export const MagazineClosing = () => {

    const [isYes, setIsYes] = useState(false);

    const [numPages, setNumPages] = useState(0)
    // const [arrDates, setArrDates] = useState([])
    const [date, setDate] = useState("")

    const [show, setShow] = useState(false);
    const [productDetail, setProductdetail] = useState({})
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const setInputs = () => {
        let arr = getNextTuesdays(5)
        setDate(arr[0])
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
        setNumPages(0)
        setIsYes(false)
        setShow(false)
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
                </Typography>

                <Typography sx={{ mt: 2 }}>
                    The magazine is ready for publication?
                    <Button
                        color="primary"
                        size="lg"
                        variant={isYes ? "contained" : "outlined"}
                        sx={{ ml: 2 }}
                        onClick={() => setIsYes(true)}
                        disabled={numPages === 0}
                    >Yes</Button>
                    <Button
                        color="primary"
                        size="lg"
                        variant={isYes ? "outlined" : "contained"}
                        sx={{ ml: 2 }}
                        onClick={() => setIsYes(false)}
                        disabled={numPages === 0}
                    >No</Button>
                </Typography>

                <Alert severity="warning" sx={{ mt: 2, width: 400 }} >Beware! Once clicked you won't be able to regret!</Alert>


                <Typography>
                    <Button
                        onClick={publishMagazine}
                        disabled={!isYes}
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