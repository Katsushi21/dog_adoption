import React, {useEffect} from "react";
import Auth from "../auth/Auth";
import styles from "./Core.module.css";
import {useSelector, useDispatch} from "react-redux";
import {AppDispatch} from "../../app/store";
import {withStyles} from "@material-ui/core";
import {Button, Grid, Avatar, Badge, CircularProgress} from "@material-ui/core";
import {MdAddAPhoto} from "react-icons/all";
import {
    fetchCredStart, fetchCredEnd,
    fetchAsyncLogin, fetchAsyncCreateProfile, fetchAsyncGetMyProfile, fetchAsyncGetProfiles, fetchAsyncUpdateProfile,
    setOpenSignIn, resetOpenSignIn, setOpenSignUp, resetOpenSignUp, selectIsLoadingAuth, selectOpenSignIn,
    selectOpenSignUp, fetchAsyncRegister, selectProfile, resetOpenProfile, editCompany_name
} from "../auth/authSlice";
import {
    setOpenNewData, resetOpenNewData, fetchAsyncGetData, selectData, selectIsLoadingData
} from "../dog_data/dog_dataSlice";
import Data from "../dog_data/Dog_Data"


const Core: React.FC = () => {
        const dispatch: AppDispatch = useDispatch();
        const profile = useSelector(selectProfile);
        const data = useSelector(selectData);
        const isLoadingData = useSelector(selectIsLoadingData);
        const isLoadingAuth = useSelector(selectIsLoadingAuth);

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
                <div className={styles.core_header}>
                    <h1 className={styles.core_title}>Dog Adoption</h1>
                    {profile?.company_name ? (
                        <>
                            <button className={styles.core_btnModal}
                                    onClick={() => {
                                        dispatch(setOpenNewData());
                                        dispatch(resetOpenProfile());
                                    }}>
                                <MdAddAPhoto/>
                            </button>
                            <div className={styles.core_logout}>
                                {(isLoadingData || isLoadingAuth) && <CircularProgress/>}
                                <Button onClick={() => {
                                    localStorage.removeItem("localJWT");
                                    dispatch(editCompany_name(""));
                                    dispatch((resetOpenProfile()));
                                    dispatch(resetOpenNewData());
                                    dispatch(setOpenSignIn());
                                }}>
                                    Log Out
                                </Button>

                            </div>
                        </>
                    ) : (
                        <div>
                            <Button onClick={() => {
                                dispatch(setOpenSignIn());
                                dispatch(resetOpenSignUp());
                            }}>Log In</Button>
                            <Button onClick={() => {
                                dispatch(setOpenSignUp());
                                dispatch(resetOpenSignIn());
                            }}>Sign Up</Button>
                        </div>
                    )}
                </div>
                {profile?.company_name && <>
                    <div className={styles.core_data}>
                        <Grid container spacing={4}>
                            {data
                                .slice(0)
                                .reverse()
                                .map((data) => (
                                    <Grid key={data.id} item xs={12} md={4}>
                                        <Data
                                            dataId={data.id}
                                            name={data.name}
                                            loginId={profile.company_profile}
                                            companyPost={data.company_Post}
                                            imageUrl={data.img}
                                        />
                                    </Grid>
                                ))}
                        </Grid>
                    </div>
                </>}
            </div>
        );
    }
;
export default Core;