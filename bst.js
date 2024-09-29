class Node{
    constructor(data){
        this.data=data;
        this.right=null;
        this.left=null;
    }
}

class Tree{
    constructor(arr){
        this.arr=arr;
        this.root=null;
    }

    buildTree(array){
        function sortArr(array){
            return array.filter((item,
                index)=>array.indexOf(item)===index);
        }
        let sortedArr=sortArr(array).sort((a,b)=>a-b);

        function sortedArrayToBST(sortedArr,start,end){
            if(start>end) return null;
            let mid = parseInt((start + end)/2);
            let node =new Node(sortedArr[mid]);
            sortedArr.left=sortedArrayToBST(sortedArr,start,mid -1);
            sortedArr.right=sortedArrayToBST(sortedArr,mid + 1,end);

            return node;
        }
    }
}