import { Component, OnInit, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatCheckbox,
  MatRadioChange
} from '@angular/material';
import { LabelService } from '../_service/label.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from '@angular/forms';
import { Whmis2015Service } from '../_service/whmis2015.service';
import { AlertifyService } from '../_service/alertify.service';

@Component({
  selector: 'app-product-label',
  templateUrl: './product-label.component.html',
  styleUrls: ['./product-label.component.css']
})
export class ProductLabelComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData: any,
    private labelService: LabelService,
    private formBuilder: FormBuilder,
    private whmis2015Service: Whmis2015Service,
    private alertify: AlertifyService
  ) {}
  
  isLoading = false;

  pictograms: any = [];
  pictogramResponse: any;
  selected: any;
  // pictograms: any = [];
  pictogramArray: number;
  model: any = {};

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  averyCheckGroup: FormGroup;
  pictogramFormGroup: FormGroup;

  productId = this.passedData.productId;
  productName = this.passedData.productName;
  productCode = this.passedData.productCode;
  mfg_detail = this.passedData.mfg_detail;
  firstCtrl;
  safeHandlingInstructions;
  imageBind: any = [];
  test: any = [];
  selectedAveryDimension;
  width;
  height;
  rows;
  columns;
  margins;
  labelPerPage;
  signalWord;
  averyName;


  //  selectedAveryDimension: number;
  //  AveryDimensionArray: number;
  //  securityGroupChecked = false;

  //  AveryDimensionsFormControl = new FormControl();
  // AveryDimensionGroups: AveryDimensionsGroup[] = [
  //   {
  //     name: 'Avery Dimensions',
  //     dimension: [
  //       { id: '0', width: '100', height: '200' },
  //       { id: '1', width: '200', height: '300' },
  //     ]
  //   }
  // ];

  // onSelectMSDSOrigin(selected) {
  //   this.AveryDimensionArray = selected.toString().split(',');
  //   if (this.AveryDimensionArray == 0) {
  //     this.securityGroupChecked = true;

  //     // this.selected == this.originFlag;
  //     // this.originFlag == this.selected
  //     // console.log("this is true: " + this.selected );
  //     // console.log("this is .model.originFlag: " + this.originFlag );
  //   }
  //   // console.log("MSDSOriginArray: " + this.MSDSOriginArray);
  // }

  dimensions: AveryDimensions[] = [
    {
      averyId: 1,
      name: 'Avery 5160',
      width: '2',
      height: '200',
      averyDimension: '5160'
    },
    {
      averyId: 2,
      name: 'Avery 5164',
      width: '4',
      height: '200',
      averyDimension: '5164'
    },
    {
      averyId: 3,
      name: 'Avery 5168',
      width: '10',
      height: '200',
      averyDimension: '5168'
    },
    {
      averyId: 4,
      name: 'Avery 8168',
      width: '100',
      height: '200',
      averyDimension: '8168'
    },
    {
      averyId: 5,
      name: 'Avery 60502',
      width: '100',
      height: '200',
      averyDimension: '60502'
    },
    {
      averyId: 6,
      name: 'Avery 60503',
      width: '100',
      height: '200',
      averyDimension: '60503'
    },
    {
      averyId: 7,
      name: 'Avery 60506',
      width: '100',
      height: '200',
      averyDimension: '60506'
    }
  ];

  signalWords: SignalWords[] = [
    {
      signalId: 1,
      signalName: 'Danger'
    },
    {
      signalId: 2,
      signalName: 'Warning'
    },
    {
      signalId: 3,
      signalName: 'None'
    },
  ];
  checked: Boolean;

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      // firstCtrl: ['', Validators.required],
      averyDimensions: ['', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      safeHandlingInstructions: ['', Validators.required],
      signalWordVal: ['', Validators.required]
    });

    this.pictogramFormGroup = this.formBuilder.group({
      pictograms: this.formBuilder.array([])
    });

    setTimeout((res) => {
      this.pictograms = this.pictogramResponse;
    });
    // console.log(this.dimensions);

    this.pictogramReferences();

    console.log(this.selectedAveryDimension);
  }

  onChangePictogram($event) {
    const pictograms = <FormArray>this.pictogramFormGroup.get('pictograms') as FormArray;

    if ($event.checked) {
      pictograms.push(new FormControl($event.source.value));
    } else {
      const i = pictograms.controls.findIndex(x => x.value === $event.source.value);
      pictograms.removeAt(i);
    }

    // this.model.pictogramId = pictograms.value;
    this.imageBind = pictograms.value;
  }

  onSelectedAveryDimensions($event: MatRadioChange) {
    this.selectedAveryDimension = $event.source.value;

    if ($event.source.value === 1) {
      this.averyName = '5160';
      this.width = 100;
      this.height = 200;
      this.rows = 10;
      this.columns = 3;
      this.margins = 3;
      this.labelPerPage = 30;
    }
    if ($event.source.value === 2) {
      this.averyName = '5164';
      this.width = 200;
      this.height = 200;
      this.rows = 3;
      this.columns = 2;
      this.margins = 5;
      this.labelPerPage = 6;
    }
    if ($event.source.value === 3) {
      this.averyName = '5168';
      this.width = 40;
      this.height = 200;
      this.rows = 2;
      this.columns = 2;
      this.margins = 5;
      this.labelPerPage = 4;
    }
    if ($event.source.value === 4) {
      this.averyName = '8168';
      this.width = 20;
      this.height = 200;
      this.rows = 2;
      this.columns = 2;
      this.margins = 5;
      this.labelPerPage = 4;
    }
    if ($event.source.value === 5) {
      this.averyName = '60502';
      this.width = 60;
      this.height = 200;
      this.rows = 2;
      this.columns = 1;
      this.margins = 5;
      this.labelPerPage = 2;
    }
    if ($event.source.value === 6) {
      this.averyName = '60503';
      this.width = 25;
      this.height = 200;
      this.rows = 2;
      this.columns = 2;
      this.margins = 5;
      this.labelPerPage = 4;
    }
    if ($event.source.value === 7) {
      this.averyName = '60506';
      this.width = 12;
      this.height = 200;
      this.rows = 4;
      this.columns = 3;
      this.margins = 5;
      this.labelPerPage = 12;
    }
    console.log('This is a width: ' + this.width);
  }

  onSelectedSignalWords($event: MatRadioChange) {

    if ($event.source.value === 1) {
      this.signalWord = 'Danger';
    }
    if ($event.source.value === 2) {
      this.signalWord = 'Warning';
    }
    if ($event.source.value === 3) {
      this.signalWord = '';
      this.checked = true;
    }
  }

  pictogramReferences() {
    return this.whmis2015Service.getPictograms().subscribe(res => {
      this.pictograms = res;
    });
  }

  // onSelectedPictograms(
  //   checkbox: MatCheckbox,
  //   model: { pictogramId: number; pictogramName: string }
  // ) {
  //   this.model.pictogramId = model.pictogramId;
  //   // this.test = model.pictogramId;
  //   this.test = model;
  //   console.log(this.test);

  //   // this.pictogramArray = model.pictogramId;
  //   this.imageBind = model.pictogramName;
  //   // this.test = model.pictogramId;
  //   // // console.log(model.pictogramId);
  //   // // console.log(this.pictogramArray);
  //   // // console.log(this.pictograms);
  //   // // console.log(this.model.pictogramName);
  //   // // console.log(model.pictogramName);
  //   // // console.log(model);
  //   // // console.log(checkbox.id);
  //   // console.log(model);
  //   // console.log(this.test);
  // }

  generateLabel() {
    // let params = new URLSearchParams();
    // params.append('productName', this.model.productName);
    // params.append('model', this.model.productCode);
    // params.append('model', this.model.instructions);
    // params.append('model', this.model.manufacturerName);
    // params.append('model', this.model.margin);
    // params.append('model', this.model.rows);
    // params.append('model', this.model.columns);
    // params.append('model', this.model.labelPerPage);
    // params.append('model', this.model.signalWord);


    // for(const image of this.imageBind) {
    //   this.model.pictogramName = image;
    //   // params.append('model', this.model.pictogramName);

    // }
    this.model.productName = this.productName;
    this.model.productCode = this.productCode;
    this.model.manufacturerName = this.mfg_detail;
    this.model.instructions = this.safeHandlingInstructions;
    this.model.margin = this.margins;
    this.model.rows = this.rows;
    this.model.columns = this.columns;
    this.model.labelPerPage = this.labelPerPage;
    this.model.signalWord = this.signalWord;
    this.model.averyName = this.averyName;

    const params = new URLSearchParams();
    for (const image of this.imageBind) {
      params.append('pictogramName', image);
    }

    // params.append('model', this.model.productName);
    // params.append('model', this.model.productCode);
    // params.append('model', this.model.instructions);
    // params.append('model', this.model.manufacturerName);
    // params.append('model', this.model.margin);
    // params.append('model', this.model.rows);
    // params.append('model', this.model.columns);
    // params.append('model', this.model.labelPerPage);
    // params.append('model', this.model.signalWord);

    return this.labelService.generateWorkPlaceLabel(this.model ,params).subscribe(blob => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      // link.click();
      window.open(link.href, '_blank');

      this.alertify.success('SDS Label has been successfully created');

    }, error => {
      this.alertify.error('Something went wrong');
    });
  }
}

export interface AveryDimensions {
  averyId: number;
  name: string;
  width: string;
  height: string;
  averyDimension: string;
}

export interface SignalWords {
  signalId: number;
  signalName: string;
}
