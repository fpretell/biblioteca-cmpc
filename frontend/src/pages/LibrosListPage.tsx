import React, { useEffect, useState, useCallback } from 'react';
import axios from '../config/axios';
import debounce from 'lodash.debounce';

import LibroTable from '../components/LibroTable';
import Paginacion from '../components/Paginacion';

type Autor = { id: number; nombre: string };
type Editorial = { id: number; nombre: string };
type Genero = { id: number; nombre: string };

export type Libro = {
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
  order3: string;
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

  const [generos, setGeneros] = useState<Genero[]>([]);
  const [editoriales, setEditoriales] = useState<Editorial[]>([]);
  const [autores, setAutores] = useState<Autor[]>([]);

  const LIMIT = 10;

  const buildOrderParam = (f: Filtros) => {
    return [f.order1, f.order2, f.order3, f.order4].filter(Boolean).join(',');
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

  const fetchOpcionesFiltros = async () => {
    try {
      const [resGeneros, resEditoriales, resAutores] = await Promise.all([
        axios.get('/generos'),
        axios.get('/editoriales'),
        axios.get('/autores'),
      ]);
      setGeneros(resGeneros.data);
      setEditoriales(resEditoriales.data);
      setAutores(resAutores.data);
    } catch (err) {
      console.error('Error cargando filtros:', err);
    }
  };

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
    fetchOpcionesFiltros();
  }, []); // solo al montar

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-3 text-center">📚 Listado de Libros</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-header fw-bold">Filtros y Ordenamiento</div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-3">
              <input
                type="text"
                name="search"
                value={filtros.search}
                placeholder="Buscar título..."
                onChange={handleFiltroChange}
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <select name="genero_id" value={filtros.genero_id} onChange={handleFiltroChange} className="form-select">
                <option value="">-- Género --</option>
                {generos.map((g) => (
                  <option key={g.id} value={g.id}>{g.nombre}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select name="editorial_id" value={filtros.editorial_id} onChange={handleFiltroChange} className="form-select">
                <option value="">-- Editorial --</option>
                {editoriales.map((e) => (
                  <option key={e.id} value={e.id}>{e.nombre}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select name="autor_id" value={filtros.autor_id} onChange={handleFiltroChange} className="form-select">
                <option value="">-- Autor --</option>
                {autores.map((a) => (
                  <option key={a.id} value={a.id}>{a.nombre}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-3">
              <select name="disponible" value={filtros.disponible} onChange={handleFiltroChange} className="form-select">
                <option value="">-- Disponible --</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>

          <div className="row">
            {['order1', 'order2', 'order3', 'order4'].map((orderKey, idx) => (
              <div className="col-md-3" key={orderKey}>
                <label className="form-label">Ordenar por ({idx + 1}°)</label>
                <select
                  id={orderKey}
                  name={orderKey}
                  value={filtros[orderKey as keyof Filtros]}
                  onChange={handleFiltroChange}
                  className="form-select"
                >
                  <option value="">-- Orden {idx + 1} --</option>
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
            ))}
          </div>
        </div>
      </div>

      {/* Tabla de libros */}
      {loading ? <p>Cargando libros...</p> : <LibroTable libros={libros} />}

      {/* Paginación */}
      <Paginacion page={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
