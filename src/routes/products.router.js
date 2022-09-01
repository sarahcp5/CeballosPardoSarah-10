import Router from 'express';
import __dirname from "../utils.js";
import services from "../dao/config.js";

const router = Router();

const mensajeErrorAdmin = { error: -1, descripcion: '' };
const message = { error : -3, descripcion: 'Producto no encontrado.' };
const messageRepeated = { error : -4, descripcion: 'Producto repetido.' };

const middlewareAdmin = (req, res, next) => {
    if(!req.admin) {
        mensajeErrorAdmin.descripcion = `ruta ${req.url} método ${req.method} no autorizada`;
        return res.json(mensajeErrorAdmin);
    }
    next();
}

router.get('/', async(req, res) => {
    let listProducts = await services.productsService.getAll();
    return res.json(listProducts);
});

router.get('/:pid', async(req, res) => {
    let product = await services.productsService.getById(req.params.pid);
    if(product != null) {
        return res.json(product);
    }
    return res.json(message);
});

router.post('/', middlewareAdmin, async(req, res) => {
    let isExist = await services.productsService.isExist(req.body.code);
    if(!isExist) {
        // let idProducto = await products.save(req.body);
        // let producto = await products.getById(idProducto)
        // return res.json(producto);
        const { name, price, thumbnail, code, stock, description } = req.body;
        if(!name || !price || !thumbnail || !code || !stock || !description) return res.status(400).send({error:"Valores incompletos."});
        let newProduct = {
            name, 
            price, 
            thumbnail, 
            code, 
            stock, 
            description 
        }
        try {
            let result = await services.productsService.save(newProduct);
            return res.json(result)//res.send({status:"succes",payload:result});
        } catch(error){
            res.status(500).send({status:"error",error});
        }
    }
    return res.json(messageRepeated);
});

router.put('/:pid', middlewareAdmin, async(req, res) => {
    let product = await services.productsService.getById(req.params.pid);
    if(product != null) {
        let productUpdate = await services.productsService.updateById(req.params.pid, req.body);
        return res.json({ mensaje: `Se actualizo el producto con el Id ${req.params.pid}` });
    }
    return res.json(message);
});

router.delete('/:pid', middlewareAdmin, async(req, res) => {
    let product = await services.productsService.getById(req.params.pid)
    if(product != null) {
        await services.productsService.deleteById(req.params.pid);
        return res.json({ mensaje: `Se elimino el producto con el Id ${req.params.pid}` });
    }
    return res.json(message);
});

export default router;