import { useRef } from "react";

// material-ui
import { Grid } from "@mui/material";
import { Outlet } from "react-router";

// project-imports
import ProfileCard from "../../../sections/apps/profiles/user/ProfileCard";
import ProfileTabs from "../../../sections/apps/profiles/user/ProfileTabs";
import MainLayout from "@/Layouts/MainLayout";

// ==============================|| PROFILE - USER ||============================== //

const UserProfile = ({ children }) => {
    const inputRef = useRef(null);

    const focusInput = () => {
        inputRef.current?.focus();
    };

    return (
        <MainLayout>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ProfileCard focusInput={focusInput} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <ProfileTabs focusInput={focusInput} />
                </Grid>
                <Grid item xs={12} md={9}>
                    {/* <Outlet context={inputRef} /> */}
                    {children}
                </Grid>
            </Grid>
        </MainLayout>
    );
};

export default UserProfile;
