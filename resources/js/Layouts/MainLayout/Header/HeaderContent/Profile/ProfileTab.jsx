import PropTypes from "prop-types";
import { useState } from "react";

// material-ui
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

// assets
import { Card, Edit2, Logout, Profile, Profile2User } from "iconsax-react";
import { router } from "@inertiajs/react";

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({ handleLogout }) => {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        console.log(index)
        if (index === 0) {
            router.get("/profiles/user/personal")
        }
    };

    return (
        <List
            component="nav"
            sx={{ p: 0, "& .MuiListItemIcon-root": { minWidth: 32 } }}
        >
            {/* <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
            >
                <ListItemIcon>
                    <Edit2 variant="Bulk" size={18} />
                </ListItemIcon>
                <ListItemText primary="Edit Profile" />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
            >
                <ListItemIcon>
                    <Profile variant="Bulk" size={18} />
                </ListItemIcon>
                <ListItemText primary="View Profile" />
            </ListItemButton>

            <ListItemButton
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 3)}
            >
                <ListItemIcon>
                    <Profile2User variant="Bulk" size={18} />
                </ListItemIcon>
                <ListItemText primary="Social Profile" />
            </ListItemButton> */}
            <ListItemButton
                selected={selectedIndex === 3}
                onClick={handleLogout}
            >
                <ListItemIcon>
                    <Logout variant="Bulk" size={18} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItemButton>
        </List>
    );
};

ProfileTab.propTypes = {
    handleLogout: PropTypes.func,
};

export default ProfileTab;
