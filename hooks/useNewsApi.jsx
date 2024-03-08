import { useState, useEffect } from "react";
import { NEWS_API_KEY } from "@env";

// funktion för att hämta data från NewsApi.

const useNewsApi = () => {
  console.log("NEWS_API_KEY", NEWS_API_KEY);
  // states för data och isLoading
  const [newsData, setNewsData] = useState([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);

  // Kod för att skapa dynamiska datum
  const today = new Date();
  const currentDate = today.toISOString().slice(0, 10);
  console.log("DAGENS DATUM: ", currentDate);

  const tenDaysAgo = new Date(today);
  tenDaysAgo.setDate(today.getDate() - 10);
  const tenDaysAgoFormatted = tenDaysAgo.toISOString().slice(0, 10);

  console.log("10 DAGAR SEDAN: ", tenDaysAgoFormatted);

  // 2 props till funktionen för fromDate och toDate
  async function fetchNews({ fromDate, toDate }) {
    try {
      const response = await fetch(
        `http://newsapi.org/v2/everything?q=shoe&from=${fromDate}&to=${toDate}&pageSize=15&apiKey=${NEWS_API_KEY}`
      );
      const data = await response.json();
      setNewsData(data);
      setIsLoadingNews(false);
    } catch (error) {
      console.error("FEL I HÄMTNINGEN", error);
      setIsLoadingNews(false);
    }
  }
  useEffect(() => {
    // useEffect - kör funktion med currentDate och tenDaysAgoFormatted variablerna
    fetchNews({ currentDate, tenDaysAgoFormatted });

    return () => {};
    // Tar in dessa variabler i dependency array - Om ändringar så körs fetchNews
  }, [currentDate, tenDaysAgoFormatted]);

  // Returnerar diverse - "döper" om fetchNews till refetchNews
  return { newsData, isLoadingNews, refetchNews: fetchNews };
};

export default useNewsApi;
