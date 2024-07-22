import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgIf } from '@angular/common';
import { IdToNamePipe } from './id-to-name.pipe';

describe('IdToNamePipe', () => {
  it('create an instance', () => {
    const pipe = new IdToNamePipe();
    expect(pipe).toBeTruthy();
  });
});
