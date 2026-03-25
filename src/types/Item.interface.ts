export interface Item {
  id: number | string;
  parent: number | string | null;
  label: string;
}

export interface GridRow extends Item {
  children?: GridRow[];
  expanded?: boolean;
}