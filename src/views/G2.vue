<template>
    <div id="c1">
        g2画图
    </div>
</template>

<script>
    import G2Config from '@/utils/g2-config.js'
    import {
        Chart
    } from '@antv/g2';
    export default {
        mixins: [G2Config],
        data() {
            return {
                data: [{
                        x: 100,
                        y: 25,
                        defectName: '棉球'
                    },
                    {
                        x: 50,
                        y: 115,
                        defectName: '棉球'
                    },
                    {
                        x: 43,
                        y: 120,
                        defectName: '棉球'
                    },
                    {
                        x: 140,
                        y: 30,
                        defectName: '棉球'
                    },
                    {
                        x: 20,
                        y: 150,
                        defectName: '棉球'
                    },
                    {
                        x: 10,
                        y: 30,
                        defectName: '棉球'
                    },
                    {
                        x: 20,
                        y: 10,
                        defectName: '棉球'
                    },
                ],
                data2: [{
                    "x": [
                        126.65,
                        130.65
                    ],
                    "y": [
                        108.491,
                        109.491
                    ],
                    "color": "#78DEF9",
                    "defectName": "双经",
                    "left": 126.65,
                    "top": 108.491,
                    "width": 0.48,
                    "height": 0.3,
                    "defectId": "4cb141712195479fb873585f206ce0c1",
                    "imageUrl": "https://woven-qms-collect.oss-cn-hangzhou.aliyuncs.com/prod/2022-12-30/39760a7812dd45c0a5ae86db4699f121/39760a7812dd45c0a5ae86db4699f121/variety01/YINGYU501-20211229201839/joint/4cb141712195479fb873585f206ce0c1.jpeg"
                }, {
                    "x": [
                        64.52,
                        68.52
                    ],
                    "y": [
                        110.573,
                        111.573
                    ],
                    "color": "#78DEF9",
                    "defectName": "双经",
                    "left": 64.52,
                    "top": 110.573,
                    "width": 0.41,
                    "height": 0.18,
                    "defectId": "a109c374796445e483b13a3256b93d97",
                    "imageUrl": "https://woven-qms-collect.oss-cn-hangzhou.aliyuncs.com/prod/2022-12-30/39760a7812dd45c0a5ae86db4699f121/39760a7812dd45c0a5ae86db4699f121/variety01/YINGYU501-20211229201839/joint/a109c374796445e483b13a3256b93d97.jpeg"
                }, {
                    "x": [
                        134.9,
                        135.9
                    ],
                    "y": [
                        111.855,
                        115.855
                    ],
                    "color": "#78DEF9",
                    "defectName": "双经",
                    "left": 134.9,
                    "top": 111.855,
                    "width": 0.48,
                    "height": 0.53,
                    "defectId": "72cc13fea442499fa6c80086effb7ec3",
                    "imageUrl": "https://woven-qms-collect.oss-cn-hangzhou.aliyuncs.com/prod/2022-12-30/39760a7812dd45c0a5ae86db4699f121/39760a7812dd45c0a5ae86db4699f121/variety01/YINGYU501-20211229201839/joint/72cc13fea442499fa6c80086effb7ec3.jpeg"
                }]
            }
        },
        mounted() {
            // Step 1: 创建 Chart 对象
            const chart = new Chart({
                container: 'c1', // 指定图表容器 ID
                width: 724, // 指定图表宽度
                height: 584, // 指定图表高度
                // autoFit: true,
                // limitInPlot: false
            });
            chart.legend(false)
            chart.scale('y', {
                min: 0,
                max: 200,
                tickCount: 20,
            })
            chart.scale('x', {
                min: 0,
                max: 150,
                tickInterval: 150 / 4,
            });

            // 全局 tooltip
            chart.tooltip({
                showTitle: false,
                itemTpl: '<p style="min-width: 100px; height: 50px;text-align: left;"><span>经度：{x}</span></br></br><span>纬度：{y}</span></p>'
            });
            const Circle = chart.createView({
                padding: [6, 100, 5, 60] // 指定视图的留白
            });
            // Step 2: 载入数据源
            Circle.data(this.data);
            Circle.axis(false);
            // Step 3: 创建图形语法，绘制柱状图

            Circle.point()
                .position('x*y')
                .shape('circle')
                .size(8)
                .style({
                    fill: 'rgb(120, 222, 249)'
                })
                .label('defectName');
            // .tooltip('left*top*defectName', (left, top, defectName) => {
            //     return {
            //         left,
            //         top: NP.times(top, 100),
            //         defectName
            //     }
            // });;

            const Line = chart.createView();
            // Step 2: 载入数据源
            Line.data(this.data2);
            Line.axis('y', {
                label: {
                    autoEllipsis: false,
                    formatter: (text, item, index) => {
                        return `(${text}, 150)`
                    }
                },
                grid: {
                    alignTick: true
                }
            })
            Line.axis('x', {
                label: null,
                grid: {
                    line: {
                        type: 'line',
                        style: {
                            fillOpacity: 0.4,
                        }
                    }
                }
            })
            // Step 3: 创建图形语法，绘制柱状图
            Line.interval().position('x*y').style({
                fill: 'rgb(24, 144, 255)'
            }).label('defectName', {
                layout: {
                    type: 'overlap'
                }
            })

            // Step 4: 渲染图表
            chart.render();
        }
    }
</script>

<style>

</style>