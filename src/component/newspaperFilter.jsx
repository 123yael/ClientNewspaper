import { Box, Button, Grid, InputLabel, TextField } from "@mui/material"

const NewspaperFilter = (props) => {
    return (
        <Box component="form" onSubmit={props.getAll}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={5} >
                    <Box display="flex"
                        marginBottom={1}
                        justifyContent="flex-start">
                        <InputLabel htmlFor="search-input-date">
                            Search by date
                        </InputLabel>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Box display="flex"
                        marginBottom={1}
                        justifyContent="flex-start">
                        <InputLabel htmlFor="search-input-sheet">
                            Search by sheet
                        </InputLabel>
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={5} >
                    <TextField
                        fullWidth
                        type="search"
                        id="search-input-date"
                        label="Date"
                        name="date"
                        variant="outlined"
                        onChange={(e) => { props.onHandelInputChangeDate(e) }}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        fullWidth
                        type="number"
                        id="search-input-sheet"
                        label="Sheet"
                        name="sheet"
                        variant="outlined"
                        onChange={(e) => { props.onHandelInputChangeSheet(e) }}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Button sx={{ height: 55 }} fullWidth variant="contained" type="submit">All</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default NewspaperFilter