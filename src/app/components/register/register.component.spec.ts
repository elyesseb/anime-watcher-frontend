import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {
  createComponentFactory,
  Spectator,
  createHttpFactory,
  SpectatorHttp,
  createRoutingFactory,
  HttpMethod,
} from '@ngneat/spectator';
import { LoginComponent } from '../login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';

describe('RegisterComponent', () => {
  let spectatorComponent: Spectator<RegisterComponent>;
  let spectatorAuthService: SpectatorHttp<AuthService>;

  const createHttp = createHttpFactory(AuthService);
  const createComponent = createComponentFactory({
    component: RegisterComponent,
    imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
    ],
  });

  const createRouter = createRoutingFactory({
    component: RegisterComponent,
    declarations: [LoginComponent],
    stubsEnabled: false,
    routes: [
      {
        path: 'signup',
        component: RegisterComponent,
      },
      {
        path: 'signin',
        component: LoginComponent,
      },
    ],
  });

  // reset instance component
  beforeEach(() => (spectatorComponent = createComponent()));
  beforeEach(() => (spectatorAuthService = createHttp()));

  it('Form should be appear', () => {
    expect(spectatorComponent.query('form')).toBeTruthy();
  });

  it('Post reqest send the good one', () => {
    spectatorAuthService.service.register('Lu', 'Lulu', '1234').subscribe();
    const req = spectatorAuthService.expectOne(
      'https://snk-api.azurewebsites.net/api/auth/signup',
      HttpMethod.POST
    );
    expect(req.request.body['username']).toEqual('Lu');
  });

  it('Write username input', () => {
    const input = spectatorComponent.query('#username') as HTMLInputElement;
    expect(input).toExist();
    // spectatorComponent.typeInElement('Lu', input);
    // expect(input.value).toEqual('Lu');
    expect(spectatorComponent.query('[data-cy="submit"]')).toBeTruthy();
    spectatorComponent.click('[data-cy="submit"]');
    spectatorAuthService.expectOne(
      'https://snk-api.azurewebsites.net/api/auth/signup',
      HttpMethod.POST
    );
  });
});
