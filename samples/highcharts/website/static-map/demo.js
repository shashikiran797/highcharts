Math.easeInSine = function (pos) {
    return -Math.cos(pos * (Math.PI / 2)) + 1;
};

Math.easeOutQuint = function (pos) {
    return (Math.pow((pos - 1), 5) + 1);
};
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


const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let mapLoaded = false;

const finalMap = function () {
    Highcharts.getJSON('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/world-population-density.json',
        function (data) {
            // Assign id's
            data.forEach(function (p) {
                p.id = p.code;
            });
            // Initialize the chart
            Highcharts.mapChart('maps', {
                chart: {
                    styledMode: (true),
                    animation: {

                        duration: 1000

                    },
                    events: {
                        load: function () {
                            const chart = this;

                            const mapSeries = document.getElementsByClassName('highcharts-map-series')[0];
                            const title = document.getElementsByClassName('highcharts-title')[0];
                            const subtitle = document.querySelector('.highcharts-subtitle');
                            mapSeries.style.opacity = 0;
                            setTimeout(function () {
                                mapSeries.style.opacity = 0;

                                if (reduced) {
                                    chart.series[0].points[143].zoomTo();
                                }
                                title.classList.add('fade-in');
                                subtitle.classList.add('fade-in');
                            }, 200);

                            setTimeout(function () {
                                if (!reduced) {
                                    chart.update({
                                        mapView: {
                                            center: [4100, 8280], // In terms of pre-projected units
                                            zoom: 0.1
                                        }
                                    });
                                }
                                // chart.tooltip.refresh(
                                //     [chart.series[0].points[143]]
                                // );

                                mapSeries.classList.add('fade-in');
                            }, 500);


                            setTimeout(function () {
                                mapLoaded  = true;
                            }, 2000);
                        },
                        redraw: function () {
                            const mapSeries = document.getElementsByClassName('highcharts-map-series')[0];
                            if (mapLoaded) {
                                mapSeries.classList.add('show');
                            }


                        }
                    }
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Zoom to point',
                    style: {
                        fontFamily: 'IBM Plex Sans',
                        color: '#fff'
                    }
                },
                exporting: {
                    enabled: false
                },
                legend: {
                    title: {
                        text: 'Population density per km²'
                    },
                    labelStyle: {
                        color: '#fff'

                    },

                    floating: true,
                    y: 20
                },
                colorAxis: {
                    min: 1,
                    max: 1000,
                    type: 'logarithmic',
                    maxColor: '#4455f2'
                },
                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom',
                        x: 5
                    }
                },
                tooltip: {
                    useHTML: true,
                    distance: -15,
                    formatter: function () {
                        const htmlString =
                        `<div class="tip-grid">
                        <div class="tip-content">
                            <div class="dot"></div>${this.point.name}
                        </div>
                        <i class="fas fa-caret-down tip-point"></i>
                        </div>
                        `;
                        return htmlString;
                    },
                    valueSuffix: '/km²'
                },
                series: [{
                    data: data,
                    mapData: Highcharts.maps['custom/world-highres'],
                    joinBy: ['iso-a2', 'code'],
                    name: 'Population density',
                    allowPointSelect: true,
                    cursor: 'pointer',
                    events: {
                        click: function (e) {
                            e.point.zoomTo();
                        }
                    }

                }],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 400
                        },
                        chartOptions: {
                            subtitle: {
                                text: ''
                            },
                            chart: {
                                margin: [40, 1, 65, 0]
                            }
                        }
                    },
                    {
                        condition: {
                            minWidth: 401
                        },
                        chartOptions: {
                            subtitle: {
                                text: 'Click a country to zoom to it. Use buttons below map for selected tests.'
                            },
                            chart: {
                                margin: [60, 1, 65, 0]
                            }

                        }
                    }]
                }
            });
        });
};
finalMap();
