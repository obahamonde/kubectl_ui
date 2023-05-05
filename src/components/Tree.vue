<script setup lang="ts">
import { Node, useStore } from "~/hooks";
const tree = ref<Node>()
const owner = ref("")
const repo = ref("")
const { state } = useStore()
const getNodes = async () => {
    const { data } = await useFetch('/api/clone/' + owner.value + "/" + repo.value).json()
    tree.value = unref(data)
}

const fileToIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()
    switch (ext) {
        case 'js':
            return "logos:javascript"
        case 'ts':
            return "logos:typescript-icon"
        case 'py':
            return "logos:python"
        case 'html':
            return "logos:html-5"
        case 'css':
            return "logos:css-3"
        case 'json':
            return "logos:json"
        case 'md':
            return "logos:markdown"
        default:
            return "mdi:file"
    }

}

const toIcon = (node: Node) => {
    if (node.type === "file") {
        return fileToIcon(node.name)
    } else {
        return "mdi:folder"
    }
}

const getNodeHandler = (node: Node) => {
    if (node.type === "file") {
        return () => {
            state.currentFile = node
        }
    } else {
        return () => {
            state.currentFolder = node
        }
    }
}

const showTree = (node: Node) => {
    if (node.type === "file") {
        return {
            icon: toIcon(node),
            label: node.name,
            handler: getNodeHandler(node)
        }
    } else {
        return {
            icon: toIcon(node),
            label: node.name,
            handler: getNodeHandler(node),
        }
    }
}



</script>
<template>
    <input type="text" v-model="owner" placeholder="owner" class="input" />
    <input type="text" v-model="repo" placeholder="repo" class="input" />
    <button class="btn-get" @click="getNodes()">Get Nodes</button>

    <div class="tree">
        <div class="tree-item" v-for="node in tree" :class="node.type === 'file' ? 'tree-item-file' : 'tree-item-folder'">
            <div class="tree-item-icon">
                <Icon :icon="toIcon(node)" class="rf cp scale" />
            </div>
            <div class="tree-item-label">
                <span @click="getNodeHandler(node)" class="cp">{{ node.name }}</span>
            </div>
        </div>
    </div>
</template>
<style scoped>
.tree {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.tree-item {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.tree-item-folder {
    color: #2196f3;
}

.tree-item-file {
    color: #4caf50;
}

.tree-item-icon {
    width: 1.5rem;
    height: 1.5rem;
}

.tree-item-label {
    flex: 1;
}

.tree-item-label span {
    cursor: pointer;
}

.tree-item-label span:hover {
    text-decoration: underline;
}
</style>