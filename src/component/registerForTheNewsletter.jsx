import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material"
import * as yup from 'yup';
import { useFormik } from "formik";
import { registerForTheNewsletter } from "../Axios/redisAxios";
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useState } from "react";

const validationSchema = yup.object({
    email: yup
        .string('Enter your date')
        .email('Enter a valid email')
        .required(),
});


export const RegisterForTheNewsletter = () => {

    const formik = useFormik({
        initialValues: { email: '', },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => { register(values, { resetForm }) },
    });

    const [open, setOpen] = useState(false);
    const [type, setType] = useState();
    const [message, setMessage] = useState();


    const handleClick = (type, message) => {
        setOpen(true);
        setType(type)
        setMessage(message)
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const register = (values, { resetForm }) => {
        registerForTheNewsletter(values.email)
            .then(res => {
                handleClick("success", "You have successfully subscribed to the mailing list")
                resetForm()
            })
            .catch(err => {
                handleClick("error", "Something went wrong with the registration process")
            })
    }


    return (
        <div className="mb-3">
            <Typography variant="h5" component="h5" gutterBottom >
                We are fun! Join our newsletter
            </Typography>

            <Grid sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 2,
            }}>
                <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: "500px" }}>
                    <Grid container xs={12} spacing={2}>
                        <Grid item xs={12} sm={8}>
                            <TextField fullWidth id="email" label="Email" name="email"
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Button type="submit" fullWidth variant="contained" sx={{ height: 55 }}>
                                Register
                            </Button>
                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                                    {message}
                                </Alert>
                            </Snackbar>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </div>
    )
}