﻿export type MsMotionSlideDir = 'rtl' | 'ltr';

export class MsMotionOptions {
  duration: number = 300;
  delay?: number = 0;
  easing: string;
}

export class MsMotionSlideOptions extends MsMotionOptions {
  dir: MsMotionSlideDir;
}

export const MS_MOTION_SLIDE_LTR_IN: Keyframe[] = [
  {transform: 'translate3d(-48px, 0, 0)', opacity: '0'},
  {transform: 'translate3d(0, 0, 0)', opacity: '1'}
];

export const MS_MOTION_SLIDE_RTL_IN: Keyframe[] = [
  {transform: 'translate3d(48px, 0, 0)', opacity: '0'},
  {transform: 'translate3d(0, 0, 0)', opacity: '1'}
];

export const MS_MOTION_SLIDE_LTR_OUT: Keyframe[] = [
  {transform: 'translate3d(0, 0, 0)', opacity: '1'},
  {transform: 'translate3d(48px, 0, 0)', opacity: '0'}
];

export const MS_MOTION_SLIDE_RTL_OUT: Keyframe[] = [
  {transform: 'translate3d(0, 0, 0)', opacity: '1'},
  {transform: 'translate3d(-48px, 0, 0)', opacity: '0'}
];


export const MS_MOTION_SLIDE_UP_IN: Keyframe[] = [
  {transform: 'translate3d(0, 48px, 0)', opacity: '0'},
  {transform: 'translate3d(0, 0, 0)', opacity: '1'}
];

export const MS_MOTION_SLIDE_UP_OUT: Keyframe[] = [
  {transform: 'translate3d(0, 0, 0)', opacity: '1'},
  {transform: 'translate3d(0, 48px, 0)', opacity: '0'}
];

export const MS_MOTION_SLIDE_DOWN_IN: Keyframe[] = [
  {transform: 'translate3d(0, -48px, 0)', opacity: '0'},
  {transform: 'translate3d(0, 0, 0)', opacity: '1'}
];

export const MS_MOTION_SLIDE_DOWN_OUT: Keyframe[] = [
  {transform: 'translate3d(0, 0, 0)', opacity: '1'},
  {transform: 'translate3d(0, -48px, 0)', opacity: '0'}
];
export const MS_MOTION_SLIDE_UP_IN_FROM = {translateY : 48, opacity: 0};
export const MS_MOTION_SLIDE_DOWN_IN_FROM = {translateY: -48, opacity: 0};

export const MS_MOTION_SLIDE_UP_OUT_TO = {transform: 'translate3d(0, -48px, 0)', opacity: '0'};
export const MS_MOTION_SLIDE_DOWN_OUT_TO = {transform: 'translate3d(0, 48px, 0)', opacity: '0'};

export class MsMotionKeyFrames {
  static fadeIn: Keyframe[] = [
    {opacity: 0},
    {opacity: 1}
  ];

  static fadeOut: Keyframe[] = [
    {opacity: 1},
    {opacity: 0}
  ];

  static scaleDownIn: Keyframe[] = [
    {transform: 'scale3d(1.15, 1.15, 1)'},
    {transform: 'scale3d(1, 1, 1)'}
  ];

  static scaleDownOut: Keyframe[] = [
    {transform: 'scale3d(1, 1, 1)'},
    {transform: 'scale3d(0.9, 0.9, 1)'}
  ];

  static slideLeftOut: Keyframe[] = [
    {transform: 'translate3d(0, 0, 0)'},
    {transform: 'translate3d(-48px, 0, 0)'}
  ];

  static slideLeftIn: Keyframe[] = [
    {transform: 'translate3d(0, 0, 0)'},
    {transform: 'translate3d(48px, 0, 0)'}
  ];

  static slideRightIn: Keyframe[] = [
    {transform: 'translate3d(-48px, 0, 0)'},
    {transform: 'translate3d(0px, 0, 0)'}
  ];

  static slideUpOut: Keyframe[] = [
    {transform: 'translate3d(0, 0, 0)'},
    {transform: 'translate3d(0, -48px, 0)'}
  ];

  static slideDownOut: Keyframe[] = [
    {transform: 'translate3d(0, 0, 0)'},
    {transform: 'translate3d(0, 48px, 0)'}
  ];

  static slideUpIn: Keyframe[] = [
    {transform: 'translate3d(0, 48px, 0)'},
    {transform: 'translate3d(0, 0, 0)'}
  ];

  static slideDownIn: Keyframe[] = [
    {transform: 'translate3d(0, -48px, 0)'},
    {transform: 'translate3d(0px, 0, 0)'}
  ];

  static getSlideInFromDir(dir: 'top' | 'left' | 'bottom' | 'right') {
    if (dir === 'left') {
      return MsMotionKeyFrames.slideLeftIn;
    }
    if (dir === 'right') {
      return MsMotionKeyFrames.slideRightIn;
    }
    if (dir === 'top') {
      return MsMotionKeyFrames.slideUpIn;
    }
    if (dir === 'bottom') {
      return MsMotionKeyFrames.slideDownOut;
    }
    return MsMotionKeyFrames.slideLeftIn;
  }
}


export class MsMotionTimings {
  public static accelerate = 'cubic-bezier(0.9, 0.1, 1, 0.2)';
  public static decelerate = 'cubic-bezier(0.1, 0.9, 0.2, 1)';
  public static linear = 'cubic-bezier(0, 0, 1, 1)';
  public static standard = 'cubic-bezier(0.8, 0, 0.2, 1)';
}
