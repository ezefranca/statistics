import Foundation

var n = Int(readLine()!)!
// read array and map the elements to integer
var arr = readLine()!.split(separator: " ").map{Int(String($0))!}

import Foundation

extension Array {

    func middle() -> [Int] {
        guard count > 0 else {
            return [Int]()
        }
        
        let middleIndex = count / 2
        let middleArray: [Int]
        
        if count % 2 != 0 {
            middleArray = [self[middleIndex]] as! [Int]
        } else {
            middleArray = [self[middleIndex - 1], self[middleIndex]] as! [Int]
        }
        
        return middleArray
    }
    
    func mean(array:[Int]) -> Int {
        return array.reduce(0, +) / array.count
    }
    
    func quartiles() -> (q1 : Int, q2 : Int, q3 : Int) {
        
        let array = self as! [Int]
        let middle : Int = array.count / 2
        var factor = array.count % 2
        let q1 = mean(array: Array<Int>(array[0 ... middle - factor]).middle())
        var q2 = 0
        let q3 = mean(array: Array<Int>(array[middle + factor ... array.count - 1]).middle())
        
        if (array.count % 2 != 0) {
            q2 = array[middle]
        } else {
            q2 = mean(array: Array<Int>(array[middle - 1 ... middle]))
        }
        
        return (q1, q2, q3)
    }
    
}

var (q1, q2, q3) = arr.sorted().quartiles()
print(q1)
print(q2)
print(q3)

