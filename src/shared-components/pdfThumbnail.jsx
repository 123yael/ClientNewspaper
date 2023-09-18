import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';


const PdfThumbnail = (props)=> {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(props.page);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document file={props.fileLocation} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} height={props.height} width={props.width} />
      </Document>
    </div>
  );
}

export default PdfThumbnail;