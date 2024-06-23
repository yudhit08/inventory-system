import PropTypes from "prop-types";
import { createContext, useEffect, useReducer } from "react";

// third-party
import { Chance } from "chance";
import { jwtDecode } from "jwt-decode";

// reducer - state management
import { LOGIN, LOGOUT } from "../store/reducers/actions";
import authReducer from "../store/reducers/auth";

// project-imports
import Loader from "../Components/Loader";
import axios from "../utils/axios";
import { router } from "@inertiajs/react";
import Cookies from "js-cookie";

const chance = new Chance();

// constant
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null,
};

const verifyToken = (serviceToken) => {
    if (!serviceToken) {
        return false;
    }
    const decoded = jwtDecode(serviceToken);

    /**
     * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
     */
    return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken) => {
    if (serviceToken) {
        localStorage.setItem("serviceToken", serviceToken);
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        localStorage.removeItem("serviceToken");
        delete axios.defaults.headers.common.Authorization;
    }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const init = async () => {
            try {
                const serviceToken = localStorage.getItem("sitery_session");
                if (serviceToken && verifyToken(serviceToken)) {
                    setSession(serviceToken);
                    const response = await axios.get("/api/account/me");
                    const { user } = response.data;

                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: true,
                            user,
                        },
                    });
                } else {
                    dispatch({
                        type: LOGOUT,
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: LOGOUT,
                });
            }
        };

        init();
    }, []);

    const isAuth = async (user) => {
        dispatch({
            type: LOGIN,
            payload: {
                isLoggedIn: true,
                user,
            },
        });
    };

    const login = async (user) => {
        dispatch({
            type: LOGIN,
            payload: {
                isLoggedIn: true,
                user,
            },
        });
        router.get("/dashboard")
    };

    const register = async (email, password, firstName, lastName, nip) => {
        // todo: this flow need to be recode as it not verified
        const id = chance.bb_pin();
        const response = await axios.post("/api/account/register", {
            id,
            email,
            password,
            firstName,
            lastName,
            nip
        });
        let users = response.data;

        if (
            window.localStorage.getItem("users") !== undefined &&
            window.localStorage.getItem("users") !== null
        ) {
            const localUsers = window.localStorage.getItem("users");
            users = [
                ...JSON.parse(localUsers),
                {
                    id,
                    email,
                    password,
                    name: `${firstName} ${lastName}`,
                    nip: nip
                },
            ];
        }

        window.localStorage.setItem("users", JSON.stringify(users));
    };

    const logout = () => {
        setSession(null);
        dispatch({ type: LOGOUT });
    };

    const resetPassword = async () => {};

    const updateProfile = () => {};

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <JWTContext.Provider
            value={{
                ...state,
                isAuth,
                login,
                logout,
                register,
                resetPassword,
                updateProfile,
            }}
        >
            {children}
        </JWTContext.Provider>
    );
};

JWTProvider.propTypes = {
    children: PropTypes.node,
};

export default JWTContext;
