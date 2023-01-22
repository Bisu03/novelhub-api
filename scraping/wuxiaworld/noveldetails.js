import * as cheerio from "cheerio";
import axios from "axios";


const URL = "https://www.royalroad.com/fiction/49030/the-power-of-ten-book-four-dynamol";

const fetchData = async () => {
  let response = await axios.get(URL);
  // console.log(response.data);
  let $ = cheerio.load(response.data);
  let output = $("body > div.page-container > div > div > div > div.page-content-inner > div > div.row.fic-header > div.col-md-5.col-lg-6.text-center.md-text-left.fic-title > div > h1").text();
  console.log(output);
};

fetchData();
