import { Classes } from "./common/types/methodsBind";
import getMethods from "./common/utils/getMethods";

export default function methodsBind(controllersClasses: Classes): void {
	const classMethods: string[][] = [];

    for (let i = 0; i < controllersClasses.length; i++) {
        const methods: string[] = getMethods(controllersClasses[i]);
        classMethods.push(methods);
        if (methods.includes("constructor"))
            methods.splice(methods.indexOf("constructor"), 1);
    }

    for (let i = 0; i < controllersClasses.length; i++) {
        for (let k = 0; k < classMethods[i].length; k++) {
            controllersClasses[i][classMethods[i][k]]();
        }
    }
}
