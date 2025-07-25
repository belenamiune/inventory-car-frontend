import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from '@app/app.component';

import { EffectsModule } from '@ngrx/effects';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { authReducer, AuthEffects } from '@features/auth/store';
import { themeReducer } from '@store/theme';
import { productosReducer, ProductosEffects } from '@features/productos/store';

import { AuthInterceptor } from '@core/interceptors/auth.interceptor';
import { SharedModule } from '@shared/shared.module';
import { AuthModule } from '@features/auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['auth'],
    rehydrate: true
  })(reducer);
}
const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AuthModule,
    SharedModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    StoreModule.forRoot(
      {
        productos: productosReducer,
        auth: authReducer,
        theme: themeReducer
      },
      { metaReducers }
    ),
    EffectsModule.forRoot([ProductosEffects, AuthEffects])
  ],

  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {}
