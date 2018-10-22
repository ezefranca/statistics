import Foundation

// number of elements
var n = Int(readLine()!)!
// read array and map the elements to integer
var arr = readLine()!.split(separator: " ").map{Int64(String($0))!}

var doubleArray: [Double] = arr.map({Double($0)})
let dmean: Double = doubleArray.reduce(0, +) / Double(n)

extension Double {
    func rounded(_ n: Int) -> Double {
        return Double(String(format: "%.\(n)f", self))!
    }
}

var distances = [Double]()

for index in 0...(n-1) {
    let e = pow(doubleArray[index] - dmean, 2) 
    distances.append(e)
}

let distanceSum: Double = sqrt(distances.reduce(0, +) / Double(n))
print(distanceSum.rounded(1))
