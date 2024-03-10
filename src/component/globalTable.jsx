import { Box } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { PALLETE } from "../config"

export const GlobalTable = (props) => {

    const rowClassName = (params) => {
        let res = ""
        if (!params.row.approvalStatus)
            res += "failed-row"
        else
            res += "approved-row"
        return res
    }

    return (
        <Box sx={{ width: '100%', backgroundColor: PALLETE.WHITE, textAlign: "center" }}>
            <DataGrid
                rows={props.rows}
                columns={props.columns}
                rowCount={props.totalCount !== undefined ? props.totalCount : 0}
                paginationModel={props.paginationModel}
                paginationMode="server"
                onPaginationModelChange={props.setPaginationModel}
                currentPage={props.paginationModel.page}
                page={props.page}

                sx={{
                    '& .approved': {
                        backgroundColor: PALLETE.YELLOW,
                    },
                    '& .failed': {
                        backgroundColor: PALLETE.RED,
                    },
                    '& .failed-row': {
                        borderLeft: `5px solid ${PALLETE.RED} `,
                    },
                    '& .approved-row': {
                        borderLeft: `5px solid ${PALLETE.YELLOW} `,
                    },
                }}

                getRowHeight={() => 70}

                getRowClassName={rowClassName}
            />
        </Box>
    )
}