import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { getAllNewspapersPublished } from '../Axios/newspapersPublishedAxios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setNewspapersPublished } from '../redux/actions/NewspapersPublishedActions';
import { SERVER_NAME } from './../config';

export const NewspaperArchive = () => {

    // משתנה שדרכו ניתן לשגר לרדוסר
    const dispatch = useDispatch()

    // מיד בעת טעינת הקומפוננטה תשוגר רשימת העיתונים לרדוסר
    useEffect(() => {
        getAllNewspapersPublished().then(res => dispatch(setNewspapersPublished(res.data)))
    }, []);

    // חילוץ רשימת העיתונים מהרדוסר
    let listNewspapersPublished = useSelector(s => s.NewspapersPublishedReducer.list)

    return (
        <div>
            {listNewspapersPublished.length > 0 ? (
                <Grid item xs={12} md={12} marginTop={5} container spacing={3}>
                    {
                        listNewspapersPublished.map((n, i) => (
                            <Grid item xs={12} md={3} key={i} >
                                <CardActionArea component="a" href="#" className='shadow shadow-3'>
                                    <CardMedia
                                        component="img"
                                        sx={{ display: { xs: 'none', sm: 'block' } }}
                                        image={`${SERVER_NAME}/NewspapersImg/${n.img}`}
                                        alt={`${SERVER_NAME}/NewspapersImg/${n.img}`}
                                        className='border'
                                    />
                                    <Typography variant="h6" color="text.secondary" className='bg-secondary text-light rounded-bottom'>
                                        {n.publicationDate}{' '}
                                        <span style={{ fontWeight: "bold" }}>sheet {n.newspaperId}</span>
                                    </Typography>
                                </CardActionArea>
                            </Grid>
                        ))
                    }
                </Grid>
            ) : (
                <Typography variant="h5" marginTop={5}><div className="spinner-border text-dark"></div> Loading...</Typography>
            )}
        </div>
    )
}
