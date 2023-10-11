import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import { useState } from "react";
import { MANAGER_EMAIL, PALLETE, SERVER_NAME } from "../../config";
import { getDateNow } from "../../shared-functions/shared-functions";
import { updateStatus, updateStatusWords } from "../../Axios/datesForOrderDetailsAxios";
import { useEffect } from "react";
import { setOrderDetailsOfAds } from "../../redux/actions/OrderDetailsActions";
import { useDispatch } from "react-redux";

export const Image = (params) => {

    const [showImage, setShowImage] = useState(false)

    return (
        <div>
            <Button fullWidth variant="text" onClick={() => setShowImage(true)}>
                <img src={`${SERVER_NAME}/Upload/${params.value}`} alt={`${params.value}`} height={70} />
            </Button>

            <Dialog
                fullWidth
                maxWidth={'md'}
                open={showImage}
                onClose={() => setShowImage(false)}
            >
                <DialogContent sx={{ textAlign: "center" }}>
                    <img src={`${SERVER_NAME}/Upload/${params.value}`} alt={`${params.value}`} height={500} />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export const Embed = (params) => {
    const dispatch = useDispatch()

    const parts = params.date.split('.');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1] - 1, 10);
    const year = parseInt(parts[2], 10);

    const [toEmbed, setToEmbed] = useState(params.data.row.approvalStatus)

    const changeStatus = (date, data, page, itemsPerPage) => {
        if (params.type === "files")
            updateStatus(data.id, false, date, page, itemsPerPage)
                .then(res => {
                    console.log(res.data.list);
                    setToEmbed(false)
                    dispatch(setOrderDetailsOfAds(res.data.list))
                }).catch(err => {
                    console.error(err);
                })
        else
            updateStatusWords(data.id, false, date, page, itemsPerPage)
                .then(res => {
                    setToEmbed(false)
                    dispatch(setOrderDetailsOfAds(res.data.list))
                }).catch(err => {
                    console.error(err);
                })
    }

    const changeStatusToTrue = (date, data, page, itemsPerPage) => {
        if (params.type === "files")
            updateStatus(data.id, true, date, page, itemsPerPage)
                .then(res => {
                    setToEmbed(true)
                    dispatch(setOrderDetailsOfAds(res.data.list))
                }).catch(err => {
                    console.error(err);
                })
        else
            updateStatusWords(data.id, true, date, page, itemsPerPage)
                .then(res => {
                    setToEmbed(true)
                    dispatch(setOrderDetailsOfAds(res.data.list))
                }).catch(err => {
                    console.error(err);
                })
    }

    const parsedDate = new Date(year, month, day);
    return <>{toEmbed ?
        <Button disabled={parsedDate < getDateNow()} fullWidth variant="contained" onClick={() => changeStatus(params.date, params.data, params.page, params.itemsPerPage)}>
            Don't embed
        </Button> : <Button disabled={parsedDate < getDateNow()} fullWidth variant="contained" onClick={() => changeStatusToTrue(params.date, params.data, params.page, params.itemsPerPage)}>
            Embed
        </Button>
    }</>
}

export const Boldheader = (params) => {
    return <strong>{params.colDef.headerName}</strong>;
}

export const Price = (params) => {
    return <div>{params.value}₪</div>;
}

export const FullName = (params) => {
    return <div>
        {(params.row.custEmail === MANAGER_EMAIL) ? "Manager" : params.value}
    </div>;
}

export const Content = (params) => {
    
    const [showImage, setShowImage] = useState(false)

    return (
        <div>
            <Button variant="outlined" onClick={() => setShowImage(true)}>
                View Content
            </Button>

            <Dialog
                fullWidth
                maxWidth={'sm'}
                open={showImage}
                onClose={() => setShowImage(false)}
            >
                <DialogContent sx={{ textAlign: "center" }}>
                    {params.value}
                </DialogContent>
            </Dialog>
        </div>
    );
}

export const Status = (params) => {
    let status = "Failed"
    if (params.row.approvalStatus)
        status = "Approved"
    return <div>
        {status}
    </div>
}
