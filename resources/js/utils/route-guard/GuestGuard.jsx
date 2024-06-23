import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// project-imports
import { APP_DEFAULT_PATH } from "../../config";
import useAuth from "../../hooks/useAuth";
import { router } from "@inertiajs/react";

// ==============================|| GUEST GUARD ||============================== //

const GuestGuard = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isLoggedIn) {
            router.get(
                location?.state?.from ? location?.state?.from : APP_DEFAULT_PATH
            );
        }
    }, [isLoggedIn, navigate, location]);

    return children;
};

GuestGuard.propTypes = {
    children: PropTypes.node,
};

export default GuestGuard;
