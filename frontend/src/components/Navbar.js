import React  from "react";
import { Link , useLocation ,useNavigate} from "react-router-dom";
const Navbar = () => {

  let location = useLocation();
  const navigate = useNavigate();
   const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate("/login")
    
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid">
          <Link className=" figma navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${location.pathname==="/about"?"active":""}`} href="/about">
                  About
                </a>
              </li>
             
             
            </ul>
            {!localStorage.getItem("token")?<div className="">
            <Link to="/login" className="btn btn-primary mx-2" role="button" >Login</Link>
            <Link to="/signup" className="btn btn-primary mx-2" role="button" >Sign Up</Link>
            </div>: <button className="btn btn-primary" onClick={handleLogout}>Logout</button>}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
