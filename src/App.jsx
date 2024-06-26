import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getApiConfiguration, getGenres } from "./store/homeSlice";

import Home from "./pages/home/Home";
import Explore from "./pages/explore/Explore";
import Details from "./pages/details/Details";
import PageNotFound from "./pages/404/PageNotFound";
import SearchResults from "./pages/searchResults/SearchResults";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    const fetchApiConfig = () => {
      fetchDataFromApi("/configuration").then((res) => {
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        };
        dispatch(getApiConfiguration(url));
      });
    };
    fetchApiConfig();
    genresCall();
  }, []);

  const genresCall = async () => {
    let promises = [];
    let endpoints = ["tv", "movie"];
    let allGenres = {};
    endpoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
