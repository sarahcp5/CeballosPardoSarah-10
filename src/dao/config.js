const persistence = "MONGO";
let productsService, cartsService;

switch(persistence) {
    case "MEMORY":
        const {default:MemoryProducts} = await import('./MemoryDAO/Products.js');
        const {default:MemoryCars} = await import('./MemoryDAO/Carts.js');
        productsService = new MemoryProducts();
        cartsService = new MemoryCars();
        break;
    case "MONGO":
        const {default:MongoProducts} = await import('./MongoDAO/Products.js');
        const {default:MongoCarts} = await import('./MongoDAO/Carts.js');
        productsService = new MongoProducts();
        cartsService = new MongoCarts();
        break;
    case "FILES":
        const {default:FileProducts} = await import('./FilesDAO/Products.js');
        const {default:FileCarts} = await import('./FilesDAO/Carts.js');
        productsService = new FileProducts();
        cartsService = new FileCarts();
        break;
};

const services = {
    productsService,
    cartsService
};

export default services;