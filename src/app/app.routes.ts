import {  Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./public/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'protected/cephalix/customers',
    loadComponent: () => import('./protected/cephalix/customers/customers.page').then(m => m.CustomersPage)
  },
  {
    path: 'protected/cephalix/institutes/details/edit',
    loadComponent: () => import('./protected/cephalix/institutes/details/edit/institute-edit.component').then(m => m.InstituteEditComponent)
  },
  {
    path: 'protected/cephalix/institutes/details/notices',
    loadComponent: () => import('./protected/cephalix/institutes/details/notices/institute-notices.component').then(m => m.InstituteNoticesComponent)
  },
  {
    path: 'protected/cephalix/institutes/details/status',
    loadComponent: () => import('./protected/cephalix/institutes/details/status/institute-status.component').then(m => m.InstituteStatusComponent)
  },
  {
    path: 'protected/cephalix/institutes/details',
    loadComponent: () => import('./protected/cephalix/institutes/details/institute-details.page').then(m => m.InstituteDetailsPage)
  },
  {
    path: 'protected/cephalix/institutes/details/synced-objects',
    loadComponent: () => import('./protected/cephalix/institutes/details/synced-objects/institute-synced-objects.component').then(m => m.InstituteSyncedObjectsComponent)
  },
  {
    path: 'protected/cephalix/institutes/details',
    loadComponent: () => import('./protected/cephalix/institutes/details/institute-details.page').then(m => m.InstituteDetailsPage)
  },
  {
    path: 'protected/cephalix/institutes',
    loadChildren: () => import('./protected/cephalix/institutes/institutes-routes').then(m => m.institutesRoutes)
  },
  {
    path: 'protected/cephalix/tickets/details',
    loadComponent: () => import('./protected/cephalix/tickets/details/details.page').then(m => m.DetailsPage)
  },
  {
    path: 'protected/cephalix/tickets',
    loadComponent: () => import('./protected/cephalix/tickets/tickets.page').then(m => m.TicketsPage)
  },
  {
    path: 'protected/cranix/devices/add-device',
    loadComponent: () => import('./protected/cranix/devices/add-device/add-device.component').then(m => m.AddDeviceComponent)
  },
  {
    path: 'protected/cranix/devices/add-printer',
    loadComponent: () => import('./protected/cranix/devices/add-printer/add-printer.component').then(m => m.AddPrinterComponent)
  },
  {
    path: 'protected/cranix/devices/details/printers',
    loadComponent: () => import('./protected/cranix/devices/details/printers/device-printers.component').then(m => m.DevicePrintersComponent)
  },
  {
    path: 'protected/cranix/devices',
    loadComponent: () => import('./protected/cranix/devices/lists/devices-lists.page').then(m => m.DevicesListsPage)
  },
  {
    path: 'protected/cranix/devices/lists',
    loadComponent: () => import('./protected/cranix/devices/lists/devices-lists.page').then(m => m.DevicesListsPage)
  },
  {
    path: 'protected/cranix/devices/lists',
    loadComponent: () => import('./protected/cranix/devices/lists/devices.component').then(m => m.DevicesComponent)
  },
  {
    path: 'protected/cranix/devices/lists',
    loadComponent: () => import('./protected/cranix/devices/lists/printers.component').then(m => m.PrintersComponent)
  },
  {
    path: 'protected/cranix/groups',
    loadComponent: () => import('./protected/cranix/groups/groups.page').then(m => m.GroupsPage)
  },
  {
    path: 'protected/cranix/hwconfs/details/edit',
    loadComponent: () => import('./protected/cranix/hwconfs/details/edit/hwconf-edit.page').then(m => m.HwconfEditPage)
  },
  {
    path: 'protected/cranix/hwconfs/details/members',
    loadComponent: () => import('./protected/cranix/hwconfs/details/members/hwconf-members.page').then(m => m.HwconfMembersPage)
  },
  {
    path: 'protected/cranix/hwconfs/details',
    loadComponent: () => import('./protected/cranix/hwconfs/details/hwconf-details.page').then(m => m.HwconfDetailsPage)
  },
  {
    path: 'protected/cranix/hwconfs',
    loadComponent: () => import('./protected/cranix/hwconfs/hwconfs.page').then(m => m.HwconfsPage)
  },
  {
    path: 'protected/cranix/informations',
    loadComponent: () => import('./protected/cranix/informations/informations.component').then(m => m.InformationsComponent)
  },
  {
    path: 'protected/cranix/mygroups',
    loadComponent: () => import('./protected/cranix/mygroups/mygroups.page').then(m => m.MyGroupsPage)
  },
  {
    path: 'protected/cranix/profile/tabs/my-crx2fa',
    loadComponent: () => import('./protected/cranix/profile/tabs/my-crx2fa/my-crx2fa.component').then(m => m.MyCrx2faComponent)
  },
  {
    path: 'protected/cranix/profile/tabs/my-devices',
    loadComponent: () => import('./protected/cranix/profile/tabs/my-devices/my-devices.component').then(m => m.MyDevicesComponent)
  },
  {
    path: 'protected/cranix/profile/tabs/my-vpn',
    loadComponent: () => import('./protected/cranix/profile/tabs/my-vpn/my-vpn.component').then(m => m.MyVPNComponent)
  },
  {
    path: 'protected/cranix/profile/tabs/myself',
    loadComponent: () => import('./protected/cranix/profile/tabs/myself/myself.component').then(m => m.MyselfComponent)
  },
  {
    path: 'protected/cranix/profile',
    loadComponent: () => import('./protected/cranix/profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: 'protected/cranix/rooms/details/printers',
    loadComponent: () => import('./protected/cranix/rooms/details/printers/room-printers.page').then(m => m.RoomPrintersPage)
  },
  {
    path: 'protected/cranix/rooms',
    loadComponent: () => import('./protected/cranix/rooms/lists/rooms-lists.page').then(m => m.RoomsListsPage)
  },
  {
    path: 'protected/cranix/rooms/lists',
    loadComponent: () => import('./protected/cranix/rooms/lists/adhoc.component').then(m => m.AdhocComponent)
  },
  {
    path: 'protected/cranix/rooms/lists',
    loadComponent: () => import('./protected/cranix/rooms/lists/rooms-lists.page').then(m => m.RoomsListsPage)
  },
  {
    path: 'protected/cranix/rooms/lists',
    loadComponent: () => import('./protected/cranix/rooms/lists/rooms.component').then(m => m.RoomsComponent)
  },
  {
    path: 'protected/cranix/security/access-log',
    loadComponent: () => import('./protected/cranix/security/access-log/access-log.component').then(m => m.AccessLogComponent)
  },
  {
    path: 'protected/cranix/security/firewall/add-rules',
    loadComponent: () => import('./protected/cranix/security/firewall/add-rules/add-outgoing-rule.component').then(m => m.AddOutgoingRuleComponent)
  },
  {
    path: 'protected/cranix/security/firewall/add-rules',
    loadComponent: () => import('./protected/cranix/security/firewall/add-rules/add-remote-rule.component').then(m => m.AddRemoteRuleComponent)
  },
  {
    path: 'protected/cranix/security/firewall',
    loadComponent: () => import('./protected/cranix/security/firewall/firewall.component').then(m => m.FirewallComponent)
  },
  {
    path: 'protected/cranix/security/proxy',
    loadComponent: () => import('./protected/cranix/security/proxy/proxy.component').then(m => m.ProxyComponent)
  },
  {
    path: 'protected/cranix/security/room-access/add-edit-room-access',
    loadComponent: () => import('./protected/cranix/security/room-access/add-edit-room-access/add-edit-room-access.component').then(m => m.AddEditRoomAccessComponent)
  },
  {
    path: 'protected/cranix/security/room-access',
    loadComponent: () => import('./protected/cranix/security/room-access/room-access.component').then(m => m.RoomAccessComponent)
  },
  {
    path: 'protected/cranix/security/unbound',
    loadComponent: () => import('./protected/cranix/security/unbound/unbound.component').then(m => m.UnboundComponent)
  },
  {
    path: 'protected/cranix/security',
    loadComponent: () => import('./protected/cranix/security/security.page').then(m => m.SecurityPage)
  },
  {
    path: 'protected/cranix/softwares/edit-set',
    loadComponent: () => import('./protected/cranix/softwares/edit-set/edit-installation-set.component').then(m => m.EditInstallationSetComponent)
  },
  {
    path: 'protected/cranix/softwares/packages',
    loadComponent: () => import('./protected/cranix/softwares/packages/software-packages.component').then(m => m.SoftwarePackagesComponent)
  },
  {
    path: 'protected/cranix/softwares',
    loadComponent: () => import('./protected/cranix/softwares/sets/installation-sets.component').then(m => m.InstallationSetsComponent)
  },
  {
    path: 'protected/cranix/softwares/sets',
    loadComponent: () => import('./protected/cranix/softwares/sets/installation-sets.component').then(m => m.InstallationSetsComponent)
  },
  {
    path: 'protected/cranix/softwares/status',
    loadComponent: () => import('./protected/cranix/softwares/status/software-status.component').then(m => m.SoftwareStatusComponent)
  },
  {
    path: 'protected/cranix/softwares',
    loadComponent: () => import('./protected/cranix/softwares/softwares.page').then(m => m.SoftwaresPage)
  },
  {
    path: 'protected/cranix/system/acls/manage-acls',
    loadComponent: () => import('./protected/cranix/system/acls/manage-acls/manage-acls.component').then(m => m.ManageAclsComponent)
  },
  {
    path: 'protected/cranix/system/acls',
    loadComponent: () => import('./protected/cranix/system/acls/system-acls.component').then(m => m.SystemAclsComponent)
  },
  {
    path: 'protected/cranix/system/addons',
    loadComponent: () => import('./protected/cranix/system/addons/system-addons.component').then(m => m.SystemAddonsComponent)
  },
  {
    path: 'protected/cranix/system/config',
    loadComponent: () => import('./protected/cranix/system/config/system-config.component').then(m => m.SystemConfigComponent)
  },
  {
    path: 'protected/cranix/system/mailserver',
    loadComponent: () => import('./protected/cranix/system/mailserver/mailserver.component').then(m => m.MailserverComponent)
  },
  {
    path: 'protected/cranix/system/services',
    loadComponent: () => import('./protected/cranix/system/services/system-services.component').then(m => m.SystemServicesComponent)
  },
  {
    path: 'protected/cranix/system/status',
    loadComponent: () => import('./protected/cranix/system/status/system-status.component').then(m => m.SystemStatusComponent)
  },
  {
    path: 'protected/cranix/system',
    loadComponent: () => import('./protected/cranix/system/system.page').then(m => m.SystemPage)
  },
  {
    path: 'protected/cranix/users/details/groups',
    loadComponent: () => import('./protected/cranix/users/details/groups/user-groups.page').then(m => m.UserGroupsPage)
  },
  {
    path: 'protected/cranix/users',
    loadComponent: () => import('./protected/cranix/users/lists/users-lists.page').then(m => m.UsersListsPage)
  },
  {
    path: 'protected/cranix/users/lists',
    loadComponent: () => import('./protected/cranix/users/lists/users-2fa').then(m => m.Users2faComponent)
  },
  {
    path: 'protected/cranix/users/lists',
    loadComponent: () => import('./protected/cranix/users/lists/users-import.component').then(m => m.UsersImportComponent)
  },
  {
    path: 'protected/cranix/users/lists',
    loadComponent: () => import('./protected/cranix/users/lists/users-lists.page').then(m => m.UsersListsPage)
  },
  {
    path: 'protected/cranix/users/lists',
    loadComponent: () => import('./protected/cranix/users/lists/users.component').then(m => m.UsersComponent)
  },
  {
    path: 'protected/edu/lessons/challenges',
    loadComponent: () => import('./protected/edu/lessons/challenges/challenges.component').then(m => m.ChallengesComponent)
  },
  {
    path: 'protected/edu/lessons/mypositive',
    loadComponent: () => import('./protected/edu/lessons/mypositive/mypositive.component').then(m => m.MypositiveComponent)
  },
  {
    path: 'protected/edu/lessons/room-control/device',
    loadComponent: () => import('./protected/edu/lessons/room-control/device/roomdev.component').then(m => m.RoomDevComponent)
  },
  {
    path: 'protected/edu/lessons/room-control',
    loadComponent: () => import('./protected/edu/lessons/room-control/room-control.component').then(m => m.RoomControlComponent)
  },
  {
    path: 'protected/edu/lessons',
    loadComponent: () => import('./protected/edu/lessons/tests/tests.component').then(m => m.TestsComponent)
  },
  {
    path: 'protected/edu/lessons/tests',
    loadComponent: () => import('./protected/edu/lessons/tests/tests.component').then(m => m.TestsComponent)
  },
  {
    path: 'protected/edu/lessons',
    loadComponent: () => import('./protected/edu/lessons/lessons.page').then(m => m.LessonsPage)
  },
  {
    path: 'protected',
    loadComponent: () => import('./protected/protected.page').then(m => m.ProtectedPage)
  }
]
