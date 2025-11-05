import { NavItem } from './nav-item/nav-item';

export const navItemsAdvisor: NavItem[] = [
  {
    navCap: 'Citas',
  },
  {
    displayName: 'Mis Citas',
    iconName: 'calendar',
    route: '/apps/advisor/appointments',
  },
  {
    displayName: 'Mis Horarios',
    iconName: 'building-warehouse',
    route: '/apps/advisor/enclosures',
  },
  {
    navCap: 'Perfil',
  },
  {
    displayName: 'Mi Perfil',
    iconName: 'user-circle',
    route: '/apps/advisor/profile',
  },
  {
    displayName: 'Mis Notificaciones',
    iconName: 'notification',
    route: '/apps/advisor/notifications',
  },
  {
    navCap: 'Publicaciones',
  },
  {
    displayName: 'Mis Publicaciones',
    iconName: 'news',
    route: '/apps/advisor/posts',
  },
];
