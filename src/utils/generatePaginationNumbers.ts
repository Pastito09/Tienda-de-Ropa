export const generatePaginationNumbers = (
  currentPage: number,
  totalPages: number
) => {
  //si el numero de paginas es 7 o menos
  // no se muestran los puntos suspensivos
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1); // [1,2,3,4,5,6,7]
  }

  //Si la pagina acutal esta entre las primeras 3 paginas
  //mostrar las primeras 3, ..., y las ultimas 2

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // si la pagina actual esta entre las ultimas 3 paginas
  // mostrar las primeras 2, ... y las ultimas 3.

  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // si la pagina actual esta en otro lugar medio
  //mostrar la primera pagina, ..., pagina acutal y cercanos
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export default generatePaginationNumbers;
