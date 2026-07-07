function InstrumentoForm(props) {
  return (
    <form id="form-instrumento" className="border p-3 rounded bg-light mb-4" onSubmit={props.onGuardar}>
      <div className="mb-2">
        <label>Código</label>
        <input type="text" id="codigo" className="form-control" placeholder="Ej: INS001" value={props.codigo} onChange={(e) => props.setCodigo(e.target.value)}/>
        <br></br>

        <label>Nombre</label>
        <input type="text" id="nombre" className="form-control" placeholder="Ej: Guitarra Eléctrica" zWvalue={props.nombre} onChange={(e) => props.setNombre(e.target.value)}/>
        <br></br>

        <label>Marca</label>
        <input type="text" id="marca" className="form-control" placeholder="Ej: Fender" value={props.marca} onChange={(e) => props.setMarca(e.target.value)}/>
        <br></br>
        
        <label>Precio</label>
        <input type="number" id="precio" className="form-control" placeholder="Precio" value={props.precio} onChange={(e) => props.setPrecio(e.target.value)}/>
        <br></br>
        
        <label>Stock</label>
        <input type="number" id="stock" className="form-control" placeholder="Cantidad en stock" value={props.stock} onChange={(e) => props.setStock(e.target.value)}/>
        <br></br>
        
        <label>Disponible</label>
        <select id="disponible" className="form-control" value={props.disponible} onChange={(e) => props.setDisponible(e.target.value)}>
          <option value="">Seleccione</option>
          <option value="true">Si</option>
          <option value="false">No</option>
        </select>
        <br></br>
        
        <label>Categoría</label>
        <select id="categoria" className="form-control" value={props.categoria} onChange={(e) => props.setCategoria(e.target.value)}>
          <option value="">Seleccione</option>
          <option>Cuerdas</option>
          <option>Eléctricos</option>
          <option>Viento</option>
          <option>Percusión</option>
          <option>Teclados</option>
        </select>
        <br></br>
        
        <label>Proveedor</label>
        <input type="text" id="proveedorNombre" className="form-control" placeholder="Nombre del proveedor" value={props.proveedorNombre} onChange={(e) => props.setProveedorNombre(e.target.value)}/>
        <br></br>
        
        <label>Ciudad proveedor</label>
        <input type="text" id="proveedorCiudad" className="form-control" placeholder="Ciudad" value={props.proveedorCiudad} onChange={(e) => props.setProveedorCiudad(e.target.value)}/>
      </div>

      {props.error && <p className="text-danger fw-bold" style={{ textAlign: "center", marginTop: "10px" }}>{props.error}</p>}

      <div className="contenedor-botones-react">
        <input type="submit" value={props.editando ? "Guardar cambios" : "Guardar"} id="bt-guardar" className="btn btn-dark"/>
        {props.editando && (
          <input type="button" value="Cancelar edición" id="bt-cancelar" className="btn btn-secondary" onClick={props.onCancelar} style={{ width: "100%", padding: "10px", fontSize: "16px", marginTop: "5px" }}/>
        )}
      </div>
    </form>
  );
}

export default InstrumentoForm;