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
            <div>
                {productDetail !== undefined ?
                    <div className="product-details-container">
                        <div className="row p-2" >
                            <div className="product-details order-sm-1 order-md-0 col-sm-12 col-md-8">
                                <h2 className="mb-4">{productDetail.name}</h2>
                                <h4 className="text-muted">{productDetail.author} </h4>
                                <hr className="mt-5" />
                                <p className="py-5">{productDetail.details}</p>
                                <div className="button-container d-flex flex-sm-column flex-md-row flex-sm-wrap flex-md-nowrap align-item-center justify-content-between">
                                    <Button variant="primary" onClick={readPdf}>Read PDF</Button>
                                </div>
                            </div>
                            <div className="product-image order-sm-0 order-md-1 col-sm-12 col-md-4 py-3">
                                <img className="flex-shrink-1" src={productDetail.imgUrl} alt="Pic 1" />
                            </div>
                        </div>
                    </div>
                    : ""}
            </div>

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