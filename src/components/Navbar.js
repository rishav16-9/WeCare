import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from 'react-router-dom'
import PhoneIcon from '@mui/icons-material/Phone'
const Navbar = () => {
    return (<>
        <nav className="navbar navbar-expand-lg bg-black text-white">
            <div className="container-fluid">
                <a className="navbar-brand text-white" href="#">WeCare</a>
                <span><PhoneIcon fontSize='small'/> Call Us: 080 2233447</span>
            </div>
        </nav>
    </>)
}

export default Navbar