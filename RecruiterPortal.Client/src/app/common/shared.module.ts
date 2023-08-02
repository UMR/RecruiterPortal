import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  imports: [RouterModule, CommonModule],
    declarations: [HeaderComponent, SidebarComponent],
    exports: [HeaderComponent, SidebarComponent]
})
export class SharedModule {

}
