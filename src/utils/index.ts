import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {SerializedError} from '@reduxjs/toolkit';
import {Product} from '@app/store/services/products/types';
import {ProductCart} from '@app/store/services/cartByUserId/types';

export function getErrorMsg(error: FetchBaseQueryError | SerializedError | undefined) {
    if (error) {
        if ('status' in error) {
            return 'error' in error ? error.error : JSON.stringify(error.data);
        }

        return error.message;
    }
}

export function getToken() {
    return localStorage.getItem('token') ?? '';
}

export function getErrorStatus(error: FetchBaseQueryError | SerializedError | undefined) {
    if(error) {
        if('status' in error) {
            return error.status;
        }
    }
}

export function productToProductCart(product: Product, quantity = 0): ProductCart {
    return {
        discountPercentage: product.discountPercentage,
        discountedTotal: product.discountPercentage,
        id: product.id,
        price: product.price,
        quantity,
        thumbnail: product.thumbnail,
        title: product.title,
        total: 0
    }
}