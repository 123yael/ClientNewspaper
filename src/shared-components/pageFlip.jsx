import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { SERVER_NAME } from "../config";
import { Box } from "@mui/material";


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
    if (e.keyCode === '37') {
      // left arrow
      book.current.pageFlip().flipPrev()
    }
    else if (e.keyCode === '39') {
      // right arrow
      book.current.pageFlip().flipNext()
    }

  }

  width = "412.5px";
  height = "600px"

  return (<Box
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <HTMLFlipBook width={412.5} height={600} ref={book}>
      {bookImgs && bookImgs.map((element, i) => {
        return (
          <div className="demoPage">
            {
              i === 0 ? <img src={element} alt="person" width={width} height={height} /> :
                <img src={element} alt="person" width={width} height={height} style={{ border: "1px solid #000" }} />
            }
          </div>
        )
      })}
    </HTMLFlipBook>
  </Box>);
}


export default PageFlip;