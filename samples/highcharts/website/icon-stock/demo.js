Math.easeInSine = function (pos) {
    return -Math.cos(pos * (Math.PI / 2)) + 1;
};

Math.easeOutQuint = function (pos) {
    return (Math.pow((pos - 1), 5) + 1);
};
// Math.easeInQuint = function (pos) {
//     return Math.pow(pos, 5);
// },

Math.easeOutBounce = pos => {
    if ((pos) < (1 / 2.75)) {
        return (7.5625 * pos * pos);
    }
    if (pos < (2 / 2.75)) {
        return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
    }
    if (pos < (2.5 / 2.75)) {
        return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
    }
    return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
};

const big = window.matchMedia("(min-width: 500px)").matches;
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


const imgPath = 'https://cdn.jsdelivr.net/gh/highcharts/highcharts@feb8baf043cffb5e141ab065f95b8ca397569297/samples/graphics/homepage/';
let done = false;

// Create the chart
Highcharts.getJSON('https://demo-live-data.highcharts.com/aapl-ohlcv.json', function (data) {

    // split the data set into ohlc and volume
    var ohlc = [],
        volume = [],
        dataLength = data.length,
        // set the allowed units for data grouping
        groupingUnits = [[
            'week',                         // unit name
            [1]                             // allowed multiples
        ], [
            'month',
            [1, 2, 3, 4, 6]
        ]],

        i = 0;

    for (i; i < dataLength; i += 1) {
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
    }


    Highcharts.stockChart('stock',
        {
            chart: {
                animation: {
                    enabled: true,
                    duration: 2000,
                    easing: 'easeOutQuint'
                },
                styledMode: (true),
                margin: 0,
                spacing: 0,
                alignTicks: false,
                plotBackgroundImage: 'stock.png',
                events: {
                    load: function () {
                        const chart = this;

                        const particle1 = document.querySelectorAll('#stock .particle-1')[0];
                        const particle2 = document.querySelectorAll('#stock .particle-2')[0];
                        const particle3 = document.querySelectorAll('#stock .particle-3')[0];
                        const particle4 = document.querySelectorAll('#stock .particle-4')[0];
                        const particle5 = document.querySelectorAll('#stock .particle-5')[0];
                        const particle6 = document.querySelectorAll('#stock .particle-6')[0];
                        const particles = [particle1, particle2, particle3,
                            particle4, particle5, particle6];

                        const greenLine = document.querySelectorAll('#stock .highcharts-series-2.green-line')[0];
                        const greenArrow = document.getElementsByClassName('green-line')[1];

                        const purpleLine = document.querySelectorAll('#stock .highcharts-series-3.purple-line')[0];
                        const purpleArrow = document.getElementsByClassName('purple-line')[1];
                        const bottomArea =  document.querySelectorAll('#stock .stock-bottom')[0];
                        const topArea =  document.querySelectorAll('#stock .stock-top')[0];
                        const rangeSelectorGroup =  document.querySelectorAll('#stock .highcharts-range-selector-group')[0];
                        const candlestick =  document.querySelectorAll('#stock .stick')[0];
                        const column = document.querySelectorAll('#stock .highcharts-column-series.column')[0];
                        const title = document.querySelectorAll('#stock .highcharts-title')[0];
                        const subtitle = document.querySelectorAll('#stock .highcharts-subtitle')[0];
                        let head = 40; //arrow head radius
                        if (big) {
                            head = 70;
                        }


                        if (reduced) {
                            chart.series[2].update({
                                data: [{
                                    x: 0,
                                    y: 6.67
                                }, {
                                    x: 8.5,
                                    y: 6.67
                                },
                                {
                                    x: 14.2,
                                    y: 12.14,
                                    marker: {
                                        enabled: true,
                                        symbol: 'square',
                                        radius: head,
                                        className: 'green-arrow'
                                    }
                                }]
                            });
                            chart.series[3].update({
                                data: [{
                                    x: 0,
                                    y: 8.25
                                }, {
                                    x: 10.52,
                                    y: 8.25
                                },
                                {
                                    x: 14,
                                    y: 12.1,
                                    marker: {
                                        enabled: true,
                                        symbol: 'square',
                                        radius: head,
                                        className: 'purple-arrow'
                                    }
                                }]
                            });


                            particle1.classList.add('static');
                            particle2.classList.add('static');
                            particle3.classList.add('static');
                            particle4.classList.add('static');
                            particle5.classList.add('static');
                            particle6.classList.add('static');

                            greenArrow.classList.add('static');
                            purpleArrow.classList.add('static');
                            greenLine.classList.add('static');
                            purpleLine.classList.add('static');

                            setTimeout(function () {
                                particle1.classList.add('fade');
                                particle2.classList.add('fade');
                                particle3.classList.add('fade');
                                particle4.classList.add('fade');
                                particle5.classList.add('fade');
                                particle6.classList.add('fade');

                            }, 1000);

                            setTimeout(function () {
                                bottomArea.classList.add('hide');
                                topArea.classList.add('hide');
                                purpleLine.classList.add('hide');
                                purpleArrow.classList.add('hide');
                                greenLine.classList.add('hide');
                                greenArrow.classList.add('hide');
                            }, 2000);

                            setTimeout(function () {
                                ///get the margins ready for the real chart
                                let margins = [50, 10, 30, 10];
                                if (big) {
                                    margins = [80, 10, 30, 10];
                                }

                                rangeSelectorGroup.classList.add('fade-in');

                                chart.update({
                                    chart: {
                                        margin: margins
                                    }
                                });

                                chart.series[12].update({
                                    visible: true
                                });
                                chart.series[13].update({
                                    visible: true
                                });

                                chart.series[2].update({
                                    visible: false
                                });
                                chart.series[3].update({
                                    visible: false
                                });
                                chart.series[0].update({
                                    visible: false
                                });
                                chart.series[1].update({
                                    visible: false
                                });

                                ///turn on the axes
                                chart.yAxis[0].update({
                                    visible: true
                                });
                                chart.xAxis[0].update({
                                    visible: true
                                });

                                candlestick.classList.add('fade-in');
                                title.style.opacity = 1;
                                if (big) {
                                    subtitle.style.opacity = 1;
                                }
                            }, 3000);
                            setTimeout(function () {
                                done = true;
                                chart.redraw();
                            }, 3100);

                        } else {
                            setTimeout(function () {
                                particle1.classList.add('move');
                            }, 0);

                            setTimeout(function () {
                                particle2.classList.add('move');
                            }, 100);

                            setTimeout(function () {
                                particles[2].classList.add('move');
                            }, 200);

                            setTimeout(function () {
                                particles[3].classList.add('move');
                            }, 400);

                            setTimeout(function () {
                                particles[4].classList.add('move');
                            }, 600);

                            setTimeout(function () {
                                particles[5].classList.add('move');
                            }, 800);

                            setTimeout(function () {
                                //moves green lie
                                chart.series[2].data[2].update({
                                    x: 8.5,
                                    y: 6.67,
                                    marker: {
                                        enabled: false
                                    }
                                });
                                chart.series[2].data[1].update({
                                    x: 8.5,
                                    y: 6.67
                                });
                                ///moves the purple line
                                chart.series[3].data[2].update({
                                    x: 10.52,
                                    y: 8.4,
                                    marker: {
                                        enabled: false
                                    }
                                });
                                chart.series[3].data[1].update({
                                    x: 10.52,
                                    y: 8.4
                                });
                                particle1.classList.add('move');
                                particle2.classList.add('move');
                                particle3.classList.add('move');
                                particle4.classList.add('move');
                                particle5.classList.add('move');
                                particle6.classList.add('move');


                            }, 1000);

                            setTimeout(function () {

                                ///moves green line
                                //turns on the marker
                                chart.series[2].data[2].update({
                                    x: 14.2,
                                    y: 12.14,
                                    marker: {
                                        enabled: true,
                                        symbol: 'square',
                                        radius: head
                                    }
                                });
                                ///moves purple line
                                //turns on the marker
                                chart.series[3].data[2].update({
                                    x: 14,
                                    y: 12.1,
                                    marker: {
                                        enabled: true,
                                        symbol: 'square',
                                        radius: head
                                    }
                                });
                            }, 2000);

                            setTimeout(function () {
                                ///grows the arrow heads (which are line markers)
                                greenArrow.classList.add('grow');
                                purpleArrow.classList.add('grow');
                            }, 3200);

                            setTimeout(function () {
                                chart.series[2].data[2].update({
                                    marker: {
                                        enabled: false
                                    }
                                });
                                chart.series[3].data[2].update({
                                    marker: {
                                        enabled: false
                                    }
                                });
                                greenArrow.classList.add('hide');
                                purpleArrow.classList.add('hide');
                                ///set the x extremes to slide to the right
                                chart.xAxis[1].setExtremes(0, 7);
                            }, 5200);

                            setTimeout(function () {
                                ///hides all the earlier chart stuff and sets the yAxis extremes so
                                ///the lines part vertically
                                chart.yAxis[2].setExtremes(10, 20);
                                chart.yAxis[3].setExtremes(10, 20);

                                bottomArea.classList.add('fade-out');
                                topArea.classList.add('fade-out');

                                purpleLine.classList.add('fade-out');
                                greenLine.classList.add('fade-out');
                            }, 6000);

                            setTimeout(function () {
                                ///get the margins ready for the real chart
                                let margins = [50, 10, 30, 10];
                                if (big) {
                                    margins = [80, 10, 30, 10];
                                }
                                chart.update({
                                    chart: {
                                        margin: margins
                                    }
                                });
                                bottomArea.classList.add('fade-out');
                                topArea.classList.add('fade-out');
                            }, 6300);

                            setTimeout(function () {
                                chart.series[12].update({
                                    visible: true
                                });
                                chart.series[13].update({
                                    visible: true
                                });
                                bottomArea.classList.add('fade-out');
                                topArea.classList.add('fade-out');

                            }, 6500);

                            setTimeout(function () {
                                ///fade in the candlestick and the column series, axis labels, title
                                candlestick.classList.add('fade-in');
                                title.style.opacity = 1;
                                if (big) {
                                    subtitle.style.opacity = 1;
                                }
                                column.classList.add('fade-in');
                            }, 6800);

                            setTimeout(function () {
                                //turn on the axes
                                chart.yAxis[0].update({
                                    visible: true
                                });
                                chart.xAxis[0].update({
                                    visible: true
                                });
                                done = true;
                                chart.redraw();
                            }, 7200);
                        }
                    },
                    redraw: function () {
                        if (done) {
                            const candlestick =  document.querySelectorAll('#stock .stick')[0];
                            const rangeSelectorGroup =  document.querySelectorAll('#stock .highcharts-range-selector-group')[0];
                            const bottomArea =  document.querySelectorAll('#stock .stock-bottom')[0];
                            const topArea =  document.querySelectorAll('#stock .stock-top')[0];
                            const column = document.querySelectorAll('#stock .highcharts-column-series.column')[0];
                            column.classList.add('fade-in');
                            rangeSelectorGroup.classList.add('fade-in');
                            candlestick.classList.add('fade-in');
                            bottomArea.classList.add('fade-out');
                            topArea.classList.add('fade-out');
                        }
                    }
                }
            },
            credits: {
                enabled: false
            },
            navigator: {
                enabled: false
            },
            scrollbar: {
                enabled: false
            },
            rangeSelector: {
                selected: 1,
                floating: true,
                buttons: [{
                    type: 'month',
                    count: 1,
                    text: '1m',
                    title: 'View 1 month'
                }, {
                    type: 'month',
                    count: 3,
                    text: '3m',
                    title: 'View 3 months'
                }, {
                    type: 'month',
                    count: 6,
                    text: '6m',
                    title: 'View 6 months'
                }, {
                    type: 'ytd',
                    text: 'YTD',
                    title: 'View year to date'
                }, {
                    type: 'all',
                    text: 'All',
                    title: 'View all'
                }]
            },
            title: {
                text: 'Two panes, candlestick and volume',
                y: 30
            },
            subtitle: {
                text: 'The demo is divided into two panes, with a resizer handle between the panes',
                y: 50
            },
            xAxis: [
                //0
                {
                    min: Date.UTC(2021, 5, 2),
                    max: Date.UTC(2021, 8, 4),
                    visible: false

                },
                //1 -
                {
                    min: 0,
                    max: 20,
                    gridLineColor: 'transparent',
                    tickInterval: 1,
                    type: 'linear',
                    visible: false,
                    crosshair: {
                        snap: false
                    },
                    ordinal: false
                },

                ///2-
                {
                    min: 0,
                    max: 20,
                    gridLineColor: 'transparent',
                    tickInterval: 1,
                    reversed: true,
                    visible: false,
                    crosshair: {
                        snap: false
                    },
                    ordinal: false
                }
            ],
            yAxis: [
                ///0
                {
                    labels: {
                        align: 'right',
                        x: -3
                    },
                    title: {
                        text: 'OHLC'
                    },
                    height: '60%',
                    lineWidth: 2,
                    resize: {
                        enabled: true
                    },
                    visible: false,
                    zIndex: 300
                },
                ///1
                {
                    labels: {
                        align: 'right',
                        x: -3
                    },
                    title: {
                        text: 'Volume'
                    },
                    top: '65%',
                    height: '35%',
                    offset: 0,
                    lineWidth: 2,
                    visible: true
                },
                //0
                {
                    min: -2,
                    max: 18,
                    gridZIndex: 20,
                    gridLineColor: 'transparent',
                    tickInterval: 1,
                    startOnTick: false,
                    endOnTick: false,
                    visible: false
                },
                ///1 -
                {
                    min: -2,
                    max: 18,
                    gridZIndex: 20,
                    gridLineColor: 'transparent',
                    tickInterval: 1,
                    startOnTick: false,
                    endOnTick: false,
                    reversed: true,
                    visible: false
                }
            ],
            legend: {
                enabled: false
            },
            tooltip: {
                split: true
            },
            plotOptions: {
                series: {
                    animation: false,
                    enabledMouseTracking: false,
                    opacity: 1,
                    dataLabels: {
                        enabled: false
                    },
                    marker: {
                        enabled: false
                    },
                    states: {
                        hover: {
                            enabled: false
                        },
                        inactive: {
                            enabled: false
                        }
                    }

                },
                pie: {
                    animation: false
                },
                line: {
                    animation: false,
                    dataGrouping: {
                        enabled: false
                    }
                }
            },
            series: [
            //0 - top area (11) y0
                {
                    type: 'arearange',
                    className: 'stock-top',
                    data: [
                        { x: 0, low: -2, high: 18 },
                        { x: 20, low: 18, high: 18 }
                    ],
                    zIndex: 11,
                    visible: true,
                    xAxis: 1,
                    yAxis: 2,
                    marker: {
                        enabled: false
                    }

                },
                //1- bottom area (11) y1
                {
                    type: 'arearange',
                    className: 'stock-bottom',
                    data: [
                        { x: 0, low: -2, high: 18 },
                        { x: 20, low: 18, high: 18 }
                    ],
                    zIndex: 11,
                    yAxis: 3,
                    xAxis: 1,
                    visible: true,
                    marker: {
                        enabled: false
                    }

                },
                //2 - green line (21) y0
                {
                    type: 'line',
                    lineColor: 'red',
                    className: 'green-line',
                    name: 'green line',
                    lineWidth: 30,
                    width: 30,
                    borderWidth: 30,
                    data: [{
                        x: 0,
                        y: 6.67
                    }, {
                        x: 0,
                        y: 6.67
                    },
                    {
                        x: 0,
                        y: 6.67,
                        marker: {
                            enabled: false,
                            radius: 70,
                            symbol: 'square'
                        }
                    }],
                    zIndex: 21,
                    xAxis: 1,
                    yAxis: 2
                },
                //3 - purple line (21) y1
                {
                    type: 'line',
                    name: 'purple line',
                    marker: {
                        enabled: true
                    },
                    className: 'purple-line',
                    data: [{
                        x: 0,
                        y: 8.25
                    }, {
                        x: 0,
                        y: 8.25
                    },
                    {
                        x: 0,
                        y: 8.25,
                        marker: {
                            enabled: false,
                            radius: 70,
                            symbol: 'square'
                        }
                    }],
                    zIndex: 21,
                    yAxis: 3,
                    xAxis: 1,
                    visible: true
                },
                //4 - minus (21) hidden
                {
                    type: 'line',
                    name: 'minus',
                    className: 'white-line',
                    data: [{
                        x: 4,
                        y: 2.5
                    }, {
                        x: 8,
                        y: 2.5
                    }],
                    zIndex: 21,
                    visible: false,
                    xAxis: 1,
                    yAxis: 2

                },
                /// 5- plus V (21) hidden
                {
                    type: 'line',
                    name: 'plusV',
                    lineColor: 'blue',
                    className: 'white-line',
                    lineWidth: 30,
                    width: 30,
                    borderWidth: 30,
                    data: [{
                        x: 6,
                        y: 10
                    }, {
                        x: 6.1,
                        y: 14
                    }],
                    zIndex: 21,
                    visible: false,
                    xAxis: 1,
                    yAxis: 2

                },
                ///6- plus H (21) hidden
                {
                    type: 'line',
                    name: 'plusH',
                    lineColor: 'blue',
                    className: 'white-line',
                    lineWidth: 30,
                    width: 30,
                    borderWidth: 30,
                    data: [{
                        x: 4,
                        y: 12
                    }, {
                        x: 8,
                        y: 12
                    }],
                    zIndex: 21,
                    visible: false,
                    xAxis: 1,
                    yAxis: 2

                },

                ///7- top arrow (21)
                {
                    type: 'arearange',
                    name: 'top arrow',
                    className: 'green',
                    marker: {
                        enabled: false
                    },
                    lineWidth: 30,
                    width: 30,
                    borderWidth: 30,
                    data: [{
                        x: 12,
                        low: 12.6,
                        high: 12
                    }, {
                        x: 14,
                        low: 10.18,
                        high: 14.99

                    }],
                    zIndex: 21,
                    xAxis: 1,
                    yAxis: 2

                },

                ///8- bottom arrow (21)
                {
                    type: 'arearange',
                    name: 'bottom arrow',
                    lineColor: 'blue',
                    className: 'purple',
                    lineWidth: 30,
                    width: 30,
                    borderWidth: 30,
                    data: [{
                        x: 12,
                        low: 14,
                        high: 14
                    }, {
                        x: 14,
                        low: 10,
                        high: 14

                    }],
                    zIndex: 21,
                    yAxis: 3,
                    xAxis: 1,
                    marker: {
                        enabled: false
                    }

                },


                //9 - particles (40)

                {
                    type: 'scatter',
                    name: 'particles',
                    animation: false,
                    className: 'particles',
                    data: [
                        {
                            x: 10,
                            y: 8,
                            className: 'particle-1',
                            marker: {
                                enabled: true,
                                symbol: 'url(' + imgPath + 'p1.svg)',
                                width: 35,
                                height: 60

                            }
                        },
                        {
                            x: 10.1,
                            y: 8,
                            className: 'particle-2',
                            marker: {
                                enabled: true,
                                symbol: 'url(' + imgPath + 'p2.svg)',
                                width: 23,
                                height: 42
                            }
                        },
                        {
                            x: 10.11,
                            y: 8,
                            className: 'particle-3',
                            marker: {
                                enabled: true,
                                symbol: 'url(' + imgPath + 'p3.svg)',
                                width: 23,
                                height: 34
                            }
                        },

                        {
                            x: 10.111,
                            y: 8,
                            className: 'particle-4',
                            marker: {
                                enabled: true,
                                symbol: 'url(' + imgPath + 'p4.svg)',
                                width: 27,
                                height: 17
                            }
                        },
                        {
                            x: 10.1111,
                            y: 8,
                            className: 'particle-5',
                            marker: {
                                enabled: true,
                                symbol: 'url(' + imgPath + 'p5.svg)',
                                width: 35,
                                height: 50
                            }
                        },
                        {
                            x: 10.11,
                            y: 8,
                            className: 'particle-6',
                            marker: {
                                enabled: true,
                                symbol: 'url(' + imgPath + 'p6.svg)',
                                width: 45,
                                height: 45
                            }
                        }
                    ],
                    zIndex: 10,
                    xAxis: 2,
                    yAxis: 2,
                    visible: true
                },
                //10 - green line (21) y0
                {
                    type: 'line',
                    lineColor: 'red',
                    className: 'transparent',
                    name: 'green line',
                    lineWidth: 30,
                    width: 30,
                    borderWidth: 30,
                    data: [{
                        x: 0,
                        y: 6.5
                    }, {
                        x: 8.5,
                        y: 6.5
                    },
                    {
                        x: 13.9999,
                        y: 11.42
                    }],
                    zIndex: 21,
                    xAxis: 1,
                    yAxis: 2
                },
                //11 - purple line (21) y1
                {
                    type: 'line',
                    name: 'purple line',
                    className: 'transparent',
                    data: [{
                        x: 0,
                        y: 8.5
                    }, {
                        x: 11.502,
                        y: 8.5
                    },
                    {
                        x: 13.9999,
                        y: 12.02
                    }],
                    zIndex: 21,
                    yAxis: 3,
                    xAxis: 1
                },
                //12 -- candlestick
                {
                    type: 'candlestick',
                    name: 'AAPL',
                    className: 'stick',
                    data: ohlc,
                    zIndex: 300,
                    dataGrouping: {
                        units: groupingUnits
                    },
                    visible: false

                },
                //13 --column
                {
                    type: 'column',
                    className: 'column',
                    name: 'Volume',
                    data: volume,
                    yAxis: 1,
                    zIndex: 300,
                    dataGrouping: {
                        units: groupingUnits
                    },
                    visible: false
                }


            ],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 300
                    },
                    chartOptions: {
                        rangeSelector: {
                            enabled: true,
                            dropdown: 'always',
                            inputEnabled: false,
                            buttonPosition: {
                                x: 120,
                                y: -60
                            }
                        },
                        plotOptions: {
                            arearange: {
                                marker: {
                                    symbol: 'square',
                                    radius: 40
                                }
                            }
                        }
                    }
                },
                {
                    condition: {
                        minWidth: 499
                    },
                    chartOptions: {
                        rangeSelector: {
                            enabled: true,
                            dropdown: 'never',
                            inputEnabled: true,
                            y: -60
                        },
                        plotOptions: {
                            arearange: {
                                marker: {
                                    symbol: 'square',
                                    radius: 70
                                }
                            }
                        }
                    }
                }]
            }
        }

    );

});
