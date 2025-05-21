import { Vuelo } from "./BuscadorVuelos";

interface Props {
    vuelos : Array<Vuelo>
}

const ListadoVuelos = ({vuelos}: Props) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Fecha Salida</th>
                    <th>Fecha Llegada</th>
                    <th>Origen</th>
                    <th>Destino</th>
                    <th>Pasajeros</th>
                    <th>Piloto</th>
                    <th>Estatus</th>
                </tr>
            </thead>
            <tbody>
                {
                    vuelos.length === 0 &&
                    <tr>
                          <td colSpan={7}>No se han encontrado vuelos</td>
                    </tr>
                }
                {
                    vuelos.length > 0 &&
                    vuelos.map(x =>
                    <tr>
                        <td>{x.FechaHoraSalida}</td>
                        <td>{x.FechaHoraLlegadaAproximada}</td>
                        <td>{x.CiudadOrigen}</td>
                        <td>{x.CiudadDestino}</td>
                        <td>{x.PasajerosActuales}</td>
                        <td>{x.NombrePiloto}</td>
                        <td>{x.EstatusVuelo}</td>
                    </tr>
                    )
                }
            </tbody>
        </table>
    )
}

export default ListadoVuelos;