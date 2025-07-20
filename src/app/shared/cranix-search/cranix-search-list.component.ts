import { Component, Input, OnInit, Output, EventEmitter, forwardRef } from '@angular/core';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'cranix-search-list',
  templateUrl: './cranix-search-list.component.html',
  styleUrl: './cranix-search.component.css',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CranixSearchListComponent),
    multi: true
  }]
})
export class CranixSearchListComponent implements ControlValueAccessor, OnInit {
  isShowChecked: boolean = false
  rowData = []
  selection: any | any[]

  @Output() callback = new EventEmitter<any>();
  @Output() onChange: EventEmitter<{ value: any }> = new EventEmitter();
  @Input({ required: true }) objectType: string
  @Input() context
  @Input() items: any[]
  @Input() itemTextField: string | string[]
  @Input() multiple: boolean
  @Input() emptyLabel: string
  @Input() selectedLabel: string
  constructor(
    private objectService: GenericObjectService
  ) { }

  ngOnInit(): void {
    console.log("CranixSearchListComponent")
    if (typeof this.items == "undefined") {
      this.items = this.objectService.allObjects[this.objectType]
    }
    if (typeof this.multiple == "undefined") {
      this.multiple = false;
    }
    if (typeof this.itemTextField == "undefined") {
      this.itemTextField = this.getDefaultTextFields()
    } else if (typeof this.itemTextField == "string") {
      this.itemTextField = [this.itemTextField]
    }
    if (typeof this.emptyLabel == "undefined") {
      this.emptyLabel = 'Select ' + this.objectType
    }
    if (typeof this.selectedLabel == "undefined") {
      this.selectedLabel = this.objectType + ' selected.'
    }
    if (this.multiple) {
      this.selection = []
    }
    this.rowData = this.items
  }

  private propagateOnChange = (_: any) => { };
  private propagateOnTouched = () => { };

  showChecked() {
    this.isShowChecked = !this.isShowChecked
  }
  writeValue(value: any) {
    console.log("write value called")
    console.log(value)
    this.selection = value;
  }
  registerOnChange(method: any): void {
    this.propagateOnChange = method;
  }
  registerOnTouched(method: () => void) {
    this.propagateOnTouched = method;
  }
  isSelected(id: number) {
    if (this.selection) {
      if (this.multiple) {
        return this.selection.filter(o => o.id == id).length == 1
      } else {
        return this.selection.id == id;
      }
    }
    return false;
  }
  clearSelection() {
    if (this.multiple) {
      this.selection = []
    } else {
      this.selection = null
    }
    this.propagateOnChange(this.selection);
  }
  select(o: any) {
    console.log(o)
    this.selection = o;
    this.propagateOnChange(this.selection);
  }
  doSelect(o: any) {
    if (this.selection.filter(obj => obj.id == o.id).length == 1) {
      this.selection = this.selection.filter(obj => obj.id != o.id)
    } else {
      this.selection.push(o)
    }
    this.propagateOnChange(this.selection);
  }
  returnValues(modal) {
    this.propagateOnChange(this.selection);
    if (this.callback) {
      this.callback.emit();
    }
    this.onChange.emit({ value: this.selection })
  }
  onQuickFilterChanged() {
    let filter = (<HTMLInputElement>document.getElementById('crxSearchFilter')).value;
    this.rowData = this.objectService.filterObject(this.objectType, filter);
  }

  getDefaultTextFields() {
    switch (this.objectType) {
      case 'acl': return ['acl']
      case 'announcement': ['issue', 'keywords', 'title']
      case 'category': return ['name', 'description', 'categoryType']
      case 'contact': ['issue', 'name', 'email', 'phone', 'title']
      case 'customer': return ['name', 'locality', 'description']
      case 'device': return ['name', 'IP']
      case 'group': return ['name', 'description', 'groupType']
      case 'institute': return ['name', 'locality', 'instituteType']
      case 'room': return ['name', 'description', 'roomType']
      case 'user': return ['fullName']
      default: return ['name', 'description']
    }
  }
  _emitValueChange() {
    this.propagateOnChange(this.selection);

    this.onChange.emit({
      value: this.selection
    });
  }
}
