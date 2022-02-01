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
}

let overOptions =[
  {value: "abands", label: "Acceleration Bands"},
  {value: "bb", label: "Bollinger Bands"},
  {value: "dema", label: "DEMA (Double Exponential Moving Average)"},
  {value: "ema", label: "EMA (Exponential Moving Average)"},
  {value: "ikh", label: "Ichimoku Kinko Hyo"},
  {value: "keltnerchannels", label: "Keltner Channels"},
  {value: "linearRegression", label: "Linear Regression"},
  {value: "pivotpoints", label: "Pivot Points"},
  {value: "pc", label: "Price Channel"},
  {value: "priceenvelopes", label: "Price Envelopes"},
  {value: "psar", label: "PSAR (Parabolic SAR)"},
  {value: "sma", label: "SMA (Simple Moving Average)"},
  {value: "supertrend", label: "Super Trend"},
  {value: "tema", label: "TEMA (Triple Exponential Moving Average)"},
  {value: "vbp", label: "VbP (Volume by Price)"},
  {value: "wma", label: "WMA (Weighted Moving Average)"},
  {value: "vwap", label: "VWAP (Volume Weighted Average Price)"},
  {value: "zigzag", label: "Zig Zag"}
]
let osciOptions =[
  {value: "apo", label: "Absolute price indicator"},
  {value: "ad", label: "A/D (Accumulation/Distribution)"},
  {value: "aroon", label: "Aroon"},
  {value: "aroonoscillator", label: "Aroon oscillator"},
  {value: "atr", label: "ATR (Average True Range)"},
  {value: "ao", label: "Awesome oscillator"},
  {value: "cci", label: "CCI (Commodity Channel Index)"},
  {value: "chaikin", label: "Chaikin"},
  {value: "cmf", label: "CMF (Chaikin Money Flow)"},
  {value: "disparityindex", label: "Disparity Index"},
  {value: "cmo", label: "CMO (Chande Momentum Oscillator)"},
  {value: "dmi", label: "DMI (Directional Movement Index)"},
  {value: "dpo", label: "Detrended price"},
  {value: "linearRegressionAngle", label: "Linear Regression Angle"},
  {value: "linearRegressionIntercept", label: "Linear Regression Intercept"},
  {value: "linearRegressionSlope", label: "Linear Regression Slope"},
  {value: "klinger", label: "Klinger Oscillator"},
  {value: "macd", label: "MACD (Moving Average Convergence Divergence)"},
  {value: "mfi", label: "MFI (Money Flow Index)"},
  {value: "momentum", label: "Momentum"},
  {value: "natr", label: "NATR (Normalized Average True Range)"},
  {value: "obv", label: "OBV (On-Balance Volume)"},
  {value: "ppo", label: "Percentage Price oscillator"},
  {value: "roc", label: "RoC (Rate of Change)"},
  {value: "rsi", label: "RSI (Relative Strength Index)"},
  {value: "slowstochastic", label: "Slow Stochastic"},
  {value: "stochastic", label: "Stochastic"},
  {value: "trix", label: "TRIX"},
  {value: "williamsr", label: "Williams %R"}
]


export default function HighSt() {
  const chartComponentRef = useRef(null);
  const [compOptions, setCompOptions] = useState([])
  const [selCompany, setSelCompany] = useState({value:"WISYNCO", name: "Wisynco Group Limited"});
  const [over, setOverlay] = useState({value: "abands", label: "Acceleration Bands"});
  const [osci, setOscillator] = useState({value: "apo", label: "Absolute price indicator"});
  const [data, setData] = useState([]);
  const [companiesInfo, setCompaniesInfo] = useState([])
  //const [ohlc, setOHLC] = useState([])
  //const [closePrices, setClosePrices] = useState([])
  //const [volume, setVolume] = useState([])
  const [options, setOptions] = useState("")


  
let ticker;

useEffect( async () => {
    
        let companyList = await axios.get("https://s3.ap-northeast-1.amazonaws.com/romallen.com/json/companies.json").then((res) => res.data)
        let compArr =  Object.values(companyList.companies)
        let opt = []
        compArr.forEach(element => {
         
          opt.push({value: element["ticker"], label: element["name"]})
        });
        setCompOptions(opt)
     
     let resData = await fetchData()
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
          height: 650,
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
          color: 'red',
            upColor: 'green',
           
        }
    },
      series: [{
          type: 'candlestick',
          id: 'mainChart',
          name: "OHLC Prices",
          data: ohlc
      }, {
          type: 'column',
          id: 'volume',
          name: 'Volume',
          data: volume,
          yAxis: 1
      },
       {
          type: over["value"],
          id: 'overlay',
          linkedTo: 'mainChart',
          yAxis: 0,
      }, 
      {
          type: osci["value"],
          id: 'oscillator',
          linkedTo: 'mainChart',
          yAxis: 2, 
      }
          ],
      caption: {
          text: companiesInfo[1]
           }
  })
  }, [data, over, osci])


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
     <div>
     <Select
     onChange={setSelCompany}
     options={compOptions}
     placeholder={"Wisynco Group Limited"}
   />
     </div>
    
      <span>
      <Select
     onChange={setOverlay}
     options={overOptions}
     placeholder={"over"}
   />
     <Select 
     onChange={setOscillator}
     options={osciOptions}
     placeholder={"osci"}
   />
      </span>


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