import { useEffect, useState } from "react";
import ListadoVuelos from "./ListadoVuelos";

type Ciudad = {
    Nombre: string;
};

type EstatusVuelo = {
    Nombre: string;
};

export type Vuelo = {
    PaisOrigen: string,
    CiudadOrigen: string,
    AeropuertoOrigen: string,
    PaisDestino: string,
    CiudadDestino: string,
    AeropuertoDestino: string,
    PasajerosActuales: number,
    FechaHoraSalida: string,
    FechaHoraLlegadaAproximada: string,
    NombrePiloto: string,
    EstatusVuelo: string
};

const BuscadorVuelos = () => {
    const [ciudadesOrigen, setCiudadesOrigen] = useState<Ciudad[]>([]);
    const [ciudadesDestino, setCiudadesDestino] = useState<Ciudad[]>([]);
    const [listaEstatus, setListaEstatus] = useState<EstatusVuelo[]>([]);
    const [listaVuelos, setListaVuelos] = useState<Vuelo[]>([]);


    const listarCiudadesOrigen = async () => {
        const response = await fetch("http://localhost:5000/api/vuelos/ciudades-origen");
        if (response.ok) {
            const arr = await response.json();
            let ciudades: Array<Ciudad> = [];

            arr.map((x: string) => ciudades.push({ Nombre: x }));
            
            console.log("Ciudades origen:", ciudades); // Depuración

            setCiudadesOrigen(ciudades); // ✅ Corregido: antes estaba usando setCiudadesDestino
        }
    };

      const listarCiudadesDestino = async () => {
        const response = await fetch("http://localhost:5000/api/vuelos/ciudades-destino");
        if (response.ok) {
            const arr = await response.json();
            let ciudades: Array<Ciudad> = [];

            arr.map((x: string) => ciudades.push({ Nombre: x }));
            
            console.log("Ciudades Destino:", ciudades); // Depuración

            setCiudadesDestino(ciudades); // ✅ Corregido: antes estaba usando setCiudadesDestino
        }
    };

    const listarEstatus = async () => {
        const response = await fetch("http://localhost:5000/api/vuelos/estatus");
        if (response.ok) {
            const arr = await response.json();
            let estatus: Array<EstatusVuelo> = [];
            arr.map((x: string) => estatus.push({ Nombre: x }));
            

            setListaEstatus(estatus); // ✅ Corregido: antes estaba usando setCiudadesDestino
        }
    };

    const listarVuelos = async () => {
        const response = await fetch("http://localhost:5000/api/vuelos/listar-vuelos");
        if (response.ok) {
            const arr = await response.json();
           setListaVuelos(arr);

        }
    };

    useEffect(() => {
        listarCiudadesOrigen();
        listarCiudadesDestino();
        listarEstatus();
        listarVuelos();
    }, []);

    return (
        <>
            <div className="h1">Buscador de Vuelos</div>
            <div className="card mt-4">
                <div className="card-header">Busqueda de Vuelos</div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="mb-3">
                                <label>Fecha Inicial</label>
                                <input type="date" className="form-control" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="mb-3">
                                <label>Fecha Final</label>
                                <input type="date" className="form-control" />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="mb-3">
                                <label>Origen</label>
                                <select className="form-control">
                                    <option value="">(Todos)</option>
                                    {
                                        ciudadesOrigen.map(x =>
                                            <option key={x.Nombre} value={x.Nombre}>{x.Nombre}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="mb-3">
                                <label>Destino</label>
                                <select className="form-control">
                                     <option value="">(Todos)</option>
                                    {
                                        ciudadesDestino.map(x =>
                                            <option key={x.Nombre} value={x.Nombre}>{x.Nombre}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="mb-3">
                                <label>Estatus</label>
                                <select className="form-control">
                                    <option value="">(Todos)</option>
                                    {
                                        listaEstatus.map(x =>
                                            <option key={x.Nombre} value={x.Nombre}>{x.Nombre}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-12 d-flex justify-content-end">
                            <button className="btn btn-primary" onClick={()=> {listarVuelos();}}>Buscar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header">Vuelos Disponibles</div>
                <div className="card-body">
                    <ListadoVuelos vuelos={listaVuelos} />
                </div>
            </div>
        </>
    );
};

export default BuscadorVuelos;
