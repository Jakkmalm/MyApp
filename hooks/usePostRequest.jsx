import { useState } from "react";
import { RENDER_URL } from "@env";

const usePostRequest = () => {
  console.log(RENDER_URL, "URL FRÅN ENV FILEN");
  const [isPosting, setIsPosting] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  console.log(snackbarMessage, "I MIN POST-HHOOK");

  const submitPost = async (price, color, brand, type) => {
    console.log(snackbarMessage, "INNAN IF_SATS");

    /*
    // Validera att alla fält är ifyllda
    if (!price || !color || !brand || !type) {
      setSnackbarMessage("Fyll i samtliga fält");
      setSnackbarVisible(true);

      return;
    }
    */
    setIsPosting(true);

    try {
      console.log("Submitting post...");
      console.log("Price:", price);
      console.log("Color:", color);
      console.log("Brand:", brand);
      console.log("Type:", type);

      const response = await fetch(RENDER_URL, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: price,
          color: color,
          brand: brand,
          type: type,
        }),
      });

      console.log("Response status:", response.status);
      if (!response.ok) {
        throw Error("Failed to submit");
      }
      setSnackbarMessage("Sko tillagd");

      setIsPosting(false);
      handleSnackbar();
    } catch (error) {
      console.error("ERROR Submit Post:", error);
      setSnackbarMessage("Failed to submit");
      setSnackbarVisible(true);
    }
  };

  const handleSnackbar = () => {
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
      setSnackbarMessage("");
    }, 2000);
  };

  return {
    isPosting,
    submitPost,
    snackbarVisible,
    snackbarMessage,
    setSnackbarVisible,
    setSnackbarMessage,
  };
};

export default usePostRequest;
