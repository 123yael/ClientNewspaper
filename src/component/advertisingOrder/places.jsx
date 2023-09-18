import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllAdPlacement } from "../../Axios/adPlacementAxios"
import { setAdPlacement } from "../../redux/actions/AdPlacemenrsActions"
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Alert, AlertTitle, Grid } from "@mui/material";
import { PALLETE, SERVER_NAME } from "../../config";


export const Places = (props) => {

    const [color, setColor] = React.useState()
    const [place, setPlace] = React.useState()

    const dispatch = useDispatch()

    useEffect(() => {
        getAllAdPlacement().then(p => dispatch(setAdPlacement(p.data)))
    }, [])

    let listPlaces = useSelector(p => p.AdPlacementsReducer.list)

    const theme = useTheme();

    return (
        <div>
            {
                listPlaces.map((p, i) => (
                    <Button key={i} sx={{ display: 'inline-block', margin: '1rem', width: '20rem' }} onClick={() => {setColor(PALLETE.LIGHT_GRAY); setPlace(p.placeId); props.choosePlace(p.placeId)}} className="text-dark bg-light">
                        <Card key={p.placeId} sx={{backgroundColor: place === p.placeId ? color : PALLETE.WHITE}}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    {p.placeName}
                                </Typography>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 151, borderRadius: "10px"}}
                                    image={`${SERVER_NAME}/${p.img}`}
                                    alt="Research paper"
                                    className="mx-auto"
                                />
                            </CardContent>
                        </Card>
                    </Button>
                ))
            }
            <Grid item xs={12} textAlign='left'>
                <Alert severity="info" className="my-3">
                    <AlertTitle>Info</AlertTitle>
                    Selecting an ad placement is a preference presentation only, the system has no obligation to the requested placement!                </Alert>
            </Grid>
        </div>
    )
}