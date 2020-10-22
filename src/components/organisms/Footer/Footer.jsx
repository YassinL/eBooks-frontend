import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
import Instagram from "../../atoms/SVG/Instagram";
import Facebook from "../../atoms/SVG/Facebook";
import Linkedin from "../../atoms/SVG/Linkedin";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-componant">
        <div className="footer-componant-details">
          <div>
            {" "}
            <Link className="footer-componant-details-contact" to="/contact">
              <h4>Contact</h4>
            </Link>
          </div>
        </div>
        <div className="footer-componant-sociaux">
          <div className="footer-componant-sociaux-instagram">
            <Instagram />
          </div>
          <div className="footer-componant-sociaux-facebook">
            <Facebook />
          </div>
          <div className="footer-componant-sociaux-linkedin">
            <Linkedin />
          </div>
        </div>
        <div className="footer-componant-copyright">
          <h5>© Copyright 2020 eBooks - Mentions légales</h5>
        </div>
      </div>
    </div>
  );
}
