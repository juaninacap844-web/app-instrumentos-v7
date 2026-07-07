function TablaInstrumentos(props) {
  return (
    <>
      <h2>Lista de Instrumentos</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Disponible</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {props.instrumentos.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center text-muted">
                No hay instrumentos registrados
              </td>
            </tr>
          )}

          {props.instrumentos.map(function (inst) {
            return (
              <tr key={inst.id}>
                <td>{inst.codigo || "—"}</td>
                <td>{inst.nombre}</td>
                <td>{inst.marca}</td>
                <td>{inst.categoria || "—"}</td>
                <td>${Number(inst.precio).toLocaleString("es-CL")}</td>
                <td>{inst.stock}</td>
                <td>{inst.disponible ? "Sí" : "No"}</td>
                <td>
                  <input type="button" value="Editar" className="btn btn-sm btn-warning me-1" onClick={() => props.onEditar(inst)}/>
                  <input type="button" value="Eliminar" className="btn btn-sm btn-danger" onClick={() => props.onEliminar(inst.id)}/>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default TablaInstrumentos;
