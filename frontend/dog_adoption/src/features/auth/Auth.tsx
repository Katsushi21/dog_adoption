import React from "react";
import {AppDispatch} from "../../app/store";
import {useSelector, useDispatch} from "react-redux";
import styles from "./Auth.module.css";
import Modal from "react-modal";
import {Formik} from "formik";
import * as Yup from "yup";
import {TextField, Button, CircularProgress} from "@material-ui/core";
import {
    fetchCredStart, fetchCredEnd,
    fetchAsyncLogin, fetchAsyncCreateProfile, fetchAsyncGetMyProfile, fetchAsyncGetProfiles,
    setOpenSignIn, resetOpenSignIn, setOpenSignUp, resetOpenSignUp, selectIsLoadingAuth, selectOpenSignIn,
    selectOpenSignUp, fetchAsyncRegister
} from "./authSlice";
import {fetchAsyncGetData} from "../dog_data/dog_dataSlice"

// モーダルのスタイルを定義
const customStyles = {
    overlay: {
        backgroundColor: "#777777",
    },
    content: {
        top: "55%",
        left: "50%",

        width: 280,
        height: 350,
        padding: "50px",

        transform: "translate(-50%, -50%)",
    },
};


const Auth: React.FC = () => {
        Modal.setAppElement("#root");
        const openSignIn = useSelector(selectOpenSignIn);
        const openSignUp = useSelector(selectOpenSignUp);
        const isLoadingAuth = useSelector(selectIsLoadingAuth);
        const dispatch: AppDispatch = useDispatch();

        return (
            <>
                <Modal
                    isOpen={openSignUp}
                    onRequestClose={async () => {
                        await dispatch(resetOpenSignUp());
                    }}
                    style={customStyles}>
                    <Formik initialErrors={{email: "required"}}
                            initialValues={{email: "", password: ""}}
                            onSubmit={async (values) => {
                                await dispatch(fetchCredStart());
                                const resultReg = await dispatch(fetchAsyncRegister(values));

                                if (fetchAsyncRegister.fulfilled.match(resultReg)) {
                                    await dispatch(fetchAsyncLogin(values));
                                    await dispatch(fetchAsyncCreateProfile({accountName: "anonymous"}));
                                    await dispatch(fetchAsyncGetProfiles());
                                    await dispatch(fetchAsyncGetData());
                                    await dispatch(fetchAsyncGetMyProfile());
                                }
                                await dispatch(fetchCredEnd());
                                await dispatch(resetOpenSignUp());
                            }}
                            validationSchema={Yup.object().shape({
                                email: Yup.string()
                                    .email("email format is wrong")
                                    .required("email is required"),
                                password: Yup.string().required("password is required").min(3),
                            })}>
                        {({
                              handleSubmit, handleChange, handleBlur,
                              values, errors, touched, isValid,
                          }) => (
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <div className={styles.auth_signUp}>
                                        <h1 className={styles.auth_title}>Dog Adoption</h1>
                                        <br/>
                                        <div className={styles.auth_progress}>
                                            {isLoadingAuth && <CircularProgress/>}
                                        </div>
                                        <br/>
                                        <TextField placeholder="email" type="input" name="email"
                                                   onChange={handleChange} onBlur={handleBlur} value={values.email}/>
                                        <br/>
                                        {touched.email && errors.email ? (
                                            <div className={styles.auth_error}>{errors.email}</div>
                                        ) : null}

                                        <TextField placeholder="password" type="password" name="password"
                                                   onChange={handleChange} onBlur={handleBlur} value={values.password}/>
                                        {touched.password && errors.password ? (
                                            <div className={styles.auth_error}>{errors.password}</div>
                                        ) : null}
                                        <br/>
                                        <br/>
                                        <Button variant="contained" color="primary" disabled={!isValid} type="submit">
                                            Register
                                        </Button>
                                        <br/>
                                        <br/>
                                        <span className={styles.auth_text} onClick={async () => {
                                            await dispatch(setOpenSignIn());
                                            await dispatch(resetOpenSignUp());
                                        }}>You already have an account ?</span>
                                    </div>
                                </form>
                            </div>
                        )}
                    </Formik>
                </Modal>
                <Modal isOpen={openSignIn}
                       onRequestClose={async () => {
                           await dispatch(resetOpenSignIn());
                       }}
                       style={customStyles}>
                    <Formik initialErrors={{email: "required"}}
                            initialValues={{email: "", password: ""}}
                            onSubmit={async (values) => {
                                await dispatch(fetchCredStart());
                                const result = await dispatch(fetchAsyncLogin(values));

                                if (fetchAsyncLogin.fulfilled.match(result)) {
                                    await dispatch(fetchAsyncGetProfiles());
                                    await dispatch(fetchAsyncGetData());
                                    await dispatch(fetchAsyncGetMyProfile());
                                }
                                await dispatch(fetchCredEnd());
                                await dispatch(resetOpenSignIn());
                            }}
                            validationSchema={Yup.object().shape({
                                email: Yup.string()
                                    .email("email format is wrong")
                                    .required("email is required"),
                                password: Yup.string().required("password is required").min(3),
                            })}>
                        {({
                              handleSubmit, handleChange, handleBlur,
                              values, errors, touched, isValid,
                          }) => (
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <div className={styles.auth_signUp}>
                                        <h1 className={styles.auth_title}>Dog Adoption</h1>
                                        <br/>
                                        <div className={styles.auth_progress}>
                                            {isLoadingAuth && <CircularProgress/>}
                                        </div>
                                        <br/>
                                        <TextField placeholder="email" type="input" name="email"
                                                   onChange={handleChange} onBlur={handleBlur} value={values.email}/>
                                        <br/>
                                        {touched.email && errors.email ? (
                                            <div className={styles.auth_error}>{errors.email}</div>
                                        ) : null}

                                        <TextField placeholder="password" type="password" name="password"
                                                   onChange={handleChange} onBlur={handleBlur} value={values.password}/>
                                        {touched.password && errors.password ? (
                                            <div className={styles.auth_error}>{errors.password}</div>
                                        ) : null}
                                        <br/>
                                        <br/>
                                        <Button variant="contained" color="primary" disabled={!isValid} type="submit">
                                            Log In
                                        </Button>
                                        <br/>
                                        <br/>
                                        <span className={styles.auth_text} onClick={async () => {
                                            await dispatch(setOpenSignUp());
                                            await dispatch(resetOpenSignIn());
                                        }}>Don't you have an account ?</span>
                                    </div>
                                </form>
                            </div>
                        )}
                    </Formik>
                </Modal>
            </>
        );
    }
;

export default Auth;