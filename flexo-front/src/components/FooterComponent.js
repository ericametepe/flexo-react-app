import React from "react";
import {Link} from "react-router-dom";


  function Footer() {
          return (<div className="footer">
              <div className="container">
                  <div className="row justify-content-center">
                      <div className="col-4 offset-1 col-sm-2">
                          <h5>Links</h5>
                          <ul className="list-unstyled">
                              <li><Link to='/home'>Home</Link></li>
                              <li><Link to='/prefs'>Preferences</Link></li>
                              <li><Link to='/acts'>Activities</Link></li>
                          </ul>
                      </div>
                      <div className="col-7 col-sm-5">
                          <h5>Our Address</h5>
                          <address>
                              Conservatoire national
                              des arts et métiers <br />
                              F-75141 Paris Cedex 03<br />
                              France<br />
                              <i className="fa fa-phone fa-lg"/>: 33 (0)1 40 27 20 00<br />
                              <a href="mailto:eric.yawo.kodjovi@gmail.com">  <i className="fa fa-envelope fa-lg"></i>: </a>
                          </address>
                      </div>
                      <div className="col-12 col-sm-4 align-self-center">
                          <div className="text-center">
                              <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                              <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                              <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                              <a className="btn btn-social-icon" href="mailto:eric.yawo.kodjovi@gmail.com">
                                  <i className="fa fa-envelope-o"></i>
                              </a>
                          </div>
                      </div>
                  </div>
                  <div className="row justify-content-center">
                      <div className="col-auto">
                          <p>© Copyright 2020 SAS KODJOVI ERIC</p>
                      </div>
                  </div>
              </div>
          </div>);
  }
export default Footer;
