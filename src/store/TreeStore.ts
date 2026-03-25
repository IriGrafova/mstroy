import type { Item } from "@/types/Item.interface";

export class TreeStore {
  private items: Item[];

  constructor(data: Item[]) {
    this.items = [...data];
  }

  getAll(): Item[] {
    return [...this.items];
  }

  getItem(id: number | string): Item | undefined {
    if (id === undefined || id === null) {
      return;
    }
    return this.items.find((item) => item.id === id);
  }

  getChildren(id: number | string): Item[] {
    return this.items.filter((item) => item.parent === id);
  }

  getAllChildren(id: number | string): Item[] {
    const children = this.getChildren(id);
    const allChildren = children.flatMap((item) =>
      this.getAllChildren(item.id),
    );
    
    return [...children, ...allChildren];
  }

  getAllParents(id: number | string): Item[] {
    const item = this.getItem(id);
    if (item === undefined || item.parent === null) {
      return [];
    }

    const parents = this.getAllParents(item.parent);
    return [...parents, this.getItem(item.parent)!];
  }

  addItem(item: Item): void {
    this.items.push(item);
  }

  removeItem(id: number | string): void {
    this.items = this.items.filter((item) => item.id !== id);
  }

  updateItem(item: Item): void {
    const index = this.items.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      this.items[index] = item;
    }
  }
}
