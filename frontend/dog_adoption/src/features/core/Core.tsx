import React, {useEffect} from "react";
import Auth from "../auth/Auth";
import styles from "./Core.module.css";
import {useSelector, useDispatch} from "react-redux";
import {AppDispatch} from "../../app/store";
import {withStyles} from "@material-ui/core/styles";
import {Button, Grid, Avatar, Badge, CircularProgress} from "@material-ui/core";
import {MdAddAPhoto} from "react-icons/md"

import {
    fetchAsyncGetMyProfile,
    fetchAsyncGetProfiles,
    setOpenSignIn,
    resetOpenSignIn,
    setOpenSignUp,
    resetOpenSignUp,
    selectIsLoadingAuth,
    selectProfile,
    setOpenProfile,
    resetOpenProfile,
    editAccountName
} from "../auth/authSlice";

import {
    setOpenNewData, resetOpenNewData, fetchAsyncGetData, selectData, selectIsLoadingData
} from "../dog_data/dog_dataSlice";

import Dog_Data from "../dog_data/Dog_Data"
import EditProfile from "./EditProfile";
import NewData from "./NewData";

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

const Core: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const profile = useSelector(selectProfile);
    const data = useSelector(selectData);
    const isLoadingData = useSelector(selectIsLoadingData);
    const isLoadingAuth = useSelector(selectIsLoadingAuth);

    // ブラウザが起動した際に実行される処理
    useEffect(() => {
        const fetchBootLoader = async () => {
            if (localStorage.localJWT) {
                dispatch(resetOpenSignIn());
                const result = await dispatch(fetchAsyncGetMyProfile());
                if (fetchAsyncGetMyProfile.rejected.match(result)) {
                    dispatch(setOpenSignIn());
                    return null;
                }
                await dispatch(fetchAsyncGetData());
                await dispatch(fetchAsyncGetProfiles());
            }
        };
        fetchBootLoader();
    }, [dispatch]);

    return (
        <div>
            <Auth/>
            <EditProfile/>
            <NewData/>
            <div className={styles.core_header}>
                <h1 className={styles.core_title}>Dog Adoption</h1>
                {profile?.accountName ? (
                    <>
                        <button className={styles.core_btnModal}
                                onClick={() => {
                                    dispatch(setOpenNewData());
                                    dispatch(resetOpenProfile());
                                }}
                        >
                            <MdAddAPhoto/>
                        </button>
                        <div className={styles.core_logout}>
                            {(isLoadingData || isLoadingAuth) && <CircularProgress/>}
                            <Button onClick={() => {
                                localStorage.removeItem("localJWT");
                                dispatch(editAccountName(""));
                                dispatch((resetOpenProfile()));
                                dispatch(resetOpenNewData());
                                dispatch(setOpenSignIn());
                            }}
                            >
                                Log Out
                            </Button>
                            <button className={styles.core_btnModal}
                                    onClick={() => {
                                        dispatch(setOpenProfile());
                                        dispatch(resetOpenNewData());
                                    }}
                            >
                                <StyledBadge
                                    overlap="circle"
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    variant="dot"
                                >
                                    <Avatar alt="Who?" src={profile.avatar}/>{" "}
                                </StyledBadge>
                            </button>
                        </div>
                    </>
                ) : (
                    <div>
                        <Button onClick={() => {
                            dispatch(setOpenSignIn());
                            dispatch(resetOpenSignUp());
                        }}
                        >
                            Log In
                        </Button>
                        <Button onClick={() => {
                            dispatch(setOpenSignUp());
                            dispatch(resetOpenSignIn());
                        }}
                        >
                            Sign Up
                        </Button>
                    </div>
                )}
            </div>

            {profile?.accountName && (
                <>
                    <div className={styles.core_data}>
                        <Grid container spacing={4}>
                            {data
                                .slice(0)
                                .reverse()
                                .map((data) => (
                                    <Grid key={data.id} item xs={12} md={4}>
                                        <Dog_Data
                                            dataId={data.id}
                                            loginId={profile.accountProfile}
                                            dogName={data.dogName}
                                            gender={data.gender}
                                            age={data.age}
                                            height={data.height}
                                            observations={data.observations}
                                            peopleFriendly={data.peopleFriendly}
                                            dogFriendly={data.dogFriendly}
                                            color={data.color}
                                            hair={data.hair}
                                            reason_for_arrival={data.reason_for_arrival}
                                            photo={data.photo}
                                            companyPost={data.companyPost}
                                        />
                                    </Grid>
                                ))}
                        </Grid>
                    </div>
                </>
            )}
        </div>
    );
};
export default Core;