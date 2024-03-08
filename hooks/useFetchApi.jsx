import { useState, useEffect } from "react";
import { CYCLIC_URL } from "@env";

// CUSTOM HOOK för att hämta data från api.

const useFetchApi = () => {
  console.log(CYCLIC_URL, "CYCLIC_URL");
  // states för data och laddar
  const [shoesData, setShoesData] = useState([]);
  const [isLoadingShoes, setIsLoadingShoes] = useState(true);

  async function fetchShoes() {
    try {
      // await fetch till api
      const response = await fetch(CYCLIC_URL);
      // lagra response i data
      const data = await response.json();
      // set state till data
      setShoesData(data.reverse());
      // återställa
      setIsLoadingShoes(false);
    } catch (error) {
      console.error("FEL I HÄMTNINGEN", error);
      // återställa
      setIsLoadingShoes(false);
    }
  }
  useEffect(() => {
    fetchShoes();
    return () => {};
  }, []);

  // returnerar shoesData, isLoadingShoes och fetchShoes (som refetchShoes, tydligare när den ska användas i andra komponenter)
  return {
    shoesData,
    isLoadingShoes,
    setIsLoadingShoes,
    refetchShoes: fetchShoes,
  };
};

export default useFetchApi;
