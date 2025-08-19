import React, {useCallback, useState} from 'react';

export default function SearchProducts(props) {

    const { setSearchFilters } = props;

    const [incorrectName, setIncorrectName] = useState(false);
    const [incorrectMinPrice, setIncorrectMinPrice] = useState(false);
    const [incorrectMaxPrice, setIncorrectMaxPrice] = useState(false);

    const handleInputChange = useCallback(() => {
        setIncorrectName(false);
        setIncorrectMinPrice(false);
        setIncorrectMaxPrice(false);
    }, [])

    const searchProducts = useCallback(() => {
        const productName = document.getElementById("nameInput").value;
        const productMinPrice = document.getElementById("minPriceInput").value;
        const productMaxPrice = document.getElementById("maxPriceInput").value;

        let validationError = false;
        if (productMinPrice < 0) {
            setIncorrectMinPrice(true);
            validationError = true;
        }
        if (productMaxPrice < 0) {
            setIncorrectMaxPrice(true);
            validationError = true;
        }
        if (!!productMaxPrice && !!productMaxPrice && productMaxPrice < productMinPrice) {
            setIncorrectMinPrice(true);
            setIncorrectMaxPrice(true);
            validationError = true;
        }
        if (!productName && !productMinPrice && !productMaxPrice){
            setIncorrectName(true);
            setIncorrectMinPrice(true);
            setIncorrectMaxPrice(true);
            validationError = true;
        }

        if (!validationError) {
            document.getElementById("products").scrollIntoView({ behavior:"smooth" });
            setSearchFilters({ productName: productName.toLowerCase(), productMinPrice, productMaxPrice });
        }
    }, [setSearchFilters])

    return (
        <section className="formContainer">
            <div className="formInputs">
                <span className="formInputGroup">
                    <label htmlFor="nameInput" className="dark">Szukam</label>
                    <input id="nameInput" type="text" autoComplete="off" onClick={handleInputChange} className={"formInput textInput dark " + (incorrectName ? "incorrectInput" : "")} placeholder="Wpisz nazwę produktu..."/>
                </span>
                <span className="formInputGroup">
                    <label htmlFor="minPriceInput" className="dark">cena większa niż</label>
                    <input id="minPriceInput" type="number" autoComplete="off" onClick={handleInputChange} className={"formInput numberInput dark " + (incorrectMinPrice ? "incorrectInput" : "")} placeholder="..."/>
                    <label htmlFor="minPriceInput" className="dark">zł, </label>
                </span>
                <span className="formInputGroup">
                    <label htmlFor="maxPriceInput" className="dark">cena mniejsza niż</label>
                    <input id="maxPriceInput" type="number" autoComplete="off" onClick={handleInputChange} className={"formInput numberInput dark " + (incorrectMaxPrice ? "incorrectInput" : "")} placeholder="..."/>
                    <label htmlFor="maxPriceInput" className="dark">zł</label>
                </span>
            </div>
            <button className="formButtonDark dark" onClick={searchProducts}>Wyszukaj</button>
        </section>
    );
}
