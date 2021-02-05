const formatProductName = (productName) => {
        if(productName.length > 37){
            return `${productName.substring(0,37)}...`;
        }
        return productName;
}

export { formatProductName };