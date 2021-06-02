import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-special-select',
  templateUrl: './special-select.component.html',
  styleUrls: ['./special-select.component.css']
})
export class SpecialSelectComponent implements OnInit {

  @Input() selectName: string;
  @Input() selectItems: object;
  @Output() selectionMadeEvent = new EventEmitter();
  public selectedItem;

  @Input() multiSelect: boolean;

  @Input() searchbox: boolean;
  @Output() multiSelectionMadeEvent = new EventEmitter();
  public noOfValuesSelected = 0;
  public allSelectInput = false;
  public returnObj;
  public searchText;

  @Output() componentClickedEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
   
  }

  ngOnChanges() {
    this.calculateNoOfValuesSelected();
  }

  public componentClicked() {
    this.componentClickedEvent.emit();
  }
  
  public selectionMade() {
    this.selectionMadeEvent.emit(this.selectedItem);
  }
  
  public allSelected() {
    this.noOfValuesSelected = 0
    if(this.allSelectInput) {
      for (const sku of this.selectItems[0].values) {
        sku.isChecked = true;
        this.noOfValuesSelected = this.noOfValuesSelected + 1;
      }
    }
    else {
      for (const sku of this.selectItems[0].values) {
        sku.isChecked = false;
      }
      this.noOfValuesSelected = 0;
    }
    this.returnObj = {
      selectName: this.selectName,
      selectItems: this.selectItems
    }
    this.selectionMadeEvent.emit(this.returnObj);
    
  }

  public multiSelectionMade() {
    this.noOfValuesSelected = 0;
    this.calculateNoOfValuesSelected();
    this.returnObj = {
      selectName: this.selectName,
      selectItems: this.selectItems
    }
    this.multiSelectionMadeEvent.emit(this.returnObj);
  }

  public getCallback() {
    return this.filterResults.bind(this);
  }

  public filterResults(sku: string) {
    if (!this.searchText || !this.searchText.trim()) {
        return true;
    }
    const regex = new RegExp(this.searchText && this.searchText.trim(), 'ig');
    return regex.test(sku);
  }

  public calculateNoOfValuesSelected() {
    this.noOfValuesSelected = 0;
    try{
      for (const sku of this.selectItems[0].values) {
        if(sku.isChecked == true) {
          this.noOfValuesSelected = this.noOfValuesSelected + 1;
        }
      }
    } catch(e) {}
  }

}
