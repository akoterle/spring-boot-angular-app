import { Component } from '@angular/core';
import { TreeModel } from 'ng2-tree';
import { HierarchiesService } from '../service/hierarchies.service';
import uuid from 'uuid';

@Component({
  selector: 'app-hierarchytree',
  template: `
  <div class="tree-demo-app">
  <div class="tree-container">
  <div class="tree-info"><p class="tree-title">Fonts tree</p></div>
  <div class="tree-content">

  <tree [tree]="tree"></tree>
  </div>
  </div>
  </div>
  `,
  styles: [`
  .tree-info {
    flex: 1 0 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .tree-controlls {
    display: flex;
    flex-direction: column;
  }

  .tree-content {
    display: flex;
    flex-direction: column;
  }

  .tree-container {
    margin-bottom: 20px;

  }

  .tree-container--with-controls {
    display: flex;
    flex-wrap: wrap;
  }

  .tree-demo-app {
    display: flex;
    flex-direction: column;
  }

  .tree-title {
    margin: 0;
    color: #40a070;
    font-size: 2em;
  }

  .notice {
    color: #e91e63;
    font-size: 1.2em;
    font-style: italic;
  }

  :host /deep/ .fa {
    cursor: pointer;
  }

  :host /deep/ .fa.disabled {
    cursor: inherit;
    color: #757575;
  }

  .button {
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 #888;
    background-color: #fff;
    -webkit-appearance: none;
    border: 1px solid #000;
    height: 35px;
    outline: none;
  }

  .button-pressed {
    box-shadow: 0 0 1px 0 #888;
  }

  .tree-controlls button {
    margin: 5px;
  }
`]
})
export class HierarchyTreeComponent {
  constructor(private hierarchiesService: HierarchiesService) {}

  public tree: TreeModel = {
    value: 'Programming languages by programming paradigm',
    children: [
      {
        value: 'Object-oriented programming',
        children: [
          {value: 'Java'},
          {value: 'C++'},
          {value: 'C#'}
        ]
      },
      {
        value: 'Prototype-based programming',
        children: [
          {value: 'JavaScript'},
          {value: 'CoffeeScript'},
          {value: 'Lua'}
        ]
      }
    ]
  };
}
