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

        function sortedArrayToBST(arr,start,end){
            if(start>end) return null;
            let mid = parseInt((start + end)/2);
            let node =new Node(arr[mid]);
            arr.left=sortedArrayToBST(arr,start,mid -1);
            arr.right=sortedArrayToBST(arr,mid + 1,end);

            return node;
        }
        return sortedArrayToBST(sortedArr,0,sortedArr.length);
    }
}