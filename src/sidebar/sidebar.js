import {
    FaUserSecret,
    FaRegEdit,
    FaBookReader,
    FaRegFileAlt,
    FaVolleyballBall,
    BsCartCheck

} from "react-icons/fa";
import { FaBeer } from 'react-icons/fa';
import { NavLink, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



function Sidebar({ children }) {

    const menuItem = [
        {
            path: "/",
            name: "Dashboard",
            icon: <FaBookReader />
        },
        {
            path: "/add/product",
            name: "Add Product",
            icon: <FaRegEdit />
        },
        {
            path: "/product/issued",
            name: "Issude Product",
            icon: <FaRegFileAlt />
        },
        {
            path: "/admin",
            name: "Admin",
            icon: <FaUserSecret />
        }
        
    ]
    return (
        <div className="sid-container">

            <div className="sidebar">
                <div className="top_section">
                    <div className="icon"><FaVolleyballBall /></div>
                    <div className="link d-none d-sm-inline">Rental App </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link text-deactron" activeclassName="active">
                            <div className="icon">{item.icon}</div>
                            <div className="ms-3 d-none d-sm-inline">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>

            <main>
                <NavScrollExample />
                {children}
                <Footer />
            </main>

        </div>
    );
};

export default Sidebar;

export function NavScrollExample({ title }) {
    function filtered(){
        console.log("clicked");

    }
    const history = useHistory()
    return (
        <div>
            <Navbar className="nav-clr" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#" className="title">{title}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <button class="btn btn-outline-warning me-2" type="button" onClick={() => history.push("/")}>Home</button>
                           <button class="btn btn-outline-warning me-2" type="button" onClick={() => history.push("/detail/cart")}> <div className="icon"></div><FaBeer />cart</button>
                           
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                              
                            />
                            <Button class="btn btn-outline-warning me-2" onClick={()=>filtered()}>Search</Button>
                        </Form>
                        <button class="btn btn-outline-warning me-2" type="button" onClick={() => history.push("/login")}>Login</button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    );
}

export function Footer() {
    return (
        <div>
            <footer>
                contact us
                <div>email : Ragullibrary23@gmail.com</div>
                <div>phone : 9788652355</div>
            </footer>
        </div>
    )
}