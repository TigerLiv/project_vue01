export default function buling(n) {
    return n.toString().length > 1 ? n.toString() : "0" + n.toString()
}