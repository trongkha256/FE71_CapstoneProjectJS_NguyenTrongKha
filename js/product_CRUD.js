var createProduct = function () {
    // var isForm = validation();
    // if (!isForm) return;
    var name = document.getElementById('txtTenSP').value;
    var screen = document.getElementById('txtScreen').value;
    var backCamera = document.getElementById('txtBack').value;
    var frontCamera = document.getElementById('txtFront').value;
    var img = document.getElementById('txtImage').value;
    var type = document.getElementById('khSP').value;
    var id = document.getElementById('txtMaSP').value;
    var price = +document.getElementById('txtPrice').value
    var quantity = +document.getElementById('txtQuantity').value
    var desc = +document.getElementById('txtDesc').value

    var newProduct = new ProductList(name, price, screen, backCamera, frontCamera, img, type, id, quantity, desc);
    const promise = axios(
        {
            url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
            method: "POST",
            data: newProduct
        }
    )
    promise
        .then((res) => {
            fetchProduct();
        })
        .catch((err) => {
            console.log(err)
        })
};
var deleteProduct = function (id) {
    const promise = axios(
        {
            url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/" + id,
            method: "DELETE"
        }
    )
    promise
        .then((res) => {
            fetchProduct();
        })
        .catch((err) => {
            console.log(err)
        })
}
var getProduct = function (id) {
    const promise = axios(
        {
            url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/" + id,
            method: "GET"
        }
    )
    promise
        .then((res) => {
            let foundProduct = res.data;
            document.getElementById('txtTenSP').value = foundProduct.name;
            document.getElementById('txtScreen').value = foundProduct.screen;
            document.getElementById('txtBack').value = foundProduct.backCamera;
            document.getElementById('txtFront').value = foundProduct.frontCamera;
            document.getElementById('txtImage').value = foundProduct.img;
            document.getElementById('khSP').value = foundProduct.type;
            document.getElementById('txtMaSP').value = foundProduct.id;
            document.getElementById('txtPrice').value = foundProduct.price;
            document.getElementById('txtQuantity').value = foundProduct.quantity
            document.getElementById('txtDesc').value = foundProduct.desc

            document.getElementById('btnUpdate').style = "display: inline-block"
            document.getElementById('btnCreate').style = "display: none"
            document.getElementById('txtMaSP').disabled = true;
        })
        .catch((err) => {
            console.log(err)
        })
}


var updateProduct = function () {
    var name = document.getElementById('txtTenSP').value;
    var screen = document.getElementById('txtScreen').value;
    var backCamera = document.getElementById('txtBack').value;
    var frontCamera = document.getElementById('txtFront').value;
    var img = document.getElementById('txtImage').value;
    var type = document.getElementById('khSP').value;
    var id = document.getElementById('txtMaSP').value;
    var price = +document.getElementById('txtPrice').value
    var quantity = +document.getElementById('txtQuantity').value
    var desc = document.getElementById('txtDesc').value

    var updatedProduct = new ProductList(name, price, screen, backCamera, frontCamera, img, type, id, quantity, desc);
    const promise = axios(
        {
            url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/" + id,
            method: "PUT",
            data: updatedProduct
        }
    )
    promise
        .then((res) => {
            fetchProduct();
            document.getElementById("btnReset").click();
            document.getElementById('btnUpdate').style = "display: none"
            document.getElementById('btnCreate').style = "display: inline-block"
            document.getElementById('txtMaSP').disabled = false;

        })
        .catch((err) => {
            console.log(err)
        })
}