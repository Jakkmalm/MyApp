import { useState, useEffect } from "react";
import { API_URL, LOKAL_API_URL } from '@env';

const useShoes = () => {
  const [shoesData, setShoesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchShoes = async () => {
    try {
      const response = await fetch(LOKAL_API_URL);
      const data = await response.json();
      setShoesData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("FEL I HÄMTNINGEN", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchShoes();

    return () => {};
  }, []);

  return { shoesData, isLoading, refetchShoes: fetchShoes };
};

export default useShoes;
