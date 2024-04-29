import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        width: "100% ",
        height: "50px",
        display: "flex",
        backgroundColor: "blue",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", gap: "30px", color: "white" }}>
        <div>
          <Link style={{ color: "#fff", textDecoration: "none" }} to="/">
            Animation Graph
          </Link>
        </div>
        <div>
          <Link style={{ color: "#fff", textDecoration: "none" }} to="/sheet">
            Style Sheet Graph
          </Link>
        </div>
        <div>
          <Link style={{ color: "#fff", textDecoration: "none" }} to="/pdf">
            Export PDF
          </Link>
        </div>
        <div>
          <Link style={{ color: "#fff", textDecoration: "none" }} to="/zoom">
            Zoom Feature
          </Link>
        </div>
        <div>
          <Link style={{ color: "#fff", textDecoration: "none" }} to="/click">
            Click Popup
          </Link>
        </div>
        <div>
          <Link style={{ color: "#fff", textDecoration: "none" }} to="/draw">
            Stroke Line
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
