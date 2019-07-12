import { Component, OnInit, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { LocationService } from '../_service/location.service';
import { BehaviorSubject, observable } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from '@angular/material/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { AuthoritytreeService } from '../_service/authoritytree.service';
import { AlertifyService } from '../_service/alertify.service';

export class TodoItemNode {
  authorityUnitId: number;
  parentAuthorityUnitId: number;
  rootAuthorityUnitId: number;
  name: string;
  children?: TodoItemNode[];
  hasChild: boolean;
  exists: boolean;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  authorityUnitId: number;
  parentAuthorityUnitId: number;
  rootAuthorityUnitId: number;
  item: string;
  level: number;
  expandable: boolean;
}

@Component({
  selector: "AuthorityTree",
  templateUrl: './AuthorityTree.component.html',
  styleUrls: ['./AuthorityTree.component.css']
  // providers: [ChecklistDatabase]
})

export class AuthorityTreeComponent implements OnInit {
  // tslint:disable-next-line: member-ordering
  locationsFromResponse: any = [];
  location: TodoItemNode[] = [];

  ngOnInit() {
    this.getTopLocations();
  }

  getTopLocations() {
    return this.locationService.locationHiararchy().subscribe(res => {
      this.locationsFromResponse = res;
      this.location = this.locationsFromResponse;

      this.dataSource.data = this.location;
      // this.dataChange.next(data);
      // const data = this.buildFileTree(this.location, 0);
      this.dataChange.value.push(this.locationsFromResponse);

      this.dataChange.next(this.location);
      // this.dataChange.next(data);
      // this.dataChange.next(this.data);
    });
  }

  get data(): TodoItemNode[] {
    return this.dataChange.value;
  }

  insertItem(parent: TodoItemNode, name: string) {
    if (parent.children) {
      parent.children.push({ name: name } as TodoItemNode);
      this.dataChange.next(this.data);
    }
    console.log(name);
    console.log(parent);
  }

  updateItem(node: TodoItemNode, name: string) {
    node.name = name;
    this.dataChange.next(this.data);
  }

  updateDeletedItem(node: TodoItemNode) {
    this.model.name = node.name;
    this.dataChange.next(this.data);
  }
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  // tslint:disable-next-line: member-ordering
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  // tslint:disable-next-line: member-ordering
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  // tslint:disable-next-line: member-ordering
  selectedParent: TodoItemFlatNode | null = null;

  /** The new item's name */
  // tslint:disable-next-line: member-ordering
  newItemName = '';

  // tslint:disable-next-line: member-ordering
  treeControl: FlatTreeControl<TodoItemFlatNode>;

  // tslint:disable-next-line: member-ordering
  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  // tslint:disable-next-line: member-ordering
  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true);

  constructor(
    // private _database: ChecklistDatabase,
    private locationService: LocationService,
    private authorityTreeService: AuthoritytreeService,
    private alertify: AlertifyService
  ) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    this.getTopLocations();
    this.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  model = {
    name: '',
    rootAuthorityUnitId: null,
    parentAuthorityUnitId: null
  };

  updateModel = {
    name: '',
    authorityUnitId: null,
    rootAuthorityUnitId: null,
    parentAuthorityUnitId: null
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  levelsExist = (node: TodoItemNode) => node.exists;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) =>
    _nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.item === node.name
        ? existingNode
        : new TodoItemFlatNode();
    flatNode.item = node.name;
    flatNode.level = level;
    flatNode.authorityUnitId = node.authorityUnitId;
    flatNode.parentAuthorityUnitId = node.parentAuthorityUnitId;
    flatNode.rootAuthorityUnitId = node.rootAuthorityUnitId;
    if (node.hasChild) {
      flatNode.expandable = true;
    } else {
      flatNode.expandable = false;
    }

    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  dataChange = new BehaviorSubject<TodoItemNode[]>([]);
  itemSelected: boolean;

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    // console.log(descendants);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );

    // console.log(descendants);
    // console.log(descAllSelected);
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child =>
      this.checklistSelection.isSelected(child)
    );
    // console.log(result);

    return result && !this.descendantsAllSelected(node);
  }
  test2: any;
  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
    this.checkAllParentsSelection(node);
    // Force update for the parent
    descendants.every(child => this.checklistSelection.isSelected(child));
    console.log(descendants.every(child => this.checklistSelection.isSelected(child)));
    this.checkAllParentsSelection(node);
   // ==> node will give me the parent which has the expandable //
    console.log(node.item);
    console.log(node.authorityUnitId);

    // decendants will give me the children of the parent... //
    console.log(descendants);
    for (const authUnitId of descendants) {
      // console.log(parentAuthId.id);
      if (authUnitId.level !== 0)
        // this.model.authorityUnitId = authUnitId.authorityUnitId;
        this.model.name = authUnitId.item;
        this.test2 = this.model.name;
        console.log('AuthUnitName: ' + authUnitId.item);
       console.log(authUnitId.authorityUnitId);
       console.log(this.itemSelected);
    }
    if (node.level === 0) {
      // this.model.authorityUnitId = node.authorityUnitId;
      this.model.name = node.item;
      this.model.parentAuthorityUnitId = node.parentAuthorityUnitId;
      this.model.rootAuthorityUnitId = node.rootAuthorityUnitId;
    }
  }


  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
    console.log(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
    // console.log(parent);
    // console.log(node);
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
    // console.log(node);
  }

  /* Get the parent node of a node */
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);
    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: TodoItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this.insertItem(parentNode!, '');
    this.treeControl.expand(node);
    console.log(parentNode);

    this.model.parentAuthorityUnitId = node.authorityUnitId;
    this.model.rootAuthorityUnitId = node.authorityUnitId;
  }

  /** Save the node to database */
  saveNode(node: TodoItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this.model.name = itemValue;
    if(itemValue === '') {
      this.alertify.message('Please enter a location name');
    } else {
      this.updateItem(nestedNode!, itemValue);
      this.createAuthLocation();
    }
  }

  createAuthLocation() {
    // console.log(this.model.name);
    // console.log(this.model.parentAuthorityUnitId);
    // console.log(this.model.rootAuthorityUnitId);
      return this.authorityTreeService.createLocation(this.model).subscribe(
        res => {
          this.alertify.success('New Location created');
        },
        error => {
          this.alertify.error('Something went wrong, please try again!');
        }
      );
  }

  removedItem: any;

  removeNode(node: TodoItemFlatNode) {
    this.model.parentAuthorityUnitId = node.authorityUnitId;
    this.removeAuthLocation();
  }

  removeAuthLocation() {
    var prompt = confirm('Are you sure you want to delete this location?');
    if (prompt) {
      return this.authorityTreeService
        .removeLocation(this.model.parentAuthorityUnitId)
        .subscribe(
          res => {
            this.removedItem = res;
            // console.log(this.removedItem);
            // this.dataChange.value.push(this.removedItem);
            // this.data.push(this.removedItem);
            this.alertify.success(
              `Location has been successfully deleted`
            );
          },
          error => {
            this.alertify.error('Something went wrong, please try again!');
          }
        );
    }
  }

  updateNode(node: TodoItemFlatNode) {
    this.updateModel.authorityUnitId = node.authorityUnitId;
    this.updateModel.rootAuthorityUnitId = node.rootAuthorityUnitId;
    this.updateModel.parentAuthorityUnitId = node.parentAuthorityUnitId;
    this.updateModel.name = node.item;
    this.updateAuthLocation();
  }

  updateSiteItem: any;

  updateAuthLocation() {
    return this.authorityTreeService.updateLocation(this.updateModel).subscribe(res => {
      this.updateSiteItem = res;
    });
  }
}
