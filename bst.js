    class Node{
        constructor(data){
            this.data=data;
            this.right=null;
            this.left=null;
        }
    }

    export default class Tree{
        constructor(arr){
            this.arr=arr;
            this.root=null;
            this.root=this.buildTree(arr);
        }

        buildTree(array){
            function sortArr(array){
                return array.filter((item,
                    index)=>array.indexOf(item)===index);
            }
            let sortedArr=sortArr(array).sort((a,b)=>a-b);

            function sortedArrayToBST(arr,start,end){
                if(start>end) return null;
                let mid = parseInt((start + end)/2);
                let node =new Node(arr[mid]);
                node.left=sortedArrayToBST(arr,start,mid -1);
                node.right=sortedArrayToBST(arr,mid + 1,end);

                return node;
            }
            return sortedArrayToBST(sortedArr,0,sortedArr.length-1);
        }

        prettyPrint(node=this.root,prefix="",isLeft=true){
                if (node === null) {
                return;
                }
                if (node.right !== null) {
                this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
                }
                console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
                if (node.left !== null) {
                this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
                }
        }
        insert(value,tree=this.root){
            if(tree.data===value){
                throw new Error("This value already exists!");
            }
            if((tree.data>value)&&(tree.left==null)){
                tree.left=new Node(value);
                return;
            }else if((tree.data<value)&&(tree.right==null)){
                tree.right=new Node(value);
                return;
            }
            (tree.data<value)?this.insert(value,tree.right)
            :this.insert(value,tree.left);
        
        }
            getMinValueNode(node){
                let current=node;
                while(current.left !==null){
                    current=current.left;
                }
                return current;
            }
            deleteItem(value,tree=this.root){
                if(tree===null) return tree;

                if(value<tree.data){
                    tree.left=this.deleteItem(value,tree.left)
                }else if(value>tree.data){
                    tree.right=this.deleteItem(value,tree.right);
                }else{
                    if(tree.left===null){
                        return tree.right;
                    }else if(tree.right===null){
                        return tree.left;
                    }

                    let minNode=this.getMinValueNode(tree.right);
                    tree.data=minNode.data;
                    tree.right=this.deleteItem(minNode.data,tree.right);
                }
                return tree;
            }
            find(value,tree=this.root){
                if(value===tree.data) return tree;

                (value>tree.data)?find(value,tree.right):this.find(value,tree.left);
            }
    }