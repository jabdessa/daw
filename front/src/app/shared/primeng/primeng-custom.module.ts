import { NgModule } from '@angular/core';


// PrimeNG imports
// Module
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TabViewModule } from 'primeng/tabview';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { DragDropModule } from 'primeng/dragdrop';
import { TreeModule } from 'primeng/tree';
import { GMapModule } from 'primeng/gmap';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SpinnerModule } from 'primeng/spinner';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { StepsModule } from 'primeng/steps';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { TabMenuModule } from 'primeng/tabmenu';
import { TreeTableModule } from 'primeng/treetable';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CarouselModule } from 'primeng/carousel';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PaginatorModule } from 'primeng/paginator';
import { ChipsModule } from 'primeng/chips';
import { ProgressBarModule } from 'primeng/progressbar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { TooltipModule } from 'primeng/tooltip';
import { FieldsetModule } from 'primeng/fieldset';
import { RippleModule } from 'primeng/ripple';


// Services
import { ConfirmationService, MessageService } from 'primeng/api';

/** PrimeNG modules array definition */
const PRIMENG_MODULES = [
    AccordionModule,
    DialogModule,
    DragDropModule,
    MenuModule,
    TreeModule,
    RadioButtonModule,
    InputSwitchModule,
    CodeHighlighterModule,
    TableModule,
    BreadcrumbModule,
    StepsModule,
    MultiSelectModule,
    DropdownModule,
    CheckboxModule,
    ButtonModule,
    SelectButtonModule,
    TabViewModule,
    InputTextModule,
    ListboxModule,
    InputTextareaModule,
    SpinnerModule,
    CardModule,
    CalendarModule,
    OverlayPanelModule,
    GMapModule,
    CheckboxModule,
    FileUploadModule,
    ToastModule,
    TabMenuModule,
    TreeTableModule,
    MenubarModule,
    PanelModule,
    ProgressSpinnerModule,
    CarouselModule,
    KeyFilterModule,
    ScrollPanelModule,
    ConfirmDialogModule,
    PaginatorModule,
    ChipsModule,
    ProgressBarModule,
    PanelMenuModule,
    DynamicDialogModule,
    MessageModule,
    MessagesModule,
    TooltipModule,
    FieldsetModule,
    RippleModule
];

/** PrimeNG services array definition */
const SERVICES = [
    ConfirmationService,
    MessageService,
    DialogService,
];

/**
 * Exposes only the specific PrimeNG modules used in the baseProjectSPA application.
 */
@NgModule({
    imports: [...PRIMENG_MODULES],
    exports: [...PRIMENG_MODULES],
    providers: [...SERVICES]
})
export class PrimengCustomModule { }
