import type { Chapter } from '../types/portfolio';

export const chapters: Chapter[] = [
{
  id: 'origin',
  label: 'Origin',
  title: 'It started with view-source.',
  body: 'At fourteen I right-clicked a Flash site I loved and fell straight down the rabbit hole. I have been taking interfaces apart to understand how they feel ever since.',
  stat: { value: '2012', label: 'First line of JavaScript' }
},
{
  id: 'craft',
  label: 'Craft',
  title: 'Interfaces should feel physical.',
  body: 'Springs over keyframes. Feedback under 100ms. I sweat the frame budget because people feel jank long before they can name it.',
  stat: { value: '60fps', label: 'The non-negotiable baseline' }
},
{
  id: 'range',
  label: 'Range',
  title: 'From shader to server.',
  body: 'WebGL scenes and design systems up front, Node and Postgres behind them. I like owning a feature from the first pixel to the last query.',
  stat: { value: '3 layers', label: 'Pixels · Motion · Systems' }
},
{
  id: 'now',
  label: 'Now',
  title: 'Building tools people love to touch.',
  body: 'Today I lead frontend at Northwind Studio, shipping creative product work for teams who care about craft as much as conversion.',
  stat: { value: '40+', label: 'Products shipped to production' }
}];