import React, {useState} from "react";
import styles from "./Dog_Data.module.css"
import {makeStyles} from "@material-ui/core";
import {Divider, Checkbox} from "@material-ui/core";
import {useSelector, useDispatch} from "react-redux";
import {AppDispatch} from "../../app/store";
import {selectProfiles} from "../auth/authSlice";
import {fetchDataStart, fetchDataEnd} from "./dog_dataSlice";
import {PROPS_DATA} from "../types";


const Dog_Data: React.FC<PROPS_DATA> = ({
                                            dataId,
                                            loginId,
                                            companyPost,
                                            name,
                                            imageUrl,
                                        }) => {
    const dispatch: AppDispatch = useDispatch();

    if (name) {
        return <div className={styles.dog_data}>
            <div className={styles.dog_data_header}>

            </div>
            <img className={styles.dog_data_image} src={imageUrl} alt=""/>

        </div>;
    }
    return null;
};

export default Dog_Data;