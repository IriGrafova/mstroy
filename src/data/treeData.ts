import type { Item } from '@/types/Item.interface';

export const treeData: Item[] = [
  { id: 1, parent: null, label: 'item1' },

  { id: 'abc', parent: 1, label: 'item2' },
  { id: 3, parent: 1, label: 'item3' },

  { id: 4, parent: 'abc', label: 'item4' },
  { id: 5, parent: 'abc', label: 'item5' },
  { id: 6, parent: 'abc', label: 'item6' },

  { id: 7, parent: 4, label: 'item7' },
  { id: 8, parent: 4, label: 'item8' },
];