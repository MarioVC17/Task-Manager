import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TasksManagerComponent } from "./pages/tasks-manager/tasks-manager.component";

const AppRoutes: Routes = [
    { 
        path: '',
        component: TasksManagerComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(AppRoutes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }