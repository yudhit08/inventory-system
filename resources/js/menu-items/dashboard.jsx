// third-party
import { FormattedMessage } from "react-intl";

// assets
import { HomeTrendUp } from "iconsax-react";

// icons
const icons = {
    dashboard: HomeTrendUp,
};

// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const dashboard = {
    id: "group-dashboard",
    title: <FormattedMessage id="dashboard" />,
    icon: icons.dashboard,
    type: "group",
    children: [
        {
            id: "dashboard",
            title: <FormattedMessage id="dashboard" />,
            type: "collapse",
            icon: icons.dashboard,
            children: [
                {
                    id: "default",
                    title: <FormattedMessage id="default" />,
                    type: "item",
                    url: "/dashboard/default",
                    breadcrumbs: false,
                },
                {
                    id: "analytics",
                    title: <FormattedMessage id="analytics" />,
                    type: "item",
                    url: "/dashboard/analytics",
                    breadcrumbs: false,
                },
            ],
        },
    ],
};

export default dashboard;
