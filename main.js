// array de productos
const productos = [
  { id: 1, nombre: "lemonpie", precio: 100 },
  { id: 2, nombre: "chocotorta", precio: 200 },
  { id: 3, nombre: "brownie", precio: 500 },
  { id: 4, nombre: "cheesecake", precio: 400 },
];

let carrito = [];
let precio = 0;

// imprimo productos en el DOM
productos.forEach(item => {
  let producto = document.createElement("producto");
  producto.innerHTML = `
    <h3>ID: ${item.id}</h3>
    <p>Nombre: ${item.nombre}</p>
    <b>$${item.precio}</b>
    <br/>
    <button id="agregar-${item.id}" value="${item.id}">Agregar a carrito</button>
  `;

  document.getElementById("productos").append(producto);

  // funcion que agrega productos al carrito
  producto.addEventListener("click", (event) => {
    event.preventDefault();

    let idProducto = event.target.value;

    let elemento = productos.filter(function (item) {
      return item.id == idProducto;
    });

    if (elemento) {
      let elementoCarrito = JSON.parse(JSON.stringify(elemento[0]));

      let productoEnCarrito = carrito.filter(function (item) {
        return item.id == idProducto;
      });

      let itemCarrito = document.createElement("item-carrito");

      if (productoEnCarrito.length > 0) {
        console.log(`Encontre el producto ${productoEnCarrito[0].id} en el carrito`)
        productoEnCarrito[0].cantidad += 1;
        document.getElementById(`item-${productoEnCarrito[0].id}-cantidad`).innerHTML = productoEnCarrito[0].cantidad;
      } else {
        elementoCarrito.cantidad = 1;
        carrito.push(elementoCarrito);

        //agrego el producto al carrito en el html
        itemCarrito.setAttribute("id", `item-${elementoCarrito.id}`);
        itemCarrito.innerHTML = `
            <h3>ID: ${elementoCarrito.id}</h3>
            <p>Nombre: ${elementoCarrito.nombre}</p>
            <b>$${elementoCarrito.precio}</b>
            <p>Cantidad <span id=item-${elementoCarrito.id}-cantidad>${elementoCarrito.cantidad}</span></p>
            <button id="eliminar-${elementoCarrito.id}" value="${elementoCarrito.id}">Eliminar del carrito</button>
            `;

        let carritoElement = document.getElementById("carrito");
        carritoElement.append(itemCarrito);
        console.log("CARRITO CON PRODUCTO AGREGADO: " + JSON.stringify(carrito));
      }

      precio += elementoCarrito.precio;
      document.getElementById("precio").innerHTML = precio;
      console.log("PRECIO: " + precio);

      itemCarrito.addEventListener("click", (event) => {
        event.preventDefault();
        let idProducto = parseInt(event.target.value);

        //busco el producto a borrar
        let carritoElement = carrito.filter(function (item) {
          return item.id == idProducto;
        });

        if (carritoElement[0].cantidad === 1) {
          // borro elemento del carrito por id
          carrito = carrito.filter(i => i.id !== idProducto);
          console.log("CARRITO DESPUES DE BORRAR: " + JSON.stringify(carrito));
          // borro element del carrito por indice en el html
          document.getElementById(`item-${idProducto}`).remove();
        } else {
          carritoElement[0].cantidad -= 1;
          document.getElementById(`item-${carritoElement[0].id}-cantidad`).innerHTML = carritoElement[0].cantidad;
        }

        // actualizo el precio del carrito
        precio -= carritoElement[0].precio;
        document.getElementById("precio").innerHTML = precio;
        console.log("PRECIO: " + precio);
      });

    }
  });
});

/*
// array de productos
const productos = [
  { id: 1, nombre: "lemonpie", precio: 100 },
  { id: 2, nombre: "chocotorta", precio: 200 },
  { id: 3, nombre: "brownie", precio: 500 },
  { id: 4, nombre: "cheesecake", precio: 400 },
];

document.body.append("PRODUCTOS");

// salto de linea
const lineBreak = document.createElement('br');
document.body.appendChild(lineBreak);


// imprimo productos en el DOM
productos.forEach(item => {

  let producto = document.createElement("producto");
  producto.innerHTML = `
    <h3>ID: ${item.id}</h3>
    <p>Nombre: ${item.nombre}</p>
    <b>$${item.precio}</b>
    <button id="agregar${item.id}" value="${item.id}">Agregar a carrito</button>
  `;

  document.body.append(producto);

  // funcion que agrega productos al carrito
  producto.addEventListener("click", (event) => {
    console.log(carrito);
    if (!carrito || carrito.length == 0) {
        carrito = [];
    }
    
    let idProducto = event.target.value;
    
    let elemento = productos.filter(function(item){
        return item.id == idProducto;         
    });

    if (elemento) {
        // guardo el index del elemento del carrito con el valor del tamaño del carrito
        elemento[0].index = carrito.length;
        carrito.push(elemento[0]);
        localStorage.setItem("carrito",  JSON.stringify(carrito));
        // recargo para mostrar los cambios
        location.reload();
    }
  });

});


//linea horizontal para dividir productos de carrito
let elem = document.createElement("hr");
elem.setAttribute("width", "100%");
document.body.appendChild(elem);

document.body.appendChild(lineBreak);
let carrito = localStorage.getItem("carrito");

if (carrito != null && carrito.length > 0) {
    carrito = JSON.parse(carrito);
    document.body.append("CARRITO");
    
    carrito.forEach((item) => {
        let itemCarrito = document.createElement("item-carrito");
        itemCarrito.innerHTML = `
        <h3>INDEX: ${item.index}</h3>
        <h3>ID: ${item.id}</h3>
        <p>Nombre: ${item.nombre}</p>
        <b>$${item.precio}</b>
        <button id="eliminar${item.id}" value="${item.index}">Eliminar del carrito</button>
        `;

        document.body.append(itemCarrito);
        
        itemCarrito.addEventListener("click", (event) => {
            let index = parseInt(event.target.value);
            // borro elementos del carrito por indice
            carrito = carrito.filter(i => i.index !== index);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            location.reload();
        });
    });

}else{
  let div = document.createElement("div");
  div.innerHTML = "Carrito vacio";
  document.body.append(div);
}
*/