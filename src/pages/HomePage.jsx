import HomePageComponent from "./components/HomePageComponent";
import axios from "axios";

const getBestsellers = async () => {
  const { data } = await axios.get("/api/products/bestsellers");
  return data;
}

const getProducts = async () => {
 const {data} = await axios.get('/api/products/selected')
 return data
 
}

const HomePage = () => {
  return (
    <HomePageComponent
      getProducts={getProducts}
      getBestsellers={getBestsellers}
    />
  );
};

export default HomePage;
