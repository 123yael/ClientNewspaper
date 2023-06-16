import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { StepConnector, stepConnectorClasses, styled } from '@mui/material';
import PropTypes from 'prop-types';
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


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 136deg, rgb(117, 9, 217) 25%, rgb(196, 53, 255) 50%, rgb(247, 47, 216) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 136deg, rgb(117, 9, 217) 25%, rgb(196, 53, 255) 50%, rgb(247, 47, 216) 100%)',
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
            'linear-gradient( 136deg, rgb(247, 47, 216) 25%, rgb(196, 53, 255) 50%, rgb(117, 9, 217) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(247, 47, 216) 25%, rgb(196, 53, 255) 50%, rgb(117, 9, 217) 100%)',
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

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};


export const AdvertisingOrder = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    let customer = {}
    customer = useSelector(c => c.CustomersReducer.customer)

    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    // משתנה שאומר האם להציג את הכפתור הבא
    const [activeNext, setActiveNext] = useState(false);
    // משתנה שמחזיק את פרטי ההזמנה
    const [orderdetail, setOrderDetail] = useState({})
    // משתנה שמחזיק מערך של פרטי הזמנה
    const [arrOrderdetails, setArrOrderDetails] = useState([])
    // משתנה שמחזיק תאריכים של פרטי ההזמנה
    const [dates, setDates] = useState([])
    // משתנה שמחזיק את מערך של תאריכים של פרטי ההזמנה
    const [arrDates, setArrDates] = useState([])
    // משתנה שאומר האם להציג את ההודאת לפני התשלום
    const [beforePay, setBeforePay] = useState(true)


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
        // במקרא של רגע לפני תשלום
        if (activeStep === steps.length - 1) {
            if (customer === undefined || customer === null || customer === {} || customer.custFirstName == undefined){
                navigate('/signIn')
                alert("אינך מורשה להזמין פרסומת כיוון שאינך רשום כלקוח. נא הירשם תחילה.")
            }
            beyondPayment()
        }
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
        console.log(arrOrderdetails);
    }

    // פונקציה לבחירת תאריכי פרסומת
    const chooseDates = (arr) => {
        setActiveNext(true)
        setDates(arr)
        console.log(dates);
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
        arr2.push(dates)
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
        arr2.push(dates)
        setArrDates([...arr2])

        dispatch(setOrderDetailsOfAds([...arr1]))
        dispatch(setDatesOfAd([...arr2]))
        navigate('/payment')
    }

    // מערך שמכיל קומפוננטות של צעדים ושמות שלהם להצגה
    const steps = [
        { label: 'Size selection', description: <Sizes chooseSize={chooseSize} /> },
        { label: 'Location selection', description: <Places choosePlace={choosePlace} /> },
        { label: 'Publication date', description: <Dates chooseDates={chooseDates} /> },
        { label: 'upload an ad', description: <UpLoad chooseImage={chooseImage} /> }
    ];

    return (
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
                    <Box sx={{ mt: 2, mb: 1 }}>
                        {steps[activeStep].description}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                            className='border'
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {activeStep === steps.length - 1 && <Button onClick={anotherAd} sx={{ mr: 1 }} disabled={activeNext === false}>
                            Another ad
                        </Button>}
                        <Button onClick={handleNext} disabled={activeNext === false} className='border'>
                            {activeStep === steps.length - 1 ? 'beyond payment' : 'Next'}
                        </Button>
                    </Box>
                </Fragment>
            )}
        </Box>
    );
}