import Fetching from "../utils/fetchDataFromServer.js";
import GettingToAddButtons from "../basket/addToBasket.js";

const parent = document.querySelector(".cards-wrapper");

Fetching("http://localhost:2005/catalog", parent, GettingToAddButtons);
