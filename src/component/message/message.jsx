import * as React from 'react';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
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
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    Dear client!
                    <br></br>
                    The order was successfully placed — <strong>Check out the next issue!</strong>
                </Alert>
            </DialogContent>
        </Dialog>
    )
}