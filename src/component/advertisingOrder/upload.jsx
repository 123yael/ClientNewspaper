import Button from '@mui/material/Button';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';

export const UpLoad = (props) => {
    return (
        <>
            <div className='border p-5'>
                <Button variant="contained" component="label" className='p-5'>
                    Upload
                    <input hidden accept="image/*" multiple type="file" onChange={props.chooseImage} />
                    <br />
                    <div><FileUploadRoundedIcon /></div>
                </Button>
            </div>
        </>
    )
}