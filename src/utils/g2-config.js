import {
  registerGeometry,
  registerComponentController,
  registerEngine,
  // registerAnimation,
  registerGeometryLabel,
  registerAction,
  registerInteraction
} from '@antv/g2/lib/core';
import * as CanvasEngine from '@antv/g-canvas';
import Line from '@antv/g2/lib/geometry/line';
import Point from '@antv/g2/lib/geometry/point';
import Interval from '@antv/g2/lib/geometry/interval';
import Axis from '@antv/g2/lib/chart/controller/axis';
import Tooltip from '@antv/g2/lib/chart/controller/tooltip';

// import { growInY } from '@antv/g2/lib/animate/animation/grow-in';
// animations
// import { fadeIn, fadeOut } from '@antv/g2/lib/animate/animation/fade';
// import { growInX, growInXY } from '@antv/g2/lib/animate/animation/grow-in';
// import { pathIn } from '@antv/g2/lib/animate/animation/path-in';
// import { positionUpdate } from '@antv/g2/lib/animate/animation/position-update';
// import { scaleInX, scaleInY } from '@antv/g2/lib/animate/animation/scale-in';
// import { sectorPathUpdate } from '@antv/g2/lib/animate/animation/sector-path-update';
// import { waveIn } from '@antv/g2/lib/animate/animation/wave-in';
// import { zoomIn, zoomOut } from '@antv/g2/lib/animate/animation/zoom';

import GeometryLabel from '@antv/g2/lib/geometry/label/base';
import IntervalLabel from '@antv/g2/lib/geometry/label/interval';
import TooltipAction from '@antv/g2/lib/interaction/action/component/tooltip/geometry';
export default {
  created() {
    registerEngine('canvas', CanvasEngine);
    registerGeometry('Line', Line);
    registerGeometry('Point', Point);
    registerGeometry('Interval', Interval);
    registerComponentController('axis', Axis);
    registerComponentController('tooltip', Tooltip);
    // registerAnimation('grow-in-y', growInY);
    // 注册动画事件，需要用到再开放
    // registerAnimation('fade-in', fadeIn);
    // registerAnimation('fade-out', fadeOut);
    // registerAnimation('grow-in-x', growInX);
    // registerAnimation('grow-in-xy', growInXY);
    // registerAnimation('scale-in-x', scaleInX);
    // registerAnimation('scale-in-y', scaleInY);
    // registerAnimation('wave-in', waveIn);
    // registerAnimation('zoom-in', zoomIn);
    // registerAnimation('zoom-out', zoomOut);
    // registerAnimation('position-update', positionUpdate);
    // registerAnimation('sector-path-update', sectorPathUpdate);
    // registerAnimation('path-in', pathIn);
    registerGeometryLabel('base', GeometryLabel);
    registerGeometryLabel('interval', IntervalLabel);
    registerAction('tooltip', TooltipAction);

    // 注册 tooltip 的 interaction
    registerInteraction('tooltip', {
      start: [
        {
          trigger: 'plot:mousemove',
          action: 'tooltip:show',
          throttle: {
            wait: 50,
            leading: true,
            trailing: false
          }
        },
        {
          trigger: 'plot:touchmove',
          action: 'tooltip:show',
          throttle: {
            wait: 50,
            leading: true,
            trailing: false
          }
        }
      ],
      end: [
        {
          trigger: 'plot:mouseleave',
          action: 'tooltip:hide'
        },
        {
          trigger: 'plot:leave',
          action: 'tooltip:hide'
        },
        {
          trigger: 'plot:touchend',
          action: 'tooltip:hide'
        }
      ]
    });
  }
};
