

$.ajax({
    method: "get",
    url: `${localUri}/products/getAll`,
})
    .done(response => {
        console.log(response);
        const {result} = response;
        const listProductos = [...result]
        listProductos.forEach.foretargetaProducto();
        //   showToastAlert(response.msg, 'success')

    })
    .fail(response => {
        console.log(fallo)
        //   if (response.status == 500) showCustomSmallAlert(response.responseJSON.msg, 'Error en el servidor', 'arrow-counterclockwise', 'Cerrar')
        //   else showToastAlert(response.responseJSON.msg, 'error')
    })


$(document).ready(() => {
    $('#tableProductsManage').DataTable()
})

const contenedorCard = document.querySelector('.contenedorCard');

console.log(contenedorCard.getAttribute)
const targetaProducto = ({name}) =>{
    const targetaProducto = `
            <div class="col mb-3 d-flex align-items-stretch">
            <div class="card">
            <img
            src="https://res.cloudinary.com/walmart-labs/image/upload/d_default.jpg/w_960,dpr_auto,f_auto,q_auto:best/gr/images/product-images/img_large/00750105536154L.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"
            class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <h4>$ <label>20</label></h4>
            <!-- <small class="card-text">This is a longer card with supporting text below as a</small> -->
            <p class="stock">Cantidad:&nbsp;<strong>10</strong></p>
            </div>
            <div class="card-footer">
            <button class="btn"><i class="bi bi-box-seam-fill"></i>&nbsp;Articulos relacionados</button>
            <button class="btn btn-dark"><i class="bi bi-cart4"></i>&nbsp;Añadir</button>
            </div>
            
            </div>
            </div>`
            
            const div = document.createElement('div');
            
            div.innerHTML = targetaProducto;
            
            contenedorCard.append(div.firstElementChild);
            
        }
        
        console.log(listProductos)

        targetaProducto();