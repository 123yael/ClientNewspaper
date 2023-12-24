import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Alert, AlertTitle, Box, Button, Dialog } from '@mui/material';
import { PALLETE } from '../../config';


// הכותרת עם ה x
const BootstrapDialogTitle = (props) => {
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

export const MoreDetails = (props) => {

    const WIDTH = 3.42
    const HEIGHT = 2.29
    const SPACE = 0.57

    const getWidthSize = (count) => {     
        let num = SPACE * (count - 1) + count * WIDTH
        return num.toFixed(2)
    }

    const getHeightSize = (count) => {       
        let num = SPACE * (count - 1) + count * HEIGHT
        return num.toFixed(2)
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="customized-dialog-title"
            maxWidth={'sm'}
            fullWidth
        >
            <Box display="flex"
                marginBottom={1}
                justifyContent="flex-end"
            >
                <Button
                    aria-label="close"
                    onClick={props.handleClose}
                    sx={{ color: PALLETE.DARK_GRAY }}
                >
                    <CloseIcon />
                </Button>
            </Box>

            <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
                {props.size.sizeName}
            </DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>
                    Width: {getWidthSize(props.size.sizeWidth)}cm
                </Typography>
                <Typography gutterBottom>
                    Height: {getHeightSize(props.size.sizeHeight)}cm
                </Typography>
                <Typography gutterBottom>
                    Price: {props.size.sizePrice} ₪
                </Typography>
                <Alert severity="info" className="my-3">
                    <AlertTitle>Info</AlertTitle>
                    The accuracy in the measurements is important, an ad with inappropriate sizes will automatically become the desired size without responsibility for the result!
                </Alert>
            </DialogContent>
        </Dialog>
    )
}