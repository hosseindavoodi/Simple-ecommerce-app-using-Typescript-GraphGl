import React from 'react';
import './css/font-awesome.css';
import './css/bootstrap.css';
import './css/style.css';
import './css/theme.scss';


 
const Header = () => {

  return ( 
    <header id="aa-header">
    <a className="scrollToTop" href="#"><i className="fa fa-chevron-up"></i></a>
  <div className="aa-header-bottom" id='fasdf'>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="aa-header-bottom-area">
            <div className="aa-logo">
              <a href="index.html" className="aa3h5">
                <span className="fa fa-shopping-cart"></span>
                <p>Home<strong>24</strong> </p>
              </a>
            </div>
            <div className="aa-search-box">
              <form action="">
                <input type="text" name="" id="" placeholder="Search here" />
                <button type="submit"><span className="fa fa-search"></span></button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</header> 
)
}
    

 
export default Header;


