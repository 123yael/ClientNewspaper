// import { useState } from "react";
// import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "./ShowNewspaper.css";
import "./pdf.min.js"

export const ShowNewspaper = () => {

  // ('#magazine').turn({ gradients: true, acceleration: true });

  // const [numPages, setNumPages] = useState(null)
  // const [pageNumber, setPageNumber] = useState(1)

  // const onDocumentLoadSuccess = ({ numPages }) => {
  //   setNumPages(numPages);
  //   // debugger

  //   // document.getElementsByClassName('react-pdf__Page__annotations annotationLayer')[0].style.display="none"
  // };

  // const goToPrevPage = () => {
  //   setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1)
  // }

  // const goToNextPage = () => {
  //   setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1)
  // }

  return (
      <div class="catalog-app">
        <div id="viewer">
          <div id="flipbook" class="ui-flipbook">
            <a ignore="1" class="ui-arrow-control ui-arrow-next-page"></a>
            <a ignore="1" class="ui-arrow-control ui-arrow-previous-page"></a>
          </div>
        </div>

        <div id="controls">
          <div class="all">
            <div class="ui-slider" id="page-slider">
              <div class="bar">
                <div class="progress-width">
                  <div class="progress">
                    <div class="handler"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="ui-options" id="options">
              <a class="ui-icon" id="ui-icon-table-contents">
                <i class="fa fa-bars"></i>
              </a>
              <a class="ui-icon show-hint" title="Miniatures" id="ui-icon-miniature">
                <i class="fa fa-th"></i>
              </a>
              <a class="ui-icon" id="ui-icon-zoom">
                <i class="fa fa-file-o"></i>
              </a>
              <a class="ui-icon show-hint" title="Share" id="ui-icon-share">
                <i class="fa fa-share"></i>
              </a>
              <a class="ui-icon show-hint" title="Full Screen" id="ui-icon-full-screen">
                <i class="fa fa-expand"></i>
              </a>
              <a class="ui-icon show-hint" id="ui-icon-toggle">
                <i class="fa fa-ellipsis-v"></i>
              </a>
            </div>

            <div id="zoom-slider-view" class="zoom-slider">
              <div class="bg">
                <div class="ui-slider" id="zoom-slider">
                  <div class="bar">
                    <div class="progress-width">
                      <div class="progress">
                        <div class="handler"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="ui-icon-expand-options">
            <a class="ui-icon show-hint">
              <i class="fa fa-ellipsis-h"></i>
            </a>
          </div>

        </div>

        <div id="miniatures" class="ui-miniatures-slider">

        </div>

      </div>
      )
}

