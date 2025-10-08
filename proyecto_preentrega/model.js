async function getProducts(target) {
    const response = await fetch(`https://fakestoreapi.com/${target}`)
    const data = await response.json();
    return data
}

async function addProduct(data){
    const [title, price, category] = data;
    const product = {title, price, category};

    const res = fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    }).then(response => response.json());
    return res;
}

async function delProduct(target){
    const response = await fetch(`https://fakestoreapi.com/${target}`, {
        method: 'DELETE'
    });
    const res = await response.json();
    return res;
}

export { getProducts, addProduct, delProduct };


