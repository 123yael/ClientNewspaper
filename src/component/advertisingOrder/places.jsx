import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllAdPlacement } from "../../Axios/adPlacementAxios"
import { setAdPlacement } from "../../redux/actions/AdPlacemenrsActions"
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Button from '@mui/material/Button';


export const Places = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        getAllAdPlacement().then(p => dispatch(setAdPlacement(p.data)))
    }, [])

    let listPlaces = useSelector(p => p.AdPlacementsReducer.list)

    const theme = useTheme();

    return (
        <div>
            {
                listPlaces.map(p => (
                    <Card sx={{ display: 'inline-block', margin: '2rem' }} key={p.placeId}>
                        <Button size="small" onClick={() => props.choosePlace(p.placeId)} className="bg-light text-dark">
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    {p.placeName}
                                </Typography>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 151 }}
                                    image="../pic/Research paper.gif"
                                    alt="Research paper"
                                />
                            </CardContent>
                        </Button>
                    </Card>
                ))
            }

        </div>
    )
}