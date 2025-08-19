import React, {useCallback, useState} from 'react';
import {useProductsService} from "../services/ProductService.js";
import EyeHidden from '../assets/eye-hidden.svg';
import EyeVisible from '../assets/eye-visible.svg';

export default function CreateProductForm(props) {

    const { addNewProduct, closeModal } = props;

    const [productCreationError, setProductCreationError] = useState(null);
    const [incorrectName, setIncorrectName] = useState(false);
    const [incorrectDescription, setIncorrectDescription] = useState(false);
    const [incorrectPrice, setIncorrectPrice] = useState(false);
    const [productForSale, setProductForSale] = useState(true);

    const { addProduct } = useProductsService();

    const handleInputChange = useCallback(() => {
        setIncorrectName(false);
        setIncorrectDescription(false);
        setIncorrectPrice(false);
    }, [])

    const saveProduct = useCallback(() => {
        const productName = document.getElementById("nameInput").value;
        const productDescription = document.getElementById("descriptionInput").value;
        const productPrice = document.getElementById("priceInput").value;

        let validationError = false;
        if (productName === '') {
            setIncorrectName(true);
            validationError = true;
        }
        if (productDescription === '') {
            setIncorrectDescription(true);
            validationError = true;
        }
        if (!productPrice || productPrice < 0) {
            setIncorrectPrice(true);
            validationError = true;
        }

        if (!validationError) {
            addProduct({ name: productName, description: productDescription, price: productPrice, forSale: productForSale })
                .then((data) => {
                    addNewProduct(data);
                    closeModal();
                })
                .catch(() => setProductCreationError(true));
        }
    }, [addProduct, productForSale, closeModal, addNewProduct])

    return (
        <div className="modal">
            <div className="modal-content light">
                <div className="modal-header light">
                    <h1>Tworzenie produktu</h1>
                    <button className='modal-close light' onClick={closeModal}>Zamknij</button>
                </div>
                <section className="formContainer modal-body light">
                    <div className="formInputsVertical">
                        <span className="equalFormInputGroup">
                            <label htmlFor="nameInput" className="light">Nazwa</label>
                            <input autoComplete="off" id="nameInput" type='text' onClick={handleInputChange}
                                className={"nameInput formInput textInput light " + (incorrectName ? "incorrectInputBorder" : "")}
                                placeholder="Sprzedam najlepszy produkt..."
                            />
                        </span>
                        <span className="equalFormInputGroup">
                            <label htmlFor="descriptionInput" className="light">Opis</label>
                            <textarea id="descriptionInput" onClick={handleInputChange} rows="4"
                                className={"formInput textInput light " + (incorrectDescription ? "incorrectInputBorder" : "")}
                                placeholder="Jest super, piszcie na..."
                            />
                        </span>
                        <span className="equalFormInputGroup">
                            <label htmlFor="priceInput" className="light">Cena</label>
                            <input autoComplete="off" id="priceInput" type="number" onClick={handleInputChange}
                                   className={"formInput textInput light " + (incorrectPrice ? "incorrectInputBorder" : "")}
                                   placeholder="..."
                            />
                        </span>
                        <span className="customFormInputGroup">
                            <label className="light">Widoczne w sklepie?</label>
                            {productForSale ? (
                                <img src={EyeVisible} className="bigIcon" onClick={() => setProductForSale(false)} alt='product visible in the shop'/>
                                ) : (
                                <img src={EyeHidden} className="bigIcon" onClick={() => setProductForSale(true)} alt='product invisible in the shop'/>
                            )}
                        </span>
                    </div>
                    <button className="formButtonLight light" onClick={saveProduct}>Stwórz produkt</button>
                    {productCreationError &&
                        <div className='formError'>
                            Wystąpił błąd podczas tworzenia produktu.
                        </div>
                    }
                </section>
            </div>
        </div>
    );
}
