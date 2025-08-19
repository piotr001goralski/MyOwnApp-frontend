import React, {useCallback, useState} from 'react';
import EyeVisible from "../assets/eye-visible.svg";
import EyeHidden from "../assets/eye-hidden.svg";
import TrashCan from "../assets/trash-can.svg";
import {useProductsService} from "../services/ProductService.js";

export default function UserProductCard(props) {

    const { product, removeFromProductList } = props;

    const [productForSale, setProductForSale] = useState(product.forSale);

    const { updateProduct, deleteProduct} = useProductsService();

    const handleForSaleChange = useCallback((forSale) => {
        updateProduct(product.id, { forSale: forSale })
            .then(() => {
                setProductForSale((prevState) => !prevState)
            });
    }, [updateProduct, product]);

    const handleDeleteProduct = useCallback(() => {
        deleteProduct(product.id)
            .then(() => {
                removeFromProductList(product.id);
            })
    }, [product, deleteProduct, removeFromProductList]);

    return (
        <section className="productCard light">
            <h3>{product.name}</h3>
            <h4 className='autoOverflow'>{product.description}</h4>
            <div>
                <h4>{product.price} zł</h4>
                <div className='productCardActions'>
                    {productForSale ? (
                        <img src={EyeVisible} className="smallIcon" onClick={() => handleForSaleChange(false)} alt='product visible in the shop'/>
                    ) : (
                        <img src={EyeHidden} className="smallIcon" onClick={() => handleForSaleChange(true)} alt='product invisible in the shop'/>
                    )}
                    <img src={TrashCan} className="smallIcon" onClick={handleDeleteProduct} alt='delete product'/>
                </div>
            </div>
        </section>
    );
}
