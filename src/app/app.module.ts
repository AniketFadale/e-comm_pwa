import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { SettingsModule } from '.settings/settings.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { AuthModule } from './auth/auth.module';
// import { HomeModule } from './home/home.module';
// import { AuthGuard } from './guards/auth.guard';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { NavbarafterLoginComponent } from './navbarafter-login/navbarafter-login.component';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';
import environment from './environment';
import { GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { SellerModule } from './seller/seller.module';
// import { NavbarafterLoginComponent } from './navbarafter-login/navbarafter-login.component';
import { ShopModule } from './shop/shop.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './appStore/app.state';
import { counterReducer } from './shop/counter.reducer';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    NavbarafterLoginComponent,
    NotFoundComponent,
    
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    // AuthModule,
    // HomeModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({timeOut : 2000}),
    HttpClientModule,
    // SettingsModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true,
      

    }), StoreModule.forRoot(appReducer),

    NgxUiLoaderRouterModule,
    RecaptchaV3Module,
    SellerModule,
    ShopModule,
    NgxDropzoneModule,
    StoreModule.forRoot({users : counterReducer}),
    StoreDevtoolsModule.instrument({
      logOnly:!isDevMode()
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
    
  ],
  providers: [
    // AuthGuard,
    // ToastrModule,
    ReCaptchaV3Service,
    // SocialLoginModule,
    SocialAuthService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: RECAPTCHA_V3_SITE_KEY, useValue:environment.reCaptchaKey },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.clientId
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }