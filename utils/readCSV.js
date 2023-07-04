import fs from "fs";
import { parse } from "csv-parse/sync";

const readSeatData = async (fileName) => {
  try {
    const data = [];
    const file = fs.readFileSync(`uploads/${fileName}`);
    const fileData = await parse(file);
    for (let i = 1; i < fileData.length; i++) {
      let obj = {
        id: fileData[i][0],
        seat_identifier: fileData[i][1],
        seat_class: fileData[i][2],
      };
      data.push(obj);
    }
    return data;
  } catch (err) {
    console.error(err);
  }
};
const readSeatPriceData = async (fileName) => {
  try {
    const data = [];
    const file = fs.readFileSync(`uploads/${fileName}`);
    const fileData = await parse(file);
    for (let i = 1; i < fileData.length; i++) {
      let obj = {
        id: fileData[i][0],
        seat_class: fileData[i][1],
        min_price: fileData[i][2].slice(1),
        normal_price: fileData[i][3].slice(1),
        max_price: fileData[i][4].slice(1),
      };
      data.push(obj);
    }
    return data;
  } catch (err) {
    console.error(err);
  }
};

export { readSeatData, readSeatPriceData };
