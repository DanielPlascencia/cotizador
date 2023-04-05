import { useState, createContext } from "react";
import {
  obtenerDiferenciaYear,
  calcularMarca,
  calcularPlan,
  formatearDinero,
} from "../helpers";

const CotizadorContext = createContext();

const CotizadorProvider = ({ children }) => {
  const [datos, setDatos] = useState({
    marca: "",
    year: "",
    plan: "",
  });
  const [error, setError] = useState("");
  const [resultado, setResultado] = useState(0);
  const [cargando, setCargando] = useState(false);

  const handleChangeDatos = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const cotizarSeguro = () => {
    // Una base.
    let CostoBase = 2000;

    // Obtener diferencia de anios.
    const diferencia = obtenerDiferenciaYear(datos.year);

    // Hay que restar el 3% por cada anio.
    let resultado = CostoBase - (diferencia * 3 * CostoBase) / 100;

    // Americano 15% || Europeo 30% || Asiatico 5%
    resultado *= calcularMarca(datos.marca);

    // Basico 20% || Completo 50%
    resultado *= calcularPlan(datos.plan);

    //Formatear Dinero:
    resultado = formatearDinero(resultado);
    setCargando(true);

    setTimeout(() => {
      setResultado(resultado);
      setCargando(false);
    }, 3000);
  };

  return (
    <CotizadorContext.Provider
      value={{
        datos,
        error,
        resultado,
        cargando,
        setError,
        handleChangeDatos,
        cotizarSeguro,
      }}
    >
      {children}
    </CotizadorContext.Provider>
  );
};

export { CotizadorProvider };

export default CotizadorContext;
