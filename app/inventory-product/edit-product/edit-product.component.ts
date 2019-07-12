import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from 'src/app/_service/product.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: "edit-product",
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private alertify: AlertifyService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public passedData: any
  ) {}

  product: any = {};
  selected;
  MSDSFormatModel: string;
  MSDSFormats: string[] = ['WHMIS', 'OSHA', 'ILO/ISO/EU/ANSI', 'Other'];

  // MSDSOriginModel: string;
  // MSDSOrigins: string[] = ['Canada', 'USA', 'Europe', 'Other'];
  Canada: string;
  USA: string;
  Europe: string;
  Other: string;

  Discontinued: string;
  Exempt: string;

  Nonhazardous: string;
  CosmeticDeviceDrugOrFood: string;
  PestControlProduct: string;
  ConsumerProduct: string;
  ManufacturedArticle: string;
  NuclearSubstance: string;
  Explosive: string;

  whmisHazardClasses = new FormControl();
  whmisHazardClassList: string[] = [
    'Test1',
    'Test2',
    'Test3',
    'Test4',
    'Test5',
    'Test6'
  ];

  NoMSDSAvailable: string;
  UnableToIdentity: string;
  HazardIdentificationComplete: string;

  MSDSOriginFormControl = new FormControl();
  MSDSOriginGroups: MSDSOriginGroup[] = [
    {
      name: 'MSDS Origin',
      origin: [
        { value: '0', viewValue: 'Not Available' },
        { value: '1', viewValue: 'Canada' },
        { value: '2', viewValue: 'USA' },
        { value: '3', viewValue: 'Europe' },
        { value: '4', viewValue: 'Other' }
      ]
    }
  ];

  healthHazardFormControl = new FormControl();
  healthHazardGroups: HealthHazardGroup[] = [
    {
      name: 'Acute Toxicity',
      hazard: [
        { value: 'oral', viewValue: 'Oral' },
        { value: 'dermal', viewValue: 'Dermal' },
        { value: 'inhalation', viewValue: 'Inhalation' },
        { value: 'unspecified', viewValue: 'Unspecified' }
      ]
    },
    {
      name: 'Aspiration hazard ',
      hazard: [{ value: 'aspirationHazard', viewValue: 'Aspiration Hazard' }]
    },
    {
      name: 'Biohazardous Infectious Materials',
      hazard: [
        {
          value: 'biohazardousInfectious',
          viewValue: 'Biohazardous Infectious Materials'
        }
      ]
    },
    {
      name: 'Carcinogenicity',
      hazard: [{ value: 'carcinogenicity', viewValue: 'Carcinogenicity' }]
    },
    {
      name: 'Germ cell mutagenicity',
      hazard: [
        { value: 'germCellMutagenicity', viewValue: 'Germ cell mutagenicity' }
      ]
    },
    {
      name: 'Reproductive toxicity',
      hazard: [
        { value: 'reproductiveToxicity', viewValue: 'Reproductive toxicity' }
      ]
    },
    {
      name: 'Respiratory or skin sensitization',
      hazard: [
        {
          value: 'respiratorySkinSensitization',
          viewValue: 'Respiratory or skin sensitization'
        }
      ]
    },
    {
      name: 'Serious eye damage/eye irritation',
      hazard: [
        {
          value: 'seriousEyeDamage',
          viewValue: 'Serious eye damage/eye irritation'
        }
      ]
    },
    {
      name: 'Skin corrosion/irritation',
      hazard: [
        {
          value: 'skinCorrosionIrritation',
          viewValue: 'Skin corrosion/irritation'
        }
      ]
    },
    {
      name: 'Specific Target Organ Toxicity - Single exposure',
      hazard: [
        {
          value: 'specificTargetOrgranToxicitySingle',
          viewValue: 'Specific Target Organ Toxicity - Single exposure'
        }
      ]
    },
    {
      name: 'Specific Target Organ Toxicity - Repeated exposure',
      hazard: [
        {
          value: 'specificTargetOrganToxicityRepeated',
          viewValue: 'Specific Target Organ Toxicity - Repeated exposure'
        }
      ]
    },
    {
      name: 'Health Hazards Not Otherwise Classified',
      hazard: [
        {
          value: 'healthHazardsNotOtherwiseClassified',
          viewValue: 'Health Hazards Not Otherwise Classified'
        }
      ]
    }
  ];

  physicalHazardFormControl = new FormControl();
  physicalHazardGroups: PhysicalHazardGroup[] = [
    {
      name: 'Combustible dusts',
      hazard: [{ value: 'combustibleDusts', viewValue: 'Combustible dusts' }]
    },
    {
      name: 'Corrosive to metals',
      hazard: [{ value: 'corrosiveToMetals', viewValue: 'Corrosive to metals' }]
    },
    {
      name: 'Flammable Gases',
      hazard: [{ value: 'flammableGases', viewValue: 'Flammable Gases' }]
    },
    {
      name: 'Flammable Aerosols',
      hazard: [{ value: 'flammableAerosols', viewValue: 'Flammable Aerosols' }]
    },
    {
      name: 'Flammable Liquids',
      hazard: [{ value: 'flammableLiquids', viewValue: 'Flammable Liquids' }]
    },
    {
      name: 'Flammable solids',
      hazard: [{ value: 'flammableSolids', viewValue: 'Flammable solids' }]
    },
    {
      name: 'Gases under pressure',
      hazard: [
        { value: 'gasesUnderPressure', viewValue: 'Gases under pressure ' }
      ]
    },
    {
      name: 'Oxidizing gases',
      hazard: [{ value: 'oxidizingGases', viewValue: 'Oxidizing gases' }]
    },
    {
      name: 'Oxidizing liquids',
      hazard: [{ value: 'oxidizingLiquids', viewValue: 'Oxidizing liquids' }]
    },
    {
      name: 'Oxidizing solids',
      hazard: [{ value: 'oxidizingSolids', viewValue: 'Oxidizing solids' }]
    },
    {
      name: 'Organic peroxides',
      hazard: [{ value: 'organicPeroxides', viewValue: 'Organic peroxides' }]
    },
    {
      name: 'Pyrophoric gases',
      hazard: [{ value: 'pyrophoricGases', viewValue: 'Pyrophoric gases' }]
    },
    {
      name: 'Pyrophoric liquids',
      hazard: [{ value: 'pyrophoricLiquids', viewValue: 'Pyrophoric liquids' }]
    },
    {
      name: 'Pyrophoric solids',
      hazard: [{ value: 'pyrophoricSolids', viewValue: 'Pyrophoric solids' }]
    },
    {
      name: 'Pyrophoric gases',
      hazard: [{ value: 'pyrophoricGases', viewValue: 'Pyrophoric gases' }]
    },
    {
      name: 'Self-heating substances and mixtures',
      hazard: [
        {
          value: 'selfheatingSubstances',
          viewValue: 'Self-heating substances and mixtures'
        }
      ]
    },
    {
      name: 'Simple Asphyxiants',
      hazard: [{ value: 'simpleAsphyxiants', viewValue: 'Simple Asphyxiants' }]
    },
    {
      name:
        'Substances and mixtures which, in contact with water, emit flammable gases',
      hazard: [
        {
          value: 'substancesAndMixtures',
          viewValue:
            'Substances and mixtures which, in contact with water, emit flammable gase'
        }
      ]
    },
    {
      name: 'Physical hazards not otherwise classified',
      hazard: [
        {
          value: 'physicalHazardsNotOtherwiseClassified',
          viewValue: 'Physical hazards not otherwise classified'
        }
      ]
    }
  ];

  WhmisHazardCategoryesFormControl = new FormControl();
  WhmisHazardCategoryGroups: WhmisHazardCategoryGroup[] = [
    {
      name: 'Physical',
      hazard: [
        { value: 'physical-1', viewValue: '1' },
        { value: 'physical-2', viewValue: '2' },
        { value: 'physical-3', viewValue: '3' },
        { value: 'physical-A', viewValue: 'A' },
        { value: 'physical-B*', viewValue: 'B*' },
        { value: 'physical-C', viewValue: 'C' },
        { value: 'physical-D', viewValue: 'D' },
        { value: 'physical-E', viewValue: 'E' },
        { value: 'physical-F', viewValue: 'F' },
        { value: 'physical-G', viewValue: 'G' },
        { value: 'physical-A', viewValue: 'A' },
        { value: 'physical-1A', viewValue: '1A' },
        { value: 'physical-2A', viewValue: '2A' },
        { value: 'physical-1B', viewValue: '1B' },
        { value: 'physical-2B', viewValue: '2B' },
        { value: 'physical-1C', viewValue: '1C' }
      ]
    },
    {
      name: 'Health',
      hazard: [
        { value: 'health-1', viewValue: '1' },
        { value: 'health-1A', viewValue: '1A' },
        { value: 'health-2A', viewValue: '2A' },
        { value: 'health-1B', viewValue: '1B' },
        { value: 'health-2B', viewValue: '2B' },
        { value: 'health-1C', viewValue: '1C' },
        { value: 'health-2', viewValue: '2' },
        { value: 'health-3', viewValue: '3' },
        { value: 'health-4', viewValue: '4' }
      ]
    }
  ];

  ACGIHFormControl = new FormControl();
  ACGIHGroups: ACGIHGroup[] = [
    {
      name: 'ACGIH',
      hazard: [
        { value: 'notAvailable', viewValue: 'Not Available' },
        { value: 'a1', viewValue: 'A1' },
        { value: 'a2', viewValue: 'A2' },
        { value: 'a3', viewValue: 'A3' },
        { value: 'a4', viewValue: 'A4' },
        { value: 'a5', viewValue: 'A5' },
        { value: 'notListed', viewValue: 'Not listed ACGIH carcinogens' }
      ]
    }
  ];

  IARCFormControl = new FormControl();
  IARCGroups: ACGIHGroup[] = [
    {
      name: 'IARC',
      hazard: [
        { value: 'notAvailable', viewValue: 'Not Available' },
        { value: 'iarc-1', viewValue: '1' },
        { value: 'iarc-2a', viewValue: '2A' },
        { value: 'iarc-2b', viewValue: '2B' },
        { value: 'iarc-3', viewValue: '3' },
        { value: 'iarc-4', viewValue: '4' },
        { value: 'notListed', viewValue: 'Not listed IARC carcinogens' }
      ]
    }
  ];

  TransportHazardClassFormControl = new FormControl();
  TransportHazardClassGroups: TransportHazardClassGroup[] = [
    {
      name: 'Transport Hazard Class(es)',
      hazard: [
        { value: 'notAvailable', viewValue: 'Not Available' },
        { value: '1.1', viewValue: '1.1' },
        { value: '1.2', viewValue: '1.2' },
        { value: '1.3', viewValue: '1.3' },
        { value: '1.4', viewValue: '1.4' },
        { value: '1.5', viewValue: '1.5' },
        { value: '1.6', viewValue: '1.6' },
        { value: '2.1', viewValue: '2.1' },
        { value: '2.2', viewValue: '2.2' },
        { value: '2.3', viewValue: '2.3' },
        { value: '2.2(5.1)', viewValue: '2.2(5.1)' },
        { value: '3', viewValue: '3' },
        { value: '4.1', viewValue: '4.1' },
        { value: '4.2', viewValue: '4.2' },
        { value: '4.3', viewValue: '4.3' },
        { value: '5.1', viewValue: '5.1' },
        { value: '5.2', viewValue: '5.2' },
        { value: '6.1', viewValue: '6.1' },
        { value: '6.2', viewValue: '6.2' },
        { value: '7', viewValue: '7' },
        { value: '8', viewValue: '8' },
        { value: '9', viewValue: '9' }
      ]
    }
  ];

  // product = {
  //   productName: '',
  //   productCode: '',
  //   productAlias: ''
  //   productId: ''
  // };

  productId = this.passedData.product.productId;

  ngOnInit() {}

  updateProductInformation() {
    return this.productService
      .updateProductInfo(this.productId, this.product)
      .subscribe(
        next => {
          this.alertify.success('Product updated successfully');
          this.router.navigate(['/inventory-Product']);
        },
        error => {
          this.alertify.error(error);
        }
      );
  }
}

export interface MSDSOrigin {
  value: string;
  viewValue: string;
}

export interface MSDSOriginGroup {
  disabled?: boolean;
  name: string;
  origin: MSDSOrigin[];
}

export interface HealthHazard {
  value: string;
  viewValue: string;
}

export interface HealthHazardGroup {
  disabled?: boolean;
  name: string;
  hazard: HealthHazard[];
}

export interface PhysicalHazard {
  value: string;
  viewValue: string;
}

export interface PhysicalHazardGroup {
  disabled?: boolean;
  name: string;
  hazard: PhysicalHazard[];
}

export interface WhmisHazardCategory {
  value: string;
  viewValue: string;
}

export interface WhmisHazardCategoryGroup {
  disabled?: boolean;
  name: string;
  hazard: WhmisHazardCategory[];
}

export interface ACGIHCategory {
  value: string;
  viewValue: string;
}

export interface ACGIHGroup {
  disabled?: boolean;
  name: string;
  hazard: ACGIHCategory[];
}

export interface TransportHazardClassCategory {
  value: string;
  viewValue: string;
}

export interface TransportHazardClassGroup {
  disabled?: boolean;
  name: string;
  hazard: TransportHazardClassCategory[];
}
