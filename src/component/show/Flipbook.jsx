import { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import './Modal.css';
// import { useLocation } from 'react-router-dom';
import { SERVER_NAME } from '../../config';
import { Box, Button } from '@mui/material'

function Flipbook(props) {
  // let location = useLocation()
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const pagesList = () => {
    var pages = [];
    for (var i = 1; i <= numPages; i++) {
      pages.push(<div key={i}><Page width={500} pageNumber={i} /></div>);
    }
    return pages;
  }

  const arrPage = () => {
    let arr = []
    for (var i = 1; i <= numPages; i++) {
      arr.push(i);
    }
    return arr
  }

  return (
    <div style={{ backgroundColor: "black" }}>
      
      <Document
        // file={`${SERVER_NAME}/NewspapersPdf/${location.state}`}
        file='./document.pdf'
        onLoadSuccess={onDocumentLoadSuccess}
        className='modal-90w mt-5 border'
      >
        <Button>{'<'}</Button>
        <HTMLFlipBook width={500} height={630}>
          {/* {pagesList()} */}
          {
            arrPage().map((i) => (
              <div key={i}><Page width={500} pageNumber={i} /></div>
            ))
          }
        </HTMLFlipBook>
        <Button>{'>'}</Button>
      </Document>
      <Box className="bg-light">{pageNumber}/{numPages}</Box>
    </div>

  );
}
export default Flipbook;