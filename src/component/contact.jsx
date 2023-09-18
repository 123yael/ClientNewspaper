import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';


export const Contact = () => {

    const sentMessage = () => {
        alert("Message Sent Successfully")
    }


    return (
        <div>
            <Typography variant="h2" component="h1" gutterBottom>
                Contact Us
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Box component="form" onSubmit={sentMessage} noValidate sx={{ mt: 1 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth id="nameContact" label="Name" name="name" autoComplete="given-name" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth id="emailContact" label="Email Address" name="email" autoComplete="email" />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField className="mt-3" required fullWidth id="commentContact" label="Message" minRows={5}></TextField>
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                            Sent Message
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
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
                    <Box paddingX={5} marginTop={1} textAlign="start">Phone:</Box>
                    <Typography variant="h6" component="h6" textAlign="start" paddingX={7}>
                        <PhoneIcon></PhoneIcon>{' '}053-313-37-62
                    </Typography>
                    <Typography variant="h6" component="h6" textAlign="start" paddingX={7}>
                        <PhoneIcon></PhoneIcon>{' '}058-322-03-53
                    </Typography>
                </Grid>
            </Grid>

        </div>
    )
}