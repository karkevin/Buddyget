import BottomMenu from "./BottomMenu";
import Nav from "./Nav";

import React from "react";

const Layout = props => {
  return (
    <div>
      <Nav />
      <div style={{ marginTop: "6.5rem" }}>{props.children}</div>
      <BottomMenu page={props.page} />
    </div>
  );
};

export default Layout;
