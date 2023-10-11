import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { SERVER_NAME } from "../config";
import { Box, Button } from "@mui/material";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { date } from "yup";
import { getDateNow } from "../shared-functions/shared-functions";

const PageFlip = (props) => {
  const book = useRef();

  const [bookImgs, setBookImages] = useState();
  let width, height;

  useEffect(() => {
    
    let bookImg = [];

    debugger
    if (props.isFromCache)
      for (let i = 0; i < props.productDetail.countPages; i++) {
        let name = `${SERVER_NAME}/Newspapers/${props.productDetail.publicationDate}/${i}.png`
        bookImg.push(name)
      }
    else
      for (let i = 0; i < props.productDetail.countPages; i++) {
        let name = `${SERVER_NAME}/Newspapers/${props.productDetail.publicationDate}/${i}.png?id=${new Date().getTime()}`
        bookImg.push(name)
      }

    setBookImages(bookImg);
  }, [props]);


  document.onkeydown = checkKey;
  function checkKey(e) {
    e = e || window.event;
    if (e.keyCode === 37)
      book.current.pageFlip().flipPrev()
    else if (e.keyCode === 39)
      book.current.pageFlip().flipNext()
  }

  const flipPrev = () => {
    book.current.pageFlip().flipPrev()
  }

  const flipNext = () => {
    book.current.pageFlip().flipNext()
  }

  width = 412.5;
  height = 600

  return (<Box
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <Button variant="outlined" onClick={flipPrev} sx={{ marginRight: 5, paddingY: 10, paddingX: 4 }}><ArrowBackIosRoundedIcon /></Button>
    <HTMLFlipBook width={width} height={height} ref={book} showCover={true}>
      {bookImgs && bookImgs.map((element, i) => {
        return (
          <div className="demoPage" key={i}>
            <img src={element} alt={element} width={width} height={height} style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' }} />
          </div>
        )
      })}
    </HTMLFlipBook>
    <Button variant="outlined" onClick={flipNext} sx={{ marginLeft: 5, paddingY: 10, paddingX: 4 }}><ArrowForwardIosRoundedIcon /></Button>
  </Box>
  )
}


export default PageFlip;