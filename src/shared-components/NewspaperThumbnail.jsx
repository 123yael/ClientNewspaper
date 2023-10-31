import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import { PALLETE, SERVER_NAME } from '../config';
import { MagazineModel } from "./magazineModel";

const NewspaperThumbnail = (props) => {
    const [listNewspapersPublished, setListNewspapersPublished] = useState([]);

    useEffect(() => {
        setListNewspapersPublished(props.listNewspapersPublished);
    }, [props]);

    const selectNewspaper = (i) => {
        setProductdetail(listNewspapersPublished[i]);
        showNewspaper()
        if (i === 0)
            setIsFromCache(false)
        else
            setIsFromCache(true)
    }

    const [productDetail, setProductdetail] = useState({});
    const [show, setShow] = useState(false);
    const [isFromCache, setIsFromCache] = useState(true)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        setProductdetail(props.selectedProduct);
    }, [props]);

    const showNewspaper = () => {
        handleShow();
    }

    return (
        <div>
            <Grid item xs={12} md={12} marginTop={5} container spacing={3}>
                {
                    listNewspapersPublished.map((newspaper, index) => (
                        <Grid item xs={12} md={3} key={index} >
                            <CardActionArea component="a"
                                onClick={() => selectNewspaper(index)}
                                className='shadow shadow-3'>
                                <CardMedia
                                    component="img"
                                    sx={{ display: { xs: 'none', sm: 'block' } }}
                                    image={index === 0 ?
                                        `${SERVER_NAME}/Newspapers/${newspaper.publicationDate}/0.png?id=${new Date().getDate()}` :
                                        `${SERVER_NAME}/Newspapers/${newspaper.publicationDate}/0.png`}
                                    alt={`${SERVER_NAME}/Newspapers/${newspaper.publicationDate}/0.png`}
                                    className='border'
                                />
                                <Typography variant="h6" sx={{ backgroundColor: PALLETE.DARK_GRAY }} className='text-light rounded-bottom'>
                                    {newspaper.publicationDate}{' '}
                                    <span style={{ fontWeight: "bold" }}>sheet {newspaper.newspaperId}</span>
                                </Typography>
                            </CardActionArea>
                        </Grid>
                    ))
                }
            </Grid>

            <MagazineModel show={show} handleClose={handleClose} productDetail={productDetail} isFromCache={isFromCache}></MagazineModel>

        </div>
    )
}

export default NewspaperThumbnail;