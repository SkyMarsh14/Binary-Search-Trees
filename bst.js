class Node{
    constructor(data){
        this.data=data;
        this.right=null;
        this.left=null;
    }
}

export default class Tree{
    constructor(arr){
        this.root=this.buildTree(arr);
    }

    buildTree(array){
        function sortArr(array){
            return array.filter((item,
                index)=>array.indexOf(item)===index);
        }
        let sortedArr=sortArr(array).sort((a,b)=>a-b);

        function sortedArrayToBST(sortedArr,start,end){
            if(start>end) return null;
            let mid = Math.floor((start + end)/2);
            let node =new Node(sortedArr[mid]);
            sortedArr.left=sortedArrayToBST(sortedArr,start,mid -1);
            sortedArr.right=sortedArrayToBST(sortedArr,mid + 1,end);

            return node;
        }
        return sortedArrayToBST(sortedArr,0,sortedArr.length -1);
    }
}