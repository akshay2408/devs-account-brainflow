import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { AuthService } from "../../Services/Auth";
import { logout } from "../../Reducers/Auth";
import Logo from "../../Assets/logo-text.png";
import "./styles.scss";

const Header = () => {
    const dispatch = useDispatch();
    const { user: { profile, loggedIn } } = useSelector(({ auth } : any) => auth);

    const onLogout = () => {
        AuthService.logout();
        dispatch(logout());
    };

    return (
        <div className="navbar border-b text-neutral-content header flex w-full">
            <div className="flex-1 sm:flex-1 xs:flex-none">
                <Link to="/">
                    <div className="avatar h-10">
                        <img alt="logo" src={Logo} />
                    </div>
                </Link>
            </div>
            {loggedIn && (
                <>
                    <p className="text-white">{profile?.first_name} {profile?.last_name}</p>
                    <button type="button" className="ml-4 p-2 border" onClick={onLogout}>Logout</button>
                </>
            )}
        </div>
    );
};

export default Header;
