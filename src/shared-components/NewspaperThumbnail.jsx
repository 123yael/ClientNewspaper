import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import { PALLETE, SERVER_NAME } from '../config';
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import PageFlip from "./pageFlip";
import { Loading } from "../component/loading/loading";

const NewspaperThumbnail = (props) => {
    const [listNewspapersPublished, setListNewspapersPublished] = useState([]);

    useEffect(() => {
        setListNewspapersPublished(props.listNewspapersPublished);
    }, [props]);

    const selectNewspaper = (i) => {
        setProductdetail(listNewspapersPublished[i]);
        showNewspaper()
    }

    const [productDetail, setProductdetail] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        setProductdetail(props.selectedProduct);
    }, [props]);

    const showNewspaper = () => {
        handleShow();
    }

    return (
        <div className="product-thum-conatiner">
            {listNewspapersPublished.length > 0 ? (
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
                                        image={`${SERVER_NAME}/Newspapers/${newspaper.publicationDate}/0.png`}
                                        alt={`${SERVER_NAME}/Newspapers/${newspaper.publicationDate}/0.png`}
                                        className='border'
                                    />
                                    <Typography variant="h6" color="text.secondary" className='bg-secondary text-light rounded-bottom'>
                                        {newspaper.publicationDate}{' '}
                                        <span style={{ fontWeight: "bold" }}>sheet {newspaper.newspaperId}</span>
                                    </Typography>
                                </CardActionArea>
                            </Grid>
                        ))
                    }
                </Grid>
            ) : (
                <Typography variant="h5" marginTop={5}>
                    <Loading></Loading>
                </Typography>
            )}


            <Dialog
                fullWidth
                maxWidth={'lg'}
                open={show}
                onClose={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                className="prdt-modal"
            >
                <DialogContent className="prdt-mbody">
                    <PageFlip productDetail={productDetail} />
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default NewspaperThumbnail;