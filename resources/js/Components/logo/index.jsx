import PropTypes from "prop-types";
import { Link } from "@inertiajs/react";

// material-ui
import { ButtonBase } from "@mui/material";

// project-imports
import Logo from "./LogoMain";
import {default as LogoSvg} from './logoBps.svg'
import LogoIcon from "./LogoIcon";
import { APP_DEFAULT_PATH } from "../../config";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ reverse, isIcon, sx, to }) => (
    <ButtonBase
        disableRipple
        component={Link}
        to={!to ? APP_DEFAULT_PATH : to}
        sx={sx}
    >
        {/* {isIcon ? <LogoIcon /> : <Logo reverse={reverse} />} */}
        <img src={LogoSvg} alt="logo" style={sx} />
    </ButtonBase>
);

LogoSection.propTypes = {
    reverse: PropTypes.bool,
    isIcon: PropTypes.bool,
    sx: PropTypes.object,
    to: PropTypes.string,
};

export default LogoSection;
