import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, Line } from 'chart.js/auto';
import { Line as Chart } from 'react-chartjs-2';
import { axiosInstance } from '../../helpers/axios';
import moment from 'moment';

function MarksChart() {
    const [marksArr, setMarksArr] = useState([])
    const [labelsArr, setLabelsArr] = useState([])

    //get average marks
    useEffect(() => {
        axiosInstance.get(process.env.REACT_APP_INTERVIEW_SVC_ENDPOINT + "/meetings/marks")
        .then(resp => {
            let marks = resp?.data?.data?.marks?.map(m => m?.marks);
            let labels = resp?.data?.data?.marks?.map(m => {
                const formattedDate = moment(m?.date).format('MMMM Do, YYYY @ h:mm A');
                return formattedDate;
            });
            setMarksArr(marks);
            setLabelsArr(labels);
            console.log(marks, labels);

        })
        .catch(error => console.error(error.message))
    }, [])

    const data = {
        labels: labelsArr,
        datasets: [{
            label: 'Marks',
            data: marksArr,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const options = {
        responsive: true, // This will make the chart responsive to the container size
        width: 700, // Set the width of the chart
        height: 200 // Set the height of the chart
    };

    return (
    <>
        <div className="w-full h-96">
            <div className="text-center text-gray-500 text-4xl underline mb-12">Performance graph</div>
            <Chart data={data} options={options} />
        </div>
    </> 
    )
}

export default MarksChart;
