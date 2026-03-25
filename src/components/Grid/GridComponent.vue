<template>
  <div class="grid-container">
    <ag-grid-vue
      class="ag-theme-alpine"
      :rowData="items"
      :columnDefs="colDefs"
      :treeData="true"
      :autoGroupColumnDef="autoGroupColumnDef"
      :getDataPath="getDataPath"
      :groupDefaultExpanded="-1"
    />
  </div>
</template>

<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import type { AutoGroupColumnDef, ColDef } from "ag-grid-community";
import { ref } from "vue";
import type { Item } from "@/types/Item.interface";
import { TreeStore } from "@/store/TreeStore";
import { treeData } from "@/data/treeData";

interface IRow {
  number?: number;
  category: string;
  name: string;
  path?: string[];
}

defineOptions({
  name: "GridComponent",
});

const treeStore = new TreeStore(treeData);

const initialItems = ref<Item[]>(treeStore.getAll());

const getDataPath = (data: IRow): string[] => {
  return data.path || [];
};

const items = ref<IRow[]>(
  initialItems.value.map((item) => {
    const parents = treeStore.getAllParents(item.id);

    const path: string[] = parents.map((parent) => String(parent.id));
    path.push(String(item.id));

    const children = treeStore.getChildren(item.id);

    return {
      category: children.length ? "Группа" : "Элемент",
      path: path,
      name: item.label,
    };
  }),
);

const colDefs = ref<ColDef<IRow>[]>([
  {
    field: "number",
    headerName: "№ п\\п",
    width: 80,
    lockPosition: true,
    valueGetter: (params) => {
      return params.node!.rowIndex !== null ? params.node!.rowIndex + 1 : "";
    },
  },
  { field: "name", headerName: "Название", flex: 1 },
]);

const autoGroupColumnDef = ref<AutoGroupColumnDef<IRow>>({
  field: "category",
  headerName: "Категория",
  cellRendererParams: {
    suppressCount: true,
  },
  cellClass: (params) => {
    return params.node.group ? "group-cell" : "";
  },
  width: 400,
});
</script>

<style scoped>
.grid-container {
  height: 387px;
  width: 100%;
}

.ag-theme-alpine {
  height: 100%;
  width: 100%;
}

:deep(.group-cell .ag-cell-wrapper) {
  padding-left: 0 !important;
}

:deep(.group-cell .ag-cell-wrapper .ag-group-value) {
  padding-left: calc(
    var(--ag-indentation-level) * var(--ag-row-group-indent-size)
  );
}
</style>
