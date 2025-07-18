import React, { useEffect, useState, useCallback } from 'react';
import axios from '../config/axios';
import debounce from 'lodash.debounce';

type Autor = {
  id: number;
  nombre: string;
};

type Editorial = {
  id: number;
  nombre: string;
};

type Genero = {
  id: number;
  nombre: string;
};

type Libro = {
  id: number;
  titulo: string;
  precio: number;
  disponible: boolean;
  autor_id: number;
  editorial_id: number;
  genero_id: number;
  editorial?: Editorial;
  genero?: Genero;
  imagen?: string;
};

type Filtros = {
  genero_id: string;
  editorial_id: string;
  autor_id: string;
  disponible: string;
  order1: string;
  order2: string;
  order3: string;  // agregadas estas dos
  order4: string;
  search: string;
};

export default function LibrosListPage() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filtros, setFiltros] = useState<Filtros>({
  genero_id: '',
  editorial_id: '',
  autor_id: '',
  disponible: '',
  order1: '',
  order2: '',
  order3: '',
  order4: '',
  search: '',
});


  const LIMIT = 10;

  const buildOrderParam = (f: Filtros) => {
    return [f.order1, f.order2].filter(Boolean).join(',');
  };

  const fetchLibros = useCallback(async (pageNum: number, filtrosActuales: Filtros) => {
    setLoading(true);
    try {
      const params: any = { page: pageNum, limit: LIMIT };

      if (filtrosActuales.genero_id) params.genero_id = filtrosActuales.genero_id;
      if (filtrosActuales.editorial_id) params.editorial_id = filtrosActuales.editorial_id;
      if (filtrosActuales.autor_id) params.autor_id = filtrosActuales.autor_id;
      if (filtrosActuales.disponible) params.disponible = filtrosActuales.disponible;
      if (filtrosActuales.search) params.search = filtrosActuales.search;

      const orderParam = buildOrderParam(filtrosActuales);
      if (orderParam) params.order = orderParam;

      const res = await axios.get('/libros', { params });
      setLibros(res.data.libros);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
    } catch {
      alert('Error al cargar los libros');
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedSearch = useCallback(
    debounce((searchTerm: string, filtrosActuales: Filtros) => {
      fetchLibros(1, { ...filtrosActuales, search: searchTerm });
      setPage(1);
    }, 500),
    [fetchLibros]
  );

  const handleFiltroChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const nuevosFiltros = { ...filtros, [name]: value };
    setFiltros(nuevosFiltros);

    if (name === 'search') {
      debouncedSearch(value, nuevosFiltros);
    } else {
      fetchLibros(1, nuevosFiltros);
      setPage(1);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchLibros(newPage, filtros);
      setPage(newPage);
    }
  };

  useEffect(() => {
    fetchLibros(page, filtros);
  }, []); // solo al montar

  return (
    <div className="container mt-4">
      <h1>Listado de Libros</h1>

      {/* Filtros */}
      <div className="row mb-2">
        <div className="col-md-2">
          <input
            type="text"
            name="search"
            value={filtros.search}
            placeholder="Buscar título..."
            onChange={handleFiltroChange}
            className="form-control"
          />
        </div>
        <div className="col-md-2">
          <select name="genero_id" value={filtros.genero_id} onChange={handleFiltroChange} className="form-select">
            <option value="">-- Género --</option>
            <option value="1">Ficción</option>
            <option value="2">No ficción</option>
          </select>
        </div>
        <div className="col-md-2">
          <select name="editorial_id" value={filtros.editorial_id} onChange={handleFiltroChange} className="form-select">
            <option value="">-- Editorial --</option>
            <option value="1">Editorial A</option>
            <option value="2">Editorial B</option>
          </select>
        </div>
        <div className="col-md-2">
          <select name="autor_id" value={filtros.autor_id} onChange={handleFiltroChange} className="form-select">
            <option value="">-- Autor --</option>
            <option value="1">Autor 1</option>
            <option value="2">Autor 2</option>
          </select>
        </div>
        <div className="col-md-2">
          <select name="disponible" value={filtros.disponible} onChange={handleFiltroChange} className="form-select">
            <option value="">-- Disponible --</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>

      {/* Ordenamiento en fila separada */}
      <div className="row mb-3">
        <div className="col-md-3">
          <label className="form-label">Ordenar por (1°)</label>
          <select name="order1" value={filtros.order1} onChange={handleFiltroChange} className="form-select">
            <option value="">-- Orden 1 --</option>
            <option value="titulo:asc">Título ↑</option>
            <option value="titulo:desc">Título ↓</option>
            <option value="precio:asc">Precio ↑</option>
            <option value="precio:desc">Precio ↓</option>
            <option value="editorial:asc">Editorial ↑</option>
            <option value="editorial:desc">Editorial ↓</option>
            <option value="genero:asc">Género ↑</option>
            <option value="genero:desc">Género ↓</option>
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label">Ordenar por (2°)</label>
          <select name="order2" value={filtros.order2} onChange={handleFiltroChange} className="form-select">
            <option value="">-- Orden 2 --</option>
            <option value="titulo:asc">Título ↑</option>
            <option value="titulo:desc">Título ↓</option>
            <option value="precio:asc">Precio ↑</option>
            <option value="precio:desc">Precio ↓</option>
            <option value="editorial:asc">Editorial ↑</option>
            <option value="editorial:desc">Editorial ↓</option>
            <option value="genero:asc">Género ↑</option>
            <option value="genero:desc">Género ↓</option>
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label">Ordenar por (3°)</label>
          <select name="order3" value={filtros.order3} onChange={handleFiltroChange} className="form-select">
            <option value="">-- Orden 3 --</option>
            <option value="titulo:asc">Título ↑</option>
            <option value="titulo:desc">Título ↓</option>
            <option value="precio:asc">Precio ↑</option>
            <option value="precio:desc">Precio ↓</option>
            <option value="editorial:asc">Editorial ↑</option>
            <option value="editorial:desc">Editorial ↓</option>
            <option value="genero:asc">Género ↑</option>
            <option value="genero:desc">Género ↓</option>
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label">Ordenar por (4°)</label>
          <select name="order4" value={filtros.order4} onChange={handleFiltroChange} className="form-select">
            <option value="">-- Orden 4 --</option>
            <option value="titulo:asc">Título ↑</option>
            <option value="titulo:desc">Título ↓</option>
            <option value="precio:asc">Precio ↑</option>
            <option value="precio:desc">Precio ↓</option>
            <option value="editorial:asc">Editorial ↑</option>
            <option value="editorial:desc">Editorial ↓</option>
            <option value="genero:asc">Género ↑</option>
            <option value="genero:desc">Género ↓</option>
          </select>
        </div>
      </div>



      {/* Tabla */}
      {loading ? (
        <p>Cargando libros...</p>
      ) : (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Imagen</th>
                <th>Precio</th>
                <th>Editorial</th>  {/* Nueva columna */}
                <th>Género</th>     {/* Nueva columna */}
                <th>Disponible</th>
              </tr>
            </thead>
            <tbody>
              {libros.length === 0 ? (
                <tr><td colSpan={6} className="text-center">No se encontraron libros</td></tr>
              ) : (
                libros.map(libro => (
                  <tr key={libro.id}>
                    <td>{libro.id}</td>
                    <td>{libro.titulo}</td>
                    <td>
                        {libro.imagen ? (
                          <img
                            src={`http://localhost:3000/uploads/${libro.imagen}`}
                            alt={libro.titulo}
                            style={{
                              width: '50px',
                              height: '75px',
                              objectFit: 'cover',
                              borderRadius: '4px',
                              boxShadow: '0 0 3px rgba(0,0,0,0.2)'
                            }}
                          />
                        ) : (
                          <span className="text-muted">Sin imagen</span>
                        )}
                      </td>
                    <td>{libro.precio}</td>
                    <td>{libro.editorial?.nombre || '—'}</td>
                    <td>{libro.genero?.nombre || '—'}</td>
                    <td>{libro.disponible ? 'Sí' : 'No'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Paginación */}
          <nav>
            <ul className="pagination justify-content-center">
              <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(page - 1)}>Anterior</button>
              </li>

              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <li key={pageNum} className={`page-item ${page === pageNum ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(pageNum)}>{pageNum}</button>
                  </li>
                );
              })}

              <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(page + 1)}>Siguiente</button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
