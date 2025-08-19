import React, { useMemo } from 'react';

export default function ProductCard(props) {

    const { product, selectProduct } = props;

    const randomColor = useMemo(() => {
        const colors = ["dark", "pink", "dark-gray", "gray-blue", "lilac", "green", "light-blue", "another-green", "purple", "dark-violet", "red", "light-brown"];
        return colors[Math.floor(Math.random() * colors.length)];
    }, [])

    return (
        <section className={"productCard " + randomColor} onClick={() => selectProduct(product.id)}>
            <h3 className='productName'>{product.name}</h3>
            <h4 className='productDescription'>{product.description}</h4>
            <h4 className='productPrice'>{product.price} zł</h4>
        </section>
    );
}
