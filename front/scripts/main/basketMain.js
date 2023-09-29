import Fetching from "../utils/fetchDataFromServer.js";
import GettingToRemoveButtons from "../basket/basketScript.js";

const parent = document.querySelector(".basket-main-wrapper");

Fetching("http://localhost:2005/basket_data", parent, GettingToRemoveButtons);
