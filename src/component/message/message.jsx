import { Card, CardContent, Typography } from "@mui/material";
import { PALLETE } from "../../config";

export const Message = (props) => {

    return (
        <Card sx={{backgroundImage: `linear-gradient(100deg, ${PALLETE.PINK} 25%, ${PALLETE.WHITE} 50%, ${PALLETE.BLUE} 100%)`}}>
            <CardContent>
                <Typography variant="h5">
                    Hi {props.name},
                </Typography>
                <Typography sx={{ fontSize: 18 }} color="text.secondary">
                    Thanks for contacting us
                </Typography>
                <Typography sx={{ fontSize: 18 }} color="text.secondary">
                    We will be happy to be in touch with you regarding your application
                </Typography>
                <Typography sx={{ fontSize: 18 }} color="text.secondary">
                    Thank you very much for your cooperation,
                </Typography>
                <Typography sx={{ fontSize: 18 }} color="text.secondary">
                    Company managers
                </Typography>
                <Typography sx={{ mt: 2 }} color="text.secondary" gutterBottom>
                    <img src='../pic/logo.png' alt="logo" width={140} />
                </Typography>
            </CardContent>
        </Card>
    )
}