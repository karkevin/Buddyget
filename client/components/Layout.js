// include metadata in all pages of the site.
import Meta from "./Meta";
import Nav from "./Nav";

const Layout = props => {
  return (
    <div>
      <Meta />
      <Nav />
      <>{props.children}</>
    </div>
  );
};

export default Layout;
