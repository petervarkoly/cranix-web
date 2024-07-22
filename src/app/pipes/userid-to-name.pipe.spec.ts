import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgIf } from '@angular/common';
import { UseridToNamePipe } from './userid-to-name.pipe';

describe('UseridToNamePipe', () => {
  it('create an instance', () => {
    const pipe = new UseridToNamePipe();
    expect(pipe).toBeTruthy();
  });
});
