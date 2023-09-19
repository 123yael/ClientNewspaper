import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import * as yup from 'yup';
import { sentEmail } from "../Axios/emailAxios";
import { useFormik } from "formik";
import { Message } from "./message/message";

const validationSchema = yup.object({
    name: yup
        .string('Enter your name'),
    email: yup
        .string('Enter your date')
        .email('Enter a valid email')
        .required('Email is required'),
    subject: yup
        .string('Enter your subject'),
    message: yup
        .string('Enter your message')
        .required('Message is required'),
});

export const Contact = () => {

    const formik = useFormik({
        initialValues: { name: '', email: '', subject: '', message: '' },
        validationSchema: validationSchema,
        onSubmit: (values) => { sentMessage(values) },
    });

    const sentMessage = (values) => {
        sentEmail(values.name, values.email, values.message, values.subject)
            .then(res => {
                alert("Your message has been sent successfully")
            })
            .catch(err => {
                alert("Something went wrong while sending the message")
            })
    }


    return (
        <div>
            <Typography variant="h2" component="h1" gutterBottom>
                Contact Us
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={7.5}>
                    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <TextField fullWidth id="name" label="Your Name" name="name"
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    value={formik.values.name}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField fullWidth id="email" label="Your Email" name="email"
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    value={formik.values.email}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField fullWidth id="subject" label="Your Subject Message" name="subject"
                                    error={formik.touched.subject && Boolean(formik.errors.subject)}
                                    helperText={formik.touched.subject && formik.errors.subject}
                                    value={formik.values.subject}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    fullWidth
                                    id="message"
                                    name="message"
                                    label="Your Message"
                                    multiline
                                    rows={3}

                                    error={formik.touched.message && Boolean(formik.errors.message)}
                                    helperText={formik.touched.message && formik.errors.message}
                                    value={formik.values.message}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                            Sent Message
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4.5}>
                    <Typography variant="h5" component="h5" >
                        We are also available at:
                    </Typography>
                    <Box paddingX={5} textAlign="start">Email:</Box>
                    <Typography variant="h6" component="h6" textAlign="start" paddingX={7}>
                        <EmailIcon></EmailIcon>{' '}yaelshli762@gmail.com
                    </Typography>
                    <Typography variant="h6" component="h6" textAlign="start" paddingX={7}>
                        <EmailIcon></EmailIcon>{' '}malkin.yaeli@gmail.com
                    </Typography>
                    <Box paddingX={5} marginTop={2} textAlign="start">Phone:</Box>
                    <Typography variant="h6" component="h6" textAlign="start" paddingX={7}>
                        <PhoneIcon></PhoneIcon>{' '}053-313-3762
                    </Typography>
                    <Typography variant="h6" component="h6" textAlign="start" paddingX={7}>
                        <PhoneIcon></PhoneIcon>{' '}058-322-0353
                    </Typography>
                </Grid>
            </Grid>

        </div>
    )
}