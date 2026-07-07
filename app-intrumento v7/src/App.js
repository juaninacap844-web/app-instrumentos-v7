import { useState, useEffect } from "react";
import InstrumentoForm from "./components/InstrumentoForm";
import TablaInstrumentos from "./components/TablaInstrumentos";
import "./App.css";

function App() {
  var [instrumentos, setInstrumentos] = useState(function(){
    var guardado = JSON.parse(localStorage.getItem("instrumentos"));
    return guardado ? guardado : semilla;
  });

  var [editandoId, setEditandoId] = useState(null);

  var [codigo, setCodigo] = useState("");
  var [nombre, setNombre] = useState("");
  var [marca, setMarca] = useState("");
  var [precio, setPrecio] = useState("");
  var [stock, setStock] = useState("");
  var [disponible, setDisponible] = useState("");
  var [categoria, setCategoria] = useState("");
  var [proveedorNombre, setProveedorNombre] = useState("");
  var [proveedorCiudad, setProveedorCiudad] = useState("");
  var [error, setError] = useState("");

  var [textoDolar, setTextoDolar] = useState("Aún no se ha consultado la API");
  var [cargandoDolar, setCargandoDolar] = useState(false);

  useEffect(function () {
    localStorage.setItem("instrumentos", JSON.stringify(instrumentos));
  }, [instrumentos]);

  function limpiarFormulario() {
    setEditandoId(null);
    setCodigo("");
    setNombre("");
    setMarca("");
    setPrecio("");
    setStock("");
    setDisponible("");
    setCategoria("");
    setProveedorNombre("");
    setProveedorCiudad("");
    setError("");
  }

  function agregarInstrumento(e) {
    e.preventDefault();

    if (nombre.trim() === "" || marca.trim() === "") {
      window.alert("Debe ingresar el nombre y la marca del instrumento");
      return;
    }

    var pre = parseInt(precio) || 0;
    var sto = parseInt(stock) || 0;

    if (precio !== "" && pre <= 0) {
      window.alert("El precio debe ser mayor a 0");
      return;
    }
    if (stock !== "" && sto < 0) {
      window.alert("El stock no puede ser negativo");
      return;
    }

    var inst = {
      id: editandoId,
      codigo: codigo,
      nombre: nombre,
      marca: marca,
      precio: pre,
      stock: sto,
      disponible: disponible === "true",
      categoria: categoria,
      proveedor: { nombre: proveedorNombre, ciudad: proveedorCiudad }
    };

    if (editandoId === null) {
      inst.id = siguienteId(instrumentos);
      setInstrumentos(instrumentos.concat([inst]));
      window.alert("Instrumento agregado");
    } else {
      var lista = [];
      for (var i = 0; i < instrumentos.length; i++) {
        if (instrumentos[i].id === editandoId) {
          lista.push(inst);
        } else {
          lista.push(instrumentos[i]);
        }
      }
      setInstrumentos(lista);
      window.alert("Instrumento actualizado");
    }

    limpiarFormulario();
  }


  function siguienteId(lista) {
    if (lista.length === 0) return 1;
    var ids = [];
    for (var i = 0; i < lista.length; i++) {
      ids.push(lista[i].id);
    }
    return Math.max.apply(null, ids) + 1;
  }

 
  function editarInstrumento(inst) {
    setEditandoId(inst.id);
    setCodigo(inst.codigo);
    setNombre(inst.nombre);
    setMarca(inst.marca);
    setPrecio(String(inst.precio));
    setStock(String(inst.stock));
    setDisponible(inst.disponible ? "true" : "false");
    setCategoria(inst.categoria);
    
    setProveedorNombre(inst.proveedor ? inst.proveedor.nombre : "");
    setProveedorCiudad(inst.proveedor ? inst.proveedor.ciudad : "");
    
    window.scrollTo(0, 0);
  }

  function cancelarEdicion() {
    limpiarFormulario();
  }

  function eliminarInstrumento(id) {
    var confirmar = window.confirm("¿Seguro que deseas eliminar este instrumento?");
    if (!confirmar) return;

    var listaNueva = [];
    for (var i = 0; i < instrumentos.length; i++) {
      if (instrumentos[i].id !== id) {
        listaNueva.push(instrumentos[i]);
      }
    }
    setInstrumentos(listaNueva);

    if (editandoId === id) {
      cancelarEdicion();
    }
    window.alert("Instrumento eliminado");
  }

  function consultarDolar() {
    setCargandoDolar(true);
    setTextoDolar("Consultando");

    fetch("https://open.er-api.com/v6/latest/USD")
      .then(function (respuesta) {
        return respuesta.json();
      })
      .then(function (datos) {
        var valor = datos.rates.CLP;
        setTextoDolar("1 USD = " + valor.toFixed(2) + " CLP");
        setCargandoDolar(false);
      })
      .catch(function () {
        setTextoDolar("No se pudo consultar la API");
        setCargandoDolar(false);
      });
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand">Tienda de Instrumentos</span>
        </div>
      </nav>

      <div className="container mt-4">
        <h2>Agregar Instrumento</h2>

        <InstrumentoForm
          editando={editandoId !== null}
          codigo={codigo} setCodigo={setCodigo}
          nombre={nombre} setNombre={setNombre}
          marca={marca} setMarca={setMarca}
          precio={precio} setPrecio={setPrecio}
          stock={stock} setStock={setStock}
          disponible={disponible} setDisponible={setDisponible}
          categoria={categoria} setCategoria={setCategoria}
          proveedorNombre={proveedorNombre} setProveedorNombre={setProveedorNombre}
          proveedorCiudad={proveedorCiudad} setProveedorCiudad={setProveedorCiudad}
          error={error}
          onGuardar={agregarInstrumento}
          onCancelar={cancelarEdicion}
        />

        <div className="border p-3 rounded bg-light mb-4">
          <h2 style={{ marginBottom: "10px" }}>Valor del Dólar (API)</h2>
          <p id="txt-dolar">{textoDolar}</p>
          <input type="button" value="Consultar Dólar" id="bt-dolar" className="btn btn-dark" onClick={consultarDolar} disabled={cargandoDolar}/>
        </div>

        <TablaInstrumentos instrumentos={instrumentos} onEditar={editarInstrumento} onEliminar={eliminarInstrumento}/>
      </div>
    </>
  );
}

var semilla = [
  {
    id: 1,
    codigo: "INS001",
    nombre: "Guitarra Eléctrica",
    marca: "Fender",
    precio: 950000,
    stock: 8,
    disponible: true,
    categoria: "Cuerdas",
    proveedor: { nombre: "Music Import", ciudad: "Santiago" }
  }
];

export default App;