import React, {useState} from "react";
import Modal from "react-modal";
import {useSelector, useDispatch, createDispatchHook} from "react-redux";
import {AppDispatch} from "../../app/store";
import styles from "./Core.module.css";
import {File} from "../types";
import {
    fetchDataStart,
    fetchDataEnd,
    fetchAsyncNewData,
    resetOpenNewData,
    selectOpenNewData
} from "../dog_data/dog_dataSlice";

import {Button, TextField, IconButton} from "@material-ui/core";
import {MdAddAPhoto} from "react-icons/md";

const customStyles = {
    content: {
        top: "55%",
        left: "50%",
        width: 280,
        height: 220,
        padding: "50px",
        transform: "translate(-50%, -50%)",
    },
};

const NewData: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const openNewData = useSelector(selectOpenNewData);
    const [image, setImage] = useState<File | null>(null);
    const [name, setName] = useState("");
    const handlerEditPicture = () => {
        const fileInput = document.getElementById("ImageInput")
        fileInput?.click();
    };
    const newData = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const packet = {dogName: name, photo: image};
        await dispatch(fetchDataStart());
        await dispatch(fetchAsyncNewData(packet));
        await dispatch(fetchDataEnd());
        setName("");
        setImage(null);
        dispatch(resetOpenNewData());
    };


    return (
        <>
            <Modal isOpen={openNewData}
                   onRequestClose={async () => {
                       await dispatch(resetOpenNewData());
                   }}
                   style={customStyles}>
                <form className={styles.core_signUp}>
                    <h1 className={styles.core_title}>Dog Adoption</h1>
                    <br/>
                    <TextField
                        placeholder="Please enter the dog"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="file"
                        id="imageInput"
                        hidden={true}
                        onChange={(e) => setImage(e.target.files![0])}
                    />
                    <br/>
                    <IconButton onClick={handlerEditPicture}>
                        <MdAddAPhoto/>
                    </IconButton>
                    <br/>
                    <Button
                        disabled={!name || !image}
                        variant="contained"
                        color="primary"
                        onClick={newData}
                    >
                        New Dog Data
                    </Button>
                </form>
            </Modal>
        </>
    );
};

export default NewData;