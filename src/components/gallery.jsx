import React from "react";
import { Image } from "./image";

export const Gallery = ({ data }) => {
  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Gallery</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed dapibus leonec.</p>
        </div>
        <div className="row">
          <div className="portfolio-items">
            {Array.isArray(data) && data.length > 0 ? (
              data.map((d, i) => (
                <div key={`${d.smallImage || i}`} className="col-sm-6 col-md-4 col-lg-4">
                  <Image
                    title={d.title || `Image ${i + 1}`}
                    largeImage={d.largeImage}
                    smallImage={d.smallImage}
                  />
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
