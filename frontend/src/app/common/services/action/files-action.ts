export module FilesAction {

  export interface GetAllAreas {
    areas: string[];
  }

  export interface Ls {
    currentNode: Node;
    childNodes: Node[];
  }

  export interface NewNode {
    newNode: Node;
  }

  export interface Node {
    name: string;
    nodeId: string;
    type: string;
    updateDateTime: number[];
    createDateTime: number[];
  }

}
