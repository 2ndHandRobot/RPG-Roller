// The _tunnel_ function retrieves a nested item within an abject based on a string
// The tunnelString is made up of the sequence of nested keys separated by '.'
//
// For example: 
// myObj = {
//     a: {
//         b: {
//             c: {
//                 d: {
//                     f:1, 
//                     g: 2, 
//                     h:3
//                 }, 
//                 e:{
//                     i:4, 
//                     j:5
//                 }
//             }
//         }
//     }
// }

// tunnel(myObj, "a.b.c.e.j") returns 5
// tunnel(myObj, "a.b.c.d") returns { f:1, g: 2, h:3 }

function tunnel(tunnelObj, tunnelString){
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


export default tunnel;