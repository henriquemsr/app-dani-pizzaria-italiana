import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '', loadChildren: () => import('./pages/walkthrough/walkthrough.module').then(m => m.WalkthroughPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'home-location',
    loadChildren: () => import('./pages/home-location/home-location.module').then(m => m.HomeLocationPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./pages/support/support.module').then(m => m.SupportPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./pages/messages/messages.module').then(m => m.MessagesPageModule)
  },
  {
    path: 'message/:id',
    loadChildren: () => import('./pages/message/message.module').then(m => m.MessagePageModule)
  },
  {
    path: 'home-results',
    loadChildren: () => import('./pages/home-results/home-results.module').then(m => m.HomeResultsPageModule)
  },
  {
    path: 'search-filter',
    loadChildren: () => import('./pages/modal/search-filter/search-filter.module').then(m => m.SearchFilterPageModule)
  },
  {
    path: 'nearby', loadChildren: () => import('./pages/nearby/nearby.module').then(m => m.NearbyPageModule)
  },
  {
    path: 'bycategory',
    loadChildren: () => import('./pages/bycategory/bycategory.module').then(m => m.BycategoryPageModule)
  },
  {
    path: 'restaurant-list/:cat',
    loadChildren: () => import('./pages/restaurant-list/restaurant-list.module').then(m => m.RestaurantListPageModule)
  },
  {
    path: 'restaurant-detail/:id',
    loadChildren: () => import('./pages/restaurant-detail/restaurant-detail.module').then(m => m.RestaurantDetailPageModule)
  },
  {
    path: 'dish-list',
    loadChildren: () => import('./pages/dish-list/dish-list.module').then(m => m.DishListPageModule)
  },
  {
    path: 'dish-detail/:id',
    loadChildren: () => import('./pages/dish-detail/dish-detail.module').then(m => m.DishDetailPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./pages/favorites/favorites.module').then(m => m.FavoritesPageModule)
  },
  {
    path: 'latest-orders',
    loadChildren: () => import('./pages/latest-orders/latest-orders.module').then(m => m.LatestOrdersPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/modal/cart/cart.module').then(m => m.CartPageModule)
  },
  {
    path: 'address',
    loadChildren: () => import('./pages/modal/address/address.module').then(m => m.AddressPageModule)
  },
  // { path: 'address', loadChildren: './pages/modal/address/address.module#AddressPageModule' },

  // {
  //   path: '**',
  //   redirectTo: '/home-results'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
