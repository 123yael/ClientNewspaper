import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useState, useEffect } from "react";
import PageFlip from "./pageFlip";


const ProductDetails = (props) => {
    const [productDetail, setProductdetail] = useState({});
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        setProductdetail(props.selectedProduct);
    }, [props]);

    const readPdf = () => {
        handleShow();
    }

    return (
        <>
            <Dialog
                fullWidth
                maxWidth={'lg'}
                open={show}
                onClose={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                className="prdt-modal"
            >
                <DialogTitle></DialogTitle>
                <DialogContent className="prdt-mbody">
                    <PageFlip productDetail={productDetail} />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ProductDetails;