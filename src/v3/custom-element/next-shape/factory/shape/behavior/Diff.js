export class DiffBehavior {
    // points1 - points2
    static diff(points1, points2) {
        let result = []
        for (let p1 of points1) {
            let exist = false
            for (let p2 of points2) {
                if (p1[0] === p2[0] && p1[1] === p2[1]) {
                    exist = true
                    break
                }
            }
            if (!exist) result.push(p1)
        }
        return result
    }
}