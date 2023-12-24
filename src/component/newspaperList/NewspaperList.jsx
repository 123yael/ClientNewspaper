import React, { useEffect, useState } from "react";
import NewspaperThumbnail from "../../shared-components/NewspaperThumbnail";
import './NewspaperList.css';
import { getAllNewspapersPublished } from "../../Axios/newspapersPublishedAxios";
import NewspaperFilter from "../newspaperFilter"
import { PaginationNewspaper } from "../paginationNewspaper";


const NewspaperList = () => {

    const itemsPerPage = 8

    const [newspapersData, setNewspapersData] = useState([]);
    const [date, setDate] = useState("");
    const [sheet, setSheet] = useState("");
    const [totalPages, setTotalPages] = useState()
    const [page, setPage] = useState(1);

    const getAllNewspaper = (page) => {
        let num = 2000
        if (sheet === "" && date === "")
            num = 0
        setTimeout(() => {
            getAllNewspapersPublished(page, itemsPerPage, sheet, date).then(res => {
                setNewspapersData(res.data.list)
                setTotalPages(res.data.paginationMetadata.totalPages)
                setPage(res.data.paginationMetadata.currentPage)
            })
        }, num)
    }

    const hendleChangePage = (event, page) => {
        getAllNewspaper(page)
    }

    useEffect(() => {
        getAllNewspaper(1)
    }, [sheet, date]);

    const selectedData = (data) => {
        setNewspapersData(data);
    }

    const onHandelInputChangeDate = (e) => {
        setDate(e.target.value.toLowerCase())
    }

    const onHandelInputChangeSheet = (e) => {
        setSheet(e.target.value)
    }

    const getAll = (e) => {
        e.preventDefault()
        e.target.date.value = ""
        e.target.sheet.value = ""
        setSheet("")
        setDate("")
    }

    return (
        <div className="h-100 rounded" style={{ marginTop: 50 }}>
            <NewspaperFilter getAll={getAll} onHandelInputChangeDate={onHandelInputChangeDate} onHandelInputChangeSheet={onHandelInputChangeSheet}></NewspaperFilter>
            <NewspaperThumbnail listNewspapersPublished={newspapersData} selectedData={selectedData} />
            <PaginationNewspaper totalPages={totalPages} hendleChangePage={hendleChangePage} page={page}></PaginationNewspaper>
        </div>

    )
}

export default NewspaperList