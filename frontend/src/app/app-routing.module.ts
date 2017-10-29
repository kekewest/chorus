import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilesComponent } from "app/files/components/files.component";
import { LoginComponent } from "app/login/components/login.component";
import { FilesLsComponent } from "app/files/components/files-main-col/files-ls/files-ls.component";
import { SheetComponent } from "app/sheet/components/sheet.component";
import { MeStoreService } from "app/common/services/store/me-store.service";

const routes: Routes = [
  {
    path: '', redirectTo: '/files', pathMatch: 'full', canActivate: [MeStoreService]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'files', component: FilesComponent, canActivate: [MeStoreService]
  },
  {
    path: 'sheet', component: SheetComponent, canActivate: [MeStoreService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
