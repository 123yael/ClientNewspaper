import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { PALLETE, SERVER_NAME } from "../config";
import { Box, Button } from "@mui/material";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

const PageFlip = (props) => {
  const book = useRef();

  const [bookImgs, setBookImages] = useState();
  let width, height;

  useEffect(() => {

    let bookImg = [];

    bookImg.push(`first.png`)

    for (let i = 0; i < props.productDetail.countPages; i++) {
      let name = `${SERVER_NAME}/Newspapers/${props.productDetail.publicationDate}/${i}.png`
      console.log(name);
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
    <Button variant="outlined" onClick={flipPrev} color="secondary" sx={{ marginRight: 5, paddingY: 10, paddingX: 4, backgroundColor: PALLETE.LIGHT_GRAY }}><ArrowBackIosRoundedIcon /></Button>
    <HTMLFlipBook width={width} height={height} ref={book}>
      {bookImgs && bookImgs.map((element, i) => {
        return (
          <div className="demoPage">
            {
              i === 0 ? <img src={element} alt="person" width={width} height={height} /> :
                <img src={element} alt="person" width={width} height={height} style={{ border: `0.5px solid ${PALLETE.LIGHT_GRAY}` }} />
            }
          </div>
        )
      })}
    </HTMLFlipBook>
    <Button variant="outlined" onClick={flipNext} color="secondary" sx={{ marginLeft: 5, paddingY: 10, paddingX: 4, backgroundColor: PALLETE.LIGHT_GRAY }}><ArrowForwardIosRoundedIcon /></Button>
  </Box>);
}


export default PageFlip;