import Foundation

// number of elements
var n = Int(readLine()!)!

// read array and map the elements to integer
var arr = readLine()!.characters.split(" ").map{Int(String($0))!}

// number of elements
//var n:Double = 10

// read array and map the elements to integer
//var arr = "64630 11735 14216 99233 14470 4978 73429 38120 51135 67060".characters.split(" ").map{Int(String($0))!}
//var arr = readLine()!.characters.split(" ").map{Int(String($0))!}
var doubleArray: [Double] = arr.map({Double($0)})

func fixDouble(number: Double, dp: Int) -> Double {
    let mult = pow(10, Double(dp))
    return round(number * mult)/mult
}

let dmean: Double = doubleArray.reduce(0, combine: +) / Double(n)
print(fixDouble(dmean, dp: 1))

let sorted = doubleArray.sort()
let med1 = Double(sorted[Int((n/2)-1)])
let med2 = Double(sorted[Int(n/2)])
let median = Double((med1 + med2) / 2.0)
print(fixDouble(median, dp: 1))

var doubleDict = [Double: Int]()
for currentDouble in doubleArray {
    if let foundDouble = doubleDict[currentDouble] {
        doubleDict[currentDouble] = foundDouble + 1
    }
    else {
        doubleDict[currentDouble] = 1
    }
}
var sortedDoubleItems = doubleDict.sort {
    return $0.1 > $1.1 || ($0.1 == $1.1 && $0.0 < $1.0)
}
let mode = Int(sortedDoubleItems.first!.0)
print(mode)
