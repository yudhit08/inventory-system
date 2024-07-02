import PropTypes from "prop-types";
import { useEffect, useState, useMemo } from "react";
import { usePage, router } from "@inertiajs/react";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
    Box,
    Collapse,
    ClickAwayListener,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Typography,
    useMediaQuery,
} from "@mui/material";

// project-imports
import NavItem from "./NavItem";
import Dot from "../../../../../Components/@extended/Dot";
import SimpleBar from "../../../../../Components/third-party/SimpleBar";
import Transitions from "../../../../../Components/@extended/Transitions";

import useConfig from "../../../../../hooks/useConfig";
import { dispatch, useSelector } from "../../../../../store";
import { activeItem } from "../../../../../store/reducers/menu";
import { MenuOrientation, ThemeMode } from "../../../../../config";

// assets
import { ArrowDown2, ArrowUp2, ArrowRight2, Copy } from "iconsax-react";

// mini-menu - wrapper
const PopperStyled = styled(Popper)(({ theme }) => ({
    overflow: "visible",
    zIndex: 1202,
    minWidth: 180,
    "&:before": {
        content: '""',
        display: "block",
        position: "absolute",
        top: 38,
        left: -5,
        width: 10,
        height: 10,
        backgroundColor: theme.palette.background.paper,
        transform: "translateY(-50%) rotate(45deg)",
        zIndex: 120,
        borderLeft: `1px solid ${theme.palette.divider}`,
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
}));

// ==============================|| NAVIGATION - COLLAPSE ||============================== //

const NavCollapse = ({
    menu,
    level,
    parentId,
    setSelectedItems,
    selectedItems,
    setSelectedLevel,
    selectedLevel,
}) => {
    const theme = useTheme();
    const { props } = usePage();
    const { drawerOpen } = useSelector((state) => state.menu);
    const { menuOrientation } = useConfig();

    const isDashboard = menu.id === "dashboard";

    const [open, setOpen] = useState(isDashboard);
    const [selected, setSelected] = useState(isDashboard ? menu.id : null);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(null);
        setSelectedLevel(level);
        if (drawerOpen) {
            setOpen(!open);
            setSelected(!selected ? menu.id : null);
            setSelectedItems(!selected ? menu.id : "");
            if (menu.url) router.visit(menu.url);
        } else {
            setAnchorEl(event?.currentTarget);
        }
    };

    const handlerIconLink = () => {
        if (!drawerOpen) {
            if (menu.url) router.visit(menu.url);
            setSelected(menu.id);
        }
    };

    const handleHover = (event) => {
        setAnchorEl(event?.currentTarget);
        if (!drawerOpen) {
            setSelected(menu.id);
        }
    };

    const miniMenuOpened = Boolean(anchorEl);

    const handleClose = () => {
        setOpen(false);
        if (!miniMenuOpened && !menu.url) {
            setSelected(null);
        }
        setAnchorEl(null);
    };

    useMemo(() => {
        if (selected === selectedItems) {
            if (level === 1) {
                setOpen(true);
            }
        } else {
            if (level === selectedLevel) {
                setOpen(false);
                if (
                    (!miniMenuOpened && !drawerOpen && !selected) ||
                    drawerOpen
                ) {
                    setSelected(null);
                }
            }
        }
    }, [
        selectedItems,
        level,
        selected,
        miniMenuOpened,
        drawerOpen,
        selectedLevel,
    ]);

    const pathname = router.page.url;

    useEffect(() => {
        if (pathname === menu.url) {
            setSelected(menu.id);
        }
        // eslint-disable-next-line
    }, [pathname]);

    const checkOpenForParent = (child, id) => {
        child.forEach((item) => {
            if (item.url === pathname) {
                setOpen(true);
                setSelected(id);
            }
        });
    };

    // menu collapse for sub-levels
    useEffect(() => {
        setOpen(isDashboard);
        if (!miniMenuOpened) {
            setSelected(isDashboard ? menu.id : null);
        }
        if (miniMenuOpened) setAnchorEl(null);
        if (menu.children) {
            menu.children.forEach((item) => {
                if (item.children?.length) {
                    checkOpenForParent(item.children, menu.id);
                }
                if (pathname && pathname.includes("product-details")) {
                    if (item.url && item.url.includes("product-details")) {
                        setSelected(menu.id);
                        setOpen(true);
                    }
                }
                if (item.url === pathname) {
                    setSelected(menu.id);
                    setOpen(true);
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, menu.children]);

    useEffect(() => {
        if (menu.url === pathname) {
            dispatch(activeItem({ openItem: [menu.id] }));
            setSelected(menu.id);
            setAnchorEl(null);
            setOpen(true);
        }
    }, [pathname, menu]);

    const navCollapse = menu.children?.map((item) => {
        switch (item.type) {
            case "collapse":
                return (
                    <NavCollapse
                        key={item.id}
                        setSelectedItems={setSelectedItems}
                        setSelectedLevel={setSelectedLevel}
                        selectedLevel={selectedLevel}
                        selectedItems={selectedItems}
                        menu={item}
                        level={level + 1}
                        parentId={parentId}
                    />
                );
            case "item":
                return <NavItem key={item.id} item={item} level={level + 1} />;
            default:
                return (
                    <Typography
                        key={item.id}
                        variant="h6"
                        color="error"
                        align="center"
                    >
                        Fix - Collapse or Item
                    </Typography>
                );
        }
    });

    const isSelected = selected === menu.id;
    const borderIcon =
        level === 1 ? (
            <Copy variant="Bulk" size={drawerOpen ? 22 : 24} />
        ) : (
            false
        );
    const Icon = menu.icon;
    const menuIcon = menu.icon ? (
        <Icon variant="Bulk" size={drawerOpen ? 22 : 24} />
    ) : (
        borderIcon
    );
    const textColor =
        theme.palette.mode === ThemeMode.DARK
            ? theme.palette.secondary[400]
            : theme.palette.secondary.main;
    const iconSelectedColor =
        theme.palette.mode === ThemeMode.DARK && drawerOpen
            ? theme.palette.text.primary
            : theme.palette.primary.main;
    const popperId = miniMenuOpened ? `collapse-pop-${menu.id}` : undefined;
    const FlexBox = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    };

    return (
        <>
            {menuOrientation === MenuOrientation.VERTICAL || downLG ? (
                <>
                    <ListItemButton
                        selected={isSelected}
                        {...(!drawerOpen && {
                            onMouseEnter: handleClick,
                            onMouseLeave: handleClose,
                        })}
                        onClick={handleClick}
                        sx={{
                            pl: drawerOpen
                                ? `${level === 1 ? 20 : level * 20 - 10}px`
                                : 1.5,
                            py: !drawerOpen && level === 1 ? 1.25 : 1,
                            ...(drawerOpen && {
                                mx: 1.25,
                                my: 0.5,
                                borderRadius: 1,
                                "&:hover": {
                                    bgcolor:
                                        theme.palette.mode === ThemeMode.DARK
                                            ? "divider"
                                            : "secondary.200",
                                },
                                "&.Mui-selected": {
                                    color: iconSelectedColor,
                                },
                            }),
                            ...(!drawerOpen && {
                                px: 2.75,
                                justifyContent: "center",
                                "&:hover": {
                                    bgcolor: "transparent",
                                },
                                "&.Mui-selected": {
                                    "&:hover": {
                                        bgcolor: "transparent",
                                    },
                                    bgcolor: "transparent",
                                },
                            }),
                        }}
                    >
                        {menuIcon && (
                            <ListItemIcon
                                onClick={handlerIconLink}
                                sx={{
                                    minWidth: 38,
                                    color: isSelected
                                        ? "primary.main"
                                        : textColor,
                                    ...(!drawerOpen && {
                                        borderRadius: 1,
                                        width: 46,
                                        height: 46,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        "&:hover": {
                                            bgcolor:
                                                theme.palette.mode ===
                                                ThemeMode.DARK
                                                    ? "secondary.light"
                                                    : "secondary.200",
                                        },
                                    }),
                                    ...(!drawerOpen &&
                                        isSelected && {
                                            bgcolor:
                                                theme.palette.mode ===
                                                ThemeMode.DARK
                                                    ? "secondary.light"
                                                    : "secondary.200",
                                        }),
                                }}
                            >
                                {menuIcon}
                            </ListItemIcon>
                        )}
                        {(drawerOpen || (!drawerOpen && level !== 1)) && (
                            <ListItemText
                                onClick={handlerIconLink}
                                primary={
                                    <Typography
                                        variant={
                                            isSelected && drawerOpen
                                                ? "h5"
                                                : "body1"
                                        }
                                        color="inherit"
                                    >
                                        {menu.title}
                                    </Typography>
                                }
                            />
                        )}
                        {(drawerOpen || (!drawerOpen && level !== 1)) && (
                            <Box onClick={handleClick}>{open ? <ArrowUp2 /> : <ArrowDown2 />}</Box>
                        )}
                        {!drawerOpen && level === 1 && (
                            <ClickAwayListener onClickAway={handleClose}>
                                <Transitions
                                    in={miniMenuOpened}
                                    onEnter={() => setOpen(true)}
                                    onExited={() => setOpen(false)}
                                    type="fade"
                                    position="absolute"
                                    sx={{
                                        overflowY: "visible",
                                        overflowX: "hidden",
                                        top: -8,
                                        left: 47,
                                        zIndex: 2001,
                                        width: "auto",
                                        minWidth: 180,
                                    }}
                                >
                                    <Paper
                                        sx={{
                                            overflow: "hidden",
                                            mt: 1.5,
                                            boxShadow: theme.customShadows.z1,
                                            backgroundImage: "none",
                                        }}
                                    >
                                        {miniMenuOpened && (
                                            <Box
                                                sx={{
                                                    p: 2.5,
                                                    pb: 0,
                                                }}
                                            >
                                                <Typography variant="h6">
                                                    {menu.title}
                                                </Typography>
                                            </Box>
                                        )}
                                        {miniMenuOpened && (
                                            <SimpleBar
                                                sx={{
                                                    height: "calc(100vh - 215px)",
                                                    "& .simplebar-content": {
                                                        display: "flex",
                                                        flexDirection:
                                                            "column",
                                                    },
                                                }}
                                            >
                                                <List
                                                    component="nav"
                                                    sx={{
                                                        p: 1,
                                                    }}
                                                >
                                                    {navCollapse}
                                                </List>
                                            </SimpleBar>
                                        )}
                                    </Paper>
                                </Transitions>
                            </ClickAwayListener>
                        )}
                    </ListItemButton>
                    {drawerOpen && (
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List
                                component="div"
                                sx={{
                                    position: "relative",
                                    "&:after": {
                                        content: '""',
                                        position: "absolute",
                                        left: "32px",
                                        top: 0,
                                        height: "100%",
                                        width: "1px",
                                        opacity: theme.palette.mode === ThemeMode.DARK ? 0.2 : 1,
                                        background:
                                            theme.palette.mode === ThemeMode.DARK
                                                ? theme.palette.secondary[200]
                                                : theme.palette.secondary.light,
                                    },
                                }}
                            >
                                {navCollapse}
                            </List>
                        </Collapse>
                    )}
                </>
            ) : (
                <>
                    <ListItemButton
                        selected={isSelected}
                        {...(!drawerOpen && {
                            onMouseEnter: handleHover,
                            onMouseLeave: handleClose,
                        })}
                        onClick={handleClick}
                        sx={{
                            pl: drawerOpen
                                ? `${level === 1 ? 20 : level * 20 - 10}px`
                                : 1.5,
                            py: !drawerOpen && level === 1 ? 1.25 : 1,
                            ...(drawerOpen && {
                                mx: 1.25,
                                my: 0.5,
                                borderRadius: 1,
                                "&:hover": {
                                    bgcolor:
                                        theme.palette.mode === ThemeMode.DARK
                                            ? "divider"
                                            : "secondary.200",
                                },
                                "&.Mui-selected": {
                                    color: iconSelectedColor,
                                },
                            }),
                            ...(!drawerOpen && {
                                px: 2.75,
                                justifyContent: "center",
                                "&:hover": {
                                    bgcolor: "transparent",
                                },
                                "&.Mui-selected": {
                                    "&:hover": {
                                        bgcolor: "transparent",
                                    },
                                    bgcolor: "transparent",
                                },
                            }),
                        }}
                    >
                        {menuIcon && (
                            <ListItemIcon
                                onClick={handlerIconLink}
                                sx={{
                                    minWidth: 38,
                                    color: isSelected
                                        ? "primary.main"
                                        : textColor,
                                    ...(!drawerOpen && {
                                        borderRadius: 1,
                                        width: 46,
                                        height: 46,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        "&:hover": {
                                            bgcolor:
                                                theme.palette.mode ===
                                                ThemeMode.DARK
                                                    ? "secondary.light"
                                                    : "secondary.200",
                                        },
                                    }),
                                    ...(!drawerOpen &&
                                        isSelected && {
                                            bgcolor:
                                                theme.palette.mode ===
                                                ThemeMode.DARK
                                                    ? "secondary.light"
                                                    : "secondary.200",
                                        }),
                                }}
                            >
                                {menuIcon}
                            </ListItemIcon>
                        )}
                        {(drawerOpen || (!drawerOpen && level !== 1)) && (
                            <ListItemText
                                onClick={handlerIconLink}
                                primary={
                                    <Typography
                                        variant={
                                            isSelected && drawerOpen
                                                ? "h5"
                                                : "body1"
                                        }
                                        color="inherit"
                                    >
                                        {menu.title}
                                    </Typography>
                                }
                            />
                        )}
                        {(drawerOpen || (!drawerOpen && level !== 1)) && (
                            <Box onClick={handleClick}>{open ? <ArrowUp2 /> : <ArrowDown2 />}</Box>
                        )}
                        {!drawerOpen && level === 1 && (
                            <ClickAwayListener onClickAway={handleClose}>
                                <PopperStyled
                                    popperId={popperId}
                                    open={miniMenuOpened}
                                    anchorEl={anchorEl}
                                    placement="right-start"
                                    disablePortal
                                    modifiers={[
                                        {
                                            name: "offset",
                                            options: {
                                                offset: [-12, 1],
                                            },
                                        },
                                    ]}
                                >
                                    {({ TransitionProps }) => (
                                        <Transitions
                                            in={miniMenuOpened}
                                            {...TransitionProps}
                                            onEnter={() => setOpen(true)}
                                            onExited={() => setOpen(false)}
                                            type="zoom"
                                            sx={{ transformOrigin: "left top" }}
                                        >
                                            <Paper
                                                sx={{
                                                    overflow: "hidden",
                                                    mt: 1.5,
                                                    boxShadow:
                                                        theme.customShadows.z1,
                                                    backgroundImage: "none",
                                                }}
                                            >
                                                {miniMenuOpened && (
                                                    <Box
                                                        sx={{
                                                            p: 2.5,
                                                            pb: 0,
                                                        }}
                                                    >
                                                        <Typography variant="h6">
                                                            {menu.title}
                                                        </Typography>
                                                    </Box>
                                                )}
                                                {miniMenuOpened && (
                                                    <SimpleBar
                                                        sx={{
                                                            height: "calc(100vh - 215px)",
                                                            "& .simplebar-content": {
                                                                display:
                                                                    "flex",
                                                                flexDirection:
                                                                    "column",
                                                            },
                                                        }}
                                                    >
                                                        <List
                                                            component="nav"
                                                            sx={{
                                                                p: 1,
                                                            }}
                                                        >
                                                            {navCollapse}
                                                        </List>
                                                    </SimpleBar>
                                                )}
                                            </Paper>
                                        </Transitions>
                                    )}
                                </PopperStyled>
                            </ClickAwayListener>
                        )}
                    </ListItemButton>
                    {drawerOpen && (
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List
                                component="div"
                                sx={{
                                    position: "relative",
                                    "&:after": {
                                        content: '""',
                                        position: "absolute",
                                        left: "32px",
                                        top: 0,
                                        height: "100%",
                                        width: "1px",
                                        opacity:
                                            theme.palette.mode === ThemeMode.DARK
                                                ? 0.2
                                                : 1,
                                        background:
                                            theme.palette.mode === ThemeMode.DARK
                                                ? theme.palette.secondary[200]
                                                : theme.palette.secondary.light,
                                    },
                                }}
                            >
                                {navCollapse}
                            </List>
                        </Collapse>
                    )}
                </>
            )}
        </>
    );
};

NavCollapse.propTypes = {
    menu: PropTypes.object,
    level: PropTypes.number,
    parentId: PropTypes.string,
    setSelectedItems: PropTypes.func,
    selectedItems: PropTypes.string,
    setSelectedLevel: PropTypes.func,
    selectedLevel: PropTypes.number,
};

export default NavCollapse;
