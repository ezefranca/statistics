import Foundation

// number of elements
var n = Int(readLine()!)!
// read array and map the elements to integer
var arr = readLine()!.split(separator: " ").map{Int64(String($0))!}
// read array and map the weights to integer
var w = readLine()!.split(separator: " ").map{Int64(String($0))!}

var calculated = [Int64]()

for index in 0...(n-1) {
    let e = arr[index] * w[index]
    calculated.append(e)
}

var doubleArray: [Double] = calculated.map({Double($0)})
var doubleWeight: [Double] = w.map({Double($0)})

let weight: Double = doubleWeight.reduce(0, +)
let dmean: Double = doubleArray.reduce(0, +) / Double(weight)

extension Double {
    func rounded(_ n: Int) -> Double {
        return Double(String(format: "%.\(n)f", self))!
    }
}

print(dmean.rounded(1))

