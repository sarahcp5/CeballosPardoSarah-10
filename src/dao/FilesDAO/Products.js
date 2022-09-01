import FilesConteiner from "./FilesConteiner.js";
import __dirname from "../../utils.js";

const fileProducts = __dirname + "/files/products.txt";

export default class Products extends FilesConteiner {
    constructor() {
        super(fileProducts);
    }
}