import { NavItem } from './nav-item/nav-item';

export const navItemsFarmer: NavItem[] = [
  {
    navCap: 'Citas',
  },
  {
    displayName: 'Catálogo',
    iconName: 'aperture',
    route: '/apps/catalog',
  },
  {
    displayName: 'Mis Citas',
    iconName: 'calendar',
    route: '/apps/appointments',
  },
  {
    navCap: 'Gestión',
  },
  {
    displayName: 'Mis Recintos',
    iconName: 'building-warehouse',
    route: '/apps/enclosures',
  },
  {
    navCap: 'Posts',
  },
  {
    displayName: 'Ver Posts',
    iconName: 'news',
    route: '/apps/posts',
  }
];
