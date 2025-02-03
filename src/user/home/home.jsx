import React from "react";
import Notice from "../notice/notice";
import Services from "../services";
import Slider from "../slider/slider";
import ShowBalance from "../balance/showBalance";

const Home = () => {
  return (
    <><Notice /><ShowBalance /><Services /><Slider /></>
  );
};

export default Home;
