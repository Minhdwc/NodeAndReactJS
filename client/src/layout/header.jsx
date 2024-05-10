import { Outlet, Link } from "react-router-dom";
import Logo from "./logo.png";
import Form from "../components/forms";
import "../scss/Header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faRotateLeft, faHeart, faRightFromBracket, faPlus } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light nav-header">
                <div className="container-fluid ">
                    <Link to="/"><img className="logo" src={Logo} alt="MihDwc Movie" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse right-header" id="navbarSupportedContent">
                        <form className="d-flex form-container">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-secondary" type="submit">Search</button>
                        </form>
                        <div className="icon d-flex">
                            <Link to="/bookmark"><FontAwesomeIcon icon={faBookmark} />Follow</Link>
                            <Link to="/rotate-left"><FontAwesomeIcon icon={faRotateLeft} />History</Link>
                            <Link to="/heart"><FontAwesomeIcon icon={faHeart} />Liked</Link>
                            <Link to="/right-from-bracket"><FontAwesomeIcon icon={faRightFromBracket} />Logout</Link>
                            <Link to="/forms" element={<Form />}><FontAwesomeIcon icon={faPlus} />New</Link>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
};
export default Header;
