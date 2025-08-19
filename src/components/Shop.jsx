import React, {useCallback, useEffect, useMemo, useState} from 'react';

import CloseIcon from "../assets/close-square.svg";
import ArrowDark from "../assets/arrow-dark.svg";
import ArrowLight from "../assets/arrow-light.svg";
import ProductCard from "./ProductCard.jsx";
import SearchProducts from "./SearchProducts.jsx";
import {useProductsService} from "../services/ProductService.js";
import {SplitText} from "gsap/SplitText";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

export default function Shop() {

    const { getShopProducts } = useProductsService();

    const [products, setProducts] = useState([]);
    const [searchFilters, setSearchFilters] = useState(null);
    const [pageLabel, setPageLabel] = useState("Produkty na sprzedaż");
    const [currentPage, setCurrentPage] = useState(0);
    const [productsPerPage, setProductsPerPage] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        getShopProducts().then((data) => setProducts(data));
    }, []);

    useEffect(() => {
        if (searchFilters !== null) {
            const { productName, productMinPrice, productMaxPrice } = searchFilters;

            setPageLabel(
                "Szukasz " + (productName === "" ? "produktów" : productName)
                + (productMinPrice ? ", od "+productMinPrice+"zł" : "")
                + (productMaxPrice ? ", do "+productMaxPrice+"zł" : "")
            );
        } else {
            setPageLabel("Produkty na sprzedaż");
        }
        setCurrentPage(0);
    }, [searchFilters]);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (windowWidth < 1060) {
            setProductsPerPage(windowHeight < 800 ? 4 : 6)
        } else if (windowWidth < 1380) {
            setProductsPerPage(windowHeight < 800 ? 6 : 10)
        } else if (windowWidth < 1700) {
            setProductsPerPage(windowHeight < 800 ? 6 : 9)
        } else {
            setProductsPerPage(windowHeight < 800 ? 8 : 12)
        }
    }, [windowWidth, windowHeight]);

    const selectProduct = useCallback((productId) => {
        if(selectedProduct === productId) {
            setSelectedProduct(null);
        } else {
            setSelectedProduct(productId);
        }
    }, [selectedProduct])

    const filterProducts = useMemo(() => {
        const { productName, productMinPrice, productMaxPrice } = searchFilters ?? {};
        return products
            .filter((product) =>
                (productName ? (product.name.toLowerCase().includes(productName) || product.description.toLowerCase().includes(productName)) : true) &&
                (productMinPrice ? (product.price >= productMinPrice) : true) &&
                (productMaxPrice ? (product.price <= productMaxPrice) : true)
            );
    }, [products, searchFilters])

    const renderProducts = useMemo(() => {
        return filterProducts
            .filter((product, index) => productsPerPage * currentPage <= index && index < productsPerPage * (currentPage+1))
            .map((product) => (
                <div id={'product-'+product.id} key={'product-'+product.id} className={"media " + (selectedProduct === product.id ? "selectedProductCard" : "")}>
                    <ProductCard product={product} selectProduct={selectProduct} />
                </div>
            ));
    }, [filterProducts, currentPage, productsPerPage, selectProduct, selectedProduct])

    useGSAP(() => {
        let split = SplitText.create(".pageLabel", { type: "words" });
        gsap.from(split.words, {
            y: -300,
            opacity: 0,
            rotation: "random(-80, 80)",
            duration: 1,
            ease: "sine.out",
            stagger: 0.3,
            overwrite:"auto"
        });
    },[pageLabel]);

    return (
        <main id='shop'>
            <section id="products" className="panel light productsContainer">
                <div className='pageHeader'>
                    <h1 className='pageLabel'>{pageLabel}</h1>
                    {searchFilters !== null && <img src={CloseIcon} className="iconButton" alt='clear filters' onClick={() => setSearchFilters(null)}/>}
                </div>
                <div className='productList'>
                    <img src={ArrowDark}
                         className={"iconButton arrowLeft " + (currentPage > 0 ? "" : "hidden")}
                         onClick={() => {
                             setCurrentPage((prevState) => prevState > 0 ? prevState - 1 : 0)
                         }}
                         alt='arrow up'
                    />
                    <div className="medias">
                        {renderProducts}
                    </div>
                    <img src={ArrowDark}
                         className={"iconButton arrowRight " + (filterProducts.length > productsPerPage * (currentPage+1) ? "" : "hidden")}
                         onClick={() => {
                             setCurrentPage((prevState) => prevState + 1)
                         }}
                         alt='arrow up'
                    />
                </div>
                <img src={ArrowDark} className="iconButton"
                     onClick={() => document.getElementById("searchProducts").scrollIntoView({ behavior:"smooth" })} alt='arrow down'
                />
            </section>
            <section id="searchProducts" className="panel dark searchProductsSection">
                <img src={ArrowLight} className="iconButton arrowUp"
                     onClick={() => document.getElementById("products").scrollIntoView({ behavior:"smooth" })} alt='arrow up'
                />
                <SearchProducts setSearchFilters={setSearchFilters}/>
                <span />
            </section>
        </main>
    );
}
