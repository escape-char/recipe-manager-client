import {
trigger,
state,
style,
transition,
animate } from '@angular/core';


export const modalAnimations:any = [
  trigger('slideInOut', [
    state('*', style({transform: 'translateY(0)'})),
    state('in', style({transform: 'translateY(0)'})),
    state('out', style({transform: 'translateY(-300%)'})),

    transition('void => *', [
      style({transform:'translateY(-100%)'}),
      animate(300)
    ]),
    transition('* => void, in => out', [
      animate(300,style({transform:'translateY(-300%)'}) )
    ])
]),
trigger('fadeInOut', [
  state('*', style({opacity: 1})),
  state('in', style({opacity: 1})),
  state('out', style({opacity: 0.0})),

  transition('void => *', [
    style({opacity:0}),
    animate(600)
  ]),
  transition('* => void, in => out', [
    animate(900,style({opacity:0.0}))
  ])
])
];
