import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from 'src/app/store/auth/auth.effects';
import { authReducer } from 'src/app/store/auth/auth.reducer';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message'; 
import { MessagesModule } from 'primeng/messages'; 

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    MessageModule, 
    MessagesModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects],)
  ],
  providers: [AuthService]
})
export class AuthModule { }
