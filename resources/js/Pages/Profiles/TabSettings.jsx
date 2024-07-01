import { useState } from "react";

// material-ui
import {
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Switch,
    Typography,
} from "@mui/material";

// project-imports
import MainCard from "@/Components/MainCard";

// assets
import { DocumentLike, Sms, Translate } from "iconsax-react";
import UserProfile from "@/Pages/Profiles/layout/user";

// ==============================|| USER PROFILE - SETTINGS ||============================== //

const TabSettings = () => {
    const [checked, setChecked] = useState(["oc", "usn", "lc"]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <UserProfile>
            <MainCard title="Settings">
                <List sx={{ "& .MuiListItem-root": { p: 2 } }}>
                    <ListItem divider>
                        <ListItemIcon
                            sx={{
                                color: "primary.main",
                                mr: 2,
                                display: { xs: "none", sm: "block" },
                            }}
                        >
                            <DocumentLike style={{ fontSize: "1.5rem" }} />
                        </ListItemIcon>
                        <ListItemText
                            id="switch-list-label-oc"
                            primary={
                                <Typography variant="h5">
                                    Order Confirmation
                                </Typography>
                            }
                            secondary="You will be notified when customer order any product"
                        />
                        <Switch
                            edge="end"
                            onChange={handleToggle("oc")}
                            checked={checked.indexOf("oc") !== -1}
                            inputProps={{
                                "aria-labelledby": "switch-list-label-oc",
                            }}
                        />
                    </ListItem>
                    <ListItem divider>
                        <ListItemIcon
                            sx={{
                                color: "primary.main",
                                mr: 2,
                                display: { xs: "none", sm: "block" },
                            }}
                        >
                            <Sms style={{ fontSize: "1.5rem" }} />
                        </ListItemIcon>
                        <ListItemText
                            id="switch-list-label-sen"
                            primary={
                                <Typography variant="h5">
                                    Setup Email Notification
                                </Typography>
                            }
                            secondary="Turn on email  notification to get updates through email"
                        />
                        <Switch
                            edge="end"
                            onChange={handleToggle("sen")}
                            checked={checked.indexOf("sen") !== -1}
                            inputProps={{
                                "aria-labelledby": "switch-list-label-sen",
                            }}
                        />
                    </ListItem>
                    <ListItem divider>
                        <ListItemIcon
                            sx={{
                                color: "primary.main",
                                mr: 2,
                                display: { xs: "none", sm: "block" },
                            }}
                        >
                            <Sms style={{ fontSize: "1.5rem" }} />
                        </ListItemIcon>
                        <ListItemText
                            id="switch-list-label-usn"
                            primary={
                                <Typography variant="h5">
                                    Update System Notification
                                </Typography>
                            }
                            secondary="You will be notified when customer order any product"
                        />
                        <Switch
                            edge="end"
                            onChange={handleToggle("usn")}
                            checked={checked.indexOf("usn") !== -1}
                            inputProps={{
                                "aria-labelledby": "switch-list-label-usn",
                            }}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon
                            sx={{
                                color: "primary.main",
                                mr: 2,
                                display: { xs: "none", sm: "block" },
                            }}
                        >
                            <Translate style={{ fontSize: "1.5rem" }} />
                        </ListItemIcon>
                        <ListItemText
                            id="switch-list-label-lc"
                            primary={
                                <Typography variant="h5">
                                    Language Change
                                </Typography>
                            }
                            secondary="You will be notified when customer order any product"
                        />
                        <Switch
                            edge="end"
                            onChange={handleToggle("lc")}
                            checked={checked.indexOf("lc") !== -1}
                            inputProps={{
                                "aria-labelledby": "switch-list-label-lc",
                            }}
                        />
                    </ListItem>
                </List>
                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    spacing={2}
                    sx={{ mt: 2.5 }}
                >
                    <Button variant="outlined" color="secondary">
                        Cancel
                    </Button>
                    <Button variant="contained">Save</Button>
                </Stack>
            </MainCard>
        </UserProfile>
    );
};

export default TabSettings;
