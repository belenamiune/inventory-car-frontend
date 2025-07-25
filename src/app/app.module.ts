import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './features/auth/auth.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { localStorageSync } from 'ngrx-store-localstorage';
import { authReducer } from './store/auth/auth.reducer';
import { uiReducer } from './store/ui/ui.reducer';
import { productosReducer } from './store/productos/productos.reducer';
import { ProductosEffects } from './store/productos/productos.effects';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

import { MenubarModule } from 'primeng/menubar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RouterModule } from '@angular/router';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './layouts/private-layout/private-layout.component';
import { ButtonModule } from 'primeng/button';
import { NgChartsModule } from 'ng2-charts';
import { AuthEffects } from './store/auth/auth.effects';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['auth'],
    rehydrate: true
  })(reducer);
}
const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer];

@NgModule({
  declarations: [AppComponent, NavbarComponent, PublicLayoutComponent, PrivateLayoutComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    MenubarModule,
    ToggleButtonModule,
    RouterModule,
    ButtonModule,
    NgChartsModule,
    StoreModule.forRoot(
      {
        productos: productosReducer,
        auth: authReducer,
        ui: uiReducer
      },
      { metaReducers }
    ),
    EffectsModule.forRoot([ProductosEffects, AuthEffects])
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
