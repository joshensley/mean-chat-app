import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Auth Guard
import { AuthGuard } from './services/auth/auth-guard.service';
import { RegisterLoginGuard } from './services/auth/register-login-guard.service';

// Auth Routes
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LogoutComponent } from './components/auth/logout/logout.component';

// Main Routes
import { IndexHomeComponent } from './components/main/home/index-home/index-home.component';
import { IndexConversationComponent } from './components/main/conversation/index-conversation/index-conversation.component';

const routes: Routes = [
  // Auth Routes
  { path: 'login', component: LoginComponent, canActivate: [RegisterLoginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [RegisterLoginGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [RegisterLoginGuard] },
  // Main Routes
  { path: '', component: IndexHomeComponent, canActivate: [AuthGuard] },
  { path: 'conversation/:loginUser/:otherUser', component: IndexConversationComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
