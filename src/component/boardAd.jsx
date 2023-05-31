import { Alert, AlertTitle, Button, FormControl, InputLabel, MenuItem, Select, TextareaAutosize } from "@mui/material"

import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllWordAdSubCategories } from "../Axios/wordAdSubCategoriesAxios";
import { setWordAdSubCategories } from "../redux/actions/WordAdSubCategoryActions";
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import { useNavigate } from "react-router-dom";


export const BoardAd = () => {

    const navigate = useNavigate()

    // משתנה שדרכו ניתן לשגר לרדוסר
    const dispatch = useDispatch()

    // מיד בעת טעינת הקומפוננטה תשוגר רשימת תתי הפרסומות לרדוסר
    useEffect(() => {
        getAllWordAdSubCategories().then(w => dispatch(setWordAdSubCategories(w.data)))
    }, [])

    // חילןץ רשימת תתי מודעות לוח מהרדוסר
    const boardAdTopics = useSelector(w => w.WordAdSubCategoryReducer.list)

    const [title, setTitle] = useState('');

    const handleChange = (event) => {
        setTitle(event.target.value);
    };

    // פונקצית מעבר לתשלום
    const beyondPayment = () => {
        navigate('/payment')
    }

    return (
        <div className="mt-5">
            <h2 className="float-start my-3">Choose a category for a board ad</h2>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Title</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={title}
                    label="Title"
                    onChange={handleChange}
                >
                    {
                        boardAdTopics.map(b => (
                            <MenuItem key={b.wordCategoryId} value={b.wordCategoryId}>{b.wordCategoryName}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <h2 className="float-start my-3">Enter the content of the ad</h2>
            <textarea className="form-control" rows="5" id="comment" name="text"></textarea>

            <Alert severity="info" className="my-3">
                <AlertTitle style={{ textAlign: "left" }}>Info</AlertTitle>
                minimum amount of words 10, each word 1 shekel
            </Alert>

            <Button fullWidth variant="contained" endIcon={<SellRoundedIcon />} onClick={beyondPayment}>
                beyond payment
            </Button>
        </div>
    )
}