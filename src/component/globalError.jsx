import { Avatar, Button, Dialog, DialogContent, Typography } from "@mui/material"
import { useState } from "react"
import ErrorIcon from '@mui/icons-material/Error';
import { PALLETE } from "../config";

export const GlobalError = () => {

    const [show, setShow] = useState(true)

    return (
        <Dialog
            fullWidth
            maxWidth={'md'}
            open={show}
            onClose={() => setShow(false)}
        >
            <DialogContent sx={{
                m: 2,
                border: `1px solid ${PALLETE.PURPLE}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'start',
                backgroundColor: PALLETE.PURPLEA
            }}>
                <Avatar className='p-4 mb-2' sx={{ backgroundColor: PALLETE.PURPLE }}>
                    <ErrorIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Error
                </Typography>
                <Typography mt={3} component="h1" variant="h6">
                    An unexpected malfunction occurred, talk to us, we will be happy to be at your service even in these situations
                </Typography>
                <Button sx={{ mt: 3 }} variant="contained" onClick={() => setShow(false)}>
                    Close
                </Button>
            </DialogContent>
        </Dialog>
    )
}