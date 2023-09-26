import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Alert, AlertTitle, Box, Button, Dialog } from '@mui/material';
import { PALLETE } from '../../config';

export const Message = (props) => {

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
            <DialogContent dividers>
                <Typography gutterBottom>
                    
                </Typography>
                <Alert severity="info" className="my-3">
                    <AlertTitle>Info</AlertTitle>
                    The accuracy in the measurements is important, an ad with inappropriate sizes will automatically become the desired size without responsibility for the result!
                </Alert>
            </DialogContent>
        </Dialog>
    )
}