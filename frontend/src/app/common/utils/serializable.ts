export interface Serializable {

  toJSON(): any;

  fromJSON(json: any): Serializable;

}
