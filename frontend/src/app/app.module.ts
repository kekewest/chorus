import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TabsModule, BsDropdownModule, ModalModule } from 'ngx-bootstrap';

import { AppRoutingModule } from "app/app-routing.module";

import { SheetComponent } from './sheet/components/sheet.component';
import { ActiveTabComponent } from './sheet/components/active-tab/active-tab.component';
import { SheetTabsComponent } from './sheet/components/sheet-tabs/sheet-tabs.component';
import { SheetEditComponent } from './sheet/components/sheet-edit/sheet-edit.component';
import { RedoUndoComponent } from './sheet/components/sheet-edit/redo-undo/redo-undo.component';
import { TextAreaControlComponent } from './sheet/components/sheet-edit/element-control/text-area/text-area-control.component';
import { LoginComponent } from './login/components/login.component';
import { RootComponent } from './root/components/root.component';
import { FilesComponent } from './files/components/files.component';
import { MainComponent } from './root/components/main/main.component';
import { DashboardHeaderComponent } from './root/components/main/dashboard-header/dashboard-header.component';
import { FilesLeftColComponent } from './files/components/files-left-col/files-left-col.component';
import { FilesMainColComponent } from './files/components/files-main-col/files-main-col.component';
import { FilesAreasComponent } from './files/components/files-left-col/files-areas/files-areas.component';
import { FilesLsComponent } from './files/components/files-main-col/files-ls/files-ls.component';
import { MomentPipe } from './common/pipes/moment.pipe';
import { EmptyPipe } from './common/pipes/empty.pipe';
import { FilesDashboardBarComponent } from './files/components/files-main-col/files-dashboard-bar/files-dashboard-bar.component';
import { LoadingMaskComponent } from './common/components/loading-mask/loading-mask.component';
import { ElementDirective } from './sheet/directives/element.directive';
import { TextAreaComponent } from './sheet/components/active-tab/element/text-area/text-area.component';
import { ApiService } from "app/common/services/api.service";
import { ChorusDispatcherService } from "app/common/services/chorus-dispatcher.service";
import { ErrorActionService } from "app/common/services/action/error-action.service";
import { MeActionService } from "app/common/services/action/me-action.service";
import { MeStoreService } from "app/common/services/store/me-store.service";
import { FilesActionService } from "app/common/services/action/files-action.service";
import { FilesStoreService } from "app/common/services/store/files-store.service";
import { FilenameValidator } from "app/common/validators/filename";
import { TextAreaEditorComponent } from './sheet/components/active-tab/element/text-area/text-area-editor.component';
import { ElementEditorDirective } from './sheet/directives/element-editor.directive';

@NgModule({
  declarations: [
    RootComponent,
    SheetComponent,
    ActiveTabComponent,
    SheetTabsComponent,
    SheetEditComponent,
    RedoUndoComponent,
    TextAreaControlComponent,
    LoginComponent,
    RootComponent,
    FilesComponent,
    MainComponent,
    DashboardHeaderComponent,
    FilesLeftColComponent,
    FilesMainColComponent,
    FilesAreasComponent,
    FilesLsComponent,
    MomentPipe,
    EmptyPipe,
    FilesDashboardBarComponent,
    LoadingMaskComponent,
    ElementDirective,
    TextAreaComponent,
    TextAreaEditorComponent,
    ElementEditorDirective
  ],
  entryComponents: [
    TextAreaComponent,
    TextAreaEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    ApiService,
    ChorusDispatcherService,
    ErrorActionService,
    MeActionService,
    MeStoreService,
    FilesActionService,
    FilesStoreService,
    FilenameValidator
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }
