import { Avatar, Box, Button, Grid, TextField, Typography } from "@mui/material"
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import * as yup from 'yup';
import { sentEmail } from "../Axios/emailAxios";
import { useFormik } from "formik";
import { PALLETE } from "../config";

const validationSchema = yup.object({
    name: yup
        .string('Enter your name'),
    subject: yup
        .string('Enter your subject'),
    email: yup
        .string('Enter your date')
        .email('Enter a valid email')
        .required(),
    phone: yup
        .number('Enter your phone'),
    message: yup
        .string('Enter your message')
        .required(),
});

export const Contact = () => {

    const formik = useFormik({
        initialValues: { name: '', subject: '', email: '', phone: '', message: '' },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => { sentMessage(values, { resetForm }) },
    });

    const sentMessage = (values, { resetForm }) => {
        sentEmail(values.name, values.email, values.message, values.subject, values.phone)
            .then(res => {
                alert("Your message has been sent successfully")
                resetForm()
            })
            .catch(err => {
                alert("Something went wrong while sending the message")
            })
    }


    return (
        <div className="mb-4">
            <Typography variant="h2" gutterBottom mb={0}>
                Talk to us
            </Typography>
            <Typography variant="h6" mb={3} gutterBottom>
                Leave details and we will get back to you soon
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="name" label="Your Name" name="name"
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="subject" label="Your Subject Message" name="subject"
                                    error={formik.touched.subject && Boolean(formik.errors.subject)}
                                    helperText={formik.touched.subject && formik.errors.subject}
                                    value={formik.values.subject}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="emailContact" label="Your Email *" name="email"
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="phone" label="Your Phone" name="phone"
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    helperText={formik.touched.phone && formik.errors.phone}
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    fullWidth
                                    id="message"
                                    name="message"
                                    label="Your Message *"
                                    multiline
                                    rows={3}
                                    error={formik.touched.message && Boolean(formik.errors.message)}
                                    helperText={formik.touched.message && formik.errors.message}
                                    value={formik.values.message}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                            Sent Message
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Typography variant="h5" component="h5" >
                        And of course it's also possible:
                    </Typography>
                    <Box paddingX={5} sx={{
                        mt: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        // textAlign: 'start',
                    }}>
                        <Avatar className='p-4' sx={{ backgroundColor: PALLETE.PURPLE }}>
                            <EmailIcon />
                        </Avatar>
                        <Typography variant="h5" component="h5" mt={2}>
                            <Typography>yaelshli762@gmail.com</Typography>
                            <Typography>malkin.yaeli@gmail.com</Typography>
                        </Typography>
                    </Box>
                    <Box paddingX={5} sx={{
                        mt: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'start',
                    }}>
                        <Avatar className='p-4' sx={{ backgroundColor: PALLETE.PURPLE }}>
                            <PhoneIcon />
                        </Avatar>
                        <Typography variant="h5" component="h5" mt={2}>
                            <Typography>053-313-3762</Typography>
                            <Typography>058-322-0353</Typography>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}