import React, { useState, useEffect, useRef } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import Select from 'react-select';


if (typeof Highcharts === 'object') {
  require("highcharts/modules/exporting")(Highcharts);
  require("highcharts/modules/export-data")(Highcharts);
  require("highcharts/modules/annotations")(Highcharts);
  
  require("highcharts/indicators/indicators-all")(Highcharts);
  require("highcharts/modules/drag-panes")(Highcharts);
  require("highcharts/modules/annotations-advanced")(Highcharts);
  require("highcharts/modules/stock-tools")(Highcharts);
  require("highcharts/modules/price-indicator")(Highcharts);
  require("highcharts/modules/full-screen")(Highcharts);
}



export default function HighSt() {
  const chartComponentRef = useRef(null);
  const [compOptions, setCompOptions] = useState([])
  const [selCompany, setSelCompany] = useState({value:"138SL", name: "138 Student Living Jamaica Limited"});
  const [data, setData] = useState([]);
  const [companiesInfo, setCompaniesInfo] = useState([])
  const [options, setOptions] = useState("")


  
useEffect( async () => {
    
        let companyList = await axios.get("https://s3.ap-northeast-1.amazonaws.com/romallen.com/json/companies.json").then((res) => res.data)
        let compArr =  Object.values(companyList.companies)
        let opt = []
        compArr.forEach(element => {
         
          opt.push({value: element["ticker"], label: element["name"]})
        });
        setCompOptions(opt)
     
     let resData = await fetchData(selCompany)
     setData(resData)
  }, []);

 

  useEffect(async () => {
   let resolvedData = await fetchData(selCompany)
    setData(resolvedData)
  }, [selCompany]);
  

  useEffect(()=> {
    let dataLen = data.length
    let ohlc = [];
    let volume = [];
    let closePrices = []

    for (let i = 0; i < dataLen; i += 1) {
      ohlc.push([
          data[i][0], // the date
          data[i][1], // open
          data[i][2], // high
          data[i][3], // low
          data[i][4] // close
      ]);
  
      volume.push([
          data[i][0], // the date
          data[i][5] // the volume
      ]);

      closePrices.push([ 
        data[i][0], // the date
          data[i][4] // close
      ])
    }

    setOptions({
      chart: {
          height: 600,
          
      },
      title: {
          text: companiesInfo[0]
      },
      legend: {
          enabled: true
      },
      rangeSelector: {
          selected: 1,
      },
      xAxis: {
          min: Date.now()- 7778000,
          max: Date.now()
      },
      yAxis: [{
          height: '70%',
      }, {
          top: '60%',
          height: '15%',
   
      }, {
          top: '80%',
          height: '15%',
      }],
      plotOptions: {
          series: {
              showInLegend: true,
          },
          candlestick: {
          color: '#fa9078',
            upColor: '#40d397',         
        }
    },
    stockTools:{
      gui: {
        buttons: [ 
          'indicators', 'typeChange', 'separator', 'lines', 
          'crookedLines', 'measure', 'advanced', 'toggleAnnotations', 
          'separator', 'zoomChange', 'fullScreen' ],
        enabled: true
      }
    },
    tooltip: {
      shape: 'square',
      headerShape: 'callout',
      borderWidth: 0,
      shadow: false,
      positioner: function (width, height, point) {
          let chart = this.chart,
              position;

          if (point.isHeader) {
              position = {
                  x: Math.max(
                      // Left side limit
                      chart.plotLeft,
                      Math.min(
                          point.plotX + chart.plotLeft - width / 2,
                          // Right side limit
                          chart.chartWidth - width - chart.marginRight
                      )
                  ),
                  y: point.plotY
              };
          } else {
              position = {
                  x: point.series.chart.plotLeft,
                  y: point.series.yAxis.top - chart.plotTop
              };
          }

          return position;
      }
  },
      series: [{
          type: 'candlestick',
          id: 'mainChart',
          name: "OHLC Prices",
          data: data
      }, {
          type: 'column',
          id: 'volume',
          name: 'Volume',
          data: volume,
          yAxis: 1
      },
       {
          type: "",
          id: 'overlay',
          linkedTo: 'mainChart',
          yAxis: 0,
      }, 
      {
          type: "",
          id: 'oscillator',
          linkedTo: 'mainChart',
          yAxis: 2, 
      }
          ],
      caption: {
          text: companiesInfo[1]
           }
  })
  }, [data])


  let fetchData = async (selCompany) => {
    let d = await axios
      .get(
        `https://s3.ap-northeast-1.amazonaws.com/romallen.com/json/${selCompany["value"]}-data.json`
      )
      .then((res) => {
        return res.data;
      });
      let info = d.splice(0,1)
    setCompaniesInfo([info[0][0], info[0][2]])
    return d  
  };



  return (
    <div>
     <div className='select-chart'>
     <Select
     onChange={setSelCompany}
     options={compOptions}
     placeholder={"138 Student Living Jamaica Limited"}
   />
     </div>


    <HighchartsReact
      highcharts={Highcharts}
       options={options}
       constructorType = { 'stockChart' }
      ref={chartComponentRef}
      updateArgs={[true]}
      allowChartUpdate={true}
      
    />
    </div>
  
  );
};