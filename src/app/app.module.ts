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

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['auth'], 
    rehydrate: true,
  })(reducer);
}

const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    StoreModule.forRoot(
    {
        productos: productosReducer,
        auth: authReducer,
        ui: uiReducer,
    },
    { metaReducers }
    ),
    EffectsModule.forRoot([ ProductosEffects]),
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
