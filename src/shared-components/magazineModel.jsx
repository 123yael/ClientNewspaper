import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import PageFlip from "./pageFlip";


export const MagazineModel = (props) => {
    return (
        <Dialog
            fullWidth
            maxWidth={'lg'}
            open={props.show}
            onClose={props.handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            className="prdt-modal"
        >
            <DialogTitle></DialogTitle>
            <DialogContent className="prdt-mbody">
                <PageFlip productDetail={props.productDetail} />
            </DialogContent>
        </Dialog>
    )
}
