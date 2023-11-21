import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { StepConnector, stepConnectorClasses, styled } from '@mui/material';
import AspectRatioRoundedIcon from '@mui/icons-material/AspectRatioRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import DriveFolderUploadRoundedIcon from '@mui/icons-material/DriveFolderUploadRounded';
import PointOfSaleRoundedIcon from '@mui/icons-material/PointOfSaleRounded';
import { Sizes } from './sizes';
import { Places } from './places';
import { Dates } from './dates';
import { UpLoad } from './upload';
import { Fragment } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDatesOfAd, setOrderDetailsOfAds } from '../../redux/actions/OrderDetailsActions';
import { PALLETE } from '../../config';
import { Message } from '../message/message';
import { Payment } from '../payment/payment';
import { calculationOfOrderPrice } from '../../Axios/orderAxios';


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                `linear-gradient( 136deg, ${PALLETE.PINK} 25%, ${PALLETE.PURPLE} 50%, ${PALLETE.BLUE} 100%)`,
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                `linear-gradient( 136deg, ${PALLETE.PINK} 25%, ${PALLETE.PURPLE} 50%, ${PALLETE.BLUE} 100%)`,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage:
            `linear-gradient( 136deg, ${PALLETE.PINK} 25%, ${PALLETE.PURPLE} 50%, ${PALLETE.BLUE} 100%)`,
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:
            `linear-gradient( 136deg, ${PALLETE.PINK} 25%, ${PALLETE.PURPLE} 50%, ${PALLETE.BLUE} 100%)`,
    }),
}));

const ColorlibStepIcon = (props) => {
    const { active, completed, className } = props;

    // מערך של איכונים לצעדי התקדמות
    const icons = {
        1: <AspectRatioRoundedIcon />,
        2: <LocationOnRoundedIcon />,
        3: <CalendarMonthRoundedIcon />,
        4: <DriveFolderUploadRoundedIcon />,
        5: <PointOfSaleRoundedIcon />
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}


export const AdvertisingOrder = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    // משתנה שאומר האם להציג את הכפתור הבא
    const [activeNext, setActiveNext] = useState(false);
    // משתנה שמחזיק את פרטי ההזמנה
    const [orderdetail, setOrderDetail] = useState({})
    // משתנה שמחזיק מערך של פרטי הזמנה
    const [arrOrderdetails, setArrOrderDetails] = useState([])
    // משתנה שמחזיק תאריכים של פרטי ההזמנה
    const [date, setDate] = useState()
    // משתנה שמחזיק את מערך של תאריכים של פרטי ההזמנה
    const [arrDates, setArrDates] = useState([])
    // משתנה שאומר האם להציג את ההודאת לפני התשלום
    const [beforePay, setBeforePay] = useState(true)

    const [toPay, setToPay] = useState(false)
    const [price, setPrice] = useState(0)


    const isStepSkipped = (step) => {
        return skipped.has(step)
    }

    // פונקציה למעבר לשלב הבא
    const handleNext = () => {

        let newSkipped = skipped
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values())
            newSkipped.delete(activeStep)
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setSkipped(newSkipped)
        setActiveNext(false)
        if (activeStep === steps.length - 1)
            beyondPayment()
    }

    // פונקציה חזרה לשלב הקודם
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setBeforePay(true)
    }

    const handleReset = () => {
        setActiveStep(0);
    }

    // פונקציה לבחירת גודל של פרסומת
    const chooseSize = (id) => {
        setActiveNext(true)
        setOrderDetail({ ...orderdetail, sizeId: id })
        console.log(arrOrderdetails);
    }

    // פונקציה לבחירת מיקום פרסומת
    const choosePlace = (id) => {
        setActiveNext(true)
        setOrderDetail({ ...orderdetail, placeId: id })
    }

    // פונקציה לבחירת תאריכי פרסומת
    const chooseFirstDateAndDuration = (date, duration) => {
        setActiveNext(true)
        setOrderDetail({ ...orderdetail, adDuration: duration })
        setDate(date)
    }

    // פונקציה לבחירת תמונה פרסומת
    const chooseImage = (image) => {
        setActiveNext(true)
        setOrderDetail({ ...orderdetail, adFile: image.target.files[0] })
    }

    // הוספת הזמנת המודעה למערך פרטי ההזמנות
    const anotherAd = () => {
        // הוספת פרטי הזמנות
        let arr1 = [...arrOrderdetails]
        arr1.push(orderdetail)
        setArrOrderDetails([...arr1])

        // הוספת תאריכים
        let arr2 = [...arrDates]
        arr2.push(date)
        setArrDates([...arr2])

        setOrderDetail({})
        setActiveStep(0)
        setActiveNext(false)
    }

    // פונקצית שליחת פרטי ההזמנות לרדוסר ומעבר לתשלום
    const beyondPayment = () => {
        // הוספת פרטי הזמנות
        let arr1 = [...arrOrderdetails]
        arr1.push(orderdetail)
        setArrOrderDetails([...arr1])

        // הוספת תאריכים
        let arr2 = [...arrDates]
        arr2.push(date)
        setArrDates([...arr2])

        dispatch(setOrderDetailsOfAds([...arr1]))
        dispatch(setDatesOfAd([...arr2]))

        debugger
        console.log(arr1);

        let list = []
        arr1.forEach(y => {
            list.push({ adDuration: y.adDuration, sizeId: y.sizeId, placeId: y.placeId })
        })
        console.log(list);
        calculationOfOrderPrice(list)
            .then(res => {
                setPrice(res.data)
                setToPay(true)
            })
            .catch(err => {
                console.log('error')
            })
    }

    // מערך שמכיל קומפוננטות של צעדים ושמות שלהם להצגה
    const steps = [
        { label: 'Size selection', description: <Sizes chooseSize={chooseSize} /> },
        { label: 'Location selection', description: <Places choosePlace={choosePlace} size={orderdetail.sizeId} /> },
        { label: 'Publication date', description: <Dates chooseFirstDateAndDuration={chooseFirstDateAndDuration} /> },
        { label: 'upload an ad', description: <UpLoad chooseImage={chooseImage} /> }
    ];

    return (
        <>
            {!toPay ?
                <div className='py-5 container'>
                    <Box sx={{ width: '100%' }} className='pb-5 mt-5'>
                        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                            {steps.map((s, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                if (isStepSkipped(index)) {
                                    stepProps.completed = false;
                                }
                                return (
                                    <Step key={index} {...stepProps}>
                                        <StepLabel {...labelProps} StepIconComponent={ColorlibStepIcon}>{s.label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you're finished
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                        className='border'
                                    >
                                        Back
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleNext} disabled={activeNext === false} className='border'>
                                        {activeStep === steps.length - 1 ? 'beyond payment' : 'Next'}
                                    </Button>
                                </Box>
                                <Box sx={{ mt: 2, mb: 1 }}>
                                    {steps[activeStep].description}
                                </Box>
                            </Fragment>
                        )}
                    </Box>
                </div> : <Payment price={price}></Payment>}
        </>
    )
}