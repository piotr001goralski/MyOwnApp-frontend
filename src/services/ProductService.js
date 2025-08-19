import { useRestCall } from "./useRestCall.js";

const API_URL = import.meta.env.VITE_API_URL + '/products';

export function useProductsService() {
    const { getRequest, postRequest, deleteRequest, putRequest } = useRestCall();

    const getMyProducts = async () => {
        return getRequest(API_URL);
    };

    const getShopProducts = async () => {
        return getRequest(API_URL + '/forSale');
    };

    const addProduct = async (data) => {
        return postRequest(API_URL, data);
    };

    const deleteProduct = async (productId) => {
        return deleteRequest(API_URL + "/" + productId);
    };

    const updateProduct = async (productId, data) => {
        return putRequest(API_URL + "/" + productId, data);
    };

    return {
        getMyProducts,
        getShopProducts,
        addProduct,
        deleteProduct,
        updateProduct
    };
}
