import LeftLink from "./LeftLink";
import "./style.css";
import { left } from "../../../data/home";
import { Link } from "react-router-dom";
import { ArrowDown1 } from "../../../svg";
import { useState } from "react";
import Shortcut from "./Shortcut";

export default function LeftHome({ user }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="left_home">
      <div className="left_home_wrapper">
        <div className="left_home_top">
          <div className="left_home_top_header">
            <h2 className="left_home_top_header_title">Shortcuts</h2>
          </div>
          </div></div>
          </div>
  );
}
