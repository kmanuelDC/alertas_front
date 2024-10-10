import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import dayjs from 'dayjs';

export const EchartComponent = ({ data }) => {
    // Referencia para el DOM donde se va a renderizar el gráfico
    const chartRef = useRef(null);

    useEffect(() => {
        const chartInstance = echarts.init(chartRef.current);

        // Definir las opciones del gráfico de línea
        const option = {
            title: {
                text: 'Grafico Historico'
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    // Obtener el índice del punto
                    const index = params[0].dataIndex;
                    const { point, fecha } = data[index]; // Extrae la fecha y el valor
                    return `Fecha: ${fecha}<br/>Valor: ${point}`;
                }
            },
            dataZoom: [
                {
                    type: 'slider', // Scrollbar en el eje x
                    start: 0,
                    end: 25,
                    xAxisIndex: 0
                }
            ],
            xAxis: {
                type: 'category',
                data: data.map(d => dayjs(d.fecha).format('HH:mm:ss')), // Fechas en el eje x
                boundaryGap: false // Alinear la línea al borde del eje
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Valor',
                    type: 'line',
                    data: data.map(d => d.point),
                    smooth: false // Hace que la línea sea suave
                }
            ]
        };

        // Aplicar la configuración al gráfico
        chartInstance.setOption(option);

        return () => {
            chartInstance.dispose();
        };
    }, [data]); // Asegúrate de que el gráfico se actualice cuando cambie la data

    return (
        <div>
            <div ref={chartRef} style={{ width: '1000px', height: '400px' }}></div>
        </div>
    );
}
