const { ccclass, property } = cc._decorator;

@ccclass
export default class ZIndex extends cc.Component {

    @property({
        type: [cc.Node]
    })
    symbolNodeArr: cc.Node[] = [];

    @property({
        type: cc.Node
    })
    symbolParent: cc.Node = null;

    onLoad() {
        this.logZIndex();

        // 会改变节点在其父节点 children 属性中索引值
        this.symbolNodeArr[2].setSiblingIndex(2);
        this.symbolNodeArr[0].setSiblingIndex(this.symbolNodeArr.length - 1 + 2);
        this.symbolNodeArr[4].setSiblingIndex(this.symbolNodeArr.length - 1 + 2);

        // 不会改变节点在其父节点 children 属性中索引值
        // this.symbolNodeArr[2].zIndex = 2;
        // this.symbolNodeArr[0].zIndex = this.symbolNodeArr.length - 1 + 2;
        // this.symbolNodeArr[4].zIndex = this.symbolNodeArr.length - 1 + 2;

        // 调用 setSiblingIndex 和 zIndex
        this.logZIndex();
    }

    logZIndex(): void {
        for (let i = 0; i < this.symbolParent.children.length; i++) {
            let node: cc.Node = this.symbolParent.children[i];
            cc.log('name =', node.name, ', zIndex =', this.symbolParent.children[i].zIndex);
        }
    }

}