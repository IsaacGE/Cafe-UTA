


const productos = [{
    id: '1',
    nombre:'Coco-cola',
    precio:25,
    stacks:35,
    descripcion:'1L'
},
{
    id: '2',
    nombre:'Coco-cola',
    precio:25,
    stacks:35,
    descripcion:'1L'
},{
    id: '3',
    nombre:'Pepsi',
    precio:25,
    stacks:35,
    descripcion:'1L'
},{
    id: '4',
    nombre:'Fanta',
    precio:25,
    stacks:35,
    descripcion:'1L'
},{
    id: '5',
    nombre:'Sprite',
    precio:25,
    stacks:35,
    descripcion:'1L'
},{
    id: '6',
    nombre:'Jarritos',
    precio:25,
    stacks:35,
    descripcion:'1L'
}
,{
    id: '7',
    nombre:'Jumex',
    precio:25,
    stacks:35,
    descripcion:'1L'
}

]


$(document).ready(() => {
    $('#tableProductsManage').DataTable()
})