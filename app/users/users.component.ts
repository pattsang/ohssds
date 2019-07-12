import { Component, OnInit, Input, ViewChild, EventEmitter, ChangeDetectorRef } from '@angular/core';
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog,
  MatTreeFlattener,
  MatTreeFlatDataSource,
  MatTable
} from '@angular/material';
import { UserService } from '../_service/user.service';
import { AlertifyService } from '../_service/alertify.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ResendEmailComponent } from '../resendEmail/resendEmail.component';
import { InviteComponent } from '../invite/invite.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { AuthorityTreeComponent } from '../AuthorityTree/AuthorityTree.component';
import { BehaviorSubject, Subscription, Subject } from 'rxjs';
import { LocationService } from '../_service/location.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ShowUserLocationComponent } from './user-location/showUserLocation/showUserLocation.component';
import { takeUntil } from 'rxjs/operators';
import { UserPermissionComponent } from './user-permission/user-permission.component';

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
  selector: "users",
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private http: HttpClient,
    private dialog: MatDialog,
    private locationService: LocationService,
    private ref: ChangeDetectorRef
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

  private tableDataUpdated = new EventEmitter<any>();

  locationsFromResponse: any = [];
  location: TodoItemNode[] = [];


  // model: any = {};

  MyDataSource: any = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  displayedColumns: string[] = [
    'select',
    'name',
    'permissions',
    'resent/invite',
    'locations',
    'delete'
  ];
  selection = new SelectionModel<UserModel>(true, []);

  applyFilter(filterValue: string) {
    this.MyDataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.getAllUsers();
    // this.getAllUserLocationNames();
    // this.ref.detectChanges()
    this.refreshTable();
  }
  unsubscribe = new Subject<void>();


  userInformation: any = [];
  getAllUsers() {
    this.userService.getAllUsersByAuthority().pipe(takeUntil(this.unsubscribe)).subscribe(
      res => {

        this.userInformation = res;
        this.MyDataSource = new MatTableDataSource(this.userInformation);
        this.MyDataSource.data = res;
        this.MyDataSource.sort = this.sort;
        this.MyDataSource.paginator = this.paginator;

        // this.MyDataSource.data = this.userInformation;
        // this.MyDataSource._updateChangeSubscription();
        // this.MyDataSource.data.push();
        // console.log(this.userInformation);
        // this.refreshTable();
        // this.MyDataSource.data.push(this.userInformation);
        // this.MyDataSource.data = this.MyDataSource.data.slice();
        // this.ref.detectChanges()
        // this.table.renderRows();
        // this.dataSource = new DataSource(this.userInformation);
         // this.data.push(this.userInformation);
          // this.tableDataUpdated.emit();
          // this.MyDataSource.connect().next(this.userInformation);
          // this.paginator._changePageSize(this.paginator.pageSize);
          // this.userInformation = new MatTableDataSource<Element>(this.userInformation);   

        // const test = this.MyDataSource.data;
        // this.MyDataSource.connect().next(res);
        // test.push(this.userInformation);
        // this.MyDataSource.data = test;
        // this.userInformation = new MatTableDataSource<Element>(this.userInformation);
      },
      error => {
        console.log('There was an error: ' + error);
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  removedUser: any[] = [];
  removeSelectedUser(id) {
    var prompt = confirm('Are you sure you want to delete this user?');
    if (prompt) {
      this.userService.removeUser(id).subscribe(
        res => {
          // this.removedUser = res;
          // this.removedUser.splice(this.removedUser.findIndex(m => m.id === id), 1);
          // this.removedUser.push(this.removedUser);
        //   this.MyDataSource.data._updateChangeSubscription();
        //   this.MyDataSource.data = this.removedUser;
        //  this.MyDataSource.data.push();
          // this.refreshTable();
          // this.MyDataSource.push(this.removedUser);
          // this.MyDataSource = [...this.MyDataSource];
        //   this.MyDataSource.data.push(this.removedUser);
        // this.MyDataSource.data = this.MyDataSource.data.slice();
        // this.ref.detectChanges()

          // console.log(this.removedUser);
         // this.MyDataSource.connect().next(res);
         // this.removedUser = new MatTableDataSource<Element>(this.removedUser);
          // this.data.push(this.removedUser);
          // this.tableDataUpdated.emit();
          // this.MyDataSource.connect().next(this.removedUser);
          // this.paginator._changePageSize(this.paginator.pageSize);
          // this.removedUser = new MatTableDataSource<Element>(this.removedUser);   
          // this.table.renderRows();
          this.alertify.success('Successfully deleted this user');
        },
        error => {
          this.alertify.error('Something went wrong, please try again!');
        }
      );
    }
  }

  openUserEditModalWindow(user) {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '700px',
      data: {
        user: user
      }
    });
  }

  
  openUserPermissionModalWindow(user) {
    const dialogRef = this.dialog.open(UserPermissionComponent, {
      width: '700px',
      data: {
        user: user
      }
    });
  }

  openResendEmailConfirmation(user) {
    const dialogRef = this.dialog.open(ResendEmailComponent, {
      width: '700px',
      data: {
        user: user
      }
    });
  }

  openInvitationModalWindow() {
    const dialogRef = this.dialog.open(InviteComponent, {
      width: '700px'
    });
  }

  openCreateInternalUser() {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '700px'
    });
  }

  openUserLocationModalWindow(user) {
    const dialogRef = this.dialog.open(ShowUserLocationComponent, {
      width: '700px',
      data: {
        user: user
      }
    });
  }

  locations: any;
  childLocations: any = {};
  parentLocations: any = {};
  userIdArray: any = [];

  assignLocation() {
    let params = new URLSearchParams();

    for (const selectedUser of this.selection.selected) {
      params.append('userOutSideId', selectedUser.userOutsideId);
    }

    params.append('authorityUnitIds', this.parentLocations);

    for (const childLocation of this.childLocations) {
      params.append('authorityUnitIds', childLocation.authorityUnitId);
    }
    if(this.selection.selected.length === 0 || this.parentLocations.length === 0 || this.childLocations.length === 0) {
      this.alertify.warning('Please select a user and a location');
      return null;
    } else {
      return this.userService.assignUserLocation(params).pipe(takeUntil(this.unsubscribe)).subscribe(
        res => {
          this.locations = res;
  
          this.alertify.success(`User assigned a location`);
        },
        error => {
          this.alertify.error('Something went wrong, please try again!');
        }
      );
    }
  }

  public doFilter = (value: string) => {
    this.MyDataSource.filter = value.trim().toLocaleLowerCase();
  };

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    if (numSelected === 0) {
      return null;
    }
    const numRows = this.MyDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.MyDataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    // for(const test of this.selection.selected) {
    //   console.log('This is it: ' + test[0].firstName);
    // }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${row.position + 1}`;
  }

  // ==============================Location Tree===================================== //

  getTopLocations() {
    return this.locationService.locationHiararchy().pipe(takeUntil(this.unsubscribe)).subscribe(res => {
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
  };

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
      // console.log(descAllSelected);
      // console.log(descendants);
    // console.log(descendants);
    // console.log(descAllSelected);
    // console.log('This: => ' + descAllSelected);
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

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    // console.log(this.checklistSelection.toggle(node));
    const descendants = this.treeControl.getDescendants(node);
    // console.log(this.treeControl.getDescendants(node));
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
    this.checkAllParentsSelection(node);
    // console.log(this.checkAllParentsSelection(node));
    // Force update for the parent
    descendants.every(child => this.checklistSelection.isSelected(child));
    // console.log(descendants.every(child => this.checklistSelection.isSelected(child)));
    this.checkAllParentsSelection(node);

    // ==> node will give me the parent which has the expandable //
    // console.log(node);
    // console.log(node.authorityUnitId);

    // console.log(this.checkRootNodeSelection);
    // decendants will give me the children of the parent... //
    // console.log(descendants);

    // this.model.rootAuthorityUnitId = descendants;
    this.parentLocations = node.authorityUnitId;
    this.childLocations = descendants;
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
    // console.log(this.checkAllParentsSelection(node));
    // console.log(node);
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
    // console.log('node: ' + node);
    // console.log('nodeSelected: ' + nodeSelected);
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
}

export interface UserModel {
  firstName: string;
  lastName: string;
  isActive: boolean;
  position: number;
  permission: number;
  userOutsideId: string;
}
