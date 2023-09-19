import { Box, Button, Typography } from "@mui/material"
import { useState } from "react"

export const MagazineClosing = () => {

    const [isPublish, setIsPublish] = useState(false)

    const createMagazine = () => {

    }

    const publishMagazine = () => {

    }

    return (
        <div className='py-5 container'>
            <Box sx={{ mt: 5, textAlign: "left" }}>
                <Typography variant={"h4"}>
                    Hello manager!
                </Typography>
                <Typography variant={"h6"}>
                    Please note that the publication day of the newspaper is Tuesday, please check the correctness of the magazine before publication.
                </Typography>
                <Typography>
                    <Button
                        onClick={createMagazine}
                        type="button"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Create a magazine
                    </Button>
                </Typography>
                <Typography>
                    <Button
                        onClick={publishMagazine}
                        disabled={!isPublish}
                        type="button"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Publish the magazine
                    </Button>
                </Typography>
            </Box>
        </div>
    )
}