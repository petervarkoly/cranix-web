import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdToNamePipe} from './id-to-name.pipe';
import { UseridToNamePipe } from './userid-to-name.pipe';
import { UseridToUidPipe } from './userid-to-uid.pipe';
@NgModule({
    imports: [
        CommonModule,
        IdToNamePipe, UseridToNamePipe, UseridToUidPipe,
    ],
    exports: [IdToNamePipe, UseridToNamePipe, UseridToUidPipe],
    providers: [IdToNamePipe, UseridToNamePipe, UseridToUidPipe]
})
export class PipesModule { }
