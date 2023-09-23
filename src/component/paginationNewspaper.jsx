import { Box, Pagination } from "@mui/material"

export const PaginationNewspaper = (props) => {
    return (
        <Box display={"inline-block"} mt={5}>
            <Pagination
                count={props.totalPages}
                color="primary"
                size="large"
                sx={{ mt: 2 }}
                onChange={props.hendleChangePage}
                page={props.page}
            />
        </Box>
    )
}