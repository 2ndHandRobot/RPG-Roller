export default function  tunnel(tunnelObj, tunnelString){
        //     console.log("Starting tunnel: ",tunnelString,"into object:",tunnelObj);
            function findObj(obj, str){
        //         console.log("Looking for: ",str,"in object:",obj);
                for (var el in obj) {
                    if (el === str) {
                        return el
                    }
                }
            }
        
            let tunnelArr = tunnelString.split('.');
        //     console.log("tunnelArr:",tunnelArr)
            let tunnelDepth = tunnelArr.length;
        //     console.log("tunnelDepth:",tunnelDepth)
            let minedObject = {};
            let digger = tunnelObj;
        
            for (var d = 0; d<tunnelDepth; d++){
        //         console.log("Depth: ", d)
                if (digger) {
                    digger = digger[findObj(digger, tunnelArr[d])] || null
                }
        //         console.log("Digger:"+digger);
            }
            return digger
        }