let productList = []

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
            <div class="col-3 text-center" heigh="1000px">
                <div class="img bg-secondary">
                    <img src=${data[i].img} width="100%" height="200px">
                </div>
                <div class="text">
                    <p style="font-size: 12px">${data[i].desc}</p>
                </div>
                <button class="btn btn-success text-center w-100 d-flex align-items-end">Cart</button>
            </div>
 
    `
    }
    document.getElementById('porfolio').innerHTML = dataHTML;
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

fetchProduct();