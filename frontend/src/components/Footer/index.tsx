import React from "react";
import classes from "./index.module.scss";
import nih from "../../resources/images/nih-logo.webp";
import fogarty from "../../resources/images/fogarty.webp";
import h3ab from "../../resources/images/h3ab.webp";
import h3africa from "../../resources/images/H3africa-red.webp";
import { ReactComponent as EmailIcon } from "../../resources/images/email.svg";
import { ReactComponent as TwitterIcon } from "../../resources/images/twitter.svg";
import { ReactComponent as FacebookIcon } from "../../resources/images/facebook.svg";
import { ReactComponent as InstagramIcon } from "../../resources/images/instagram.svg";
import { ReactComponent as LinkedInIcon } from "../../resources/images/linkedin.svg";

type Props = {};

const Footer: React.FC<Props> = (props) => {
  return (
    <footer className={classes.Footer}>
      {/*<div className="container">*/}
      <div className={classes.Footer__Container}>
        <div className={classes.Footer__Logo}>
          <img src={nih} alt="nih" className={classes["Footer__Logo--1"]} />
          <img
            src={fogarty}
            alt="fogarty"
            className={classes["Footer__Logo--2"]}
          />
          <img src={h3ab} alt="h3ab" className={classes["Footer__Logo--3"]} />
          <img
            src={h3africa}
            alt="h3ab"
            className={classes["Footer__Logo--4"]}
          />
        </div>
        {/*// <!-- <hr /> -->*/}
        <div className={classes.Footer__Copy}>
          <p>Copyright &copy; {new Date().getFullYear()} Sysbiol PGWAS. All rights reserved</p>
          <div className={classes.Footer__Socials}>
            <a href="mailto:e.adebiyi@dkfz.de">
              <EmailIcon />
            </a>
            <a href="https://twitter.com/cubrenig">
              <TwitterIcon />
            </a>
            <a href="/">
              <FacebookIcon />
            </a>
            <a href="/">
              <InstagramIcon />
            </a>
            <a href="https://www.linkedin.com/in/ezekiel-adebiyi-65a95416/">
              <LinkedInIcon />
            </a>
          </div>
          <p>
            The website content is solely the responsibility of the authors and
            does not necessarily represent the official views of the National
            Institute of Health
          </p>
        </div>
      </div>
      {/*</div>*/}
    </footer>
  );
};

export default Footer;
