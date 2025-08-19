import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useAuthService} from "../services/AuthService.js";
import {useProductsService} from "../services/ProductService.js";
import {useGSAP} from "@gsap/react";
import {SplitText} from "gsap/SplitText";
import gsap from "gsap";
import UserProductCard from "./UserProductCard.jsx";
import CreateProductForm from "./CreateProductForm.jsx";

export default function LoggedInUserPage() {

    const [products, setProducts] = useState([]);
    const [createProductModalOpened, setCreateProductModalOpened] = useState(false);

    const { getMyProducts } = useProductsService();
    const { getSignInUser, logout } = useAuthService();

    const user = useMemo(() => {
        return getSignInUser();
    }, []);

    const addNewProduct = useCallback((newProduct) => {
        setProducts((oldState) => [newProduct, ...oldState]);
    }, []);

    useEffect(() => {
        getMyProducts()
            .then((data) => {
                setProducts(data);
            });
    }, []);

    useGSAP(() => {
        let split = SplitText.create(".pageLabel", {type: "words"});
        gsap.from(split.words, {
            y: -500,
            opacity: 0,
            rotation: "random(-60, 60)",
            duration: 1,
            ease: "sine.out",
            stagger: 0.5,
            delay: 0,
            overwrite: "auto"
        });
        gsap.from('#createProductButton', {
            x: -500,
            opacity: 0,
            rotation: "random(-30, 30)",
            duration: 1,
            ease: "sine.out",
            stagger: 0.5,
            delay: 1,
            overwrite: "auto"
        });
        gsap.from('#logoutButton', {
            x: 500,
            opacity: 0,
            rotation: "random(-30, 30)",
            duration: 1,
            ease: "sine.out",
            stagger: 0.5,
            delay: 1,
            overwrite: "auto"
        });
        gsap.fromTo('.secondaryText', {
            opacity: 0,
        }, {
            opacity: 1,
            duration: 1,
            ease: "sine.out",
            stagger: 0.5,
            delay: 2,
            overwrite: "auto"
        });
        gsap.fromTo('.userProductList', {
            opacity: 0,
        }, {
            opacity: 1,
            duration: 1,
            ease: "sine.out",
            delay: 2,
            overwrite: "auto"
        });
    },[]);

    const openCreateProductModal = useCallback(() => {
        setCreateProductModalOpened(true)
    }, []);


    const removeFromProductList = useCallback((productId) => {
        setProducts((prevState) => prevState.filter(product => product.id !== productId))
    }, []);

    return (
        <section className="panel dark userPageContainer">
            {createProductModalOpened === true ? <CreateProductForm addNewProduct={addNewProduct} closeModal={() => setCreateProductModalOpened(false)}/> : ''}
            <h1 className='pageLabel'>Cześć {user.name}</h1>
            <div className='userActions'>
                <button id='createProductButton' className="userActionButton dark" onClick={openCreateProductModal}>Stwórz produkt</button>
                <button id='logoutButton' className="userActionButton dark" onClick={() => logout()}>Wyloguj się</button>
            </div>
            <div className='userProductsContainer'>
                <h2 className='secondaryText'>Twoje produkty</h2>
                <div className='userProductList'>
                    {products.map((product) => (
                        <UserProductCard product={product} removeFromProductList={removeFromProductList} key={product.id}/>
                    ))}
                    <button className="formButtonDark dark cardButton" onClick={openCreateProductModal}>+</button>
                </div>
            </div>
        </section>
    );
}
