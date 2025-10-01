import React from "react";

export const About = ({ data }) => {
  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <img src="img/about.jpg" className="img-responsive" alt="About" />
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>About Us</h2>
              <p>{data && data.paragraph ? data.paragraph : "Loading..."}</p>
              <h3>Why Choose Us?</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {Array.isArray(data?.Why) && data.Why.length > 0 ? (
                      data.Why.map((d, i) => <li key={`${d}-${i}`}>{d}</li>)
                    ) : (
                      <li>Loading...</li>
                    )}
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {Array.isArray(data?.Why2) && data.Why2.length > 0 ? (
                      data.Why2.map((d, i) => <li key={`${d}-${i}`}>{d}</li>)
                    ) : (
                      <li>Loading...</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
