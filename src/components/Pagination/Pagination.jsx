import React from 'react';
import Pagination from 'rc-pagination';

import './Pagination.scss';

export default function PaginationMovies(props) {
    const { currentPage, totalItems, onChangePage } = props;

    return (
        <Pagination 
        className="pagination" 
        current={currentPage} /* Pagina actual */
        total={totalItems} /* Total de películas que tenemos a nivel global */
        pageSize={24} /* Cantidad de películas que quiero que haya por página */
        onChange={onChangePage} /* La funcion que actualiza la pagina, si suma 1 mas, 2, etc */
        />
    );
}