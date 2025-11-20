const seccionAnimes = document.querySelector(".funkos") /*aqui hemos declarado una variable de tipo constante*/ 


fetch("http://127.0.0.1:8000/api/funkos").then(/*hacemos la peticion al servidor mediante el fetch y la url */ 
    function (peticion) {
        return peticion.json()
    }
).then(
    function (datos) {
        console.log(datos);

        const anime = datos.map(
            function (item) {
                return `<article>
        <div>
       <img src="${item.imagen}" alt="${item.nombre}" class="h-96 object-scale-down mb-4">
       <h4>${item.nombre}</h4>
       <h5 class=>precio: <span>${item.precio}</span></h5>
       <button class="pagar" value="${item.precio}">pagar <span></span></button>
       </div>
    </article>`/*mostramos los funkopops*/ 
            }
        )
        seccionAnimes.insertAdjacentHTML("afterbegin", anime.join(""))
    }
)

const carrito = []
let total = 0
const items = document.querySelector("#items")
const monto = document.querySelector("#monto")
const pagar = document.querySelector("#pagar")

seccionAnimes.addEventListener("click", function (evento) {
    const elemento = evento.target
    console.log(elemento, elemento.tagName);
    if (elemento.tagName === "BUTTON" || elemento.tagName === "SPAN") {
        //alert(elemento.value)
        carrito.push(parseInt(elemento.value))
        items.textContent = carrito.length
        console.log(carrito);
        total = 0
        for (let posicion = 0; posicion < carrito.length; posicion++) {
            total = total + carrito[posicion];
        }
        monto.textContent = total
    }
})

pagar.addEventListener("click", function () {
    Swal.fire({
        title: "Compra finalizada",
        text: `Gracias por tu compra de ${items.textContent} productos a Gs. ${monto.textContent}`,
        icon: "success"
    });
    monto.textContent = 0
    items.textContent = 0
})