import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

const CloudStorage = createSlice({
    name: 'cloudStorage',
    initialState: {
        hasCloudStorage: false,
        cloudStorage: [],
    },
    reducers: {
        startUsingCloudStorage: (state) => {
            state.hasCloudStorage = true;
        },
        stopUsingCloudStorage: (state) => {
            state.hasCloudStorage = false;
        },
        getCloudStorage: (state, action) => {
            state.cloudStorage = action.payload;
        },
        updateCloudStorage: (state, action) => {
            state.cloudStorage = action.payload;
        }
    }
});

export const { startUsingCloudStorage, stopUsingCloudStorage, getCloudStorage, updateCloudStorage } = CloudStorage.actions;
export default CloudStorage.reducer;



// const GCL = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/cloudStorage");
  
//       // Перевіряємо, чи статус відповіді є успішним (код 200)
//       if (response.status === 200) {
//         return response.data;
//       } else {
//         return false;
//       }
//     } catch (error) {
//       console.error("Error fetching cloud storage:", error);
//       return false;
//     }
//   };
  