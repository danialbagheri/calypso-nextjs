import { Component } from "react";

class Custom404 extends Component {
  render() {
    return (
      <div className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-centre">
                <div className="four_zero_four_bg">
                  <h1 className="text-centre ">404</h1>
                </div>

                <div className="contant_box_404">
                  <h3 className="h2">Look like you're lost</h3>

                  <p>the page you are looking for not available!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Custom404;
