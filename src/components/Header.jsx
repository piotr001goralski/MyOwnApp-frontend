import { Link } from 'react-router';
import Logo from "../assets/logo.svg";

export default function Header() {
    return (
        <header>
            <img src={Logo} className='logo' width="200" onClick={() => location.reload()} alt='logo'/>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Sklep</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profil</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}