import React, { useState, useEffect, useRef } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
import Select from "react-select";
import DataTabs from "./tabs";
import { Box, Card, Main } from "grommet";
import { isBrowser, isMobile } from "react-device-detect";

if (typeof Highcharts === "object") {
  require("highcharts/modules/exporting")(Highcharts);
  require("highcharts/modules/export-data")(Highcharts);
  require("highcharts/modules/annotations")(Highcharts);
  require("highcharts/modules/heikinashi")(Highcharts);
  require("highcharts/modules/hollowcandlestick")(Highcharts);
  require("highcharts/indicators/indicators-all")(Highcharts);
  require("highcharts/modules/drag-panes")(Highcharts);
  require("highcharts/modules/annotations-advanced")(Highcharts);
  require("highcharts/modules/stock-tools")(Highcharts);
  require("highcharts/modules/price-indicator")(Highcharts);
  require("highcharts/modules/full-screen")(Highcharts);
}

let compSelectionList = [];
const getCompanies = async () => {
  let compObj = await axios
    .get(
      "https://s3.ap-northeast-1.amazonaws.com/romallen.com/jsonv3/companies_list.json"
    )
    .then((res) => res.data)
    .catch((e) => {
      console.log(e);
      return "Error: " + e;
    });
  let compArr = Object.values(compObj.companies);
  compArr.forEach((element) =>
    compSelectionList.push({ value: element["ticker"], label: element["name"] })
  );
};

getCompanies();

let chartOptions = {
  chart: {
    height: 550,
  },
  legend: {
    enabled: true,
  },
  rangeSelector: {
    selected: 1,
  },
  xAxis: {
    min: Date.now() - 7778000,
    max: Date.now(),
  },
  yAxis: [
    {
      height: "85%",
    },
    {
      top: "85%",
      height: "15%",
    },
  ],
  series: [
    {
      type: "candlestick",
      id: "mainChart",
      name: "OHLC Prices",
      data: [],
    },
    {
      type: "column",
      id: "volume",
      name: "Volume",
      data: [],
      yAxis: 1,
    },
  ],
  // //
  responsive: {
    rules: [
      {
        condition: {
          // maxWidth: 500,
          callback: function () {
            return isMobile;
          },
        },
        chartOptions: {
          chart: {
            height: 500,
          },
          title: {     
            style: {
                fontSize: "25px"
            }
          },
          legend: {
            enabled: false,
          },
          subtitle: {
            text: null,
          },
          navigator: {
            enabled: false,
          },
          stockTools: {
            gui: {
              enabled: false,
            },
          },
        },
      },
    ],
  },
};

export default function HighSt() {
  const chartComponentRef = useRef(null);
  const [data, setData] = useState([]);
  const [companiesInfo, setCompaniesInfo] = useState({});
  const [options, setOptions] = useState(chartOptions);


  useEffect(async () => {
    let resData = await fetchData({
      value: "138SL",
      name: "138 Student Living Jamaica Limited",
    });

  }, []);



  useEffect(() => {

    let dataLen = data.length;
    let volume = [];

    for (let i = 0; i < dataLen; i += 1) {
      volume.push([
        data[i][0], // the date
        data[i][5], // the volume
      ]);
    }

    setOptions({
      chart: {
        height: 550,
      },
      title: {
        text: companiesInfo["name"],
      },
      legend: {
        enabled: true,
      },
      rangeSelector: {
        selected: 1,
      },
      xAxis: {
        min: Date.now() - 7778000,
        max: Date.now(),
      },
      yAxis: [
        {
          height: "85%",
        },
        {
          top: "85%",
          height: "15%",
        },
      ],
      plotOptions: {
        series: {
          showInLegend: true,
          color: "#fa9078",
          upColor: "#40d397",
        },
        column: {
          color: "grey",
        },
        line: {
          color: "#687494",
        },
      },
      stockTools: {
        gui: {
          buttons: [
            "indicators",
            "typeChange",
            "separator",
            "lines",
            "crookedLines",
            "measure",
            "advanced",
            "toggleAnnotations",
            "fullScreen",
          ],
          enabled: true,
        },
      },
      tooltip: {
        shape: "square",
        headerShape: "callout",
        borderWidth: 0,
        shadow: true,
      },
      series: [
        {
          type: "candlestick",
          id: "mainChart",
          name: "OHLC Prices",
          data: data,
        },
        {
          type: "column",
          id: "volume",
          name: "Volume",
          data: volume,
          yAxis: 1,
        },
      ],
      //   //
      responsive: {
        rules: [
          {
            condition: {
          
              callback: function () {
                return isMobile;
              },
            },
            chartOptions: {
              chart: {
                height: 500,
              },
              title: {     
                style: {
                    fontSize: "25px"
                }
              },
              // rangeSelector: {
              //   selected: 0,
              // },
              legend: {
                enabled: false,
              },
              subtitle: {
                text: null,
              },
              navigator: {
                enabled: false,
              },
              stockTools: {
                gui: {
                  enabled: false,
                },
              },
            },
          },
        ],
      },
    });
  }, [data, companiesInfo]);

  let fetchData = async (selCompany) => {
    let d = await axios
      .get(
        `https://s3.ap-northeast-1.amazonaws.com/romallen.com/jsonv3/${selCompany["value"]}.json`
      )
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.log(e);
        return "Error: " + e;
      });
  
    setData(d["ohlcv"]);
    setCompaniesInfo(d);
   
  };

  return (
    <Main pad={"small"}>
      <Card pad={"small"} background={"#ffffff"} margin={"xxsmall"}>
        <Select
          onChange={async (value) => { await fetchData(value)}}
          options={compSelectionList}
          placeholder={"138 Student Living Jamaica Limited"}
        />

        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          constructorType={"stockChart"}
          ref={chartComponentRef}
          updateArgs={[true]}
          allowChartUpdate={true}
        />
      </Card>
      <Card background={"#ffffff"} margin={"xxsmall"}>
        <DataTabs
          blurb={companiesInfo["blurb"]}
          corpActions={companiesInfo["corporate_actions"]}
          news={companiesInfo["news"]}
          financials={companiesInfo["financialReports"]}
        />
      </Card>
    </Main>
  );
}
