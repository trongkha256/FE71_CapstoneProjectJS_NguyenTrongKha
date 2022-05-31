let productList = []
let carts = []

const fetchProduct = async () => {
    try {
        const res = await axios({
            url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
            method: "GET"
        });
        productList = mapProduct(res.data)
        renderProducts(productList);
    }
    catch (err) {
        console.log(err);
    }
}

const renderProducts = function (data) {
    data = data || ProductList;
    var dataHTML = ""
    for (var i = 0; i < data.length; i++) {
        dataHTML += `
            <div class="col-3 text-center">
                <div class="img bg-secondary">
                    <img src=${data[i].img} width="100%" height="200px">
                </div>
                <div class="text">
                    <p style="font-size: 12px">${data[i].desc}</p>
                </div>
                <button class="btn btn-success text-center w-100 d-flex align-items-end" onclick="addToCarts(${data[i].id})">Cart</button>
            </div>
 
    `
    }
    document.getElementById('porfolio').innerHTML = dataHTML;
}
const renderCarts = (data) => {
    data = data || carts
    let sum = 0
    for (var i = 0; i < data.length; i++) {
        sum += parseInt(data[i].price) * parseInt(data[i].quantity)
    }
    // const sum = data.reduce((itemprev, item) => { return itemprev.quantity * itemprev.price + item.quantity * item.price }, 0)
    // console.log(sum)
    var dataHTML = "";
    for (var i = 0; i < data.length; i++) {
        dataHTML += `
        <tr>
            <td>
            <img src=${data[i].img} width="100px" height="100px">
            </td>
            <td>
            <p class="fs-5">${data[i].name}</p></td>
            <td>${data[i].price}</td>
            <td> <button id="btnDecrease" class='btn btn-success'
             onclick="handleQuantity(${data[i].id},${-1})"
            >-</button>
        <span>${data[i].quantity}</span>
        <button class='btn btn-success'onclick="handleQuantity(${data[i].id},${1})" >+</button></td>
            <td>${data[i].quantity * data[i].price}</td>
            <td><button class='btn btn-danger' onclick="handleDeleteCart(${data[i].id})" >Xóa</button></td>
    </tr>
    
 
    `
    }
    dataHTML += `
    <h1>Tổng tiền: ${sum}</h1>
    <button class="btn btn-success class="text-end" onclick="handlePay()">Thanh toán</button>
    `

    document.getElementById('cart').innerHTML = dataHTML;

}
const logic = (product) => {
    if (product.quantity === 1) {
        return true
    }
    return false
}
const mapProduct = (data) => {
    const results = data.map((item, i) => {
        return new ProductList(
            item.name,
            item.price,
            item.screen,
            item.backCamera,
            item.frontCamera,
            item.img,
            item.type,
            item.id,
            item.quantity,
            item.desc,
        )
    });
    return results;
}
//Search with samsung or iphone
const handleSearch = () => {
    const type = document.getElementById("type").value;

    let temp = productList.filter((item) => {
        if (type === "All") {
            return item
        }
        return item.type === type
    })
    renderProducts(temp)
}

//Add a product into Cart
const addToCarts = (productId) => {
    const a = [...productList]
    const index = carts.findIndex(
        (product) => product.id == productId
    )
    if (index === -1) {
        a.forEach((item) => {
            if (item.id == productId) {
                carts.push({ ...item, quantity: 1 });
            }
        })
    }
    else carts[index].quantity += 1


    renderCarts(carts)
    saveData()
}
const handlePay = () => {
    carts = [];

    renderCarts(carts)
    saveData()
}
const handleQuantity = (productId, typical) => {

    carts.forEach((item) => {

        if (productId == item.id && typical === -1 && parseInt(item.quantity) > 1) {
            item.quantity -= 1
        }
        else {
            if (productId == item.id && typical === -1 && parseInt(item.quantity) === 1) {
                handleDeleteCart(item.id);
            }
            if (productId == item.id && typical === 1) {
                item.quantity += 1
            }
        }
    })
    renderCarts(carts)
}
const handleDeleteCart = (productId) => {
    temp = carts.filter((item) => {
        return item.id != productId
    })
    carts = temp;

    renderCarts(carts)
    saveData()
}

// Save local storage:
const saveData = function () {
    var cartListJson = JSON.stringify(carts)
    localStorage.setItem("list", cartListJson);
}
const getData = function () {
    //Local storage: 

    var cartListJson = localStorage.getItem("list");
    if (cartListJson) {
        carts = mapData(JSON.parse(cartListJson));
        renderCarts(carts)
    }
}
var mapData = function (dataFromLocal) {
    var data = [];
    for (var i = 0; i < dataFromLocal.length; i++) {
        var currentProduct = dataFromLocal[i];
        var mappedProduct = new ProductList(
            currentProduct.name,
            currentProduct.price,
            currentProduct.screen,
            currentProduct.backCamera,
            currentProduct.frontCamera,
            currentProduct.img,
            currentProduct.type,
            currentProduct.id,
            currentProduct.quantity,
            currentProduct.desc,
        )
        data.push(mappedProduct);
    }
    return data;
}
fetchProduct();
getData()