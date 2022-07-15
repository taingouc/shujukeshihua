// 监控区域模块
(function () {
    $(".monitor .tabs").on("click", "a", function () {
        $(this).addClass("active").siblings("a").removeClass("active");
        // console.log($(this).index());
        $(".monitor .content").eq($(this).index()).show().siblings(".content").hide();
    });
    // 克隆两个content里面当前marquee里面所有行 无缝滚动
    $(".marquee-view .marquee").each(function () {
        // console.log($(this));
        var rows = $(this).children().clone();
        $(this).append(rows);
    });
})();
//点位分布统计模块
(function () {
    //1.实例化对象
    var myChart = echarts.init(document.querySelector(".pie"))
    //2.指定配置项和数据
    var option = {
        legend: {
            top: 'bottom',
            itemHeight: 10, // 修改icon图形大小
            textStyle: {
                fontSize: 8,
                color: '#68d8fe'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: [
            "#006cff",
            "#60cda0",
            "#ed8884",
            "#ff9f7f",
            "#0096ff",
            "#9fe6b8",
            "#32c5e9",
            "#1d9dff"
        ],

        series: [
            {
                name: '定位统计',
                type: 'pie',
                radius: ["15%", "70%"],
                center: ["50%", "40%"],
                roseType: 'radius',
                itemStyle: {
                    borderRadius: 0
                },
                itemStyle: {
                    normal: {
                        label: {
                            textStyle: {
                                color: '#68d8fe',
                                fontSize: 12,
                            }
                        },
                    }
                },
                data: [
                    { value: 20, name: "云南" },
                    { value: 26, name: "北京" },
                    { value: 24, name: "山东" },
                    { value: 25, name: "河北" },
                    { value: 20, name: "江苏" },
                    { value: 25, name: "浙江" },
                    { value: 30, name: "四川" },
                    { value: 42, name: "湖北" }
                ],
                label: {
                    fontSize: 10
                },
                labelLine: {
                    length: 6,
                    length2: 8
                }
            }
        ]

    };
    //3.配置项和数据给我们的实例化对象
    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();
//柱形图模块
(function () {
    var item = {
        value: 1300,
        //修改当前柱形的样式
        itemStyle: {
            color: '#254065'
        },
        //鼠标经过变色
        emphasis: {
            itemStyle: {
                color: 'red'
            },
        },
        //鼠标经过不显示提示框
        tooltip: {
            extraCssText: "opacity:0"
        }
    };
    var myChart = echarts.init(document.querySelector(".bar"))
    var option = {
        tooltip: {
            trigger: 'item',
            //数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
        },
        color: new echarts.graphic.LinearGradient(
            //渐变
            0,
            0,
            0,
            1,
            [
                { offset: 0, color: "#00fffb" }, // 0 起始颜色
                { offset: 1, color: "#0061ce" } // 1 结束颜色
            ]
        ),
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            //显示x轴文字信息
            containLabel: true,
            //网格是否显示
            show: true,
            //xy轴边框颜色
            borderColor: 'rgba(0,240,255,0.3)',
            //y轴高度
            height: '90%'// 高度

        },
        xAxis: [
            {
                type: 'category',
                data: ['上海', '广州', '北京', '深圳', '合肥', '...', '...', '...', '杭州', '厦门', '济南', '成都', '重庆'],
                //刻度设置  
                axisTick: {
                    //刻度在柱子两边为false 中间为true
                    alignWithLabel: false,
                    //不显示刻度
                    show: false
                },
                //x坐标轴文字标签样式
                axisLabel: {
                    //x轴文字颜色
                    color: '#68d8fe'
                },
                axisLine: {
                    //设置x轴颜色
                    lineStyle: {
                        color: 'rgba(0,240,255,0.3)',
                        // x轴的宽度
                        width: 3
                    }
                }

            }

        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    //y轴文字颜色
                    color: '#68d8fe'
                },
                axisLine: {
                    //设置y轴颜色
                    lineStyle: {
                        color: 'rgba(0,240,255,0.3)',
                        // x轴的宽度
                        width: 3
                    }
                },
                splitLine: {
                    //y轴分割线
                    lineStyle: {
                        color: 'rgba(0,240,255,0.3)',
                    }
                }
            }
        ],

        series: [
            {
                type: 'bar',
                barWidth: '60%',
                data: [
                    2100,
                    1900,
                    1700,
                    1560,
                    1400,
                    item,
                    item,
                    item,
                    900,
                    750,
                    600,
                    480,
                    240
                ]
            },

        ]
    };
    myChart.setOption(option);
    //echarts窗口缩放时自适应
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();
//订单量模块
(function () {
    $(".order .filter").on("click", "a", function () {
        index = $(this).index();
        // console.log(index);
        $(this).addClass("active").siblings("a").removeClass("active");
        // console.log($(this).index());
        $(".order .data").eq($(this).index()).show().siblings(".data").hide();
    });
    //定时器模块
    var as = $(".order .filter a");//把所有的a获取过来
    var index = 0;
    var timer = setInterval(function () {
        index++;
        as[index].click();
        if (index == 3) {
            index = -1;
        }
    }, 2000)
    // 鼠标经过停止定时器
    $('.order').children('.inner').hover(
        function () {
            clearInterval(timer);
        },
        //鼠标离开开启定时器
        function () {
            var as = $(".order .filter a");//把所有的a获取过来
            clearInterval(timer);
            timer = setInterval(function () {
                index++;
                if (index == 4) {
                    index = 0;
                }
                 as[index].click();
            }, 2000)
        }
    )
})();
//销售统计模块
(function () {
    var myChart = echarts.init(document.querySelector(".line"));
    //把数据放在对象里 点击a调用
    var data = {
        year: [
            [20, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            [40, 69, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
        ],
        quarter: [
            [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
            [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
        ],
        month: [
            [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
            [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
        ],
        week: [
            [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
            [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
        ]
    };
    var option = {
        //通过坐标轴触发
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['预期销售额', '实际销售额'],
            textStyle: {
                color: '#4c9bfd'
                //图例文字颜色
            },
            right: '10%'
            //距离右边10%
        },
        grid: {
            top: '20%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
            width: '90%',
            borderColor: '#012f4a'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月',],
            axisTick: {
                show: false
                //去除刻度线   
            },
            axisLabel: {
                color: '#4c9bfd'//文本颜色
            },
            axisLine: {
                show: false,//去除轴线
            },
            boundaryGap: false,//去除轴内间距
            splitLine: {
                show: false,   //X网格线
                lineStyle: {   //x网格线
                    color: '#ffffff'
                }
            }
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show: false
                //去除刻度线   
            },
            axisLabel: {
                color: '#4c9bfd'//文本颜色
            },
            axisLine: {
                show: true,//显示y轴线
                lineStyle: {
                    color: '#333333',//y轴颜色
                    width: 1, //这里是为了突出显示加上的  
                }

            },
            boundaryGap: false,//去除轴内间距
            splitLine: {
                show: true,   //X网格线
                lineStyle: {   //x网格线
                    color: '#012f4a'
                }
            }
        },
        color: ['#00f2f1', '#ed3f35'],
        series: [
            {
                name: '预期销售额',
                type: 'line',
                data: data.year[0],
                //折线修饰为圆滑
                smooth: true
            },
            {
                name: '实际销售额',
                type: 'line',
                data: data.year[1],
                smooth: true
            }
        ]
    };

    $(".sales").on("click", ".caption a", function () {
        index = $(this).index() - 1;
        // console.log(index);
        //点击切换
        $(this).addClass('active').siblings("a").removeClass("active");
        //获取点击的a设置的data-type属性值this.dataset.type
        //属性值this.dataset.type放到data这个数组中找到对应的数据currData
        var currData = data[this.dataset.type];
        // console.log(currData);
        option.series[0].data = currData[0];
        option.series[1].data = currData[1];
        //重新把配置好的新数据给实例对象
        myChart.setOption(option);
    })
    // 页面刷新先让让第一个a被点击
    var as = $(".sales .caption a")//把所有的a获取过来
    as.eq(0).click();
    //设置定时器 每2s自动让a触发事件
    var timer = setInterval(function () {
        index++;
        // console.log(index);
        if (index == 4) {
            index = 0;
        }
        as[index].click();
    }, 2000)
    //鼠标离开停止计时器
    $(".sales ").hover(
        function () {
            clearInterval(timer);
        },
        //鼠标离开开启定时器
        function () {
            var as = $(".sales .caption a");//把所有的a获取过来
            clearInterval(timer);
            timer = setInterval(function () {
                index++;
                if (index == 4) {
                    index = 0;
                }
                as[index].click();
            }, 2000)
        }
    );

    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();
//渠道分布模块
(function () {
    var dataBJ = [
        [55, 9, 56, 0.46, 18, 6, 1]
    ];
    var myChart = echarts.init(document.querySelector(".radar"))

    var dataBJ = [[90, 19, 56, 11, 34, 76]];
    var option = {
        //鼠标经过提示框组件显示
        tooltip: {
            show: true,
            //设置提示框背景颜色
            backgroundColor: '#23272e',
            //提示框边框大小
            borderWidth: '0',
            //提示框文字样式
            textStyle: {
                color: '#fff',
                fontSize: 12
            },
            //控制提示框组建的位置
            position: ['60%', '10%'],//相对位置都是50%就在容器正中间
        },
        radar: {
            radius: '65%',//设置半径大小
            indicator: [
                { name: '机场', max: 100 },
                { name: '商场', max: 100 },
                { name: '火车站', max: 100 },
                { name: '汽车站', max: 100 },
                { name: '地铁', max: 100 },
            ],
            shape: 'circle',//雷达图为圆形
            splitNumber: 4,//分割的圆圈个数
            name: {
                // 修饰雷达图文本颜色
                textStyle: {
                    color: '#4c9bfd'
                }
            },
            //分割圆圈线条的样式
            splitLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.5)'//分割圆圈线条的颜色
                }
            },
            splitArea: {//雷达图背景无阴影透明
                show: false
            },
            //坐标轴线相关设置
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255,255,255,0.5)'//坐标轴线的颜色
                }
            }
        },

        series: [
            {
                name: '北京',
                type: 'radar',
                //填充区域的线条样式
                lineStyle: {
                    normal: {
                        color: '#fff',
                        width: 1,
                        opacity: 0.5
                    }

                },
                data: dataBJ,
                //拐点设置为圆形
                symbol: 'circle',
                //拐点的半径大小
                symbolSize: 5,
                //拐点的颜色
                itemStyle: {
                    color: '#fff'
                },
                //在拐点上显示相关数据
                label: {
                    show: true,
                    color: '#fff',
                    fontSize: 10
                },
                //修饰填充区域的样式
                areaStyle: {
                    // opacity: 0.1,//透明
                    color: 'rgba(238,197,102,0.6)'//背景颜色

                }
            },
        ]
    };
    myChart.setOption(option);
    //echarts窗口缩放时自适应
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();
//销售进度模块
(function () {
    var myChart = echarts.init(document.querySelector(".gauge"))
    var option = {
        series: [
            {
                name: '销售进度',
                type: 'pie',
                //半径放大
                radius: ['130%', '150%'],
                //调整位置
                center: ['48%', '80%'],//向左移动，向下移动
                labelLine: {
                    show: false
                },
                hoverOffset: 0,//鼠标经过不放大
                data: [
                    {
                        value: 500,
                        itemStyle: {
                            //设置右上半段颜色
                            color: '#12274d'
                        }
                    },
                    {
                        value: 1000,
                        itemStyle: {
                            //设置下半段背景颜色
                            color: 'transparent'
                        }
                    },
                    {
                        value: 500,
                        itemStyle: {
                            //设置左上段背景颜色
                            color: new echarts.graphic.LinearGradient(
                                //(x1,y1)到（y1,y2）之间进行渐变
                                0,
                                0,
                                0,
                                1,
                                [
                                    { offset: 0, color: '#00c9e0' },//0起始颜色
                                    { offset: 1, color: '#005fc1' }//1结束颜色
                                ]
                            )
                        }
                    },
                ]
            }
        ]
    };
    myChart.setOption(option);
    //echarts窗口缩放时自适应
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();
//全国热榜模块
(function () {
    //1.获取数据
    var hotData = [
        {
            city: '北京',//城市
            sales: '25,179',//销售额
            flag: true,//上升还是下降
            brands: [//品牌种类数据
                { name: '可爱多', num: '9,086', flag: true },
                { name: '娃哈哈', num: '8,341', flag: true },
                { name: '喜之郎', num: '7,407', flag: false },
                { name: '八喜', num: '6,080', flag: false },
                { name: '小洋人', num: '6,724', flag: false },
                { name: '好多鱼', num: '2,170', flag: true }
            ]
        },
        {
            city: '河北',
            sales: '23,252',
            flag: false,
            brands: [
                { name: '可爱多', num: '3,457', flag: false },
                { name: '娃哈哈', num: '2,124', flag: true },
                { name: '喜之郎', num: '8,970', flag: false },
                { name: '八喜', num: '6,080', flag: true },
                { name: '小洋人', num: '1,724', flag: false },
                { name: '好多鱼', num: '1,170', flag: false }
            ]
        },
        {
            city: '上海',
            sales: '21,760',
            flag: true,
            brands: [
                { name: '可爱多', num: '2,345', flag: true },
                { name: '娃哈哈', num: '7,190', flag: true },
                { name: '喜之郎', num: '3,701', flag: false },
                { name: '八喜', num: '6,080', flag: true },
                { name: '小洋人', num: '2,724', flag: false },
                { name: '好多鱼', num: '2,298', flag: true }
            ]
        },
        {
            city: '江苏',
            sales: '19,232',
            flag: false,
            brands: [
                { name: '可爱多', num: '1,890', flag: false },
                { name: '娃哈哈', num: '4,170', flag: true },
                { name: '喜之郎', num: '3,801', flag: false },
                { name: '八喜', num: '5,566', flag: true },
                { name: '小洋人', num: '2,345', flag: false },
                { name: '好多鱼', num: '2,098', flag: false }
            ]
        },
        {
            city: '山东',
            sales: '16,760',
            flag: true,
            brands: [
                { name: '可爱多', num: '1,675', flag: true },
                { name: '娃哈哈', num: '3,786', flag: true },
                { name: '喜之郎', num: '3,342', flag: false },
                { name: '八喜', num: '4,443', flag: false },
                { name: '小洋人', num: '1,876', flag: true },
                { name: '好多鱼', num: '2,044', flag: false }
            ]
        },
    ]
    //2.根据数据渲染各省热销sup模块内容
    //(1)删掉原先的小li
    //(2)遍历 hotData对象 $.each()
    var supHTML = '';
    $.each(hotData, function (index, item) {
        // console.log(item);
        //(3)拼接字符串把数据渲染到 li的 span 里
        supHTML += `<li><span>${item.city}</span><span>${item.sales}  <i class=${item.flag ? "icon-up" : "icon-down"}></i></span></li>`;
    })
    //(4)追加到.sup内   
    $('.sup').html(supHTML);
    //3.当鼠标经过某个小li的时候 
    $('.province .sup').on('mouseenter', 'li', function () {
        //当前的小li高亮
        index = $(this).index();
        $(this).addClass('active').siblings('li').removeClass('active')
        //同时显示对应的sub模块 
        var subHTML = '';
        //遍历对应的数组brands里的对象 把数据依次放入subHTML中
        $.each(hotData[$(this).index()].brands, function (index, item) {
            subHTML += `<li><span>${item.name}</span>${item.num}<span> <i class=${item.flag ? "icon-up" : "icon-down"}></i></span></li>`
        })
        //再把subHTML里的数据渲染到sub这个盒子里
        $('.sub').html(subHTML);
    })
    //4.页面刷新时默认第一个li鼠标经过状态
    var lis = $(".province .sup li");
    lis.eq(0).mouseenter();
    //5.设置定时器
    var index = 0;
    var timer = setInterval(function () {
        index++;
        if (index == 5) {
            index = 0;
        };
        lis.eq(index).addClass('active').siblings('li').removeClass('active')
        //同时显示对应的sub模块 
        var subHTML = '';
        //遍历对应的数组brands里的对象 把数据依次放入subHTML中
        $.each(hotData[index].brands, function (index, item) {
            subHTML += `<li><span>${item.name}</span>${item.num}<span> <i class=${item.flag ? "icon-up" : "icon-down"}></i></span></li>`
        })
        //再把subHTML里的数据渲染到sub这个盒子里
        $('.sub').html(subHTML);
    }, 2000)
    //鼠标移动到sup这个模块 停止计时器 鼠标离开启动定时器
    $('.province .sup').hover(
        function () {
            clearInterval(timer);
        },
        function () {
            clearInterval(timer);
            timer = setInterval(function () {
                index++;
                if (index == 5) {
                    index = 0;
                };
                lis.eq(index).addClass('active').siblings('li').removeClass('active')
                //同时显示对应的sub模块 
                var subHTML = '';
                //遍历对应的数组brands里的对象 把数据依次放入subHTML中
                $.each(hotData[index].brands, function (index, item) {
                    subHTML += `<li><span>${item.name}</span>${item.num}<span> <i class=${item.flag ? "icon-up" : "icon-down"}></i></span></li>`
                })
                //再把subHTML里的数据渲染到sub这个盒子里
                $('.sub').html(subHTML);
            }, 2000);
        }
    );
})();



