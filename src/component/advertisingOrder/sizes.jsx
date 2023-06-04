import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { setAllAdSizes } from '../../redux/actions/AdSizeActions';
import { useEffect } from 'react';
import { getAllAdSizes } from '../../Axios/adSizesAxios';
import { Dialog, DialogTitle, IconButton, Toolbar, styled } from '@mui/material';
import { MoreDetails } from './moreDetails';
import CloseIcon from '@mui/icons-material/Close';
import { SERVER_NAME } from '../../config';


function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

// בפונקציה זו התקבל משתנה פונקציה לשינוי גודל הזמנת הפרסומת
export const Sizes = (props) => {

    // משתנה שדרכו ניתן לשגר לרדוסר
    const dispatch = useDispatch()

    // מיד בעת טעינת הקומפוננטה תשוגר רשימת גדלי הפרסומות לרדוסר
    useEffect(() => {
        getAllAdSizes().then(s => dispatch(setAllAdSizes(s.data)))
    }, [])

    // חילוץ רשימת גדלי הפרסומת מהרדוסר
    let listSizes = useSelector(s => s.AdSizeReducer.list)

    const [open, setOpen] = React.useState(false);
    const [size, setSize] = React.useState();


    const handleClickOpen = (s) => {
        setSize(s)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

    return (
        <div>
            {
                listSizes.length > 0 ? (
                    listSizes.map((s, index) => (
                        <Card key={index} style={{ display: 'inline-block' }} className='m-2 shadow border border-secondary border-3'>
                            <Toolbar sx={{ my: 2 }} className='p-1 m-0'>
                                <img src={`${SERVER_NAME}/${s.sizeImg}`} alt="logo" width={340} className='mx-auto' />
                            </Toolbar>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">{s.sizeName}</Typography>
                            </CardContent>
                            <div className='pb-3 px-3 m-0 row'>
                                <Button className='col-5 bg-light' variant="outlined" color="inherit" size="medium" onClick={() => props.chooseSize(s.sizeId)}>choose size</Button>
                                <div className='col-2'></div>
                                <Button className='col-5 bg-light' variant="outlined" color="inherit" size="medium" onClick={() => handleClickOpen(s)}>more details</Button>
                            </div>
                        </Card>
                    ))
                ) : (
                    <Typography variant="h5">Loading...</Typography>
                )
            }

            {/* המודל שהולך להיפתח */}
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >
                <MoreDetails size={size} hc={handleClose}></MoreDetails>
            </BootstrapDialog>
        </div >

    );
}