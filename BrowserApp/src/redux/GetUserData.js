import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import mylocalip from "../../../mylocalip";




const GetUserData = createAsyncThunk("userData/GetUserDATA", async () => {
    try {
        console.log("async thunk");
        let token = localStorage.getItem("token")
        const response = await axios.get(
            "http://" + mylocalip + ":3000/get-uploaded-file",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        for (let i = 0; i < response.data.userFiles.length; i++) {
            sessionStorage.setItem(
                response.data.userFiles[i].name,
                response.data.userFiles[i].value
            );
        }
    } catch (er) {
        console.error(er)
    }


})
export default GetUserData();