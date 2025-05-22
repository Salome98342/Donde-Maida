const API_URL = 'http://localhost:4000/reporte-semanal';

export const obtenerReporteSemanal = async () => {
  try {
    const response = await fetch((API_URL) ,{
      method: 'GET'
    });

    if (!response.ok) throw new Error('No se pudo generar el reporte');

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reporte_semanal.xlsx';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error al obtener el reporte:', error);
    alert('Hubo un error al descargar el reporte.');
  }
};
