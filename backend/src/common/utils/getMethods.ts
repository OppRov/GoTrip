export default function getMethods(obj: object): string[] {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(obj));
}