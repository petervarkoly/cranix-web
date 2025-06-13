import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgChartsModule } from 'ag-charts-angular';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolbarComponent } from 'src/app/protected/toolbar/toolbar.component';
import { IonicModule } from '@ionic/angular';
import { 
  IonicSelectableComponent,
  IonicSelectableHeaderTemplateDirective,
  IonicSelectableValueTemplateDirective,
  IonicSelectablePlaceholderTemplateDirective
 } from 'ionic-selectable'

import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'cranix-common/dist/pipes/pipe-modules';
import { AgGridModule } from 'ag-grid-angular';
import { ActionBTNRenderer } from 'cranix-common/dist/pipes/ag-action-renderer';
import { ApplyBTNRenderer } from 'cranix-common/dist/pipes/ag-apply-renderer';
import { ApplyCheckBoxBTNRenderer } from 'cranix-common/dist/pipes/ag-apply-checkbox-renderer';
import { CustomerActionRenderer } from 'cranix-common/dist/pipes/ag-customer-action-renderer';
import { YesNoBTNRenderer } from 'cranix-common/dist/pipes/ag-yesno-renderer';
import { CheckBoxBTNRenderer } from 'cranix-common/dist/pipes/ag-checkbox-renderer';
import { GroupActionBTNRenderer } from 'cranix-common/dist/pipes/ag-group-renderer';
import { GroupMembersPage } from 'cranix-common/dist/components/actions/group-members/group-members.page';
import { UserActionBTNRenderer } from 'cranix-common/dist/pipes/ag-user-renderer';
import { DateCellRenderer } from 'cranix-common/dist/pipes/ag-date-renderer';
import { DateTimeCellRenderer } from 'cranix-common/dist/pipes/ag-datetime-renderer';
import { RoomActionBTNRenderer } from 'cranix-common/dist/pipes/ag-room-renderer';
import { DeviceActionBTNRenderer } from 'cranix-common/dist/pipes/ag-device-renderer';
import { EditBTNRenderer } from 'cranix-common/dist/pipes/ag-edit-renderer';
import { EventRenderer } from 'cranix-common/dist/pipes/ag-ptm-event-renderer';
import { SoftwareEditBTNRenderer } from 'cranix-common/dist/pipes/ag-software-edit-renderer';
import { GroupIdCellRenderer } from 'cranix-common/dist/pipes/ag-groupid-renderer';
import { HwconfIdCellRenderer } from 'cranix-common/dist/pipes/ag-hwconfid-renderer';
import { PrinterActionBTNRenderer } from 'cranix-common/dist/pipes/ag-printer-renderer';
import { RoomIdCellRenderer } from 'cranix-common/dist/pipes/ag-roomid-render';
import { RoomRenderer } from 'cranix-common/dist/pipes/ag-ptm-room-renderer';
import { DeviceIdCellRenderer } from 'cranix-common/dist/pipes/ag-deviceid-renderer';
import { InstituteStatusRenderer } from 'cranix-common/dist/pipes/ag-institute-status-renderer'
import { SyncObjectRenderer } from 'cranix-common/dist/pipes/ag-sync-object-renderer'
import { InstituteActionCellRenderer } from 'cranix-common/dist/pipes/ag-institute-action-renderer';
import { UpdateRenderer } from 'cranix-common/dist/pipes/ag-update-renderer';
import { UserIdCellRenderer } from 'cranix-common/dist/pipes/ag-userid-renderer';
import { UserIdToNameCellRenderer } from 'cranix-common/dist/pipes/ag-userid-to-name-renderer';
import { FileSystemUsageRenderer } from 'cranix-common/dist/pipes/ag-filesystem-usage-renderer';
import { CanActivateViaAcls } from 'cranix-common/dist/services/auth-guard.service';
import { SelectColumnsComponent } from 'cranix-common/dist/components/select-columns/select-columns.component';
import { AddDeviceComponent } from 'src/app/protected/cranix/devices/add-device/add-device.component';
import { AddPrinterComponent } from 'src/app/protected/cranix/devices/add-printer/add-printer.component';
import { ObjectsEditComponent } from 'cranix-common/dist/components/objects-edit/objects-edit.component';
import { ActionsComponent } from 'cranix-common/dist/components/actions/actions.component';
import { CreateSupport } from 'cranix-common/dist/components/actions/create-support/create-support-page';
import { SetpasswordComponent } from 'cranix-common/dist/components/actions/setpassword/setpassword.component'
import { SetquotaComponent } from 'cranix-common/dist/components/actions/setquota/setquota.component';
import { ManageDhcpComponent } from 'cranix-common/dist/components/actions/manage-dhcp/manage-dhcp.component'
import { FilesUploadComponent } from 'cranix-common/dist/components/actions/files-upload/files-upload.component'
import { FilesCollectComponent } from 'cranix-common/dist/components/actions/files-collect/files-collect.component'
import { DownloadSoftwaresComponent } from 'cranix-common/dist/components/actions/download-softwares/download-softwares.component'
import { SetContractComponent } from 'cranix-common/dist/components/actions/set-contract/set-contract.component'
import { SetValidityComponent } from 'cranix-common/dist/components/actions/set-validity/set-validity.component'
import { ShowImportComponent } from 'cranix-common/dist/components/actions/show-import/show-import.component'
import { WindowRef } from 'cranix-common/dist/models/ohters'
import { CranixMdListComponent } from 'cranix-common/dist/components/cranix-md-list/cranix-md-list.component'
import { CranixNoticesComponent } from 'cranix-common/dist/components/cranix-notices/cranix-notices.component';
import { CranixPtmViewComponent } from 'cranix-common/dist/components/cranix-ptm-view/cranix-ptm-view.component'
import { CranixSearchComponent } from 'cranix-common/dist/components/cranix-search/cranix-search.component';
import { QuillModule } from 'ngx-quill';
import { simpleToolbarOptions } from 'cranix-common/dist/models/constants'

@NgModule({
  declarations: [
  ],
  imports: [
    ActionsComponent,
    AddDeviceComponent,
    AddPrinterComponent,
    ApplyBTNRenderer,
    ApplyCheckBoxBTNRenderer,
    ActionBTNRenderer,
    CreateSupport,
    CranixMdListComponent,
    CranixNoticesComponent,
    CranixPtmViewComponent,
    CranixSearchComponent,
    CustomerActionRenderer,
    ObjectsEditComponent,
    DateCellRenderer,
    DateTimeCellRenderer,
    DeviceIdCellRenderer,
    DeviceActionBTNRenderer,
    DownloadSoftwaresComponent,
    EditBTNRenderer,
    EventRenderer,
    FilesCollectComponent,
    FileSystemUsageRenderer,
    FilesUploadComponent,
    GroupIdCellRenderer,
    GroupActionBTNRenderer,
    GroupMembersPage,
    HwconfIdCellRenderer,
    InstituteActionCellRenderer,
    InstituteStatusRenderer,
    ManageDhcpComponent,
    PrinterActionBTNRenderer,
    RoomActionBTNRenderer,
    RoomRenderer,
    RoomIdCellRenderer,
    SetpasswordComponent,
    SetquotaComponent,
    ShowImportComponent,
    SoftwareEditBTNRenderer,
    SelectColumnsComponent,
    SyncObjectRenderer,
    SetContractComponent,
    SetValidityComponent,
    UpdateRenderer,
    UserActionBTNRenderer,
    UserIdCellRenderer,
    UserIdToNameCellRenderer,
    ToolbarComponent,
    YesNoBTNRenderer,
    CheckBoxBTNRenderer,
    CommonModule,
    AgChartsModule,
    IonicSelectableComponent,
    IonicSelectableHeaderTemplateDirective,
    IonicSelectableValueTemplateDirective,
    IonicSelectablePlaceholderTemplateDirective,
    AgGridModule,
    FormsModule,
    IonicModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    PipesModule,
    TranslateModule,
    QuillModule.forRoot({
      modules: { toolbar: simpleToolbarOptions},
    }),
  ], exports: [
    ActionsComponent,
    AddDeviceComponent,
    AddPrinterComponent,
    ApplyBTNRenderer,
    ApplyCheckBoxBTNRenderer,
    ActionBTNRenderer,
    CreateSupport,
    CranixMdListComponent,
    CranixNoticesComponent,
    CranixPtmViewComponent,
    CranixSearchComponent,
    CustomerActionRenderer,
    ObjectsEditComponent,
    DateCellRenderer,
    DateTimeCellRenderer,
    DeviceIdCellRenderer,
    DeviceActionBTNRenderer,
    DownloadSoftwaresComponent,
    EditBTNRenderer,
    EventRenderer,
    FilesCollectComponent,
    FileSystemUsageRenderer,
    FilesUploadComponent,
    GroupIdCellRenderer,
    GroupActionBTNRenderer,
    GroupMembersPage,
    HwconfIdCellRenderer,
    InstituteActionCellRenderer,
    InstituteStatusRenderer,
    ManageDhcpComponent,
    PrinterActionBTNRenderer,
    RoomActionBTNRenderer,
    RoomRenderer,
    RoomIdCellRenderer,
    SetpasswordComponent,
    SetquotaComponent,
    ShowImportComponent,
    SoftwareEditBTNRenderer,
    SelectColumnsComponent,
    SyncObjectRenderer,
    SetContractComponent,
    SetValidityComponent,
    UpdateRenderer,
    UserActionBTNRenderer,
    UserIdCellRenderer,
    UserIdToNameCellRenderer,
    ToolbarComponent,
    YesNoBTNRenderer,
    CheckBoxBTNRenderer,
    CommonModule,
    AgChartsModule,
    AgGridModule,
    FormsModule,
    IonicModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    PipesModule,
    ReactiveFormsModule,
    TranslateModule,
    ToolbarComponent,
    CranixMdListComponent,
    CranixNoticesComponent,
    CranixPtmViewComponent,
    CranixSearchComponent,
    IonicSelectableComponent,
    IonicSelectableHeaderTemplateDirective,
    IonicSelectableValueTemplateDirective,
    IonicSelectablePlaceholderTemplateDirective
  ],
  providers: [WindowRef,CanActivateViaAcls ]
})
export class CranixSharedModule { }
