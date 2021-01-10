import React, {useState} from "react";
import styles from "./Dog_Data.module.css"
import {makeStyles} from "@material-ui/core";
import {Avatar, Divider, Checkbox} from "@material-ui/core";
import {useSelector, useDispatch} from "react-redux";
import {AppDispatch} from "../../app/store";
import {selectProfiles} from "../auth/authSlice";
import {fetchDataStart, fetchDataEnd} from "./dog_dataSlice";
import {PROPS_DATA} from "../types";

// 各保護犬データの詳細表示
const Dog_Data: React.FC<PROPS_DATA> = ({
                                            dataId,
                                            loginId,
                                            dogName,
                                            gender,
                                            age,
                                            height,
                                            observations,
                                            peopleFriendly,
                                            dogFriendly,
                                            color,
                                            hair,
                                            reason_for_arrival,
                                            photo,
                                            companyPost,
                                        }) => {

    const dispatch: AppDispatch = useDispatch();
    const profiles = useSelector(selectProfiles);
    const prof = profiles.filter((prof) => {
        return prof.accountProfile === companyPost;
    });

    if (dogName) {
        return (
            <div className={styles.dog_data}>
                <div className={styles.dog_data_header}>
                    <Avatar className={styles.data_avatar} src={prof[0]?.avatar}/>
                    <h3>{prof[0]?.accountName}</h3>
                </div>
                <img className={styles.dog_data_image} src={photo} alt=""/>
            </div>
        );
    }
    return null;
};

export default Dog_Data;