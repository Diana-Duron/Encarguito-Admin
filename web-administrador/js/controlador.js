//Arreglos de datos
var empresas = [];

var motoristas = [];

var ordenes = [];

var productos = [];


//Funciones

//Funcion para validar el inicio de sesion del administrador
      const loginUser = async (correo, contrasena) => {
        var correo = document.getElementById("txtCorreo").value;
        var contrasena = document.getElementById("txtPsswrd").value;
        let respuesta = await fetch(`http://localhost:3000/admins/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json", //MIME Type
            },
            body: JSON.stringify(
                {
                    "correo": `${correo}`,
                    "contrasena": `${contrasena}`
                }
            )
        });
    
        let usuario = await respuesta.json();
        console.log(usuario);
    
        if (usuario != "no encontrado") {
            localStorage.setItem("sesion", usuario.id);
            window.location.href = "administracion.html";
        } else {
            html = `<div class="alert alert-danger" role="alert">
                    Usuario o contraseña incorrectos
                    </div>`;
            document.getElementById("contrasenaerror").innerHTML = html;
        }
    }


//seccion mostrar
  function mostrarMotoristas(){
    const inicioDiv = document.getElementById("inicio-content");
    document.getElementById("motoristas-content").innerHTML = "";

    inicioDiv.style.display = 'none';

    motoristasDiv = document.getElementById("motoristas-content");
    motoristasDiv.style.display = 'block'
    
    empresasDiv = document.getElementById("empresas-content");
    empresasDiv.style.display = 'none';

    ordenesDiv = document.getElementById("ordenes-content");
    ordenesDiv.style.display = 'none';

    productosDiv = document.getElementById("productos-content");
    productosDiv.style.display = 'none';

    perfilDiv = document.getElementById("perfil-content");
    perfilDiv.style.display = 'none';

    let obtenerMotoristas = async () => {
    let respuesta = await fetch(`http://localhost:3000/motors`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json", //MIME Type
        }
    });

    motoristas = await respuesta.json();
    console.log(motoristas);


    motoristasDiv.innerHTML =  `<div class="row" style="margin-left: 18%; align-content: center; justify-content: center;">
    <div class="col-6">
      <div class="btn-container" onclick="mostrarInicio()" style="padding: 20%">
        <button class="btn btn-light">
          <i class="fas fa-arrow-left"></i>
          <div>Regresar</div>
        </button>
      </div>
    </div>
    <div class="col-6">
      <div class="btn-container" onclick="mostraragregarMotorista()" style="padding: 20%">
        <button class="btn btn-light">
          <i class="fas fa-plus"></i>
          <div>Agregar</div>
        </button>
      </div>
    </div>
    </div>

    <div class="row">
      <div class="col-4"></div>
      <div id="cardsMotorContainer" class="col-8" style="padding-right: 25%;">
    `;

    for (let i = 0; i < motoristas.length; i++) {
        document.getElementById('cardsMotorContainer').innerHTML += `
            <div id="cardMotorista${i}" class="card-body">
              <h4 class="card-title" style="color: #539091; font-size: 18px;">Nombre:   ${motoristas[i].nombre}</h4>
              <p class="card-text" style="color: #4EB79E; font-size: 18px;">Apellido:   ${motoristas[i].apellido}</p>
              <p class="card-text" style="color: #68c3b7; font-size: 18px;">Correo:     ${motoristas[i].correo}</p>`
                
                //recorre el arreglo ordenesPendientes
                for (let j = 0; j < motoristas[i].ordenesPendientes.length; j++) {
                  document.getElementById(`cardMotorista${i}`).innerHTML += `<p class="card-text" style="color: #539091; font-size: 18px;">ID orden pendiente:  ${motoristas[i].ordenesPendientes[j].idOrden}</p>`
                }
                document.getElementById(`cardMotorista${i}`).innerHTML += `<div class="button-group" style="display: flex;width: 50%;gap: 10%;margin-bottom: 10%;">
                <a href="#" onclick="mostrarEditarMotorista(${motoristas[i].id})" class="btn btn-primary" style="background-color: #4EB79E; font-size: 14px;">Editar</a>
                <a href="#" onclick="eliminarMotorista(${motoristas[i].id})" class="btn btn-danger" style="background-color: #A8DCD9; font-size: 14px;">Eliminar</a>
              </div>
        `;
      }

  }

  obtenerMotoristas();
}

  function mostrarEmpresas(){
    const inicioDiv = document.getElementById("inicio-content");
    const empresasDiv = document.getElementById("empresas-content");

    inicioDiv.style.display = 'none';

    motoristasDiv = document.getElementById("motoristas-content");
    motoristasDiv.style.display = 'none'

    ordenesDiv = document.getElementById("ordenes-content");
    ordenesDiv.style.display = 'none';

    productosDiv = document.getElementById("productos-content");
    productosDiv.style.display = 'none';

    perfilDiv = document.getElementById("perfil-content");
    perfilDiv.style.display = 'none';

    let obtenerEmpresas = async () => {
    let respuesta = await fetch(`http://localhost:3000/empresas`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json", //MIME Type
        }
    });

    empresas = await respuesta.json();
    console.log(empresas);


    empresasDiv.innerHTML = `<div class="row" style="margin-left: 18%; align-content: center; justify-content: center;">
    <div class="col-6">
      <div class="btn-container" onclick="mostrarInicio()" style="padding: 20%">
        <button class="btn btn-light">
          <i class="fas fa-arrow-left"></i>
          <div>Regresar</div>
        </button>
      </div>
    </div>
    <div class="col-6">
      <div class="btn-container" onclick="mostraragregarEmpresa()" style="padding: 20%">
        <button class="btn btn-light">
          <i class="fas fa-plus"></i>
          <div>Agregar</div>
        </button>
      </div>
    </div>
    </div>
    `;


    for (let i = 0; i < empresas.length; i++) {
        empresasDiv.innerHTML += `
        <div class="row">
          <div class="col-4"></div>
          <div class="col-8" style="padding-right: 25%;">
            <div class="card-body">
              <h4 class="card-title" style="color: #539091; font-size: 24px;">Nombre:   ${empresas[i].nombreEmpresa}</h4>
              <p class="card-text" style="color: #4EB79E; font-size: 18px;">Contacto:   ${empresas[i].nombreContacto}</p>
              <p class="card-text" style="color: #68c3b7; font-size: 18px;">Teléfono:   ${empresas[i].telefono}</p>
              <p class="card-text" style="color: #539091; font-size: 18px;">Dirección:  ${empresas[i].direccion}</p>
            <div class="button-group" style="display: flex;width: 50%;gap: 10%;margin-bottom: 10%;">
              <a href="#" onclick="mostrarEditarEmpresa(${empresas[i].id})" class="btn btn-primary" style="background-color: #4EB79E; font-size: 14px;">Editar</a>
              <a href="#" onclick="eliminarEmpresa(${empresas[i].id})" class="btn btn-danger" style="background-color: #A8DCD9; font-size: 14px;">Eliminar</a>
            </div>
          </div>
          </div>
        </div>
        `;
    }

    }

    obtenerEmpresas();

    empresasDiv.style.display = 'block';

  }

  function mostrarOrdenes(){
      inicioDiv = document.getElementById("inicio-content");
      inicioDiv.style.display = 'none';

      motoristasDiv = document.getElementById("motoristas-content");
      motoristasDiv.style.display = 'none'

      empresasDiv = document.getElementById("empresas-content");
      empresasDiv.style.display = 'none';

      ordenesDiv = document.getElementById("ordenes-content");
      ordenesDiv.style.display = 'block';

      productosDiv = document.getElementById("productos-content");
      productosDiv.style.display = 'none';

      perfilDiv = document.getElementById("perfil-content");
      perfilDiv.style.display = 'none';

      let obtenerOrdenes = async () => {
      let respuesta = await fetch(`http://localhost:3000/ordenes`, {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              "Content-Type": "application/json", //MIME Type
          }
      });

      ordenes = await respuesta.json();
      console.log(ordenes);


      ordenesDiv.innerHTML = `<div class="row" style="margin-left: 18%; align-content: center; justify-content: center;">
      <div class="col-6">
        <div class="btn-container" onclick="mostrarInicio()" style="padding: 20%">
          <button class="btn btn-light">
            <i class="fas fa-arrow-left"></i>
            <div>Regresar</div>
          </button>
        </div>
      </div>
      <div class="col-6">
        <div class="btn-container" onclick="mostraragregarOrden()" style="padding: 20%">
          <button class="btn btn-light">
            <i class="fas fa-plus"></i>
            <div>Agregar</div>
          </button>
        </div>
      </div>
      `;


      for (let i = 0; i < ordenes.length; i++) {
          ordenesDiv.innerHTML += `
          <div class="row">
            <div class="col-4"></div>
            <div class="col-8" style="padding-right: 25%;">
              <div class="card-body">
                <p class="card-title" style="color: #539091; font-size: 18px;">ID:   ${ordenes[i].id}</p>
                <p class="card-text" style="color: #4EB79E; font-size: 18px;">Nombre:   ${ordenes[i].nombre}</p>
                <p class="card-text" style="color: #68c3b7; font-size: 18px;">Apellido:   ${ordenes[i].apellido}</p>
                <p class="card-text" style="color: #539091; font-size: 18px;">Dirección:  ${ordenes[i].direccion}</p>
                <p class="card-text" style="color: #539091; font-size: 18px;">Teléfono:  ${ordenes[i].telefono}</p>
                <p class="card-text" style="color: #539091; font-size: 18px;">Descripcion:  ${ordenes[i].descripcion}</p>
                <p class="card-text" style="color: #539091; font-size: 18px;">Precio: L. ${ordenes[i].precio}</p>
                <p class="card-text" style="color: #539091; font-size: 18px;">Motorista:  ${ordenes[i].motorista}</p>
                <p class="card-text" style="color: #539091; font-size: 18px;">Estado:  ${ordenes[i].estado}</p>
              <div class="button-group" style="display: flex;width: 50%;gap: 10%;margin-bottom: 10%;">
                <a href="#" onclick="mostrarEditarOrden(${ordenes[i].id})" class="btn btn-primary" style="background-color: #4EB79E; font-size: 14px;">Editar</a>
                <a href="#" onclick="eliminarOrden(${ordenes[i].id})" class="btn btn-danger" style="background-color: #A8DCD9; font-size: 14px;">Eliminar</a>
              </div>
            </div>
            </div>
          </div>
          `;
      }
  }
  obtenerOrdenes();
}

  function mostrarProductos(){
    const inicioDiv = document.getElementById("inicio-content");
    const productosDiv = document.getElementById("productos-content");

    inicioDiv.style.display = 'none';

    motoristasDiv = document.getElementById("motoristas-content");
    motoristasDiv.style.display = 'none'

    empresasDiv = document.getElementById("empresas-content");
    empresasDiv.style.display = 'none';

    ordenesDiv = document.getElementById("ordenes-content");
    ordenesDiv.style.display = 'none';

    productosDiv.style.display = 'block';

    perfilDiv = document.getElementById("perfil-content");
    perfilDiv.style.display = 'none';

    let obtenerProductos = async () => {
    let respuesta = await fetch(`http://localhost:3000/prods`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json", //MIME Type
        }
    });

    productos = await respuesta.json();
    console.log(productos);


    productosDiv.innerHTML = `<div class="row" style="margin-left: 18%; align-content: center; justify-content: center;">
    <div class="col-6">
      <div class="btn-container" onclick="mostrarInicio()" style="padding: 20%">
        <button class="btn btn-light">
          <i class="fas fa-arrow-left"></i>
          <div>Regresar</div>
        </button>
      </div>
    </div>
    <div class="col-6">
      <div class="btn-container" onclick="mostraragregarProducto()" style="padding: 20%">
        <button class="btn btn-light">
          <i class="fas fa-plus"></i>
          <div>Agregar</div>
        </button>
      </div>
    </div>
    </div>
    `;


    for (let i = 0; i < productos.length; i++) {
        productosDiv.innerHTML += `
        <div class="row">
          <div class="col-4"></div>
          <div class="col-8" style="padding-right: 25%;">
            <div class="card-body">
              <h4 class="card-title" style="color: #539091; font-size: 24px;">Nombre:   ${productos[i].nombre}</h4>
              <p class="card-text" style="color: #4EB79E; font-size: 18px;">Descripción:   ${productos[i].detalle}</p>
              <p class="card-text" style="color: #68c3b7; font-size: 18px;">Precio:   ${productos[i].precio}</p>
              <p class="card-text" style="color: #539091; font-size: 18px;">Cantidad:  ${productos[i].inventario}</p>
            <div class="button-group" style="display: flex;width: 50%;gap: 10%;margin-bottom: 10%;">
              <a href="#" onclick="mostrarEditarProducto(${productos[i].id})" class="btn btn-primary" style="background-color: #4EB79E; font-size: 14px;">Editar</a>
              <a href="#" onclick="eliminarProducto(${productos[i].id})" class="btn btn-danger" style="background-color: #A8DCD9; font-size: 14px;">Eliminar</a>
            </div>
          </div>
          </div>
        </div>
        `;
    }
  }

  obtenerProductos();
}

  function mostrarPerfil(){
      let id = localStorage.getItem("sesion");
      //convertir a string
      id = parseInt(id);
      console.log(id);
      let obtenerPerfil = async () => {
      let respuesta = await fetch(`http://localhost:3000/admins/ `,{
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              "Content-Type": "application/json", //MIME Type
          },
          body: JSON.stringify(
              {
                  "id": id
              }
          )
      });

      perfil = await respuesta.json();
      console.log(perfil);

      const inicioDiv = document.getElementById("inicio-content");
      inicioDiv.style.display = 'none';

      motoristasDiv = document.getElementById("motoristas-content");
      motoristasDiv.style.display = 'none'

      empresasDiv = document.getElementById("empresas-content");
      empresasDiv.style.display = 'none';

      ordenesDiv = document.getElementById("ordenes-content");
      ordenesDiv.style.display = 'none';

      productosDiv = document.getElementById("productos-content");
      productosDiv.style.display = 'none';

      perfilDiv = document.getElementById("perfil-content");
      perfilDiv.style.display = 'block';

      perfilDiv.innerHTML = `<div class="row" style="margin-left: 18%; align-content: center; justify-content: center;">
      <div class="col-6">
        <div class="btn-container" onclick="mostrarInicio()" style="padding: 20%">
          <button class="btn btn-light">
            <i class="fas fa-arrow-left"></i>
            <div>Regresar</div>
          </button>
        </div>
      </div>
      </div>
      <div class="row">

      <div class="col-4"></div>

      <div class="col-8" style="padding-right: 25%;">
        <div class="card-body">
          <h4 class="card-title" style="color: #539091; font-size: 24px;">Nombre:   ${perfil[0].nombre}</h4>
          <p class="card-text" style="color: #4EB79E; font-size: 18px;">Apellido:   ${perfil[0].apellido}</p>
          <p class="card-text" style="color: #68c3b7; font-size: 18px;">Correo:   ${perfil[0].correo}</p>
        </div>
      </div>
      </div>
      `;

  }

  obtenerPerfil();
}

  function mostrarInicio(){
    inicioDiv = document.getElementById("inicio-content");
    inicioDiv.style.display = 'block';

    motoristasDiv = document.getElementById("motoristas-content");
    motoristasDiv.style.display = 'none';

    empresasDiv = document.getElementById("empresas-content");
    empresasDiv.style.display = 'none';

    ordenesDiv = document.getElementById("ordenes-content");
    ordenesDiv.style.display = 'none';

    productosDiv = document.getElementById("productos-content");
    productosDiv.style.display = 'none';

    perfilDiv = document.getElementById("perfil-content");
    perfilDiv.style.display = 'none';
      
  }
//Fin de seccion mostrar


  //funciones motoristas
  function mostraragregarMotorista(){
    const inicioDiv = document.getElementById("inicio-content");
    const motoristasDiv = document.getElementById("motoristas-content");

    inicioDiv.style.display = 'none';

    empresasDiv = document.getElementById("empresas-content");
    empresasDiv.style.display = 'none';

    ordenesDiv = document.getElementById("ordenes-content");
    ordenesDiv.style.display = 'none';

    productosDiv = document.getElementById("productos-content");
    productosDiv.style.display = 'none';

    perfilDiv = document.getElementById("perfil-content");
    perfilDiv.style.display = 'none';

    //mostrar formulario para agregar motorista
    motoristasDiv.innerHTML = `
    <div class="row">
    <div class="col-4"></div>
    <div class="col-8" style="margin-top:10%; padding-right: 25%;">
      <div class="card-body">
        <p class="card-title" style="color: #539091; font-size: 18px;"><input type="text" id="nombreMotorista" style="width: 50%;"> | Nombre</p>
        <p class="card-text" style="color: #4EB79E; font-size: 18px;"><input type="text" id="apellidoMotorista" style="width: 50%;"> | Apellido</p>
        <p class="card-text" style="color: #68c3b7; font-size: 18px;"><input type="text" id="correoMotorista" style="width: 50%;"> | Correo</p>
        <p class="card-text" style="color: #539091; font-size: 18px;"><input type="password" id="contrasenaMotorista" style="width: 50%;"> | Contraseña</p>
      <div class="button-group" style="display: flex;width: 50%;gap: 10%;margin-bottom: 10%;">
        <a href="#" onclick="guardarMotorista()" class="btn btn-primary" style="background-color: #4EB79E; font-size: 14px;">Guardar</a>
      </div>
    </div>
    </div>
  </div>
    `;
  }

  async function guardarMotorista() {
    let id = motoristas.length + 1;
    let nombre = document.getElementById("nombreMotorista").value;
    let apellido = document.getElementById("apellidoMotorista").value;
    let correo = document.getElementById("correoMotorista").value;
    let contrasena = document.getElementById("contrasenaMotorista").value;
    let ordenesPendientes = [];

    try {
      let respuesta = await fetch(`http://localhost:3000/motors/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          "id": id,
          "nombre": nombre,
          "apellido": apellido,
          "correo": correo,
          "contrasena": contrasena,
          "ordenesPendientes": ordenesPendientes
        })
      });

      let motorista = await respuesta.json();
      alert("Se ha agregado el motorista");
      console.log(motorista);
      mostrarMotoristas();
    } catch (error) {
      console.log(error);
    }
  }

  async function eliminarMotorista(id) {
    try {
      let respuesta = await fetch(`http://localhost:3000/motors/`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "id": id
        })
      });

      let motorista = await respuesta.json();
      //muestra una alerta en el navegador de que se elimino el motorista
      alert("Se ha eliminado el motorista");
      console.log(motorista);
      mostrarMotoristas();
    } catch (error) {
      console.log(error);
    }
  }

  function mostrarEditarMotorista(id) {
    const motoristasDiv = document.getElementById("motoristas-content");
    const editarMotoristaDiv = document.getElementById("editar-motorista-content");


    motoristasDiv.style.display = 'none';
    editarMotoristaDiv.style.display = 'block';

    //formulario para editar motorista
    editarMotoristaDiv.innerHTML = `
    <div class="row">
    <div class="col-4"></div>
    
    <div class="col-8" style="margin-top:10%; padding-right: 25%;">
      <div class="card-body">
        <p class="card-title" style="color: #539091; font-size: 18px;"><input type="text" value="${motoristas[id-1].nombre}" id="nombreMotorista" style="width: 50%;"> | Nombre</p>
        <p class="card-text" style="color: #4EB79E; font-size: 18px;"><input type="text" value="${motoristas[id-1].apellido}" id="apellidoMotorista" style="width: 50%;"> | Apellido</p>
        <p class="card-text" style="color: #68c3b7; font-size: 18px;"><input type="text" value="${motoristas[id-1].correo}" id="correoMotorista" style="width: 50%;"> | Correo</p>
        <p class="card-text" style="color: #539091; font-size: 18px;"><input type="password" value="${motoristas[id-1].contrasena}" id="contrasenaMotorista" style="width: 50%;"> | Contraseña</p>
      <div class="button-group" style="display: flex;width: 50%;gap: 10%;margin-bottom: 10%;">
        <a href="#" onclick="editarMotorista(${id})" class="btn btn-primary" style="background-color: #4EB79E; font-size: 14px;">Guardar</a>
      </div>
    </div>
    </div>
  </div>
    `;
  }

  async function editarMotorista(id) {
    let nombre = document.getElementById("nombreMotorista").value;
    let apellido = document.getElementById("apellidoMotorista").value;
    let correo = document.getElementById("correoMotorista").value;
    let contrasena = document.getElementById("contrasenaMotorista").value;
    let ordenesPendientes = [];

    const motoristasDiv = document.getElementById("motoristas-content");
    const editarMotoristaDiv = document.getElementById("editar-motorista-content");


    try {
      let respuesta = await fetch(`http://localhost:3000/motors/`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "id": id,
          "nombre": nombre,
          "apellido": apellido,
          "correo": correo,
          "contrasena": contrasena,
          "ordenesPendientes": ordenesPendientes
        })
      });

      let motorista = await respuesta.json();
      console.log(motorista);
      alert("Se ha editado el motorista");
      mostrarMotoristas();
      //motoristasDiv.style.display = 'block';
      editarMotoristaDiv.style.display = 'none';
    } catch (error) {
      console.log(error);
    }
  }
  //fin funciones motoristas


  //funciones empresas
  function mostraragregarEmpresa(){
    const inicioDiv = document.getElementById("inicio-content");
    const empresasDiv = document.getElementById("empresas-content");

    inicioDiv.style.display = 'none';

    motoristasDiv = document.getElementById("motoristas-content");
    motoristasDiv.style.display = 'none'

    ordenesDiv = document.getElementById("ordenes-content");
    ordenesDiv.style.display = 'none';

    productosDiv = document.getElementById("productos-content");
    productosDiv.style.display = 'none';

    perfilDiv = document.getElementById("perfil-content");
    perfilDiv.style.display = 'none';

    //mostrar formulario para agregar empresa
    empresasDiv.innerHTML = `
    <div class="row">
    <div class="col-4"></div>
    <div class="col-8" style="margin-top:10%; padding-right: 25%;">
      <div class="card-body">
        <p class="card-title" style="color: #539091; font-size: 18px;"><input type="text" id="nombreEmpresa" style="width: 50%;"> | Nombre</p>
        <p class="card-text" style="color: #4EB79E; font-size: 18px;"><input type="text" id="nombreContacto" style="width: 50%;"> | Contacto</p>
        <p class="card-text" style="color: #68c3b7; font-size: 18px;"><input type="text" id="telefono" style="width: 50%;"> | Telefono</p>
        <p class="card-text" style="color: #539091; font-size: 18px;"><input type="text" id="direccion" style="width: 50%;"> | Direccion</p>
      <div class="button-group" style="display: flex;width: 50%;gap: 10%;margin-bottom: 10%;">
        <a href="#" onclick="guardarEmpresa()" class="btn btn-primary" style="background-color: #4EB79E; font-size: 14px;">Guardar</a>
      </div>
    </div>
    </div>
  </div>
    `;

  }
  
  async function guardarEmpresa() {
    let id = empresas.length + 1;
    let nombreEmpresa = document.getElementById("nombreEmpresa").value;
    let nombreContacto = document.getElementById("nombreContacto").value;
    let telefono = document.getElementById("telefono").value;
    let direccion = document.getElementById("direccion").value;
    
    try {
      let respuesta = await fetch(`http://localhost:3000/empresas/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "id": id,
          "nombreEmpresa": nombreEmpresa,
          "nombreContacto": nombreContacto,
          "telefono": telefono,
          "direccion": direccion
        })
      });
  
      let empresa = await respuesta.json();
      alert("Se ha agregado la empresa");
      console.log(empresa);
      mostrarEmpresas();
    } catch (error) {
      console.log(error);
    }
  }

  async function eliminarEmpresa(id) {
    try {
      let respuesta = await fetch(`http://localhost:3000/empresas/`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "id": id
        })
      });
      
      let empresa = await respuesta.json();
      //muestra una alerta en el navegador de que se elimino la empresa
      alert("Se ha eliminado la empresa");
      console.log(empresa);
      mostrarEmpresas(); 
    } catch (error) {
      console.log(error);
    }
  }

  function mostrarEditarEmpresa(id) {
    const empresasDiv = document.getElementById("empresas-content");
    const editarEmpresaDiv = document.getElementById("editar-empresa-content");


    empresasDiv.style.display = 'none';
    editarEmpresaDiv.style.display = 'block';

    //formulario para editar empresa
    editarEmpresaDiv.innerHTML = `
    <div class="row">
    <div class="col-4"></div>

    <div class="col-8" style="margin-top:10%; padding-right: 25%;">

      <div class="card-body">
        <h4 class="card-title" style="color: #539091; font-size: 24px;">Nombre:   <input type="text" value="${empresas[id-1].nombreEmpresa}" id="nombreEmpresa" style="width: 50%;"></h4>
        <p class="card-text" style="color: #4EB79E; font-size: 18px;">Contacto:   <input type="text" value="${empresas[id-1].nombreContacto}" id="nombreContacto" style="width: 50%;"></p>
        <p class="card-text" style="color: #68c3b7; font-size: 18px;">Teléfono:   <input type="text" value="${empresas[id-1].telefono}" id="telefono" style="width: 50%;"></p>
        <p class="card-text" style="color: #539091; font-size: 18px;">Dirección:  <input type="text" value="${empresas[id-1].direccion}" id="direccion" style="width: 50%;"></p>
      <div class="button-group" style="display: flex;width: 50%;gap: 10%;margin-bottom: 10%;">
        <a href="#" onclick="editarEmpresa(${id})" class="btn btn-primary" style="background-color: #4EB79E; font-size: 14px;">Guardar</a>
      </div>
      </div>
    </div>
  </div>
    `;
  }


  async function editarEmpresa(id) {
    let nombreEmpresa = document.getElementById("nombreEmpresa").value;
    let nombreContacto = document.getElementById("nombreContacto").value;
    let telefono = document.getElementById("telefono").value;
    let direccion = document.getElementById("direccion").value;
    
    const empresasDiv = document.getElementById("empresas-content");
    const editarEmpresaDiv = document.getElementById("editar-empresa-content");


    try {
      let respuesta = await fetch(`http://localhost:3000/empresas/`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "id": id,
          "nombreEmpresa": nombreEmpresa,
          "nombreContacto": nombreContacto,
          "telefono": telefono,
          "direccion": direccion
        })
      });
  
      let empresa = await respuesta.json();
      console.log(empresa);
      alert("Se ha editado la empresa");
      mostrarEmpresas();
      //empresasDiv.style.display = 'block';
      editarEmpresaDiv.style.display = 'none';
    } catch (error) {
      console.log(error);
    }
  }
  //fin funciones empresas

  //funciones productos
  function mostraragregarProducto(){
    const inicioDiv = document.getElementById("inicio-content");
    const productosDiv = document.getElementById("productos-content");

    inicioDiv.style.display = 'none';

    motoristasDiv = document.getElementById("motoristas-content");
    motoristasDiv.style.display = 'none'

    empresasDiv = document.getElementById("empresas-content");
    empresasDiv.style.display = 'none';

    ordenesDiv = document.getElementById("ordenes-content");
    ordenesDiv.style.display = 'none';

    perfilDiv = document.getElementById("perfil-content");
    perfilDiv.style.display = 'none';

    //mostrar formulario para agregar producto
    productosDiv.innerHTML = `
    <div class="row">
    <div class="col-4"></div>
    <div class="col-8" style="margin-top:10%; padding-right: 25%;">
      <div class="card-body">
        <p class="card-title" style="color: #539091; font-size: 18px;"><input type="text" id="nombreProducto" style="width: 50%;"> | Nombre</p>
        <p class="card-text" style="color: #4EB79E; font-size: 18px;"><input type="text" id="empresaProducto" style="width: 50%;"> | Empresa</p>
        <p class="card-text" style="color: #4EB79E; font-size: 18px;"><input type="text" id="detalleProducto" style="width: 50%;"> | Detalle</p>
        <p class="card-text" style="color: #68c3b7; font-size: 18px;"><input type="text" id="precioProducto" style="width: 50%;"> | Precio</p>
        <p class="card-text" style="color: #539091; font-size: 18px;"><input type="text" id="inventarioProducto" style="width: 50%;"> | Inventario</p>
      <div class="button-group" style="display: flex;width: 50%;gap: 10%;margin-bottom: 10%;">
        <a href="#" onclick="guardarProducto()" class="btn btn-primary" style="background-color: #4EB79E; font-size: 14px;">Guardar</a>
      </div>
    </div>
    </div>
  </div>
    `;
  }

  async function guardarProducto() {
    let id = productos.length + 1;
    let empresa = document.getElementById("empresaProducto").value;
    let inventario = document.getElementById("inventarioProducto").value;
    let nombre = document.getElementById("nombreProducto").value;
    let precio = document.getElementById("precioProducto").value;
    let detalle = document.getElementById("detalleProducto").value;

    try {
      let respuesta = await fetch(`http://localhost:3000/prods/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "id": id,
          "empresa": empresa,
          "inventario": inventario,
          "nombre": nombre,
          "precio": precio,
          "detalle": detalle
        })
      });
  
      let producto = await respuesta.json();
      alert("Se ha agregado el producto");
      console.log(producto);
      mostrarProductos();
    } catch (error) {
      console.log(error);
    }
  }

  async function eliminarProducto(id) {
    try {
      let respuesta = await fetch(`http://localhost:3000/prods/`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "id": id
        })
      });
      
      let producto = await respuesta.json();
      //muestra una alerta en el navegador de que se elimino el producto
      alert("Se ha eliminado el producto");
      console.log(producto);
      mostrarProductos();
    } catch (error) {
      console.log(error);
    }
  }

  function mostrarEditarProducto(id) {
    const productosDiv = document.getElementById("productos-content");
    const editarProductoDiv = document.getElementById("editar-producto-content");


    productosDiv.style.display = 'none';
    editarProductoDiv.style.display = 'block';

    //formulario para editar producto
    editarProductoDiv.innerHTML = `
    <div class="row">
    <div class="col-4"></div>

    <div class="col-8" style="margin-top:10%; padding-right: 25%;">

      <div class="card-body">
        <p class="card-title" style="color: #539091; font-size: 18px;"><input type="text" value="${productos[id-1].nombre}" id="nombreProducto" style="width: 50%;"> | Nombre</p>
        <p class="card-text" style="color: #4EB79E; font-size: 18px;"><input type="text" value="${productos[id-1].detalle}" id="detalleProducto" style="width: 50%;"> | Detalle</p>
        <p class="card-text" style="color: #68c3b7; font-size: 18px;"><input type="text" value="${productos[id-1].precio}" id="precioProducto" style="width: 50%;"> | Precio</p>
        <p class="card-text" style="color: #539091; font-size: 18px;"><input type="text" value="${productos[id-1].inventario}" id="inventarioProducto" style="width: 50%;"> | Inventario</p>
      <div class="button-group" style="display: flex;width: 50%;gap: 10%;margin-bottom: 10%;">
        <a href="#" onclick="editarProducto(${id})" class="btn btn-primary" style="background-color: #4EB79E; font-size: 14px;">Guardar</a>
      </div>
      </div>
    </div>
  </div>
    `;
  }

  async function editarProducto(id) {
    let inventario = document.getElementById("inventarioProducto").value;
    let nombre = document.getElementById("nombreProducto").value;
    let precio = document.getElementById("precioProducto").value;
    let detalle = document.getElementById("detalleProducto").value;
    
    const productosDiv = document.getElementById("productos-content");
    const editarProductoDiv = document.getElementById("editar-producto-content");


    try {
      let respuesta = await fetch(`http://localhost:3000/prods/`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "id": id,
          "inventario": inventario,
          "nombre": nombre,
          "precio": precio,
          "detalle": detalle
        })
      });
  
      let producto = await respuesta.json();
      console.log(producto);
      alert("Se ha editado el producto");
      mostrarProductos();
      //productosDiv.style.display = 'block';
      editarProductoDiv.style.display = 'none';
    } catch (error) {
      console.log(error);
    }
    }
  //fin funciones productos

  //funciones ordenes
  function mostraragregarOrden(){
    inicioDiv = document.getElementById("inicio-content");
    inicioDiv.style.display = 'none';

    motoristasDiv = document.getElementById("motoristas-content");
    motoristasDiv.style.display = 'none'

    empresasDiv = document.getElementById("empresas-content");
    empresasDiv.style.display = 'none';

    ordenesDiv = document.getElementById("ordenes-content");
    ordenesDiv.style.display = 'block';

    productosDiv = document.getElementById("productos-content");
    productosDiv.style.display = 'none';

    perfilDiv = document.getElementById("perfil-content");
    perfilDiv.style.display = 'none';


    //mostrar formulario para agregar orden
    ordenesDiv.innerHTML = `
    <div class="row">
    <div class="col-4"></div>
    
    <div class="col-8" style="margin-top:10%; padding-right: 25%;">
      <div class="card-body">
        <p class="card-title" style="color: #539091; font-size: 18px;"><input type="text" id="nombreOrden" style="width: 50%;"> | Nombre</p>
        <p class="card-text" style="color: #4EB79E; font-size: 18px;"><input type="text" id="apellidoOrden" style="width: 50%;"> | Apellido</p>
        <p class="card-text" style="color: #68c3b7; font-size: 18px;"><input type="text" id="telefonoOrden" style="width: 50%;"> | Telefono</p>
        <p class="card-text" style="color: #539091; font-size: 18px;"><input type="text" id="descripcionOrden" style="width: 50%;"> | Descripcion</p>
        <p class="card-text" style="color: #539091; font-size: 18px;"><input type="text" id="direccionOrden" style="width: 50%;"> | Direccion</p>
        <p class="card-text" style="color: #539091; font-size: 18px;"><input type="text" id="estadoOrden" style="width: 50%;"> | Estado</p>
        <p class="card-text" style="color: #539091; font-size: 18px;"><input type="text" id="fechaOrden" style="width: 50%;"> | Fecha</p>
        <p class="card-text" style="color: #539091; font-size: 18px;"><input type="text" id="horaOrden" style="width: 50%;"> | Hora</p>
      <div class="button-group" style="display: flex;width: 50%;gap: 10%;margin-bottom: 10%;">
        <a href="#" onclick="guardarOrden()" class="btn btn-primary" style="background-color: #4EB79E; font-size: 14px;">Guardar</a>
      </div>
    </div>
    </div>
  </div>
    `;
  }

  async function guardarOrden() {
    let id = ordenes.length + 1;
    let nombre = document.getElementById("nombreOrden").value;
    let apellido = document.getElementById("apellidoOrden").value;
    let telefono = document.getElementById("telefonoOrden").value;
    let descripcion = document.getElementById("descripcionOrden").value;
    let direccion = document.getElementById("direccionOrden").value;
    let estado = document.getElementById("estadoOrden").value;
    let fecha = document.getElementById("fechaOrden").value;
    let hora = document.getElementById("horaOrden").value;
    
    try {
      let respuesta = await fetch(`http://localhost:3000/ordenes/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "id": id,
          "nombre": nombre,
          "apellido": apellido,
          "telefono": telefono,
          "descripcion": descripcion,
          "direccion": direccion,
          "estado": estado,
          "fecha": fecha,
          "hora": hora
        })
      });
  
      let orden = await respuesta.json();
      alert("Se ha agregado la orden");
      console.log(orden);
      mostrarOrdenes();
    } catch (error) {
      console.log(error);
    }
  }

  async function eliminarOrden(id) {
    try {
      let respuesta = await fetch(`http://localhost:3000/ordenes/`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "id": id
        })
      });
      
      let orden = await respuesta.json();
      //muestra una alerta en el navegador de que se elimino la orden
      alert("Se ha eliminado la orden");
      console.log(orden);
      mostrarOrdenes();
    } catch (error) {
      console.log(error);
    }
  }

  function mostrarEditarOrden(id) {
    const ordenesDiv = document.getElementById("ordenes-content");
    const editarOrdenDiv = document.getElementById("editar-orden-content");


    ordenesDiv.style.display = 'none';
    editarOrdenDiv.style.display = 'block';

    //formulario para editar orden
    editarOrdenDiv.innerHTML = `
    <div class="row">
    <div class="col-4"></div>

    <div class="col-8" style="margin-top:10%; padding-right: 25%;">

      <div class="card-body">
        <p class="card-title" style="color: #539091; font-size: 18px;"><input type="text" value="${ordenes[id-1].nombre}" id="nombreOrden" style="width: 50%;"> | Nombre</p>
        <p class="card-text" style="color: #4EB79E; font-size: 18px;"><input type="text" value="${ordenes[id-1].apellido}" id="apellidoOrden" style="width: 50%;"> | Apellido</p>
        <p class="card-text" style="color: #68c3b7; font-size: 18px;"><input type="text" value="${ordenes[id-1].telefono}" id="telefonoOrden" style="width: 50%;"> | Telefono</p>
        <p class="card-text" style="color: #539091; font-size: 18px;"><input type="text" value="${ordenes[id-1].descripcion}" id="descripcionOrden" style="width: 50%;"> | Descripcion</p>
        <p class="card-text" style="color: #539091; font-size: 18px;"><input type="text" value="${ordenes[id-1].direccion}" id="direccionOrden" style="width: 50%;"> | Direccion</p>
        <p class="card-text" style="color: #539091; font-size: 18px;"><input type="text" value="${ordenes[id-1].estado}" id="estadoOrden" style="width: 50%;"> | Estado</p>
        <p class="card-text" style="color: #539091; font-size: 18px;"><input type="text" value="${ordenes[id-1].fecha}" id="fechaOrden" style="width: 50%;"> | Fecha</p>
        <p class="card-text" style="color: #539091; font-size: 18px;"><input type="text" value="${ordenes[id-1].hora}" id="horaOrden" style="width: 50%;"> | Hora</p>
      <div class="button-group" style="display: flex;width: 50%;gap: 10%;margin-bottom: 10%;">
        <a href="#" onclick="editarOrden(${id})" class="btn btn-primary" style="background-color: #4EB79E; font-size: 14px;">Guardar</a>
      </div>
      </div>
    </div>
  </div>
    `;
  }

  async function editarOrden(id) {
    let nombre = document.getElementById("nombreOrden").value;
    let apellido = document.getElementById("apellidoOrden").value;
    let telefono = document.getElementById("telefonoOrden").value;
    let descripcion = document.getElementById("descripcionOrden").value;
    let direccion = document.getElementById("direccionOrden").value;
    let estado = document.getElementById("estadoOrden").value;
    let fecha = document.getElementById("fechaOrden").value;
    let hora = document.getElementById("horaOrden").value;
    let productos = [];

    const ordenesDiv = document.getElementById("ordenes-content");
    const editarOrdenDiv = document.getElementById("editar-orden-content");


    try {
      let respuesta = await fetch(`http://localhost:3000/ordenes/`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "id": id,
          "nombre": nombre,
          "apellido": apellido,
          "telefono": telefono,
          "descripcion": descripcion,
          "direccion": direccion,
          "estado": estado,
          "fecha": fecha,
          "hora": hora,
          "productos": productos
        })
      });
  
      let orden = await respuesta.json();
      console.log(orden);
      alert("Se ha editado la orden");
      mostrarOrdenes();
      //ordenesDiv.style.display = 'block';
      editarOrdenDiv.style.display = 'none';
    }
    catch (error) {
      console.log(error);
    }
  }
  //fin funciones ordenes

  //funciones perfil
  



